import DOMPurify from "dompurify";

/**
 * Sanitize HTML content to prevent XSS attacks.
 * 
 * @param input - The raw HTML string to sanitize.
 * @returns A sanitized HTML string.
 */
export const sanitizeHtml = (input: string): string => {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: ["b", "i", "em", "strong", "a", "p", "br", "ul", "ol", "li"],
    ALLOWED_ATTR: ["href", "target", "rel"],
  });
};
