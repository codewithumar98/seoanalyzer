/**
 * Validates and parses a YouTube URL.
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/shorts/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://m.youtube.com/watch?v=VIDEO_ID
 */
export function validateAndParseYoutubeUrl(rawUrl) {
  if (!rawUrl || typeof rawUrl !== 'string') {
    return {
      isValid: false,
      videoId: null,
      error: 'Please enter a YouTube video URL.',
    };
  }

  const trimmed = rawUrl.trim();
  if (!trimmed) {
    return {
      isValid: false,
      videoId: null,
      error: 'Please enter a YouTube video URL.',
    };
  }

  // Attempt URL parse
  let urlObj;
  try {
    // Add protocol if user pasted youtube.com/... without https://
    const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    urlObj = new URL(withProtocol);
  } catch {
    return {
      isValid: false,
      videoId: null,
      error: 'Invalid URL format. Please paste a valid web address.',
    };
  }

  const hostname = urlObj.hostname.toLowerCase().replace(/^www\./, '').replace(/^m\./, '');
  const pathname = urlObj.pathname;
  let videoId = null;

  if (hostname === 'youtube.com') {
    if (pathname === '/watch') {
      videoId = urlObj.searchParams.get('v');
    } else if (pathname.startsWith('/shorts/')) {
      videoId = pathname.split('/shorts/')[1]?.split(/[?#&]/)[0];
    } else if (pathname.startsWith('/embed/')) {
      videoId = pathname.split('/embed/')[1]?.split(/[?#&]/)[0];
    } else if (pathname.startsWith('/v/')) {
      videoId = pathname.split('/v/')[1]?.split(/[?#&]/)[0];
    }
  } else if (hostname === 'youtu.be') {
    // pathname is /VIDEO_ID
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 0) {
      videoId = segments[0].split(/[?#&]/)[0];
    }
  }

  // Clean video ID (YouTube IDs are typically 11 chars: [a-zA-Z0-9_-]{11})
  if (videoId) {
    videoId = videoId.trim();
    // Validate standard format or general alphanumeric
    if (/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
      return {
        isValid: true,
        videoId,
        normalizedUrl: `https://www.youtube.com/watch?v=${videoId}`,
        error: null,
      };
    }
    // Allow slightly non-standard if still alphanumeric
    if (/^[a-zA-Z0-9_-]+$/.test(videoId) && videoId.length >= 6) {
      return {
        isValid: true,
        videoId,
        normalizedUrl: `https://www.youtube.com/watch?v=${videoId}`,
        error: null,
      };
    }
  }

  return {
    isValid: false,
    videoId: null,
    error: 'Unrecognized YouTube URL. Supported formats: youtube.com/watch?v=..., youtu.be/..., or youtube.com/shorts/...',
  };
}
