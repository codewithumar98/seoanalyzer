import { validateAndParseYoutubeUrl } from '../utils/urlValidator.js';
import { SAMPLE_FULL_VIDEO, SAMPLE_PARTIAL_VIDEO } from '../mock/sampleData.js';

/**
 * Normalizes backend response data to ensure predictable frontend state.
 * Handles partial responses, missing fields, and varied backend schema structures.
 */
export function normalizeVideoData(raw) {
  if (!raw || typeof raw !== 'object') {
    return null;
  }

  // Handle wrappers like { success: true, data: { ... } }
  const data = raw.data || raw;

  const video = data.video || {};
  const thumbnail = data.thumbnail || {};
  const metadata = data.metadata || {};
  const seo = data.seo || {};

  // Normalize Title
  const title = data.title || video.title || 'Untitled Video';

  // Normalize Description
  const description = data.description || video.description || '';

  // Normalize Tags
  let tags = [];
  if (Array.isArray(data.tags)) {
    tags = data.tags.filter(t => typeof t === 'string' && t.trim().length > 0);
  } else if (Array.isArray(video.tags)) {
    tags = video.tags.filter(t => typeof t === 'string' && t.trim().length > 0);
  } else if (typeof data.tags === 'string') {
    tags = data.tags.split(',').map(t => t.trim()).filter(Boolean);
  }

  // Normalize Transcript
  let transcript = null;
  const rawTranscript = data.transcript !== undefined ? data.transcript : video.transcript;
  if (Array.isArray(rawTranscript) && rawTranscript.length > 0) {
    transcript = rawTranscript.map((item, idx) => {
      if (typeof item === 'string') {
        return { start: idx * 5, duration: 5, text: item };
      }
      return {
        start: typeof item.start === 'number' ? item.start : idx,
        duration: typeof item.duration === 'number' ? item.duration : 3,
        text: item.text || item.content || '',
      };
    }).filter(item => item.text.trim().length > 0);
  } else if (typeof rawTranscript === 'string' && rawTranscript.trim().length > 0) {
    transcript = [{ start: 0, duration: 0, text: rawTranscript.trim() }];
  }

  // Normalize Thumbnail
  const thumbUrl = thumbnail.url || video.thumbnailUrl || (typeof thumbnail === 'string' ? thumbnail : '');
  const normalizedThumb = {
    url: thumbUrl || (video.id ? `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg` : ''),
    width: thumbnail.width || 1280,
    height: thumbnail.height || 720,
    quality: thumbnail.quality || 'High Definition',
    availableQualities: thumbnail.availableQualities || [],
  };

  // Normalize Video Info
  const normalizedVideo = {
    id: video.id || data.id || 'N/A',
    url: video.url || data.url || (video.id ? `https://www.youtube.com/watch?v=${video.id}` : ''),
    canonicalUrl: video.canonicalUrl || metadata.canonicalUrl || video.url || '',
    title,
    description,
    channel: video.channel || video.author || metadata.channelName || 'Unknown Channel',
    channelId: video.channelId || metadata.channelId || '',
    channelUrl: video.channelUrl || (video.channelId ? `https://www.youtube.com/channel/${video.channelId}` : ''),
    publishedAt: video.publishedAt || metadata.publishedDate || video.uploadDate || '',
    duration: video.duration || metadata.duration || '',
    durationSeconds: video.durationSeconds || null,
    category: video.category || metadata.category || 'General',
    viewCount: video.viewCount ?? metadata.viewCount ?? null,
    likeCount: video.likeCount ?? metadata.likeCount ?? null,
    commentCount: video.commentCount ?? null,
    defaultLanguage: video.defaultLanguage || metadata.defaultLanguage || 'Unknown',
    hasCaptions: transcript !== null && transcript.length > 0,
  };

  // Normalize SEO
  const seoScore = typeof seo.score === 'number' ? Math.min(100, Math.max(0, seo.score)) : null;
  const normalizedSeo = {
    score: seoScore,
    label: seo.label || (seoScore >= 80 ? 'Good' : seoScore >= 50 ? 'Needs Attention' : 'Needs Optimization'),
    status: seo.status || (seoScore >= 80 ? 'good' : seoScore >= 50 ? 'warning' : 'danger'),
    categories: seo.categories || null,
    issues: Array.isArray(seo.issues) ? seo.issues.map((issue, idx) => ({
      id: issue.id || `issue-${idx}`,
      status: issue.status || (issue.severity === 'success' ? 'passed' : issue.severity === 'danger' ? 'problem' : 'attention'),
      severity: issue.severity || (issue.status === 'passed' ? 'success' : issue.status === 'problem' ? 'danger' : 'warning'),
      title: issue.title || 'SEO Signal',
      description: issue.description || '',
    })) : [],
  };

  // Normalize Metadata
  const normalizedMetadata = {
    videoId: normalizedVideo.id,
    videoUrl: normalizedVideo.url,
    canonicalUrl: normalizedVideo.canonicalUrl,
    embedUrl: metadata.embedUrl || (normalizedVideo.id !== 'N/A' ? `https://www.youtube.com/embed/${normalizedVideo.id}` : ''),
    channelName: normalizedVideo.channel,
    channelId: normalizedVideo.channelId,
    publishedDate: normalizedVideo.publishedAt,
    category: normalizedVideo.category,
    defaultLanguage: normalizedVideo.defaultLanguage,
    captionStatus: transcript ? 'Available' : 'Unavailable',
    ...metadata,
  };

  return {
    video: normalizedVideo,
    thumbnail: normalizedThumb,
    title,
    description,
    tags,
    transcript,
    seo: normalizedSeo,
    metadata: normalizedMetadata,
  };
}

