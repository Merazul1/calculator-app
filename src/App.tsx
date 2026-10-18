import React, { useState, useEffect } from 'react';
import { Language, PageId, ToolId } from './types';
import { LANGUAGES, TRANSLATIONS } from './translations';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { AdSlot } from './components/AdSlot';
import { SEOContentSection } from './components/SEOContentSection';

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

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('es'); // Default to Spanish as requested
  const [currentPage, setCurrentPage] = useState<PageId>('home');
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

  // Update dynamic page title
  useEffect(() => {
    if (currentPage === 'home') {
      document.title = `${t.siteName} - ${t.tagline}`;
    } else if (
      currentPage === 'loan' ||
      currentPage === 'currency' ||
      currentPage === 'bmi' ||
      currentPage === 'percentage' ||
      currentPage === 'compound' ||
      currentPage === 'salary'
    ) {
      document.title = `${t.tools[currentPage].seo.title} | ${t.siteName}`;
    } else if (currentPage === 'privacy') {
      document.title = `${t.legal.privacyTitle} | ${t.siteName}`;
    } else if (currentPage === 'terms') {
      document.title = `${t.legal.termsTitle} | ${t.siteName}`;
    } else if (currentPage === 'about') {
      document.title = `${t.legal.aboutTitle} | ${t.siteName}`;
    } else if (currentPage === 'contact') {
      document.title = `${t.legal.contactTitle} | ${t.siteName}`;
    } else if (currentPage === 'disclaimer') {
      document.title = `${t.legal.disclaimerTitle} | ${t.siteName}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, currentLang, t]);

  const handleSelectTool = (id: ToolId) => {
    setCurrentPage(id);
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
      {/* Top Header */}
      <Header
        currentLang={currentLang}
        onSelectLang={setCurrentLang}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        isDark={isDark}
        onToggleDark={() => setIsDark(!isDark)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Breadcrumb Navigation on Tool Pages */}
        {isToolPage && (
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6 font-medium">
            <button
              onClick={() => setCurrentPage('home')}
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
            onSelectTool={handleSelectTool}
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

            {/* In-Depth SEO Rich Content (Step #2 in Instagram Reel) */}
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
      <Footer currentLang={currentLang} onNavigate={setCurrentPage} />
    </div>
  );
}
