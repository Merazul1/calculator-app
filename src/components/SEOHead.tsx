import React, { useEffect } from 'react';
import { Language, PageId, ToolId } from '../types';
import { TRANSLATIONS } from '../translations';

interface SEOHeadProps {
  currentLang: Language;
  currentPage: PageId;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ currentLang, currentPage }) => {
  const t = TRANSLATIONS[currentLang];

  useEffect(() => {
    const isTool = ['loan', 'autoloan', 'currency', 'bmi', 'percentage', 'compound', 'salary'].includes(currentPage);
    
    let title = `${t.siteName} - ${t.tagline}`;
    let desc = 'Free online calculators for mortgage loans, car payments, live currency exchange, BMI (kg & cm), and annual to gross salary in 7 global languages.';
    let canonicalUrl = `https://smartcalclab.com/${currentPage !== 'home' ? currentPage : ''}`;

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
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', desc);

    // 3. Update Canonical Tag
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

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
  }, [currentLang, currentPage, t]);

  return null;
};
