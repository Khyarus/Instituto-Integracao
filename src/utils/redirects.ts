/**
 * Open Redirect Prevention
 */

/**
 * Validates if a redirect URL is safe (relative path starting with /).
 * 
 * @param url - The URL to validate.
 * @returns true if safe.
 */
export const isSafeRedirect = (url: string): boolean => {
  if (!url) return false;
  // Only allow relative paths starting with /
  // Reject absolute URLs (http://, https://, //)
  return url.startsWith("/") && !url.startsWith("//");
};
