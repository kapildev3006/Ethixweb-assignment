/**
 * Input sanitization utility for Admin Content Management
 * Enforces rule: "Do not allow free-form HTML or executable scripts in content inputs."
 */

export function sanitizeText(input: string): string {
  if (!input) return '';
  return input
    // Remove script tags and content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove style tags and content
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    // Remove iframe, embed, object
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    // Remove all html tags
    .replace(/<\/?[^>]+(>|$)/g, '')
    // Remove inline event handlers like onclick=
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/on\w+='[^']*'/gi, '')
    // Trim
    .trim();
}

export function sanitizeUrl(url: string): string {
  if (!url) return '';
  const trimmed = url.trim();
  // Only allow relative paths starting with / or http/https URLs
  if (
    trimmed.startsWith('/') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('mailto:') ||
    trimmed.startsWith('tel:')
  ) {
    return trimmed;
  }
  return '#';
}
