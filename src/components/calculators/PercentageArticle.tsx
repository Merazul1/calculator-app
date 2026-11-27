import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, HelpCircle, ShieldCheck, Calculator } from 'lucide-react';

export const PercentageArticle: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How do I calculate a percentage increase or decrease between two numbers?',
      a: 'Subtract the original (old) value from the new value, divide the result by the original value, and multiply by 100: Percent Change = [(New − Old) ÷ Old] × 100. For example, if rent increases from $1,200 to $1,320, the increase is [(1,320 − 1,200) ÷ 1,200] × 100 = +10%.'
    },
    {
      q: 'How do I determine the original pre-discount price from a sale price?',
      a: 'Divide the final discounted price by the remaining paid percentage fraction. If a coat costs $120 after a 20% discount, divide $120 by 0.80 (100% − 20% = 80%) to find the original price of $150.'
    },
    {
      q: 'Why do two consecutive 25% discounts not equal a 50% discount?',
      a: 'Discounts apply sequentially. The first 25% discount leaves 75% of the original price. The second 25% discount takes 25% off that already-reduced 75%, leaving 56.25% (0.75 × 0.75 = 0.5625). The actual combined discount is 43.75%, not 50%.'
    },
    {
      q: 'What is the mathematical difference between percent and percentage points?',
      a: 'A percentage point is the simple arithmetic difference between two percentage figures, whereas percent change is the relative rate of change. If an interest rate climbs from 5% to 6%, it has increased by 1 percentage point, but by 20 percent relative to the original rate.'
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
              , Senior Financial Modeler &amp; SmartCalcLab Quantitative Board
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Mathematical Standards: <strong>ISO / ASTM</strong></span>
            <span>•</span>
            <span>Last Updated: <strong>November 27, 2026</strong></span>
          </div>
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            The three core questions behind every percentage problem
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            Nearly all real-world percentage questions reduce to one of three operations: finding X% of Y, computing what percentage 
            number A is of B, or calculating relative percentage increase or decrease. Our interactive tool computes all three instantaneously. 
            The frequent challenge is recognizing which mathematical question you are asking and avoiding common cognitive traps.
          </p>
        </div>
      </section>

      {/* Core Formulas & Traps */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Three Cognitive Traps in Daily Percentage Calculations
        </h2>

        <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">Trap 1: Up 50%, Down 50% Does Not Return to Baseline</h3>
            <p className="text-sm">A stock trading at $100 climbs 50% to $150. A subsequent 50% drop from $150 subtracts $75, leaving the price at $75—a net loss of 25%. A 50% drop always requires a 100% gain just to break even, because percentage changes are calculated against differing denominators.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">Trap 2: Stacked Store Discounts Do Not Add Arithmetically</h3>
            <p className="text-sm">A retailer advertising &ldquo;30% off, plus an extra 20% off at checkout&rdquo; is not offering a 50% discount. The second discount applies to the discounted subtotal: 1.00 × 0.70 × 0.80 = 0.56, delivering an actual <strong>44% total discount</strong>.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">Trap 3: Margin vs Markup Confusion</h3>
            <p className="text-sm">If you purchase a product for $80 and sell it for $100, your gross profit is $20. <strong>Markup</strong> is profit divided by cost: $20 ÷ $80 = <strong>25%</strong>. <strong>Gross Margin</strong> is profit divided by revenue: $20 ÷ $100 = <strong>20%</strong>. Both numbers describe the same transaction, but conflating them in financial modeling leads to serious pricing errors.</p>
          </div>
        </div>
      </section>

      {/* GST and VAT Extraction Table */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          GST, VAT &amp; Sales Tax: Adding vs Extracting Tax
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Adding an 18% GST or VAT to a $1,000 invoice is simple: $1,000 × 1.18 = $1,180. The common error occurs when extracting tax from a gross receipt:
        </p>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700/80">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold border-b border-slate-200 dark:border-slate-700/80">
              <tr>
                <th className="py-3 px-4 sm:px-6">Objective</th>
                <th className="py-3 px-4 sm:px-6">Correct Arithmetic Operation</th>
                <th className="py-3 px-4 sm:px-6 text-right">Pre-Tax Base</th>
                <th className="py-3 px-4 sm:px-6 text-right">Tax Component</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-slate-700 dark:text-slate-300">
              <tr>
                <td className="py-3.5 px-4 sm:px-6 font-sans font-medium text-slate-900 dark:text-white">Add 18% GST to $1,000</td>
                <td className="py-3.5 px-4 sm:px-6 font-sans text-slate-500">$1,000 × 1.18</td>
                <td className="py-3.5 px-4 sm:px-6 text-right">$1,000.00</td>
                <td className="py-3.5 px-4 sm:px-6 text-right font-bold text-emerald-600">+$180.00</td>
              </tr>
              <tr className="bg-emerald-50/60 dark:bg-emerald-950/30">
                <td className="py-3.5 px-4 sm:px-6 font-sans font-bold text-emerald-800 dark:text-emerald-300">Extract 18% Tax from $1,180 Gross</td>
                <td className="py-3.5 px-4 sm:px-6 font-sans text-emerald-700 dark:text-emerald-400 font-semibold">$1,180 ÷ 1.18</td>
                <td className="py-3.5 px-4 sm:px-6 text-right font-bold text-emerald-700">$1,000.00</td>
                <td className="py-3.5 px-4 sm:px-6 text-right font-bold text-emerald-700">$180.00</td>
              </tr>
              <tr className="bg-rose-50/50 dark:bg-rose-950/20 text-rose-900 dark:text-rose-200">
                <td className="py-3.5 px-4 sm:px-6 font-sans font-medium">Common Error: Subtracting 18%</td>
                <td className="py-3.5 px-4 sm:px-6 font-sans text-rose-600 dark:text-rose-400">$1,180 − ($1,180 × 0.18)</td>
                <td className="py-3.5 px-4 sm:px-6 text-right font-bold text-rose-600">$967.60 (WRONG)</td>
                <td className="py-3.5 px-4 sm:px-6 text-right font-bold text-rose-600">$212.40 (OVERCHARGED)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <HelpCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions: Percentages &amp; Fractions
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
            Mathematical Precision &amp; Verification
          </h2>
          <p className="leading-relaxed">
            All arithmetic models conform to standard algebraic definitions. Figures are rounded to two decimal places. 
            For inquiries or corrections, contact <a href="mailto:support@smartcalclab.com" className="underline">support@smartcalclab.com</a>.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex flex-wrap gap-4">
          <a
            href="/salary"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium hover:border-indigo-500 transition-colors"
          >
            <Calculator className="w-4 h-4 text-indigo-600" />
            <span>Salary &amp; Percentage Raise Calculator</span>
          </a>
          <a
            href="/compound"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium hover:border-indigo-500 transition-colors"
          >
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>Compound Interest Calculator</span>
          </a>
        </div>
      </section>
    </article>
  );
};
