import React, { useEffect } from 'react';
import { Language, PageId, ToolId } from '../types';
import { TRANSLATIONS } from '../translations';
import { LANG_CODES, SITE, absUrl, buildPath, isLocalizedPage } from '../lib/routes';

interface SEOHeadProps {
  currentLang: Language;
  currentPage: PageId;
  guideSlug?: string | null;
}

const OG_LOCALE: Record<string, string> = {
  en: 'en_US', es: 'es_ES', pt: 'pt_BR', fr: 'fr_FR', de: 'de_DE', ar: 'ar_AR', hi: 'hi_IN',
};

export const SEOHead: React.FC<SEOHeadProps> = ({ currentLang, currentPage, guideSlug = null }) => {
  const t = TRANSLATIONS[currentLang];

  useEffect(() => {
    const canonicalUrl = absUrl(currentLang, currentPage, guideSlug);

    // Guides: English-only URL; title/meta come from the prerendered HTML
    if (currentPage === 'guides') {
      let c = document.querySelector('link[rel="canonical"]');
      if (!c) {
        c = document.createElement('link');
        c.setAttribute('rel', 'canonical');
        document.head.appendChild(c);
      }
      c.setAttribute('href', canonicalUrl);
      document.querySelectorAll('link[data-dynamic-hreflang="true"]').forEach((el) => el.remove());
      const sch = document.getElementById('dynamic-page-schema');
      if (sch) sch.textContent = '';
      return;
    }

    const isTool = ['loan', 'autoloan', 'currency', 'bmi', 'percentage', 'compound', 'salary'].includes(currentPage);
    
    let title = `${t.siteName} - ${t.tagline}`;
    let desc = 'Free online calculators for mortgage loans, car payments, live currency exchange, BMI (kg & cm), and annual to gross salary in 7 global languages.';

    if (isTool) {
      const tool = t.tools[currentPage as ToolId];
      title = `${tool.seo.title} | ${t.siteName}`;
      desc = tool.seo.metaDesc;
    } else if (currentPage === 'privacy') {
      title = `${t.legal.privacyTitle} | ${t.siteName}`;
      desc = 'Official Privacy Policy and Cookie Disclosures for SmartCalcLab.com.';
    } else if (currentPage === 'terms') {
      title = `${t.legal.termsTitle} | ${t.siteName}`;
      desc = 'Terms of Service and legal agreement for using SmartCalcLab tools.';
    } else if (currentPage === 'about') {
      title = `${t.legal.aboutTitle} | ${t.siteName}`;
      desc = 'Learn more about the mission, precision, and technology behind SmartCalcLab.';
    } else if (currentPage === 'contact') {
      title = `${t.legal.contactTitle} | ${t.siteName}`;
      desc = 'Contact the engineering and support team at SmartCalcLab for feedback or tool suggestions.';
    } else if (currentPage === 'disclaimer') {
      title = `${t.legal.disclaimerTitle} | ${t.siteName}`;
      desc = 'Financial and health calculation disclaimers for SmartCalcLab users.';
    }

    // 1. Update Title
    document.title = title;

    // 2. Helper to set or create meta tag
    const setMetaTag = (attribute: string, attrVal: string, content: string) => {
      let element = document.querySelector(`meta[${attribute}="${attrVal}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMetaTag('name', 'description', desc);
    setMetaTag('name', 'title', title);
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', desc);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:locale', OG_LOCALE[currentLang] || 'en_US');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', desc);

    // 3. Update Self-Referencing Canonical Tag
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 4. hreflang: only for pages that exist in every language (path-based URLs)
    document.querySelectorAll('link[data-dynamic-hreflang="true"]').forEach((el) => el.remove());
    if (isLocalizedPage(currentPage)) {
      const addAlt = (hreflang: string, href: string) => {
        const l = document.createElement('link');
        l.setAttribute('rel', 'alternate');
        l.setAttribute('hreflang', hreflang);
        l.setAttribute('data-dynamic-hreflang', 'true');
        l.setAttribute('href', href);
        document.head.appendChild(l);
      };
      LANG_CODES.forEach((code) => addAlt(code, SITE + buildPath(code, currentPage)));
      addAlt('x-default', SITE + buildPath('en', currentPage));
    }

    // 4. Inject Dynamic Schema.org JSON-LD (FAQPage + SoftwareApplication)
    let schemaScript = document.getElementById('dynamic-page-schema') as HTMLScriptElement | null;
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'dynamic-page-schema';
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }

    if (isTool) {
      const tool = t.tools[currentPage as ToolId];
      const faqSchema = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'SoftwareApplication',
            'name': tool.name,
            'operatingSystem': 'All',
            'applicationCategory': 'UtilitiesApplication',
            'description': tool.shortDesc,
            'offers': {
              '@type': 'Offer',
              'price': '0',
              'priceCurrency': 'USD',
            },
          },
          {
            '@type': 'BreadcrumbList',
            'itemListElement': [
              {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Home',
                'item': absUrl(currentLang, 'home'),
              },
              {
                '@type': 'ListItem',
                'position': 2,
                'name': tool.name,
                'item': canonicalUrl,
              },
            ],
          },
          {
            '@type': 'FAQPage',
            'mainEntity': tool.seo.faqs.map((faq) => ({
              '@type': 'Question',
              'name': faq.q,
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': faq.a,
              },
            })),
          },
        ],
      };
      schemaScript.textContent = JSON.stringify(faqSchema);
    } else {
      schemaScript.textContent = '';
    }
  }, [currentLang, currentPage, guideSlug, t]);

  return null;
};
