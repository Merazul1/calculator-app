import React, { useState, useEffect } from 'react';
import { Language, PageId, ToolId } from './types';
import { LANGUAGES, TRANSLATIONS } from './translations';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { AdSlot } from './components/AdSlot';
import { SEOContentSection } from './components/SEOContentSection';
import { SEOHead } from './components/SEOHead';

// Calculator components
import { LoanCalculator } from './components/calculators/LoanCalculator';
import { CurrencyConverter } from './components/calculators/CurrencyConverter';
import { BMICalculator } from './components/calculators/BMICalculator';
import { PercentageCalculator } from './components/calculators/PercentageCalculator';
import { CompoundInterestCalculator } from './components/calculators/CompoundInterestCalculator';
import { SalaryCalculator } from './components/calculators/SalaryCalculator';

// Legal & trust pages
import { PrivacyPolicy } from './components/pages/PrivacyPolicy';
import { TermsOfService } from './components/pages/TermsOfService';
import { AboutUs } from './components/pages/AboutUs';
import { ContactUs } from './components/pages/ContactUs';
import { Disclaimer } from './components/pages/Disclaimer';

import { ChevronRight, ArrowLeft } from 'lucide-react';

const VALID_PAGES: PageId[] = [
  'home', 'loan', 'currency', 'bmi', 'percentage', 'compound', 'salary',
  'privacy', 'terms', 'about', 'contact', 'disclaimer'
];

export default function App() {
  // Read initial language from query param or default to Spanish
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang') as Language;
      if (['en', 'es', 'ar', 'hi'].includes(urlLang)) {
        return urlLang;
      }
    }
    return 'es'; // Default Spanish
  });
  
  // Read initial page from pathname, query param, or hash
  const [currentPage, setCurrentPage] = useState<PageId>(() => {
    if (typeof window !== 'undefined') {
      // 1. Pathname (e.g. /loan)
      const path = window.location.pathname.replace(/^\/+|\/+$/g, '') as PageId;
      if (VALID_PAGES.includes(path)) {
        return path;
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
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const t = TRANSLATIONS[currentLang];
  const langInfo = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  // Sync RTL and lang attribute
  useEffect(() => {
    document.documentElement.dir = langInfo.dir;
    document.documentElement.lang = currentLang;
  }, [currentLang, langInfo.dir]);

  // Sync Dark theme class
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Listen to browser navigation (back/forward button and hash changes)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\/+|\/+$/g, '') as PageId;
      if (VALID_PAGES.includes(path)) {
        setCurrentPage(path);
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
    setCurrentPage(page);
    const targetUrl = page === 'home' ? '/' : `/${page}`;
    if (window.location.pathname !== targetUrl) {
      window.history.pushState({ page }, '', targetUrl);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isToolPage = [
    'loan',
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
          />
        )}

        {/* Individual Tool Pages */}
        {isToolPage && (
          <div className="space-y-8">
            {/* Top Leaderboard Ad */}
            <AdSlot currentLang={currentLang} format="leaderboard" />

            {/* The Active Calculator */}
            {currentPage === 'loan' && <LoanCalculator currentLang={currentLang} />}
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
        )}

        {/* Legal & Trust Pages for AdSense Compliance */}
        {currentPage === 'privacy' && <PrivacyPolicy currentLang={currentLang} />}
        {currentPage === 'terms' && <TermsOfService currentLang={currentLang} />}
        {currentPage === 'about' && <AboutUs currentLang={currentLang} />}
        {currentPage === 'contact' && <ContactUs currentLang={currentLang} />}
        {currentPage === 'disclaimer' && <Disclaimer currentLang={currentLang} />}
      </main>

      {/* Global Footer */}
      <Footer currentLang={currentLang} onNavigate={handleNavigate} />
    </div>
  );
}
