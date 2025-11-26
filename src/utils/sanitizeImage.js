// Validate and sanitize image sources to prevent DOM-based XSS (javascript: URLs etc.)
export function sanitizeImageSrc(src) {
  if (!src || typeof src !== "string") return null;
  const trimmed = src.trim();
  const lower = trimmed.toLowerCase();

  // Block any javascript: or other executable schemes
  if (lower.startsWith("javascript:") || (/^[a-z][a-z0-9+.-]*:/i.test(lower) && !(lower.startsWith('http://') || lower.startsWith('https://') || lower.startsWith('data:')))) {
    return null;
  }

  // Allow data URLs only for common image mime types and require base64 payload
  const dataImageRegex = /^data:image\/(png|jpeg|jpg|gif|webp);base64,[A-Za-z0-9+/=]+$/i;
  if (lower.startsWith("data:image/")) {
    return dataImageRegex.test(trimmed) ? trimmed : null;
  }

  // Allow http and https
  if (lower.startsWith("http://") || lower.startsWith("https://")) return trimmed;

  // Otherwise disallow (relative paths or blob could be allowed if you intentionally support them)
  return null;
}
