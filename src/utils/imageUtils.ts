const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60';

export const getCleanImageUrl = (images: string[] | undefined): string => {
  const primary = images?.[0];
  if (!primary) return FALLBACK_IMAGE;

  let cleaned = primary.trim();

  if (cleaned.startsWith('[') && cleaned.endsWith(']')) {
    try {
      const parsed = JSON.parse(cleaned);
      if (Array.isArray(parsed) && parsed.length > 0) cleaned = parsed[0];
    } catch {
      cleaned = cleaned.replace(/^\[["']?|["']?\]$/g, '');
    }
  }

  if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
    cleaned = cleaned.replace(/^"|"$/g, '');
  }

  return cleaned.startsWith('http') ? cleaned : FALLBACK_IMAGE;
};

export const FALLBACK_IMAGE_URL = FALLBACK_IMAGE;
