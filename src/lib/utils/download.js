/**
 * Downloads a string as a file using a temporary blob link.
 * @param {string} content - The file content
 * @param {string} filename - The name of the file to save
 * @param {string} mimeType - The MIME type
 */
export function downloadTextFile(content, filename, mimeType = 'text/plain;charset=utf-8') {
  if (!content) return false;

  try {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    return true;
  } catch (err) {
    console.error('Failed to trigger download:', err);
    return false;
  }
}

/**
 * Downloads an image from a URL or opens it in a new tab if cross-origin blocked.
 * @param {string} imageUrl - The image URL
 * @param {string} filename - The suggested filename
 */
export async function downloadImage(imageUrl, filename = 'thumbnail.jpg') {
  if (!imageUrl) return false;

  try {
    const response = await fetch(imageUrl, { mode: 'cors' });
    if (!response.ok) throw new Error('Network response not ok');
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    return true;
  } catch {
    // If CORS prevents direct blob fetch, open in new tab so user can right-click / save
    window.open(imageUrl, '_blank', 'noopener,noreferrer');
    return true;
  }
}
