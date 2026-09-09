/**
 * Copies text to the system clipboard using native browser APIs with fallback.
 * @param {string} text - The text to copy
 * @returns {Promise<boolean>} - True if copy succeeded, false otherwise
 */
export async function copyToClipboard(text) {
  if (typeof text !== 'string') {
    text = String(text ?? '');
  }

  if (!text) return false;

  // Modern navigator.clipboard API
  if (navigator?.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall through to fallback
    }
  }

  // Fallback for older browsers or restricted iframe environments
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-999999px';
    textarea.style.top = '-999999px';
    textarea.setAttribute('readonly', '');
    document.body.appendChild(textarea);
    textarea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textarea);
    return successful;
  } catch {
    return false;
  }
}
