import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, HelpCircle, ShieldCheck, ExternalLink, Calculator } from 'lucide-react';

export const CompoundArticle: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does compound interest differ from simple interest?',
      a: 'Simple interest is calculated solely on your original principal deposit. Compound interest is calculated on your initial principal plus all previously accumulated interest. Over multiple compounding cycles, the interest earned begins generating exponential growth.'
    },
    {
      q: 'What is the Rule of 72 and how do I use it?',
      a: 'The Rule of 72 is an accurate mental shortcut to estimate how many years it will take an investment to double at a given fixed annual return: divide 72 by the expected annual rate of return (e.g., at 7% annual return, an investment doubles in approximately 72 ÷ 7 ≈ 10.3 years).'
    },
    {
      q: 'Is an illustrative 7% annual return realistic for long-term planning?',
      a: 'Historically, the US S&P 500 index has delivered an annualized nominal return of approximately 10% (or ~7% after adjusting for historical inflation) over multi-decade horizons. However, annual equity returns fluctuate unpredictably and may experience negative drawdowns.'
    },
    {
      q: 'How much do fund expense ratios and investment fees really cost?',
      a: 'A seemingly modest 1% annual advisory or fund expense ratio reduces a 30-year compounding portfolio balance by nearly 19% (costing over $128,000 on a $500/month contribution strategy). Always prioritize low-cost broad-market index funds.'
    }
  ];

  return (
    <article className="mt-12 space-y-10 text-slate-800 dark:text-slate-200">
      {/* Editorial Byline Header */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span>
              By{' '}
              <a href="/about" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                David Vance
              </a>
              , Senior Financial Modeler
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Financial Standards: <strong>FINRA Benchmarks</strong></span>
            <span>•</span>
            <span>Last Updated: <strong>November 27, 2026</strong></span>
          </div>
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Why time matters far more than the return rate
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            Compound interest represents returns earned on previous returns. During the initial years of saving, compounding 
            appears deceptively slow. Over multi-decade timelines, however, mathematical compounding generates the overwhelming majority 
            of your final net worth. This guide investigates a concrete scenario—a $10,000 initial balance with $500 monthly deposits 
            at an illustrative 7% return—to demonstrate how time, expense ratios, and inflation shape long-term financial security.
          </p>
        </div>
      </section>

      {/* Multi-Decade Compounding Table */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Worked Example: $10,000 Starting Principal + $500/Month at 7%
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Examining the compounding trajectory across 10, 20, 30, and 40 years:
        </p>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700/80">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold border-b border-slate-200 dark:border-slate-700/80">
              <tr>
                <th className="py-3 px-4 sm:px-6">Timeline</th>
                <th className="py-3 px-4 sm:px-6">Your Total Deposits</th>
                <th className="py-3 px-4 sm:px-6">Total Ending Balance</th>
                <th className="py-3 px-4 sm:px-6 text-right">Compound Growth Earned</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-slate-700 dark:text-slate-300">
              <tr>
                <td className="py-3.5 px-4 sm:px-6 font-sans font-semibold">Year 10</td>
                <td className="py-3.5 px-4 sm:px-6">$70,000</td>
                <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900 dark:text-white">$106,639</td>
                <td className="py-3.5 px-4 sm:px-6 text-right text-emerald-600 dark:text-emerald-400 font-bold">$36,639 (34%)</td>
              </tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/50">
                <td className="py-3.5 px-4 sm:px-6 font-sans font-semibold">Year 20</td>
                <td className="py-3.5 px-4 sm:px-6">$130,000</td>
                <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900 dark:text-white">$300,851</td>
                <td className="py-3.5 px-4 sm:px-6 text-right text-emerald-600 dark:text-emerald-400 font-bold">$170,851 (57%)</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 sm:px-6 font-sans font-semibold">Year 30</td>
                <td className="py-3.5 px-4 sm:px-6">$190,000</td>
                <td className="py-3.5 px-4 sm:px-6 font-bold text-slate-900 dark:text-white">$691,150</td>
                <td className="py-3.5 px-4 sm:px-6 text-right text-emerald-600 dark:text-emerald-400 font-extrabold">$501,150 (73%)</td>
              </tr>
              <tr className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200">
                <td className="py-4 px-4 sm:px-6 font-sans font-bold">Year 40</td>
                <td className="py-4 px-4 sm:px-6 font-bold">$250,000</td>
                <td className="py-4 px-4 sm:px-6 font-extrabold text-base text-emerald-700 dark:text-emerald-300">$1,475,521</td>
                <td className="py-4 px-4 sm:px-6 text-right font-extrabold text-base text-emerald-700 dark:text-emerald-300">$1,225,521 (83%)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          At Year 10, accumulated growth represents about half of your personal savings. By Year 30, interest growth accounts 
          for nearly <strong>73%</strong> of the total $691,150 portfolio. In the final decade (Years 30 to 40), the portfolio expands 
          by an astounding <strong>$784,371</strong>—more wealth created in those final 10 years than in the preceding 30 years combined.
        </p>
      </section>

      {/* The 10-Year Delay Cost */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          The $562,000 Cost of Waiting 10 Years
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Consider two disciplined investors, each committing $400 monthly at a 7% annualized return until age 65:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
          <li><strong>Investor A (Starts at Age 25, 40 years):</strong> Contributes a lifetime total of $192,000. Retires with approximately <strong>$1,049,900</strong>.</li>
          <li><strong>Investor B (Starts at Age 35, 30 years):</strong> Contributes $144,000. Retires with approximately <strong>$488,000</strong>.</li>
        </ul>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Investor A invested only $48,000 more in principal out-of-pocket, but ended up with over <strong>$561,900 more in retirement wealth</strong>. 
          That extra decade of compounding was worth more than ten times the extra principal invested.
        </p>
      </section>

      {/* The Drag of 1% Fees & Inflation */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
            The Devastating Drag of a 1% Investment Fee
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Financial institutions frequently describe a 1% asset management fee or mutual fund expense ratio as &ldquo;nominal.&rdquo; 
            In reality, taking our 30-year scenario and reducing net returns from 7% to 6% reduces the final portfolio from 
            <strong>$691,150 to $562,483</strong>. That single percentage point quietly confiscates <strong>$128,667</strong>—nearly 
            one-fifth of your entire nest egg.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-400">
          <strong className="block font-semibold text-slate-900 dark:text-white mb-1">Inflation-Adjusted Purchasing Power:</strong>
          Assuming an average annual inflation rate of 3%, a nominal 7% portfolio equates to a 4% real return. After 30 years, 
          $691,150 in nominal cash delivers approximately $380,200 in today&apos;s purchasing power. Always calculate retirement milestones with real dollars.
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <HelpCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions: Compound Interest
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left p-4 sm:p-5 font-semibold text-slate-900 dark:text-white flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <span className="text-base sm:text-lg">{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                )}
              </button>
              {openFaq === idx && (
                <div className="p-4 sm:p-5 pt-0 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Methodology & Citations */}
      <section className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 space-y-6 text-sm text-slate-600 dark:text-slate-400">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Compound Interest Methodology &amp; Sources
          </h2>
          <p className="leading-relaxed">
            Computations apply standard annuity future value equations with end-of-period monthly deposits and compounding frequencies. 
            For independent financial literacy guides, visit the US Securities and Exchange Commission&apos;s{' '}
            <a
              href="https://www.investor.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 underline font-medium inline-flex items-center gap-1"
            >
              Investor.gov Educational Portal <ExternalLink className="w-3.5 h-3.5" />
            </a>. Corrections: <a href="mailto:support@smartcalclab.com" className="underline">support@smartcalclab.com</a>.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex flex-wrap gap-4">
          <a
            href="/loan"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium hover:border-indigo-500 transition-colors"
          >
            <Calculator className="w-4 h-4 text-indigo-600" />
            <span>Mortgage &amp; Loan Payoff Calculator</span>
          </a>
          <a
            href="/salary"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium hover:border-indigo-500 transition-colors"
          >
            <Calculator className="w-4 h-4 text-emerald-600" />
            <span>Salary &amp; 401(k) Take-Home Calculator</span>
          </a>
        </div>
      </section>
    </article>
  );
};
