// Writes public/sitemap.xml: every language URL + hreflang alternates (runs before vite build)
import { writeFileSync } from 'node:fs'

const SITE = 'https://smartcalclab.com'
const LANGS = ['en', 'es', 'pt', 'fr', 'de', 'ar', 'hi']
const LOCALIZED = ['', 'salary', 'loan', 'autoloan', 'currency', 'bmi', 'percentage', 'compound']
const ENGLISH_ONLY = [
  'about', 'contact', 'privacy', 'terms', 'disclaimer', 'guides',
  'guides/mortgage-amortization-piti-guide', 'guides/gross-vs-net-salary-guide',
  'guides/auto-loan-financing-guide', 'guides/compound-interest-wealth-guide',
  'guides/bmi-body-composition-guide', 'guides/currency-exchange-bank-fees-guide',
]

const url = (l, p) => SITE + (l === 'en' ? (p ? `/${p}` : '/') : p ? `/${l}/${p}` : `/${l}`)
const today = new Date().toISOString().slice(0, 10)

const blocks = []
for (const p of LOCALIZED) {
  const alts = [
    ...LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${url(l, p)}"/>`),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${url('en', p)}"/>`,
  ].join('\n')
  for (const l of LANGS) {
    blocks.push(`  <url>\n    <loc>${url(l, p)}</loc>\n    <lastmod>${today}</lastmod>\n${alts}\n  </url>`)
  }
}
for (const p of ENGLISH_ONLY) {
  blocks.push(`  <url>\n    <loc>${url('en', p)}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
}

writeFileSync(
  'public/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${blocks.join('\n')}\n</urlset>\n`
)
console.log(`[sitemap] ${blocks.length} URLs written`)
