import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Language, PageId, ToolId } from './types';
import { LANGUAGES, TRANSLATIONS } from './translations';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { AdSlot } from './components/AdSlot';
import { SEOContentSection } from './components/SEOContentSection';
import { SEOHead } from './components/SEOHead';

// Lazy-loaded Calculator components for fast initial load
const LoanCalculator = lazy(() => import('./components/calculators/LoanCalculator').then(m => ({ default: m.LoanCalculator })));
const AutoLoanCalculator = lazy(() => import('./components/calculators/AutoLoanCalculator').then(m => ({ default: m.AutoLoanCalculator })));
const CurrencyConverter = lazy(() => import('./components/calculators/CurrencyConverter').then(m => ({ default: m.CurrencyConverter })));
const BMICalculator = lazy(() => import('./components/calculators/BMICalculator').then(m => ({ default: m.BMICalculator })));
const PercentageCalculator = lazy(() => import('./components/calculators/PercentageCalculator').then(m => ({ default: m.PercentageCalculator })));
const CompoundInterestCalculator = lazy(() => import('./components/calculators/CompoundInterestCalculator').then(m => ({ default: m.CompoundInterestCalculator })));
const SalaryCalculator = lazy(() => import('./components/calculators/SalaryCalculator').then(m => ({ default: m.SalaryCalculator })));

