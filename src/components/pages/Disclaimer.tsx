import React from 'react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../translations';
import { AlertTriangle, ShieldAlert, HeartPulse, DollarSign } from 'lucide-react';

interface DisclaimerProps {
  currentLang: Language;
}

export const Disclaimer: React.FC<DisclaimerProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-8 text-slate-700 dark:text-slate-300">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-amber-500 font-bold text-xs uppercase tracking-wider mb-2">
          <AlertTriangle className="w-4 h-4" />
          <span>Legal Disclaimer</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          {t.legal.disclaimerTitle}
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Last revised: October 2026
        </p>
      </div>

      {/* Financial Disclaimer */}
      <section className="p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 space-y-2">
        <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-base">
          <DollarSign className="w-5 h-5" />
          <span>Financial, Investment & Loan Disclaimer</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The Mortgage Loan Calculator, Auto Loan Calculator, Currency Converter, Compound Interest Calculator, Percentage Calculator, and Salary Calculator provided on this website are intended solely for simulation, demonstration, and general educational purposes. 
          They do not constitute financial advice, tax planning, or loan commitment. Actual loan APRs, taxes, and bank exchange rates depend on individual credit scores, government regulations, and banking institutions.
          Always consult with a qualified financial advisor, CPA, or certified loan officer before signing lending contracts or committing investment capital.
        </p>
      </section>

      {/* Health / Medical Disclaimer */}
      <section className="p-5 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-2">
        <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-base">
          <HeartPulse className="w-5 h-5" />
          <span>Health & Medical Information Disclaimer</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          The Body Mass Index (BMI) Calculator is a statistical screening measure based on World Health Organization standards and does not constitute a personal medical diagnosis or personalized dietary prescription. 
          BMI does not directly measure body fat percentage, bone density, or muscle mass distribution. Never disregard professional medical advice or delay seeking it because of information calculated on this website.
        </p>
      </section>

      {/* Accuracy & No Guarantee */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          No Guarantee of Results
        </h2>
        <p className="text-sm leading-relaxed">
          While every reasonable effort is made to maintain the algorithms and mathematical formulas with the utmost precision, {t.siteName} does not warrant or guarantee that the calculations are error-free or completely up to date with the latest tax codes or banking regulations.
        </p>
      </section>
    </div>
  );
};
