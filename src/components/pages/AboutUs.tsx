import React from 'react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../translations';
import { Calculator, Target, Users, Zap, Award, ShieldCheck, CheckCircle2, BookCheck, Sparkles, Building2 } from 'lucide-react';

interface AboutUsProps {
  currentLang: Language;
}

export const AboutUs: React.FC<AboutUsProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-10 text-slate-700 dark:text-slate-300">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 text-center sm:text-left rtl:sm:text-right">
        <div className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider mb-2">
          <Award className="w-4 h-4" />
          <span>About SmartCalcLab &amp; Our Team</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          {t.legal.aboutTitle}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-2xl">
          Empowering everyday people, students, and financial professionals across the globe with instantaneous, verified, and 100% free calculation utilities.
        </p>
      </div>

      {/* Core Value Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl bg-blue-50/60 dark:bg-slate-800/60 border border-blue-100 dark:border-slate-700">
          <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-3" />
          <h3 className="font-bold text-slate-900 dark:text-white mb-2">Instant Client-Side Computation</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            All calculations execute in real-time in your web browser. No server lag, no waiting, and zero sensitive financial data transmitted over the wire.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-indigo-50/60 dark:bg-slate-800/60 border border-indigo-100 dark:border-slate-700">
          <Target className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mb-3" />
          <h3 className="font-bold text-slate-900 dark:text-white mb-2">Verified Formulas</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Every formula is cross-referenced with official standards from the CFPB, Federal Reserve, IRS tax brackets, and World Health Organization guidelines.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-slate-800/60 border border-emerald-100 dark:border-slate-700">
          <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mb-3" />
          <h3 className="font-bold text-slate-900 dark:text-white mb-2">Global &amp; Multilingual</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Available natively in 7 major global languages (English, Spanish, Portuguese, French, German, Arabic, and Hindi) with native RTL support.
          </p>
        </div>
      </div>

      {/* Editorial Methodology & E-E-A-T Standards */}
      <section className="space-y-4 rounded-2xl p-6 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm uppercase tracking-wider">
          <BookCheck className="w-5 h-5" />
          <span>Our Editorial &amp; Verification Methodology</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          How We Ensure 100% Mathematical Precision
        </h2>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          At SmartCalcLab, accuracy and user safety are our highest priorities. Before any calculation engine is deployed publicly, it undergoes a rigorous three-step verification process:
        </p>
        <div className="space-y-3 pt-2 text-sm text-slate-700 dark:text-slate-300">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
            <div>
              <strong className="text-slate-900 dark:text-white">Authoritative Source Benchmarking: </strong>
              Our loan amortization formulas adhere to the standard mathematical definitions codified by the Consumer Financial Protection Bureau (CFPB). Our BMI calculations strictly observe the World Health Organization (WHO) international classification thresholds.
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
            <div>
              <strong className="text-slate-900 dark:text-white">Automated Boundary Testing: </strong>
              Each calculator is accompanied by automated test suites validating edge cases (such as zero down payments, high interest rates, leap years, and extreme weight/height ranges) to prevent calculation anomalies.
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
            <div>
              <strong className="text-slate-900 dark:text-white">Continuous Editorial Review: </strong>
              Our quantitative team reviews formula parameters whenever federal tax rates, central bank baseline policies, or international standards are updated.
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are & Publisher Information */}
      <div className="space-y-4 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Building2 className="w-5 h-5 text-blue-500" />
          Who We Are &amp; Why We Built SmartCalcLab
        </h2>
        <p>
          SmartCalcLab was founded by a team of software engineers, quantitative analysts, and web performance specialists who were frustrated by the state of modern online utilities. Too many calculator sites are bloated with invasive pop-ups, slow server roundtrips, paywalls, and outdated math models.
        </p>
        <p>
          We set out to build a clean, accessible, and transparent digital laboratory where anyone—from a first-time homebuyer comparing 15-year vs. 30-year mortgages, to a car shopper calculating trade-in tax savings, to someone assessing their BMI—can find exact answers without barriers.
        </p>
        <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
          <span className="text-xs text-slate-600 dark:text-slate-300">
            For questions, editorial feedback, or partnership inquiries, reach our team directly at <strong className="text-slate-900 dark:text-white">support@smartcalclab.com</strong> or via our <a href="/contact" className="text-blue-600 dark:text-blue-400 underline font-semibold">Contact Page</a>.
          </span>
        </div>
      </div>
    </div>
  );
};