// Lazy-loaded Legal & trust pages
const PrivacyPolicy = lazy(() => import('./components/pages/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })));
const TermsOfService = lazy(() => import('./components/pages/TermsOfService').then(m => ({ default: m.TermsOfService })));
const AboutUs = lazy(() => import('./components/pages/AboutUs').then(m => ({ default: m.AboutUs })));
const ContactUs = lazy(() => import('./components/pages/ContactUs').then(m => ({ default: m.ContactUs })));
const Disclaimer = lazy(() => import('./components/pages/Disclaimer').then(m => ({ default: m.Disclaimer })));

// Lazy-loaded Educational Guides Hub
const GuidesPage = lazy(() => import('./components/pages/GuidesPage').then(m => ({ default: m.GuidesPage })));
const GuideDetailPage = lazy(() => import('./components/pages/GuideDetailPage').then(m => ({ default: m.GuideDetailPage })));

const LoadingSpinner = () => (
  <div className="py-24 flex flex-col items-center justify-center gap-3 text-slate-400">
    <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
    <span className="text-xs font-semibold text-slate-500">Loading calculation engine...</span>
  </div>
);

import { ChevronRight, ArrowLeft } from 'lucide-react';

const VALID_PAGES: PageId[] = [
  'home', 'loan', 'autoloan', 'currency', 'bmi', 'percentage', 'compound', 'salary',
  'privacy', 'terms', 'about', 'contact', 'disclaimer', 'guides'
];

export default function App() {
  // Read initial language from query param, localStorage, or default to English
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang') as Language;
      if (['en', 'es', 'ar', 'hi', 'pt', 'fr', 'de'].includes(urlLang)) {
        return urlLang;
      }
      try {
        const savedLang = localStorage.getItem('user_lang') as Language;
        if (['en', 'es', 'ar', 'hi', 'pt', 'fr', 'de'].includes(savedLang)) {
          return savedLang;
        }
      } catch (e) {}
    }
    return 'en'; // Default English
  });
  
  // Read active guide slug if on /guides/:slug
  const [activeGuideSlug, setActiveGuideSlug] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const rawPath = window.location.pathname.replace(/^\/+|\/+$/g, '');
      if (rawPath.startsWith('guides/')) {
        return rawPath.replace('guides/', '');
      }
    }
    return null;
  });

  // Read initial page from pathname, query param, or hash
  const [currentPage, setCurrentPage] = useState<PageId>(() => {
    if (typeof window !== 'undefined') {
      // 1. Pathname (e.g. /loan)
      const rawPath = window.location.pathname.replace(/^\/+|\/+$/g, '');
      if (rawPath === 'guides' || rawPath.startsWith('guides/')) {
        return 'guides';
      }
      if (VALID_PAGES.includes(rawPath as PageId)) {
        return rawPath as PageId;
      }
      // Handle legacy URL aliases
      if (rawPath === 'autoloan' || rawPath === 'auto-loan' || rawPath === 'car-loan' || rawPath === 'car-payment-calculator') {
        return 'autoloan';
      }
      if (rawPath.includes('mortgage') || rawPath.includes('lease') || rawPath.includes('real-estate')) {
        return 'loan';
      }
      if (rawPath.includes('dividend') || rawPath.includes('stock-profit') || rawPath.includes('investing')) {
        return 'compound';
      }
      if (rawPath === 'overview') {
        return 'about';
      }
      // 2. Query param (e.g. ?calc=loan or ?tool=loan)
      const params = new URLSearchParams(window.location.search);
      const queryPage = (params.get('calc') || params.get('tool') || params.get('p')) as PageId;
      if (VALID_PAGES.includes(queryPage)) {
        return queryPage;
      }
      // 3. Hash fallback (e.g. #loan)
      if (window.location.hash) {
        const hash = window.location.hash.replace('#', '') as PageId;
        if (VALID_PAGES.includes(hash)) {
          return hash;
        }
      }
    }
    return 'home';
  });

  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('theme');
        if (saved) return saved === 'dark';
      } catch (e) {}
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const t = TRANSLATIONS[currentLang];
  const langInfo = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  // Sync RTL, lang attribute, and persist language preference
  useEffect(() => {
    document.documentElement.dir = langInfo.dir;
    document.documentElement.lang = currentLang;
    try {
      localStorage.setItem('user_lang', currentLang);
    } catch (e) {}
  }, [currentLang, langInfo.dir]);

  // Sync Dark theme class and persist preference
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      try {
        localStorage.setItem('theme', 'dark');
      } catch (e) {}
    } else {
      document.documentElement.classList.remove('dark');
      try {
        localStorage.setItem('theme', 'light');
      } catch (e) {}
    }
  }, [isDark]);

  // Listen to browser navigation (back/forward button and hash changes)
  useEffect(() => {
    const handlePopState = () => {
      const rawPath = window.location.pathname.replace(/^\/+|\/+$/g, '');
      if (rawPath === 'guides' || rawPath.startsWith('guides/')) {
        setCurrentPage('guides');
        setActiveGuideSlug(rawPath.startsWith('guides/') ? rawPath.replace('guides/', '') : null);
        return;
      }
      if (VALID_PAGES.includes(rawPath as PageId)) {
        setCurrentPage(rawPath as PageId);
        setActiveGuideSlug(null);
        return;
      }
      if (rawPath === 'autoloan' || rawPath === 'auto-loan' || rawPath === 'car-loan' || rawPath === 'car-payment-calculator') {
        setCurrentPage('autoloan');
        return;
      }
      if (rawPath.includes('mortgage') || rawPath.includes('lease') || rawPath.includes('real-estate')) {
        setCurrentPage('loan');
        return;
      }
      if (rawPath.includes('dividend') || rawPath.includes('stock-profit') || rawPath.includes('investing')) {
        setCurrentPage('compound');
        return;
      }
      if (rawPath === 'overview') {
        setCurrentPage('about');
        return;
      }
      if (window.location.hash) {
        const hash = window.location.hash.replace('#', '') as PageId;
        if (VALID_PAGES.includes(hash)) {
          setCurrentPage(hash);
          return;
        }
      }
      setCurrentPage('home');
      setActiveGuideSlug(null);
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Clean URL routing on navigate
  const handleNavigate = (page: PageId) => {
    if (page === 'guides') {
      setActiveGuideSlug(null);
    }
    setCurrentPage(page);
    const targetUrl = page === 'home' ? '/' : `/${page}`;
    if (window.location.pathname !== targetUrl) {
      window.history.pushState({ page }, '', targetUrl);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dedicated guide selection routing
  const handleSelectGuide = (slug: string) => {
    setActiveGuideSlug(slug);
    setCurrentPage('guides');
    const targetUrl = `/guides/${slug}`;
    if (window.location.pathname !== targetUrl) {
      window.history.pushState({ page: 'guides', slug }, '', targetUrl);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isToolPage = [
    'loan',
    'autoloan',
    'currency',
    'bmi',
    'percentage',
    'compound',
    'salary',
  ].includes(currentPage);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Dynamic SEO Meta & Schema.org JSON-LD */}
      <SEOHead currentLang={currentLang} currentPage={currentPage} />

      {/* Top Header */}
      <Header
        currentLang={currentLang}
        onSelectLang={setCurrentLang}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isDark={isDark}
        onToggleDark={() => setIsDark(!isDark)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Breadcrumb Navigation on Tool Pages */}
        {isToolPage && (
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6 font-medium">
            <button
              onClick={() => handleNavigate('home')}
              className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
              <span>{t.common.backToHome}</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 rtl:rotate-180" />
            <span className="text-slate-900 dark:text-white font-semibold">
              {t.tools[currentPage as ToolId].name}
            </span>
          </div>
        )}

        {/* View Routing */}
        {currentPage === 'home' && (
          <HomePage
            currentLang={currentLang}
            onSelectTool={handleNavigate}
            onSelectLang={setCurrentLang}
            onSelectGuide={handleSelectGuide}
            onNavigate={handleNavigate}
          />
        )}

        {/* Individual Tool Pages */}
        {isToolPage && (
          <Suspense fallback={<LoadingSpinner />}>
            <div className="space-y-8">
              {/* Top Leaderboard Ad */}
              <AdSlot currentLang={currentLang} format="leaderboard" />

              {/* The Active Calculator */}
              {currentPage === 'loan' && <LoanCalculator currentLang={currentLang} />}
              {currentPage === 'autoloan' && <AutoLoanCalculator currentLang={currentLang} />}
              {currentPage === 'currency' && <CurrencyConverter currentLang={currentLang} />}
              {currentPage === 'bmi' && <BMICalculator currentLang={currentLang} />}
              {currentPage === 'percentage' && <PercentageCalculator currentLang={currentLang} />}
              {currentPage === 'compound' && <CompoundInterestCalculator currentLang={currentLang} />}
              {currentPage === 'salary' && <SalaryCalculator currentLang={currentLang} />}

              {/* In-Article Mid Ad Unit */}
              <AdSlot currentLang={currentLang} format="in-article" />

              {/* In-Depth SEO Rich Content */}
              <SEOContentSection seo={t.tools[currentPage as ToolId].seo} />

              {/* Bottom Ad Unit */}
              <AdSlot currentLang={currentLang} format="in-article" />
            </div>
          </Suspense>
        )}

        {/* Educational Guides Section */}
        {currentPage === 'guides' && (
          <Suspense fallback={<LoadingSpinner />}>
            {activeGuideSlug ? (
              <GuideDetailPage
                slug={activeGuideSlug}
                onNavigate={handleNavigate}
                onSelectGuide={handleSelectGuide}
              />
            ) : (
              <GuidesPage
                onSelectGuide={handleSelectGuide}
                onNavigate={handleNavigate}
              />
            )}
          </Suspense>
        )}

        {/* Legal & Trust Pages for AdSense Compliance */}
        {['privacy', 'terms', 'about', 'contact', 'disclaimer'].includes(currentPage) && (
          <Suspense fallback={<LoadingSpinner />}>
            {currentPage === 'privacy' && <PrivacyPolicy currentLang={currentLang} />}
            {currentPage === 'terms' && <TermsOfService currentLang={currentLang} />}
            {currentPage === 'about' && <AboutUs currentLang={currentLang} />}
            {currentPage === 'contact' && <ContactUs currentLang={currentLang} />}
            {currentPage === 'disclaimer' && <Disclaimer currentLang={currentLang} />}
          </Suspense>
        )}
      </main>

      {/* Global Footer */}
      <Footer currentLang={currentLang} onNavigate={handleNavigate} />
    </div>
  );
}
