// Safe navigation helper to prevent open redirect to external URLs.
export function isInternalPath(path) {
  if (typeof path !== 'string') return false;
  const trimmed = path.trim();
  // Only allow paths that start with a single leading slash and do not include a scheme
  if (!trimmed.startsWith('/')) return false;
  // Block any scheme-like strings (e.g., "http:", "javascript:") embedded
  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) return false;
  return true;
}

export function safeNavigate(navigateFn, path, options) {
  if (isInternalPath(path)) {
    navigateFn(path, options);
  } else {
    // Do not navigate to external URLs — log for diagnostics instead
    console.warn('Blocked external navigation attempt to:', path);
  }
}