/**
 * Main API function to analyze a YouTube video URL.
 * Sends a request to POST /api/analyze as specified in requirements.
 *
 * @param {string} url - YouTube URL
 * @returns {Promise<{ success: boolean, data?: object, error?: string }>}
 */
export async function analyzeYoutubeUrl(url) {
  // 1. Frontend validation
  const validation = validateAndParseYoutubeUrl(url);
  if (!validation.isValid) {
    return {
      success: false,
      error: validation.error,
    };
  }

  // 2. Perform API call to POST /api/analyze
  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        url: validation.normalizedUrl || url.trim(),
      }),
    });

    if (!response.ok) {
      let serverErrorMessage = `Server returned status ${response.status} (${response.statusText || 'Error'})`;
      try {
        const errorJson = await response.json();
        if (errorJson && (errorJson.message || errorJson.error)) {
          serverErrorMessage = errorJson.message || errorJson.error;
        }
      } catch {
        // Non-JSON response
      }

      if (response.status === 404) {
        serverErrorMessage = 'Backend endpoint /api/analyze was not found. Please ensure your backend API server is running and configured.';
      } else if (response.status === 429) {
        serverErrorMessage = 'Rate limit exceeded. Please wait a few moments before analyzing another video.';
      }

      return {
        success: false,
        error: serverErrorMessage,
      };
    }

    const json = await response.json();
    const normalized = normalizeVideoData(json);

    if (!normalized) {
      return {
        success: false,
        error: 'Received empty or invalid data format from the analyzer service.',
      };
    }

    return {
      success: true,
      data: normalized,
    };
  } catch (err) {
    // Network errors (e.g. backend server not started or fetch failed)
    const isNetworkError = err instanceof TypeError && (
      err.message.includes('fetch') ||
      err.message.includes('NetworkError') ||
      err.message.includes('Failed to fetch')
    );

    const errorMessage = isNetworkError
      ? 'Network connection error. Please check your internet connection or verify the dev server is active.'
      : (err.message || 'An unexpected error occurred while analyzing the video.');

    return {
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Loads isolated sample data for testing without calling external servers.
 * @param {'full'|'partial'} type
 */
export function loadSampleAnalysis(type = 'full') {
  const sample = type === 'partial' ? SAMPLE_PARTIAL_VIDEO : SAMPLE_FULL_VIDEO;
  return normalizeVideoData(sample);
}
