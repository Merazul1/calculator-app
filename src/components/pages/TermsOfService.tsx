import React from 'react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../translations';
import { FileText, CheckCircle, AlertTriangle } from 'lucide-react';

interface TermsOfServiceProps {
  currentLang: Language;
}

export const TermsOfService: React.FC<TermsOfServiceProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-8 text-slate-700 dark:text-slate-300">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider mb-2">
          <FileText className="w-4 h-4" />
          <span>Legal Agreement</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          {t.legal.termsTitle}
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Effective Date: October 2026
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          1. Acceptance of Terms
        </h2>
        <p className="text-sm leading-relaxed">
          By accessing or using {t.siteName}, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          2. Educational & Estimation Purpose Only
        </h2>
        <p className="text-sm leading-relaxed">
          The calculation algorithms, conversion tables, and simulation tools provided on this site are designed strictly for educational, illustrative, and informational purposes. While we strive to ensure that calculations reflect standard mathematical formulas, we make no warranties or representations regarding accuracy, completeness, or fitness for a particular purpose.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          3. Limitation of Liability
        </h2>
        <p className="text-sm leading-relaxed">
          In no event shall {t.siteName}, its creators, or its affiliates be liable for any direct, indirect, incidental, consequential, or punitive damages arising from the use or inability to use our tools, including financial decisions or medical assumptions made based on our calculated results.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          4. Intellectual Property & Fair Use
        </h2>
        <p className="text-sm leading-relaxed">
          All website design, text, graphics, and interactive interface components are the property of {t.siteName}. You may freely use our calculators for personal and commercial estimations, but automated web scraping or reproduction without permission is strictly prohibited.
        </p>
      </section>
    </div>
  );
};
