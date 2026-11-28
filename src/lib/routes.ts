import type { Language, PageId } from '../types';

export const SITE = 'https://smartcalclab.com';
export const LANG_CODES: Language[] = ['en', 'es', 'pt', 'fr', 'de', 'ar', 'hi'];
export const VALID_PAGES: PageId[] = [
  'home', 'loan', 'autoloan', 'currency', 'bmi', 'percentage', 'compound', 'salary',
  'privacy', 'terms', 'about', 'contact', 'disclaimer', 'guides',
];

// Pages that get /es/..., /pt/... URLs (prerendered per language in scripts/prerender.mjs).
// Legal pages and guides stay English-only URLs.
export const LOCALIZED_PAGES: PageId[] = [
  'home', 'loan', 'autoloan', 'currency', 'bmi', 'percentage', 'compound', 'salary',
];
export const isLocalizedPage = (page: PageId) => LOCALIZED_PAGES.includes(page);

const isLang = (v: string | null | undefined): v is Language =>
  !!v && (LANG_CODES as string[]).includes(v);

export interface Route { lang: Language; page: PageId; guideSlug: string | null }

// URL is the single source of truth: /es/loan -> Spanish, /loan -> English
export function parseRoute(pathname: string, search = '', hash = ''): Route {
  const segs = pathname.split('/').filter(Boolean);
  let lang: Language = 'en';

  if (segs[0] === 'en') {
    segs.shift();
  } else if (isLang(segs[0])) {
    lang = segs.shift() as Language;
  } else {
    const q = new URLSearchParams(search).get('lang'); // legacy ?lang=es
    if (isLang(q)) lang = q;
  }

  const first = segs[0] ?? '';
  if (first === 'guides') return { lang: 'en', page: 'guides', guideSlug: segs[1] ?? null };

  let page: PageId = 'home';
  if (first && VALID_PAGES.includes(first as PageId)) page = first as PageId;
  else if (['auto-loan', 'car-loan', 'car-payment-calculator'].includes(first)) page = 'autoloan';
  else if (/mortgage|lease|real-estate/.test(first)) page = 'loan';
  else if (/dividend|stock-profit|investing/.test(first)) page = 'compound';
  else if (first === 'overview') page = 'about';
  else if (!first) {
    const qp = new URLSearchParams(search);
    const q = (qp.get('calc') || qp.get('tool') || qp.get('p')) as PageId;
    const h = hash.replace('#', '') as PageId;
    if (VALID_PAGES.includes(q)) page = q;
    else if (VALID_PAGES.includes(h)) page = h;
  }
  return { lang, page, guideSlug: null };
}

// English = unprefixed. Guides + legal pages are English-only URLs.
export function buildPath(lang: Language, page: PageId, guideSlug: string | null = null): string {
  if (page === 'guides') return guideSlug ? `/guides/${guideSlug}` : '/guides';
  const prefix = lang === 'en' || !isLocalizedPage(page) ? '' : `/${lang}`;
  if (page === 'home') return prefix || '/';
  return `${prefix}/${page}`;
}

export const absUrl = (lang: Language, page: PageId, guideSlug: string | null = null) =>
  SITE + buildPath(lang, page, guideSlug);
