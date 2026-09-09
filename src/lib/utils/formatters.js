/**
 * Formats an ISO 8601 duration (e.g. PT14M32S) or seconds number to human-readable string.
 */
export function formatDuration(duration) {
  if (!duration) return 'N/A';

  // If already a human string like "12:34"
  if (typeof duration === 'string' && duration.includes(':') && !duration.startsWith('P')) {
    return duration;
  }

  // If number of seconds
  if (typeof duration === 'number') {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = Math.floor(duration % 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    }
    return `${minutes}m ${seconds}s`;
  }

  // If ISO 8601 string (PT1H2M3S or PT15M33S)
  if (typeof duration === 'string' && duration.startsWith('P')) {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (match) {
      const hours = parseInt(match[1] || '0', 10);
      const minutes = parseInt(match[2] || '0', 10);
      const seconds = parseInt(match[3] || '0', 10);
      if (hours > 0) {
        return `${hours}h ${minutes}m ${seconds}s`;
      }
      return `${minutes}m ${seconds}s`;
    }
  }

  return String(duration);
}

/**
 * Formats numbers into localized or abbreviated forms.
 */
export function formatNumber(num) {
  if (num === null || num === undefined || num === '') return 'N/A';
  const n = Number(num);
  if (isNaN(n)) return String(num);
  return new Intl.NumberFormat('en-US').format(n);
}

export function formatCompactNumber(num) {
  if (num === null || num === undefined || num === '') return 'N/A';
  const n = Number(num);
  if (isNaN(n)) return String(num);
  return new Intl.NumberFormat('en-US', { notation: 'compact', compactDisplay: 'short' }).format(n);
}

/**
 * Formats a date string into readable full date + relative time.
 */
export function formatDate(dateString) {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    const formatted = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);

    // Calculate relative time
    const diffMs = Date.now() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    let relative = '';
    if (diffDays < 1) {
      relative = 'Today';
    } else if (diffDays === 1) {
      relative = 'Yesterday';
    } else if (diffDays < 30) {
      relative = `${diffDays} days ago`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      relative = `${months} ${months === 1 ? 'month' : 'months'} ago`;
    } else {
      const years = Math.floor(diffDays / 365);
      relative = `${years} ${years === 1 ? 'year' : 'years'} ago`;
    }

    return `${formatted} (${relative})`;
  } catch {
    return dateString;
  }
}

/**
 * Counts words in a string.
 */
export function countWords(text) {
  if (!text || typeof text !== 'string') return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Formats timestamp seconds (e.g. 75 -> "01:15")
 */
export function formatTimestamp(seconds) {
  if (seconds === null || seconds === undefined) return '';
  const s = Math.floor(Number(seconds));
  if (isNaN(s)) return String(seconds);
  const mins = Math.floor(s / 60);
  const secs = s % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}
