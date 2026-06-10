// Fetches sitemap SEO data from The Agency app at build time.
// Returns a map keyed by slug so pages can look up their own meta.

const API_BASE    = import.meta.env.AGENCY_API_URL || 'https://api.stateofthedesign.com/api';
const TOKEN       = import.meta.env.PORTAL_TOKEN   || '';

export type PageSEO = {
  title:       string;
  description: string;
  ogImage:     string;
};

type SitemapPage = {
  slug:            string;
  seo_title:       string | null;
  seo_description: string | null;
  og_image:        string | null;
};

const DEFAULTS: PageSEO = {
  title:       'Moto Nineties',
  description: 'They call it the fun era. It was really a war. A feature documentary. Coming Summer 2026.',
  ogImage:     '/images/Moto-Nineties-McGrath-Emig-War.jpg',
};

let _cache: Map<string, PageSEO> | null = null;

export async function getSitemapSEO(): Promise<Map<string, PageSEO>> {
  if (_cache) return _cache;

  if (!TOKEN) {
    console.warn('[sitemap-seo] PORTAL_TOKEN not set — using defaults for all pages');
    _cache = new Map();
    return _cache;
  }

  try {
    const res = await fetch(`${API_BASE}/portal/${TOKEN}/sitemap`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    _cache = new Map<string, PageSEO>();
    for (const page of (data.pages as SitemapPage[])) {
      _cache.set(page.slug, {
        title:       page.seo_title       ?? DEFAULTS.title,
        description: page.seo_description ?? DEFAULTS.description,
        ogImage:     page.og_image        ?? DEFAULTS.ogImage,
      });
    }
    return _cache;
  } catch (err) {
    console.warn('[sitemap-seo] Failed to fetch — using defaults:', err);
    _cache = new Map();
    return _cache;
  }
}

export async function getPageSEO(slug: string): Promise<PageSEO> {
  const map = await getSitemapSEO();
  return map.get(slug) ?? DEFAULTS;
}
