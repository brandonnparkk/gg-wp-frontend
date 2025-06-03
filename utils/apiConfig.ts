export function getApiUrl() {
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    // Frontend logic for localhost
    return process.env.NEXT_PUBLIC_API_URL_LOCAL;
  }
  // Default to production URL
  return process.env.NEXT_PUBLIC_API_URL;
}