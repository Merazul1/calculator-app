import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, HelpCircle, ShieldCheck, ExternalLink, Calculator } from 'lucide-react';

export const SalaryArticle: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How do I convert an hourly wage to an annual salary?',
      a: 'Multiply the hourly rate by hours worked per week and by 52. At a standard full-time 40 hours per week, this equals the hourly rate × 2,080.'
    },
    {
      q: 'Why is my paycheck lower than this calculator shows?',
      a: 'Likely causes are state or local income taxes, health insurance premiums, 401(k) contributions, union dues, or garnishments. Compare each deduction line on your pay stub with the breakdown above.'
    },
    {
      q: 'What is the difference between gross and net pay?',
      a: 'Gross pay is your total compensation before any taxes or deductions are removed. Net pay, also called take-home pay, is the final amount deposited into your bank account after federal tax, FICA, and pre-tax deductions.'
    },
    {
      q: 'Does a higher tax bracket mean I earn less after a raise?',
      a: 'No. The United States uses progressive marginal brackets, meaning only the portion of income above each threshold is taxed at the higher rate. A raise will always increase your total take-home pay.'
    }
  ];

  return (
    <article className="mt-12 space-y-10 text-slate-800 dark:text-slate-200">
      {/* Editorial Byline & Standards Header */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span>
              By{' '}
              <a href="/about" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                Sarah Jenkins, CPA
              </a>
              , Payroll &amp; Tax Accounting Specialist
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Tax Year: <strong>2026</strong></span>
            <span>•</span>
            <span>Last Updated: <strong>November 27, 2026</strong></span>
          </div>
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Start with the paycheck, not the formula
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            A salary offer is a gross headline number. What reaches your bank account each payday is significantly smaller, 
            and the exact difference depends on your filing status, retirement contributions, state residency, and payroll rules 
            that most people never see broken down. The calculator above computes the exact numbers. 
            This comprehensive guide explains each step so you can sanity-check any result, including your employer&apos;s payroll stubs.
          </p>
        </div>
      </section>

      {/* Worked Example Table */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Worked Example: A $75,000 Salary, Single Filer (2026 Tax Rules)
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          The figures below reflect the 2026 IRS federal rules for an unmarried individual with no dependents, taking the standard deduction, before any state or local taxes:
        </p>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700/80">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold border-b border-slate-200 dark:border-slate-700/80">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Paycheck Line Item</th>
                <th className="py-3.5 px-4 sm:px-6">Calculation Basis</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Annual Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-slate-700 dark:text-slate-300">
              <tr>
                <td className="py-3.5 px-4 sm:px-6 font-sans font-medium text-slate-900 dark:text-white">Gross Salary</td>
                <td className="py-3.5 px-4 sm:px-6 font-sans text-slate-500">Base contract rate</td>
                <td className="py-3.5 px-4 sm:px-6 text-right font-bold text-slate-900 dark:text-white">$75,000.00</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 sm:px-6 font-sans font-medium">Standard Deduction (Single, 2026)</td>
                <td className="py-3.5 px-4 sm:px-6 font-sans text-slate-500">IRS inflation-adjusted allowance</td>
                <td className="py-3.5 px-4 sm:px-6 text-right text-emerald-600 dark:text-emerald-400">−$16,100.00</td>
              </tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/50">
                <td className="py-3.5 px-4 sm:px-6 font-sans font-semibold">Federal Taxable Income</td>
                <td className="py-3.5 px-4 sm:px-6 font-sans text-slate-500">$75,000 − $16,100</td>
                <td className="py-3.5 px-4 sm:px-6 text-right font-bold">$58,900.00</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 sm:px-6 font-sans font-medium">Federal Income Tax</td>
                <td className="py-3.5 px-4 sm:px-6 font-sans text-slate-500">Progressive 10%, 12%, and 22% brackets</td>
                <td className="py-3.5 px-4 sm:px-6 text-right text-rose-600 dark:text-rose-400">−$7,670.00</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 sm:px-6 font-sans font-medium">Social Security Tax (FICA)</td>
                <td className="py-3.5 px-4 sm:px-6 font-sans text-slate-500">6.2% on total wages up to $184,500</td>
                <td className="py-3.5 px-4 sm:px-6 text-right text-rose-600 dark:text-rose-400">−$4,650.00</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 sm:px-6 font-sans font-medium">Medicare Tax (FICA)</td>
                <td className="py-3.5 px-4 sm:px-6 font-sans text-slate-500">1.45% uncapped on all earnings</td>
                <td className="py-3.5 px-4 sm:px-6 text-right text-rose-600 dark:text-rose-400">−$1,087.50</td>
              </tr>
              <tr className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold">
                <td className="py-4 px-4 sm:px-6 font-sans">Take-Home Pay (Pre-State Tax)</td>
                <td className="py-4 px-4 sm:px-6 font-sans text-emerald-700 dark:text-emerald-300">Net annual spendable income</td>
                <td className="py-4 px-4 sm:px-6 text-right text-base font-extrabold text-emerald-700 dark:text-emerald-300">$61,592.50</td>
              </tr>
              <tr className="bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                <td className="py-3 px-4 sm:px-6 font-sans">Monthly / Bi-Weekly Paycheck</td>
                <td className="py-3 px-4 sm:px-6 font-sans text-slate-500">12 monthly checks / 26 bi-weekly checks</td>
                <td className="py-3 px-4 sm:px-6 text-right font-medium">$5,132.71 / $2,368.94</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          The federal tax breakdown: 10% on the first $12,400 ($1,240), 12% on the next $38,000 up to $50,400 ($4,560), 
          and 22% on the remaining $8,500 ($1,870), totaling $7,670. While you are technically &ldquo;in the 22% tax bracket,&rdquo; 
          your <strong>effective federal tax rate</strong> is only <strong>10.2%</strong> ($7,670 ÷ $75,000).
        </p>
      </section>

      {/* Marginal vs Effective Section */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Marginal vs Effective Rates: Why a Raise Never Lowers Your Pay
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          A persistent financial myth claims that a pay raise can &ldquo;push you into a higher tax bracket and leave you with less money.&rdquo; 
          This is mathematically impossible under the US progressive tax code. Only the income earned <em>above</em> each bracket threshold 
          is taxed at the higher marginal percentage.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Suppose you receive a $5,000 raise, advancing your gross pay from $75,000 to $80,000. That additional $5,000 is taxed at the 22% 
          marginal rate ($1,100) plus 7.65% payroll taxes ($382.50). You pocket <strong>$3,517.50</strong> of that $5,000 raise—or 
          approximately 70 cents on every new dollar. Keep this 70% retention rule in mind when evaluating lateral career moves.
        </p>
      </section>

      {/* Pre-tax Deductions Section */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          What Pre-Tax Deductions Really Cost You (401k &amp; HSA Math)
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Traditional 401(k) contributions reduce your federal taxable income, but they do not reduce Social Security or Medicare taxes. 
          If you contribute 6% ($4,500) of your $75,000 salary, your taxable income drops to $54,400. Federal income tax falls by $990 to $6,680. 
          Your annual take-home pay becomes $58,082.50—meaning your paycheck only decreases by $3,510 to stash a full $4,500 into your nest egg. 
          Any employer match provides an immediate 100% bonus return on top.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Conversely, Health Savings Accounts (HSA) and Section 125 Cafeteria plans (employer-sponsored health insurance) reduce 
          <em>both</em> federal income taxes and FICA payroll taxes, making them the most tax-efficient payroll deductions available in the United States.
        </p>
      </section>

      {/* High Earners Table */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          High Earners: Social Security Cap and Additional Medicare Tax (2026)
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          For 2026, the Social Security wage base limit is <strong>$184,500</strong>. Earnings above this threshold are no longer subject to the 6.2% 
          Social Security tax, delivering a noticeable boost to late-year paychecks for high earners. Medicare tax has no wage cap, and wages 
          exceeding $200,000 (single) incur an additional 0.9% surtax.
        </p>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700/80">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold border-b border-slate-200 dark:border-slate-700/80">
              <tr>
                <th className="py-3 px-4 sm:px-6">Gross Salary</th>
                <th className="py-3 px-4 sm:px-6">Federal Income Tax</th>
                <th className="py-3 px-4 sm:px-6">FICA (OASDI + Medicare)</th>
                <th className="py-3 px-4 sm:px-6">Net Take-Home</th>
                <th className="py-3 px-4 sm:px-6 text-right">Effective Fed Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-slate-700 dark:text-slate-300">
              <tr>
                <td className="py-3 px-4 sm:px-6 font-bold text-slate-900 dark:text-white">$40,000</td>
                <td className="py-3 px-4 sm:px-6">$2,620</td>
                <td className="py-3 px-4 sm:px-6">$3,060</td>
                <td className="py-3 px-4 sm:px-6 font-medium text-emerald-600 dark:text-emerald-400">$34,320</td>
                <td className="py-3 px-4 sm:px-6 text-right">6.6%</td>
              </tr>
              <tr>
                <td className="py-3 px-4 sm:px-6 font-bold text-slate-900 dark:text-white">$120,000</td>
                <td className="py-3 px-4 sm:px-6">$17,570</td>
                <td className="py-3 px-4 sm:px-6">$9,180</td>
                <td className="py-3 px-4 sm:px-6 font-medium text-emerald-600 dark:text-emerald-400">$93,250</td>
                <td className="py-3 px-4 sm:px-6 text-right">14.6%</td>
              </tr>
              <tr>
                <td className="py-3 px-4 sm:px-6 font-bold text-slate-900 dark:text-white">$200,000</td>
                <td className="py-3 px-4 sm:px-6">$36,734</td>
                <td className="py-3 px-4 sm:px-6">$14,339</td>
                <td className="py-3 px-4 sm:px-6 font-medium text-emerald-600 dark:text-emerald-400">$148,927</td>
                <td className="py-3 px-4 sm:px-6 text-right">18.4%</td>
              </tr>
              <tr className="bg-slate-50/50 dark:bg-slate-800/50">
                <td className="py-3 px-4 sm:px-6 font-bold text-slate-900 dark:text-white">$250,000</td>
                <td className="py-3 px-4 sm:px-6">$51,304</td>
                <td className="py-3 px-4 sm:px-6">$15,514</td>
                <td className="py-3 px-4 sm:px-6 font-medium text-emerald-600 dark:text-emerald-400">$183,182</td>
                <td className="py-3 px-4 sm:px-6 text-right">20.5%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Bonus Withholding & Unincluded Items */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3">
            Supplemental Pay: Why Annual Bonuses Look Smaller Than Expected
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Employers are mandated by IRS regulations to withhold a flat 22% federal tax rate on supplemental wages (bonuses, commissions, RSUs) 
            under $1 million, plus 7.65% FICA. This 29.65% upfront withholding often shocks workers. However, this is only withholding, 
            not your finalized tax. When you file Form 1040, your bonus is lumped with regular income; if your actual marginal rate was 
            lower, you receive the difference back as an IRS refund.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-sm text-amber-900 dark:text-amber-200">
          <strong className="block font-semibold mb-1">State &amp; Local Tax Variances:</strong>
          This baseline model excludes state income taxes. Nine states (including Texas, Florida, Nevada, and Washington) levy no wage income tax, 
          while states like California, New York, and New Jersey levy graduated brackets up to 10–13.3%, which significantly impact net take-home pay.
        </div>
      </section>

      {/* Interactive FAQ Accordion */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <HelpCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions: Salary &amp; Take-Home Pay
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

      {/* Methodology, Citations & Related Links */}
      <section className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 space-y-6 text-sm text-slate-600 dark:text-slate-400">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Tax Methodology &amp; Official Sources
          </h2>
          <p className="leading-relaxed">
            All calculations incorporate official 2026 tax bracket brackets, standard deduction parameters ($16,100 single / $32,200 joint), 
            and the 2026 Social Security cap ($184,500) released by the Internal Revenue Service and Social Security Administration. 
            For exact payroll withholding methodology, consult{' '}
            <a
              href="https://www.irs.gov/publications/p15t"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 underline font-medium inline-flex items-center gap-1"
            >
              IRS Publication 15-T <ExternalLink className="w-3.5 h-3.5" />
            </a>. This simulator is provided for educational planning only and does not constitute formal tax advice.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex flex-wrap gap-4">
          <a
            href="/loan"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium hover:border-indigo-500 transition-colors"
          >
            <Calculator className="w-4 h-4 text-indigo-600" />
            <span>Loan &amp; Mortgage Calculator</span>
          </a>
          <a
            href="/compound"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium hover:border-indigo-500 transition-colors"
          >
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>Compound Interest Calculator</span>
          </a>
          <a
            href="/guides/gross-vs-net-salary-guide"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium hover:border-indigo-500 transition-colors"
          >
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <span>Gross vs Net Salary In-Depth Guide</span>
          </a>
        </div>
      </section>
    </article>
  );
};
