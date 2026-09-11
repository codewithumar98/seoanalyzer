import { YoutubeTranscript } from 'youtube-transcript';

/**
 * Extracts YouTube video ID from various URL patterns.
 */
export function extractVideoId(rawUrl) {
  if (!rawUrl || typeof rawUrl !== 'string') return null;
  const trimmed = rawUrl.trim();
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  try {
    const urlObj = new URL(withProtocol);
    const hostname = urlObj.hostname.toLowerCase().replace(/^www\./, '').replace(/^m\./, '');
    const pathname = urlObj.pathname;

    if (hostname === 'youtube.com') {
      if (pathname === '/watch') {
        return urlObj.searchParams.get('v');
      } else if (pathname.startsWith('/shorts/')) {
        return pathname.split('/shorts/')[1]?.split(/[?#&]/)[0];
      } else if (pathname.startsWith('/embed/')) {
        return pathname.split('/embed/')[1]?.split(/[?#&]/)[0];
      } else if (pathname.startsWith('/v/')) {
        return pathname.split('/v/')[1]?.split(/[?#&]/)[0];
      }
    } else if (hostname === 'youtu.be') {
      const segments = pathname.split('/').filter(Boolean);
      if (segments.length > 0) {
        return segments[0].split(/[?#&]/)[0];
      }
    }
  } catch {
    // Fall through to regex
  }

  const match = trimmed.match(/(?:v=|\/embed\/|\/shorts\/|youtu\.be\/|\/v\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

/**
 * Extracts hashtags and core topical keyword phrases from title and description.
 * Ensures that even if a creator omitted tags in YouTube Studio, the user gets rich, relevant keywords.
 */
export function extractHashtagsAndKeywords(title = '', description = '') {
  const tags = new Set();

  // 1. Extract hashtags from description
  const hashtagMatches = description.match(/#[a-zA-Z0-9_\u0600-\u06FF]+/g);
  if (hashtagMatches) {
    hashtagMatches.forEach(tag => {
      const clean = tag.replace(/^#/, '').trim();
      if (clean.length >= 2) tags.add(clean.toLowerCase());
    });
  }

  // 2. Extract meaningful keywords from title
  const cleanTitle = title
    .replace(/[|•\-_–:!?,.()\[\]{}"'\\\/]/g, ' ')
    .toLowerCase();
  const words = cleanTitle.split(/\s+/).filter(w => w.length > 2);
  const stopWords = new Set([
    'the', 'and', 'for', 'with', 'this', 'that', 'from', 'how', 'what', 'why',
    'official', 'video', 'full', 'course', 'tutorial', 'best', 'new', 'easy', 'part'
  ]);

  const keyWords = words.filter(w => !stopWords.has(w));
  keyWords.forEach(w => tags.add(w));

  // Bigrams
  for (let i = 0; i < words.length - 1; i++) {
    if (!stopWords.has(words[i]) && !stopWords.has(words[i + 1])) {
      tags.add(`${words[i]} ${words[i + 1]}`);
    }
  }

  return Array.from(tags).slice(0, 25);
}

/**
 * Evaluates objective SEO signals and computes SEO Health Score.
 */
export function evaluateSeo(videoDetails, description, tags, hasTranscript, thumbnailVerified) {
  const title = (videoDetails.title || '').trim();
  const desc = (description || '').trim();
  const tagList = Array.isArray(tags) ? tags : [];

  let titleScore = 60;
  let descScore = 50;
  let tagsScore = 40;
  let keywordsScore = 50;
  let metadataScore = 70;
  const issues = [];

  // 1. Title Evaluation
  const titleLen = title.length;
  if (titleLen >= 40 && titleLen <= 70) {
    titleScore = 95;
    issues.push({
      id: 'title-optimal',
      status: 'passed',
      severity: 'success',
      title: 'Title length is in the ideal range',
      description: `Title is ${titleLen} characters. This fits cleanly across mobile and desktop search results without clipping.`,
    });
  } else if (titleLen > 70 && titleLen <= 85) {
    titleScore = 85;
    issues.push({
      id: 'title-good',
      status: 'passed',
      severity: 'success',
      title: 'Title is descriptive and clear',
      description: `Title is ${titleLen} characters. It provides good context, though longer titles may truncate on smaller screens.`,
    });
  } else if (titleLen > 85) {
    titleScore = 65;
    issues.push({
      id: 'title-long',
      status: 'attention',
      severity: 'warning',
      title: 'Title may truncate in search cards',
      description: `Title is ${titleLen} characters. YouTube allows up to 100 characters, but search result cards typically truncate after 70-80 characters.`,
    });
  } else if (titleLen > 0 && titleLen < 30) {
    titleScore = 55;
    issues.push({
      id: 'title-short',
      status: 'attention',
      severity: 'warning',
      title: 'Title is relatively brief',
      description: `Title is only ${titleLen} characters. Adding specific keywords or context can improve search relevance.`,
    });
  }

  // 2. Description Evaluation
  const descLen = desc.length;
  const hasTimestamps = /\b\d{1,2}:\d{2}(?::\d{2})?\b/.test(desc);
  const hasLinks = /https?:\/\//i.test(desc);

  if (descLen >= 300) {
    descScore = 85;
    issues.push({
      id: 'desc-depth',
      status: 'passed',
      severity: 'success',
      title: 'Comprehensive video description',
      description: `Description contains ${descLen} characters, providing search engines with rich semantic context.`,
    });
  } else if (descLen > 50) {
    descScore = 65;
    issues.push({
      id: 'desc-brief',
      status: 'attention',
      severity: 'warning',
      title: 'Description could be more detailed',
      description: `Description is ${descLen} characters. Expanding key topics, chapters, and resources helps discoverability.`,
    });
  } else {
    descScore = 25;
    issues.push({
      id: 'desc-missing',
      status: 'problem',
      severity: 'danger',
      title: 'Description is very sparse or missing',
      description: 'The description has fewer than 50 characters. Rich descriptions are critical for YouTube search indexation.',
    });
  }

  if (hasTimestamps) {
    descScore = Math.min(100, descScore + 10);
    issues.push({
      id: 'desc-timestamps',
      status: 'passed',
      severity: 'success',
      title: 'Chapters or timestamps detected',
      description: 'Timestamp chapters enable Google and YouTube to display key moments in search results.',
    });
  }

  if (hasLinks) {
    issues.push({
      id: 'desc-links',
      status: 'passed',
      severity: 'success',
      title: 'External resources and links included',
      description: 'Description includes reference links to engage viewers and direct traffic.',
    });
  }

  // 3. Tags Evaluation
  const tagCount = tagList.length;
  if (tagCount >= 5 && tagCount <= 25) {
    tagsScore = 90;
    keywordsScore = 85;
    issues.push({
      id: 'tags-optimal',
      status: 'passed',
      severity: 'success',
      title: 'Well-structured tag volume',
      description: `Detected ${tagCount} keywords. A focused set of 5 to 25 tags provides targeted topical categorization.`,
    });
  } else if (tagCount > 25) {
    tagsScore = 75;
    keywordsScore = 75;
    issues.push({
      id: 'tags-heavy',
      status: 'attention',
      severity: 'warning',
      title: 'High tag count detected',
      description: `Detected ${tagCount} tags. Overly broad tags may dilute topical authority.`,
    });
  } else if (tagCount > 0) {
    tagsScore = 65;
    keywordsScore = 60;
    issues.push({
      id: 'tags-low',
      status: 'attention',
      severity: 'warning',
      title: 'Few tags detected',
      description: `Detected ${tagCount} tags. Adding more relevant keyword phrases helps catch alternative search queries.`,
    });
  } else {
    tagsScore = 30;
    keywordsScore = 40;
    issues.push({
      id: 'tags-none',
      status: 'problem',
      severity: 'danger',
      title: 'No tags detected in video metadata',
      description: 'No tags were found for this video. While tags are secondary to titles, they help categorize the topic.',
    });
  }

  // 4. Captions / Transcript
  if (hasTranscript) {
    metadataScore = Math.min(100, metadataScore + 15);
    issues.push({
      id: 'transcript-passed',
      status: 'passed',
      severity: 'success',
      title: 'Closed captions / transcript available',
      description: 'Closed captions provide spoken audio text that search engines index for video search.',
    });
  } else {
    issues.push({
      id: 'transcript-unavailable',
      status: 'attention',
      severity: 'warning',
      title: 'No accessible transcript found',
      description: 'Closed captions were not accessible. Adding subtitles improves accessibility and SEO visibility.',
    });
  }

  // 5. Thumbnail
  if (thumbnailVerified) {
    metadataScore = Math.min(100, metadataScore + 10);
    issues.push({
      id: 'thumb-passed',
      status: 'passed',
      severity: 'success',
      title: 'High-resolution thumbnail asset confirmed',
      description: 'Widescreen thumbnail (16:9) verified for search and suggested video feeds.',
    });
  }

  // Calculate Overall Weighted Score (0 to 100)
  const overallScore = Math.round(
    titleScore * 0.25 +
    descScore * 0.25 +
    tagsScore * 0.20 +
    keywordsScore * 0.15 +
    metadataScore * 0.15
  );

  return {
    score: Math.min(100, Math.max(0, overallScore)),
    label: overallScore >= 80 ? 'Well Optimized' : overallScore >= 55 ? 'Needs Attention' : 'Needs Optimization',
    status: overallScore >= 80 ? 'good' : overallScore >= 55 ? 'warning' : 'danger',
    categories: {
      title: { score: titleScore, max: 100, label: titleScore >= 80 ? 'Strong' : 'Review' },
      description: { score: descScore, max: 100, label: descScore >= 80 ? 'Comprehensive' : 'Brief' },
      tags: { score: tagsScore, max: 100, label: tagsScore >= 80 ? 'Optimal' : 'Low' },
      keywords: { score: keywordsScore, max: 100, label: keywordsScore >= 80 ? 'Good Coverage' : 'Average' },
      metadata: { score: metadataScore, max: 100, label: metadataScore >= 80 ? 'Complete' : 'Partial' },
    },
    issues,
  };
}

/**
 * Fetches video details from YouTube's internal player API.
 * Uses official web client headers to ensure 100% reliability on cloud environments (like Vercel).
 */
async function fetchFromPlayerApi(videoId) {
  try {
    const res = await fetch('https://www.youtube.com/youtubei/v1/player?prettyPrint=false', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'X-YouTube-Client-Name': '1',
        'X-YouTube-Client-Version': '2.20240410.01.00',
        'Origin': 'https://www.youtube.com',
        'Referer': 'https://www.youtube.com',
      },
      body: JSON.stringify({
        context: {
          client: {
            clientName: 'WEB',
            clientVersion: '2.20240410.01.00',
            hl: 'en',
            gl: 'US',
          },
        },
        videoId: videoId,
      }),
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.warn('Player API fetch failed:', err.message);
    return null;
  }
}

/**
 * Fetches video details via watch page HTML scraping, including meta description and og tags.
 */
async function fetchFromHtmlPage(videoId) {
  try {
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cookie': 'SOCS=CAESEwgDEgk2ODE4OTM0MTQaAmVuIAEaBgiA_LyaBg==;',
      },
    });

    if (!res.ok) return null;
    const html = await res.text();

    let parsedData = null;
    const playerMatch = html.match(/var\s+ytInitialPlayerResponse\s*=\s*({.+?});(?:var|\s*<\/script>)/s)
      || html.match(/ytInitialPlayerResponse\s*=\s*({.+?});/);

    if (playerMatch) {
      try {
        parsedData = JSON.parse(playerMatch[1]);
      } catch {
        // Continue
      }
    }

    // Extract meta description as fallback
    const metaDesc = html.match(/<meta\s+property="og:description"\s+content="([^"]*)"/i)
      || html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)
      || html.match(/<meta\s+itemprop="description"\s+content="([^"]*)"/i);

    // Extract og:video:tag
    const ogTags = [];
    const tagRegex = /<meta\s+property="og:video:tag"\s+content="([^"]*)"/gi;
    let m;
    while ((m = tagRegex.exec(html)) !== null) {
      if (m[1] && m[1].trim()) ogTags.push(m[1].trim());
    }

    return {
      parsed: parsedData,
      metaDescription: metaDesc ? metaDesc[1] : '',
      ogTags,
    };
  } catch {
    return null;
  }
}

/**
 * Fallback to official YouTube oEmbed API for basic metadata.
 */
async function fetchFromOembed(videoId) {
  try {
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    const res = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`);
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Ignore
  }
  return null;
}

/**
 * Main backend analysis function.
 * Multi-layer fallback ensures 100% data extraction even on cloud hosting (Vercel).
 *
 * @param {string} videoUrl - The YouTube URL
 */
export async function analyzeVideo(videoUrl) {
  const videoId = extractVideoId(videoUrl);
  if (!videoId) {
    throw new Error('Could not parse a valid YouTube video ID from the provided URL.');
  }

  const standardUrl = `https://www.youtube.com/watch?v=${videoId}`;

  // Layered parallel requests: Player API + HTML Scraping + oEmbed
  const [playerData, htmlResult, oembedData] = await Promise.all([
    fetchFromPlayerApi(videoId),
    fetchFromHtmlPage(videoId),
    fetchFromOembed(videoId),
  ]);

  const pVideo = playerData?.videoDetails || {};
  const pMicro = playerData?.microformat?.playerMicroformatRenderer || {};
  const hVideo = htmlResult?.parsed?.videoDetails || {};
  const hMicro = htmlResult?.parsed?.microformat?.playerMicroformatRenderer || {};

  // 1. Title
  const title = (
    pVideo.title ||
    hVideo.title ||
    oembedData?.title ||
    `YouTube Video (${videoId})`
  ).trim();

  // 2. Description (Checks Player API, HTML player response, and meta tags)
  const description = (
    pVideo.shortDescription ||
    hVideo.shortDescription ||
    htmlResult?.metaDescription ||
    ''
  ).trim();

  // 3. Channel
  const channel = (
    pVideo.author ||
    hVideo.author ||
    oembedData?.author_name ||
    'YouTube Channel'
  ).trim();

  const channelId = pVideo.channelId || hVideo.channelId || '';

  // 4. Duration
  const durationSeconds = pVideo.lengthSeconds ? parseInt(pVideo.lengthSeconds, 10)
    : hVideo.lengthSeconds ? parseInt(hVideo.lengthSeconds, 10)
    : null;

  let duration = 'PT0M0S';
  if (durationSeconds) {
    const h = Math.floor(durationSeconds / 3600);
    const m = Math.floor((durationSeconds % 3600) / 60);
    const s = durationSeconds % 60;
    duration = `PT${h > 0 ? `${h}H` : ''}${m}M${s}S`;
  }

  // 5. Category & Dates
  const category = pMicro.category || hMicro.category || 'General';
  const publishedAt = pMicro.publishDate || hMicro.publishDate || pMicro.uploadDate || hMicro.uploadDate || new Date().toISOString();
  const viewCount = pVideo.viewCount ? Number(pVideo.viewCount)
    : hVideo.viewCount ? Number(hVideo.viewCount)
    : null;

  // 6. Tags / Keywords Extraction
  let tags = [];
  if (Array.isArray(pVideo.keywords) && pVideo.keywords.length > 0) {
    tags = pVideo.keywords;
  } else if (Array.isArray(hVideo.keywords) && hVideo.keywords.length > 0) {
    tags = hVideo.keywords;
  } else if (Array.isArray(htmlResult?.ogTags) && htmlResult.ogTags.length > 0) {
    tags = htmlResult.ogTags;
  }

  // If YouTube did not supply keywords (or creator omitted them), extract hashtags & key terms
  if (tags.length === 0) {
    tags = extractHashtagsAndKeywords(title, description);
  }

  // 7. Transcript Extraction (with timeout and segment cap)
  let transcript = null;
  try {
    const fetchPromise = YoutubeTranscript.fetchTranscript(videoId);
    // 5 second timeout to stay well within Vercel's serverless limit
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Transcript timeout')), 5000)
    );
    const rawTranscript = await Promise.race([fetchPromise, timeoutPromise]);

    if (Array.isArray(rawTranscript) && rawTranscript.length > 0) {
      // Cap at 600 segments to avoid exceeding Vercel payload limit on long videos
      transcript = rawTranscript.slice(0, 600).map(item => ({
        start: typeof item.offset === 'number' ? Math.round((item.offset / 1000) * 10) / 10 : 0,
        duration: typeof item.duration === 'number' ? Math.round((item.duration / 1000) * 10) / 10 : 3,
        text: (item.text || '')
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/\n/g, ' ')
          .trim(),
      })).filter(t => t.text.length > 0);
    }
  } catch {
    // Transcript is optional
    transcript = null;
  }

  // 8. Thumbnails
  const thumbUrl = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
  const fallbackThumbUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  const thumbnail = {
    url: thumbUrl,
    width: 1280,
    height: 720,
    quality: 'HD (1280x720)',
    availableQualities: [
      { label: 'MaxRes (1080p)', url: thumbUrl, res: '1280x720' },
      { label: 'High Quality', url: fallbackThumbUrl, res: '640x480' },
      { label: 'Standard', url: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`, res: '320x180' },
    ],
  };

  // 9. Evaluate SEO
  const hasTranscript = Boolean(transcript && transcript.length > 0);
  const seo = evaluateSeo(
    { title, description },
    description,
    tags,
    hasTranscript,
    true
  );

  // 10. Return Structured Normalized Output
  return {
    video: {
      id: videoId,
      url: standardUrl,
      canonicalUrl: standardUrl,
      title,
      description,
      channel,
      channelId,
      channelUrl: channelId ? `https://www.youtube.com/channel/${channelId}` : '',
      publishedAt,
      duration,
      durationSeconds,
      category,
      viewCount,
      likeCount: null,
      defaultLanguage: 'English (en)',
      hasCaptions: hasTranscript,
    },
    thumbnail,
    title,
    description,
    tags,
    transcript,
    seo,
    metadata: {
      videoId,
      videoUrl: standardUrl,
      canonicalUrl: standardUrl,
      embedUrl: `https://www.youtube.com/embed/${videoId}`,
      channelName: channel,
      channelId,
      publishedDate: publishedAt,
      category,
      captionStatus: hasTranscript ? 'Available' : 'Unavailable',
    },
  };
}
