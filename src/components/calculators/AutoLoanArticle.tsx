import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, HelpCircle, ShieldCheck, ExternalLink, Calculator } from 'lucide-react';

export const AutoLoanArticle: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How is a monthly car payment calculated?',
      a: 'It uses the standard amortization formula: Payment = P × [r(1+r)^n] ÷ [(1+r)^n − 1], where P is the total amount financed, r is the monthly interest rate (APR ÷ 12), and n is the total number of monthly payments.'
    },
    {
      q: 'Does a trade-in reduce auto sales tax?',
      a: 'In many US states, yes—sales tax is assessed only on the net purchase price after deducting the trade-in vehicle allowance. However, some states (such as California, District of Columbia, and Virginia) tax the full vehicle price without trade-in credit.'
    },
    {
      q: 'Is it better to choose a longer loan term for a lower payment?',
      a: 'A longer loan term lowers your mandatory monthly outlay, but significantly increases your total interest paid and extends the time your vehicle suffers from negative equity (&ldquo;underwater&rdquo;). We recommend selecting the shortest loan term that comfortably fits your budget.'
    },
    {
      q: 'What is considered a good auto loan APR?',
      a: 'Prime and super-prime borrowers (credit score 720+) typically secure APRs between 5% and 7% on new vehicles, whereas used cars and lower credit tiers range from 9% to 18%+. Always seek pre-approval from credit unions or local banks before visiting a dealership.'
    }
  ];

  return (
    <article className="mt-12 space-y-10 text-slate-800 dark:text-slate-200">
      {/* Editorial Byline Header */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span>
              By{' '}
              <a href="/about" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                Marcus Thorne
              </a>
              , Consumer Credit &amp; Auto Lending Specialist
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Market Standards: <strong>2026</strong></span>
            <span>•</span>
            <span>Last Updated: <strong>November 27, 2026</strong></span>
          </div>
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            The sticker price is not the amount you borrow
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            Dealership salespeople almost invariably steer negotiation toward &ldquo;what monthly payment fits your budget?&rdquo; 
            That framing obscures the three variables that truly dictate vehicle costs: the out-the-door financed amount, the APR, 
            and the repayment term. This calculator illuminates all three. Below, we break down how financing math works on a real purchase.
          </p>
        </div>
      </section>

      {/* Worked Example Table */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Worked Example: A $35,000 Vehicle with Trade-in &amp; Down Payment
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Suppose you negotiate a $35,000 vehicle. You provide an $8,000 trade-in vehicle, put down $3,000 in cash, and your local sales tax is 7%. 
          In jurisdictions granting trade-in tax credits:
        </p>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700/80">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-850 text-slate-900 dark:text-white font-semibold border-b border-slate-200 dark:border-slate-700/80">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Transaction Item</th>
                <th className="py-3.5 px-4 sm:px-6">Financial Impact</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Running Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-slate-700 dark:text-slate-300">
              <tr>
                <td className="py-3.5 px-4 sm:px-6 font-sans font-medium text-slate-900 dark:text-white">Agreed Vehicle Price</td>
                <td className="py-3.5 px-4 sm:px-6 font-sans text-slate-500">Negotiated purchase price</td>
                <td className="py-3.5 px-4 sm:px-6 text-right font-bold text-slate-900 dark:text-white">$35,000.00</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 sm:px-6 font-sans font-medium">Trade-In Allowance</td>
                <td className="py-3.5 px-4 sm:px-6 font-sans text-slate-500">Credited against purchase price</td>
                <td className="py-3.5 px-4 sm:px-6 text-right text-emerald-600 dark:text-emerald-400">−$8,000.00</td>
              </tr>
              <tr className="bg-slate-50/50 dark:bg-slate-850/50">
                <td className="py-3.5 px-4 sm:px-6 font-sans font-semibold">Taxable Purchase Base</td>
                <td className="py-3.5 px-4 sm:px-6 font-sans text-slate-500">$35,000 − $8,000</td>
                <td className="py-3.5 px-4 sm:px-6 text-right font-bold">$27,000.00</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 sm:px-6 font-sans font-medium">State/Local Sales Tax (7%)</td>
                <td className="py-3.5 px-4 sm:px-6 font-sans text-slate-500">7% assessed on $27,000 taxable base</td>
                <td className="py-3.5 px-4 sm:px-6 text-right text-rose-600 dark:text-rose-400">+$1,890.00</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 sm:px-6 font-sans font-medium">Cash Down Payment</td>
                <td className="py-3.5 px-4 sm:px-6 font-sans text-slate-500">Customer cash contribution</td>
                <td className="py-3.5 px-4 sm:px-6 text-right text-emerald-600 dark:text-emerald-400">−$3,000.00</td>
              </tr>
              <tr className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 font-bold">
                <td className="py-4 px-4 sm:px-6 font-sans">Net Principal Financed</td>
                <td className="py-4 px-4 sm:px-6 font-sans text-indigo-700 dark:text-indigo-300">Amount borrowed from auto lender</td>
                <td className="py-4 px-4 sm:px-6 text-right text-base font-extrabold text-indigo-700 dark:text-indigo-300">$25,890.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Term Comparison Table */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          How Loan Duration Drastically Alters Total Financing Cost
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Financing our $25,890 principal balance at an illustrative 7.5% APR across standard terms:
        </p>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700/80">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-850 text-slate-900 dark:text-white font-semibold border-b border-slate-200 dark:border-slate-700/80">
              <tr>
                <th className="py-3 px-4 sm:px-6">Term Length</th>
                <th className="py-3 px-4 sm:px-6">Monthly Payment</th>
                <th className="py-3 px-4 sm:px-6">Total Interest Paid</th>
                <th className="py-3 px-4 sm:px-6 text-right">Lifetime Total Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-slate-700 dark:text-slate-300">
              <tr>
                <td className="py-3 px-4 sm:px-6 font-sans font-semibold">48 Months (4 Years)</td>
                <td className="py-3 px-4 sm:px-6 font-bold text-slate-900 dark:text-white">$625.99</td>
                <td className="py-3 px-4 sm:px-6 text-emerald-600 dark:text-emerald-400 font-bold">$4,158</td>
                <td className="py-3 px-4 sm:px-6 text-right">$30,048</td>
              </tr>
              <tr className="bg-slate-50/50 dark:bg-slate-850/50">
                <td className="py-3 px-4 sm:px-6 font-sans font-semibold">60 Months (5 Years)</td>
                <td className="py-3 px-4 sm:px-6 font-bold text-slate-900 dark:text-white">$518.78</td>
                <td className="py-3 px-4 sm:px-6 text-slate-700 dark:text-slate-300 font-semibold">$5,237</td>
                <td className="py-3 px-4 sm:px-6 text-right">$31,127</td>
              </tr>
              <tr>
                <td className="py-3 px-4 sm:px-6 font-sans font-semibold">72 Months (6 Years)</td>
                <td className="py-3 px-4 sm:px-6 font-bold text-slate-900 dark:text-white">$447.64</td>
                <td className="py-3 px-4 sm:px-6 text-amber-600 dark:text-amber-400 font-semibold">$6,340</td>
                <td className="py-3 px-4 sm:px-6 text-right">$32,230</td>
              </tr>
              <tr className="bg-rose-50/50 dark:bg-rose-950/20 text-rose-900 dark:text-rose-200">
                <td className="py-3 px-4 sm:px-6 font-sans font-semibold">84 Months (7 Years)</td>
                <td className="py-3 px-4 sm:px-6 font-bold">$397.11</td>
                <td className="py-3 px-4 sm:px-6 text-rose-600 dark:text-rose-400 font-bold">$7,467</td>
                <td className="py-3 px-4 sm:px-6 text-right font-bold">$33,357</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Stretching the loan from 48 to 84 months reduces your monthly cash requirement by $229, but imposes an additional 
          <strong>$3,309 in pure interest</strong>. Worse, rapid depreciation means you will remain &ldquo;upside down&rdquo; 
          (owing more than the car is worth) for up to 4–5 years of an 84-month agreement.
        </p>
      </section>

      {/* Negative Equity & Dealer Traps */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          The Negative Equity Trap: Never Roll Over Old Debt Unchecked
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          If you currently owe $12,000 on a vehicle that is appraised at only $8,000, you have $4,000 of negative equity. 
          Dealerships will gladly roll that unpaid deficit into your new loan, swelling your financed principal from $25,890 to $29,890. 
          On a 72-month term at 7.5%, your payment surges from $447.64 to $516.80, forcing you to pay compounded interest on a car you no longer drive.
        </p>
      </section>

      {/* 20/4/10 Rule Section */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          The 20/4/10 Affordability Benchmark
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Financial analysts widely encourage the <strong>20/4/10 guideline</strong> to avoid becoming car-poor:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
          <li><strong>20% Down Payment:</strong> Puts you immediately ahead of initial steep depreciation.</li>
          <li><strong>4-Year Maximum Loan Term (48 months):</strong> Prevents paying interest on an aging, repair-prone car.</li>
          <li><strong>10% of Gross Monthly Income:</strong> Total transportation outlay (payment, insurance, fuel, and maintenance) should stay under 10% of monthly earnings.</li>
        </ul>
      </section>

      {/* FAQ Accordion */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <HelpCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions: Auto Loans &amp; Car Financing
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
                className="w-full text-left p-4 sm:p-5 font-semibold text-slate-900 dark:text-white flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors"
              >
                <span className="text-base sm:text-lg">{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                )}
              </button>
              {openFaq === idx && (
                <div className="p-4 sm:p-5 pt-0 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Methodology & Citations */}
      <section className="bg-slate-50 dark:bg-slate-850 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 space-y-6 text-sm text-slate-600 dark:text-slate-400">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Auto Lending Methodology &amp; Sources
          </h2>
          <p className="leading-relaxed">
            Payment calculations follow standard consumer credit monthly compounding equations. For regulatory guidance on consumer auto financing rights, visit the{' '}
            <a
              href="https://www.consumerfinance.gov/consumer-tools/auto-loans/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 underline font-medium inline-flex items-center gap-1"
            >
              Consumer Financial Protection Bureau (CFPB) Auto Resources <ExternalLink className="w-3.5 h-3.5" />
            </a>. Corrections: <a href="mailto:support@smartcalclab.com" className="underline">support@smartcalclab.com</a>.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex flex-wrap gap-4">
          <a
            href="/loan"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium hover:border-indigo-500 transition-colors"
          >
            <Calculator className="w-4 h-4 text-indigo-600" />
            <span>Mortgage &amp; Loan Calculator</span>
          </a>
          <a
            href="/salary"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium hover:border-indigo-500 transition-colors"
          >
            <Calculator className="w-4 h-4 text-emerald-600" />
            <span>Salary &amp; Take-Home Calculator</span>
          </a>
          <a
            href="/guides/auto-loan-financing-guide"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium hover:border-indigo-500 transition-colors"
          >
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <span>In-Depth Car Financing Guide</span>
          </a>
        </div>
      </section>
    </article>
  );
};
