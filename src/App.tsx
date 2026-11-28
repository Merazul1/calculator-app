import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Language, PageId, ToolId } from './types';
import { LANGUAGES, TRANSLATIONS } from './translations';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { AdSlot } from './components/AdSlot';
import { SEOContentSection } from './components/SEOContentSection';
import { SEOHead } from './components/SEOHead';
import { parseRoute, buildPath } from './lib/routes';

// Lazy-loaded Calculator components for fast initial load
const LoanCalculator = lazy(() => import('./components/calculators/LoanCalculator').then(m => ({ default: m.LoanCalculator })));
const LoanArticle = lazy(() => import('./components/calculators/LoanArticle').then(m => ({ default: m.LoanArticle })));
const SalaryArticle = lazy(() => import('./components/calculators/SalaryArticle').then(m => ({ default: m.SalaryArticle })));
const AutoLoanCalculator = lazy(() => import('./components/calculators/AutoLoanCalculator').then(m => ({ default: m.AutoLoanCalculator })));
const AutoLoanArticle = lazy(() => import('./components/calculators/AutoLoanArticle').then(m => ({ default: m.AutoLoanArticle })));
const CurrencyConverter = lazy(() => import('./components/calculators/CurrencyConverter').then(m => ({ default: m.CurrencyConverter })));
const CurrencyArticle = lazy(() => import('./components/calculators/CurrencyArticle').then(m => ({ default: m.CurrencyArticle })));
const BMICalculator = lazy(() => import('./components/calculators/BMICalculator').then(m => ({ default: m.BMICalculator })));
const BMIArticle = lazy(() => import('./components/calculators/BMIArticle').then(m => ({ default: m.BMIArticle })));
const PercentageCalculator = lazy(() => import('./components/calculators/PercentageCalculator').then(m => ({ default: m.PercentageCalculator })));
const PercentageArticle = lazy(() => import('./components/calculators/PercentageArticle').then(m => ({ default: m.PercentageArticle })));
const CompoundInterestCalculator = lazy(() => import('./components/calculators/CompoundInterestCalculator').then(m => ({ default: m.CompoundInterestCalculator })));
const CompoundArticle = lazy(() => import('./components/calculators/CompoundArticle').then(m => ({ default: m.CompoundArticle })));
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

export default function App() {
  // URL is the source of truth: /es/loan -> Spanish, /loan -> English
  const [initial] = useState(() =>
    typeof window === 'undefined'
      ? { lang: 'en' as Language, page: 'home' as PageId, guideSlug: null as string | null }
      : parseRoute(window.location.pathname, window.location.search, window.location.hash)
  );
  const [currentLang, setCurrentLang] = useState<Language>(initial.lang);
  const [activeGuideSlug, setActiveGuideSlug] = useState<string | null>(initial.guideSlug);
  const [currentPage, setCurrentPage] = useState<PageId>(initial.page);

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
      const r = parseRoute(window.location.pathname, window.location.search, window.location.hash);
      setCurrentLang(r.lang);
      setCurrentPage(r.page);
      setActiveGuideSlug(r.guideSlug);
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Strip legacy ?lang=xx from the address bar, keep other params (utm etc.)
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (!p.has('lang')) return;
    p.delete('lang');
    const qs = p.toString();
    window.history.replaceState(null, '', buildPath(currentLang, currentPage, activeGuideSlug) + (qs ? `?${qs}` : ''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pushIfNew = (url: string, state: object) => {
    if (window.location.pathname + window.location.search !== url) {
      window.history.pushState(state, '', url);
    }
  };

  // Clean URL routing on navigate (keeps the current language prefix)
  const handleNavigate = (page: PageId) => {
    if (page === 'guides') setActiveGuideSlug(null);
    setCurrentPage(page);
    pushIfNew(buildPath(currentLang, page), { page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dedicated guide selection routing
  const handleSelectGuide = (slug: string) => {
    setActiveGuideSlug(slug);
    setCurrentPage('guides');
    pushIfNew(buildPath('en', 'guides', slug), { page: 'guides', slug });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Language switch updates the URL: /loan <-> /es/loan
  const handleSelectLang = (lang: Language) => {
    setCurrentLang(lang);
    pushIfNew(buildPath(lang, currentPage, activeGuideSlug), { page: currentPage, lang });
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
      <SEOHead currentLang={currentLang} currentPage={currentPage} guideSlug={activeGuideSlug} />

      {/* Top Header */}
      <Header
        currentLang={currentLang}
        onSelectLang={handleSelectLang}
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
            onSelectLang={handleSelectLang}
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
              {currentPage === 'loan' && <LoanArticle />}
              {currentPage === 'salary' && <SalaryArticle />}
              {currentPage === 'autoloan' && <AutoLoanArticle />}
              {currentPage === 'currency' && <CurrencyArticle />}
              {currentPage === 'bmi' && <BMIArticle />}
              {currentPage === 'compound' && <CompoundArticle />}
              {currentPage === 'percentage' && <PercentageArticle />}
              {!['loan', 'salary', 'autoloan', 'currency', 'bmi', 'compound', 'percentage'].includes(currentPage) && (
                <SEOContentSection seo={t.tools[currentPage as ToolId].seo} />
              )}

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
