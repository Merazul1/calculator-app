import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, AlertCircle, HelpCircle, CheckCircle2, ShieldCheck, ExternalLink, Calculator } from 'lucide-react';

export const LoanArticle: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is the formula for a monthly loan payment?',
      a: 'M = P × [r(1+r)^n] ÷ [(1+r)^n − 1], where P is the loan amount, r is the monthly rate (annual rate ÷ 12) and n is the number of monthly payments. Taxes and insurance are added afterwards as one-twelfth of the annual amounts.'
    },
    {
      q: 'Why is so much of my early payment interest?',
      a: 'Interest is charged on the outstanding balance, which is largest at the start. As the balance falls, the interest share shrinks and the principal share grows, even though the total payment stays the same.'
    },
    {
      q: 'Does a bigger down payment always make sense?',
      a: 'It lowers the loan, the interest and possibly PMI. But it also reduces your cash reserve. Many advisers suggest keeping an emergency fund of several months of expenses after closing, even if that means a smaller down payment.'
    },
    {
      q: 'Should I choose a fixed or an adjustable rate?',
      a: 'A fixed rate keeps principal and interest constant for the whole term. An adjustable rate usually starts lower but can rise after the introductory period. Adjustable loans can suit someone who expects to sell or refinance before the reset, but they carry more risk.'
    },
    {
      q: 'Is the result a loan offer?',
      a: 'No. It is an estimate for planning. Your lender\'s figure will depend on credit history, local taxes, insurance quotes and fees.'
    },
    {
      q: 'How accurate is this calculator?',
      a: 'The principal-and-interest portion uses the standard amortization formula and matches published mortgage tables (for example, $100,000 at 6.5% over 30 years is $632.07 per month). Taxes, insurance and PMI are only as accurate as the values you enter.'
    }
  ];

  return (
    <article className="mt-12 space-y-10 text-slate-800 dark:text-slate-200">
      {/* 1. Byline & Editorial Standards Header */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span>
              By{' '}
              <a href="/about" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
                David Vance
              </a>
              , Senior Financial Analyst &amp; Modeler who built SmartCalcLab's calculation engine after analyzing complex French amortization loan offers.
            </span>
          </div>
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
            Last updated: November 27, 2026
          </span>
        </div>

        <div>
          <div className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider mb-2">
            <BookOpen className="w-4 h-4" />
            <span>In-Depth Mortgage &amp; Loan Analysis</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
            What this calculator actually tells you
          </h2>
        </div>

        <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            A mortgage payment is not one number. It is a stack of four: the loan repayment itself
            (principal and interest), property tax, homeowners insurance, and, when your down payment is
            small, private mortgage insurance (PMI). Lenders call the full stack <strong>PITI</strong>. The calculator above
            adds all four so you see the number your bank account will feel, not the lower figure that
            advertisements quote.
          </p>
          <p>
            The sections below go beyond the formula. They show how the payment changes with the term, the
            rate and extra payments, and how to check whether a payment fits your income before you apply.
          </p>
        </div>
      </section>

      {/* 2. Worked Example: Month by Month */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white">
          Worked example: a $400,000 home, month by month
        </h2>
        <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            Take a $400,000 purchase with 20% down ($80,000). The loan is $320,000 at 6.5% for 30 years.
            Principal and interest come to <strong>$2,022.62</strong> per month. Add $400 for property tax and
            $100 for insurance and the total is <strong>$2,522.62</strong>.
          </p>
          <p>
            Look at what the first payment does. The monthly rate is 6.5% ÷ 12 = 0.5417%, so interest for
            month one is $320,000 × 0.005417 = <strong>$1,733.33</strong>. Only <strong>$289.29</strong> of your
            $2,022.62 reduces the loan. About 86 cents of every dollar goes to the bank at the start.
          </p>
          <p>
            That ratio shifts slowly. After 10 years (120 payments) you will have paid roughly $242,700 in
            principal and interest, yet the balance is still about <strong>$271,000</strong>. You have repaid only
            about $48,700 of the original $320,000. Equity in the early years comes mostly from your down
            payment and from the home rising in value, not from the monthly payments.
          </p>
        </div>
      </section>

      {/* 3. 15-Year vs 30-Year Table */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
        <h2 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white">
          15-year vs 30-year: the real trade-off
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          A shorter term raises the payment but removes a large amount of interest. The table uses the same
          $320,000 loan and the same 6.5% rate so the comparison is clean. (In practice, 15-year loans
          usually carry a lower rate than 30-year loans, which widens the gap further.)
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                <th className="py-3 px-4 font-bold">Term</th>
                <th className="py-3 px-4 font-bold">Monthly P&amp;I</th>
                <th className="py-3 px-4 font-bold">Total Interest</th>
                <th className="py-3 px-4 font-bold">Total Repaid</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300 font-mono">
              <tr>
                <td className="py-3 px-4 font-sans font-medium text-slate-900 dark:text-white">30 years</td>
                <td className="py-3 px-4">$2,022.62</td>
                <td className="py-3 px-4">≈ $408,100</td>
                <td className="py-3 px-4">≈ $728,100</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans font-medium text-slate-900 dark:text-white">15 years</td>
                <td className="py-3 px-4">$2,787.59</td>
                <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-bold">≈ $181,800</td>
                <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-bold">≈ $501,800</td>
              </tr>
              <tr className="bg-blue-50/50 dark:bg-blue-950/20 font-bold">
                <td className="py-3 px-4 font-sans text-blue-700 dark:text-blue-300">Difference</td>
                <td className="py-3 px-4 text-blue-700 dark:text-blue-300">+$765</td>
                <td className="py-3 px-4 text-emerald-700 dark:text-emerald-300 font-bold">−$226,300</td>
                <td className="py-3 px-4 text-emerald-700 dark:text-emerald-300 font-bold">−$226,300</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Paying $765 more each month saves about $226,000 in interest. The catch is flexibility. A
          30-year loan lets you choose to pay extra when money is available and fall back to the lower
          payment when it is not. A 15-year loan forces the higher payment every month.
        </p>
      </section>

      {/* 4. Rate Sensitivity Table */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
        <h2 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white">
          How much does one percentage point matter?
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          On the same $320,000, 30-year loan, the interest rate changes the payment significantly:
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                <th className="py-3 px-4 font-bold">Interest Rate</th>
                <th className="py-3 px-4 font-bold">Monthly P&amp;I</th>
                <th className="py-3 px-4 font-bold">Change vs. 6.5% Baseline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300 font-mono">
              <tr>
                <td className="py-3 px-4 font-sans font-medium text-emerald-600 dark:text-emerald-400">5.5%</td>
                <td className="py-3 px-4">$1,816.93</td>
                <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-bold">−$205.69 / mo</td>
              </tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/40">
                <td className="py-3 px-4 font-sans font-medium text-slate-900 dark:text-white">6.5% (Baseline)</td>
                <td className="py-3 px-4">$2,022.62</td>
                <td className="py-3 px-4 font-sans text-slate-400">—</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans font-medium text-rose-600 dark:text-rose-400">7.5%</td>
                <td className="py-3 px-4">$2,237.47</td>
                <td className="py-3 px-4 text-rose-600 dark:text-rose-400 font-bold">+$214.85 / mo</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Each point moves the payment by roughly $205 to $215, or about $75,000 over the life of the
          loan. This is why comparing offers from three lenders on the same day is worth the effort: a
          0.25% difference is real money.
        </p>
      </section>

      {/* 5. What Extra Payments Do */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white">
          What extra payments do
        </h2>
        <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            Add $200 per month to the 6.5% example and the payment becomes $2,222.62. Because the extra
            goes straight to principal, the loan is cleared in about 280 months (23 years and 4 months)
            instead of 360. That is roughly 6 years and 8 months sooner, with about <strong>$105,000 less
            interest</strong>.
          </p>
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs sm:text-sm text-amber-800 dark:text-amber-300">
            <strong>Prepayment Verification Tip:</strong> Before making accelerated payments, confirm your lender applies extra money strictly to principal and
            does not charge a prepayment penalty. Most conventional loans do not, but always check your loan note.
          </div>
        </div>
      </section>

      {/* 6. Will the Payment Fit Your Income? (DTI) */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white">
          Will the payment fit your income?
        </h2>
        <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            Lenders evaluate your creditworthiness using your <strong>Debt-to-Income (DTI) ratio</strong>. A standard benchmark in underwriting is the <strong>28/36 rule</strong>: housing
            costs (PITI) at or below 28% of gross monthly income, and all recurring debts combined (credit cards, student loans, car financing) at or below 36%.
          </p>
          <p>
            Using this page's example, a total PITI of $2,522.62 at a 28% front-end cap implies a mandatory gross income of about
            $9,009 per month, or roughly <strong>$108,100 per year</strong>. If your household income is below that,
            your options include selecting a lower purchase price, putting down a larger cash deposit, or considering an extended amortization horizon.
          </p>
        </div>
      </section>

      {/* 7. PMI: Cost & Termination */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white">
          PMI: what it costs and when it ends
        </h2>
        <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            If you put down less than 20% on a conventional loan, lenders usually require Private Mortgage Insurance (PMI). Annual costs
            commonly fall between 0.3% and 1.5% of the initial loan amount, depending on credit score and
            down payment percentage. On a $360,000 loan (10% down on $400,000), a 0.5% to 1.0% premium adds
            <strong> $150 to $300 per month</strong> to your mortgage bill.
          </p>
          <p>
            On conventional mortgages, federal law under the U.S. Homeowners Protection Act allows you to request PMI cancellation once your principal balance reaches 80% of the
            original home value, and mandates automatic termination at 78% LTV. Note that FHA loans operate under different MIP regulations where mortgage insurance often remains for the entire life of the loan when putting down under 10%.
          </p>
        </div>
      </section>

      {/* 8. Global & India EMI Application */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white">
          Using this tool for an EMI in India or elsewhere
        </h2>
        <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            The principal-and-interest amortization formula is mathematically universal worldwide, so you can use this calculator for any
            global currency by simply leaving the property tax and hazard insurance fields blank.
          </p>
          <p>
            <strong>Example:</strong> A ₹50,00,000 home loan at 8.5% annual interest for 20
            years yields an Equated Monthly Installment (EMI) of approximately <strong>₹43,391</strong>. Over the 240-month tenure, total repayment reaches roughly ₹1.04 crore,
            of which approximately ₹54.1 lakh constitutes interest. Because Indian commercial lenders frequently issue floating-rate loans tied to the RBI repo rate, treat calculation results as an essential baseline projection that adjusts with future central bank rate adjustments.
          </p>
        </div>
      </section>

      {/* 9. Common Mistakes */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white">
          Common mistakes this calculator helps you avoid
        </h2>
        <ul className="space-y-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <span><strong>Entering the home price as the loan amount:</strong> Always subtract your cash down payment first to derive your actual borrowed principal.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <span><strong>Forgetting closing costs:</strong> Title insurance, origination fees, and escrow funding typically total 2% to 5% of the loan amount and must be funded on top of your down payment.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <span><strong>Leaving out HOA dues:</strong> Homeowners Association dues are billed separately from your mortgage servicer escrow, but they directly reduce your purchasing power and DTI limits.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <span><strong>Assuming taxes and insurance stay flat:</strong> Municipal property tax reassessments and insurance premiums increase over time. When escrowed, your monthly payment rises even on a fixed-rate note.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <span><strong>Confusing nominal interest rate with APR:</strong> The Annual Percentage Rate (APR) folds in mandatory lender discount points and closing charges, making it the superior benchmark for comparing lender offers.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <span><strong>Choosing by monthly payment alone:</strong> A lower payment achieved by stretching from a 15-year to a 30-year term can double or triple your total lifetime interest expense.</span>
          </li>
        </ul>
      </section>

      {/* 10. Frequently Asked Questions */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
          <HelpCircle className="w-4 h-4" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white">
          Mortgage &amp; Loan Amortization FAQs
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50/50 dark:bg-slate-800/50 transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 dark:text-white"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/60 dark:border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 11. Methodology & Statutory Sources */}
      <section className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
          Methodology and sources
        </h2>
        <p>
          All numerical figures on this page were computed using the standard French amortization equation and rounded to the nearest
          dollar where indicated by ≈. Interest rates utilized in comparison tables are hypothetical models designed for consumer education rather than guaranteed quotes.
        </p>
        <p>
          For official federal lending disclosures, borrowing guidelines, and statutory rights, consult the{' '}
          <a
            href="https://www.consumerfinance.gov/owning-a-home/"
            rel="noopener noreferrer"
            target="_blank"
            className="text-blue-600 dark:text-blue-400 underline font-semibold inline-flex items-center gap-1"
          >
            <span>Consumer Financial Protection Bureau (CFPB) Owning a Home resources</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>.
        </p>
        <p className="text-slate-500 dark:text-slate-400 text-xs pt-1">
          Disclaimer: This guide is published purely for informational and educational purposes and does not constitute formal underwriting or financial counsel. For questions or reader formula corrections, email{' '}
          <a href="mailto:support@smartcalclab.com" className="text-blue-600 dark:text-blue-400 underline">
            support@smartcalclab.com
          </a>.
        </p>
      </section>

      {/* 12. Internal Links: Related Calculators & In-Depth Guides */}
      <section className="p-6 sm:p-8 rounded-3xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 space-y-4">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
          Related calculators and educational guides
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
          <a
            href="/autoloan"
            className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-500 transition-colors block"
          >
            <strong className="block text-slate-900 dark:text-white mb-1">Auto Loan Calculator</strong>
            <span className="text-slate-500 dark:text-slate-400">Calculate vehicle financing with trade-in credits and local sales tax.</span>
          </a>
          <a
            href="/compound"
            className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-500 transition-colors block"
          >
            <strong className="block text-slate-900 dark:text-white mb-1">Compound Interest Calculator</strong>
            <span className="text-slate-500 dark:text-slate-400">Compare paying off mortgage debt vs investing the monthly savings.</span>
          </a>
          <a
            href="/guides/mortgage-amortization-piti-guide"
            className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-500 transition-colors block"
          >
            <strong className="block text-slate-900 dark:text-white mb-1">Mortgage Amortization Guide</strong>
            <span className="text-slate-500 dark:text-slate-400">In-depth mathematical analysis of PITI curves and PMI elimination.</span>
          </a>
        </div>
      </section>
    </article>
  );
};
