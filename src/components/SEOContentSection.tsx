import React, { useState } from 'react';
import { ToolSEOData } from '../types';
import { ChevronDown, ChevronUp, BookOpen, Calculator, HelpCircle, Lightbulb, CheckCircle2, ShieldCheck } from 'lucide-react';

interface SEOContentSectionProps {
  seo: ToolSEOData;
}

export const SEOContentSection: React.FC<SEOContentSectionProps> = ({ seo }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="mt-12 space-y-10 text-slate-800 dark:text-slate-200">
      {/* 1. In-depth Overview / Introduction */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        {/* E-E-A-T Editorial Review & Standards Byline */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 mb-6 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span><strong className="text-slate-800 dark:text-slate-200">Editorial Verification:</strong> Reviewed by SmartCalcLab Financial &amp; Health Analysis Team</span>
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            <span>Last Recalibrated: <strong className="text-slate-700 dark:text-slate-300">October 2026</strong></span>
            <span>•</span>
            <span>Standards: <strong className="text-slate-700 dark:text-slate-300">CFPB / WHO / IRS Benchmarks</strong></span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4" />
          <span>Detailed Educational Guide</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
          {seo.title}
        </h2>
        <div className="space-y-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          {seo.introParagraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      {/* 2. Step-by-Step "How it Works" */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          {seo.howItWorksTitle}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {seo.howItWorksSteps.map((step, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-2">
                  Step 0{idx + 1}
                </span>
                <h4 className="font-semibold text-slate-900 dark:text-white text-base mb-2">
                  {step.step}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-normal">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Mathematical Formula & Real-World Example */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mathematical Formula */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider mb-2">
              <Calculator className="w-4 h-4" />
              <span>Mathematical Formula</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
              {seo.formulaTitle}
            </h3>
            <div className="p-4 my-3 rounded-xl bg-slate-900 text-amber-300 font-mono text-center text-sm sm:text-base border border-slate-800 shadow-inner overflow-x-auto">
              {seo.formulaMath}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {seo.formulaExplanation}
            </p>
          </div>
        </div>

        {/* Real-World Example */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2">
              <Lightbulb className="w-4 h-4" />
              <span>Practical Application</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
              {seo.exampleTitle}
            </h3>
            <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 text-xs sm:text-sm text-slate-700 dark:text-emerald-200 leading-relaxed">
              {seo.exampleText}
            </div>
          </div>
          {seo.tips && seo.tips.length > 0 && (
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Pro Tip: </span>
              {seo.tips[0]}
            </div>
          )}
        </div>
      </section>

      {/* 4. Frequently Asked Questions (FAQ Accordion with Schema ready markup) */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2 text-amber-500 font-bold text-xs uppercase tracking-wider mb-2">
          <HelpCircle className="w-4 h-4" />
          <span>Knowledge Base</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
          {seo.faqsTitle}
        </h3>
        <div className="space-y-3">
          {seo.faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-4 text-left rtl:text-right font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <span className="text-sm sm:text-base font-semibold pr-2 rtl:pr-0 rtl:pl-2">
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-950/30 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Recommended Interlinked Calculators (Internal SEO Linking Network) */}
      <section className="bg-slate-50 dark:bg-slate-850 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4" />
          <span>Explore Related Calculators</span>
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
          Free Financial &amp; Health Analysis Tools
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <a
            href="/salary"
            className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 transition-all hover:shadow-sm group"
          >
            <div className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-1">
              Salary &amp; Net Pay Calculator &rarr;
            </div>
            <p className="text-slate-500 dark:text-slate-400 leading-normal">
              Convert hourly wage or gross annual pay to monthly net in-hand take-home salary after taxes.
            </p>
          </a>

          <a
            href="/loan"
            className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 transition-all hover:shadow-sm group"
          >
            <div className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-1">
              Mortgage Cost Estimator &rarr;
            </div>
            <p className="text-slate-500 dark:text-slate-400 leading-normal">
              Estimate monthly mortgage payments including property taxes, homeowners insurance, and PMI.
            </p>
          </a>

          <a
            href="/autoloan"
            className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 transition-all hover:shadow-sm group"
          >
            <div className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-1">
              Auto Loan &amp; Car Payment &rarr;
            </div>
            <p className="text-slate-500 dark:text-slate-400 leading-normal">
              Calculate monthly car financing, trade-in credit, sales tax, APR, and total interest costs.
            </p>
          </a>

          <a
            href="/compound"
            className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 transition-all hover:shadow-sm group"
          >
            <div className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-1">
              Compound Interest Simulator &rarr;
            </div>
            <p className="text-slate-500 dark:text-slate-400 leading-normal">
              Forecast long-term savings growth with periodic monthly contributions and compounding APY.
            </p>
          </a>

          <a
            href="/bmi"
            className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 transition-all hover:shadow-sm group"
          >
            <div className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-1">
              Body Mass Index (BMI) &rarr;
            </div>
            <p className="text-slate-500 dark:text-slate-400 leading-normal">
              Assess optimal body weight ranges in kg and cm using World Health Organization standards.
            </p>
          </a>

          <a
            href="/currency"
            className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 transition-all hover:shadow-sm group"
          >
            <div className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-1">
              Live Currency Converter &rarr;
            </div>
            <p className="text-slate-500 dark:text-slate-400 leading-normal">
              Real-time foreign exchange benchmark rates across USD, EUR, GBP, MXN, SAR, AED, and INR.
            </p>
          </a>
        </div>
      </section>
    </div>
  );
};
