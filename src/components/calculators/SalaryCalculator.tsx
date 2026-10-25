import React, { useState, useMemo } from 'react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../translations';
import { Briefcase, Wallet, DollarSign, FileSpreadsheet } from 'lucide-react';

interface SalaryCalculatorProps {
  currentLang: Language;
}

export const SalaryCalculator: React.FC<SalaryCalculatorProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];
  const [payMode, setPayMode] = useState<'annual' | 'monthly' | 'hourly'>('annual');
  const [inputValue, setInputValue] = useState<number>(60000);
  const [taxRate, setTaxRate] = useState<number>(18.0);
  const [socialSecurityRate, setSocialSecurityRate] = useState<number>(6.5);
  const [paymentsCount, setPaymentsCount] = useState<number>(12); // 12 or 14 payments

  const currencySymbol = currentLang === 'es' || currentLang === 'de' || currentLang === 'fr' ? '€' : currentLang === 'pt' ? 'R$' : currentLang === 'ar' ? 'ر.س' : currentLang === 'hi' ? '₹' : '$';

  // Compute normalized gross annual salary based on payMode
  const grossAnnual = useMemo(() => {
    const val = Math.max(0, inputValue);
    if (payMode === 'hourly') {
      return val * 40 * 52; // 2,080 standard annual working hours
    } else if (payMode === 'monthly') {
      return val * 12;
    }
    return val;
  }, [inputValue, payMode]);

  const { netAnnual, netPerPaycheck, totalTax, totalSocial, hourlyRate, grossMonthly, netMonthly, grossBiweekly, netBiweekly, grossWeekly, netWeekly } = useMemo(() => {
    const gross = Math.max(0, grossAnnual);
    const tax = gross * (Math.max(0, taxRate) / 100);
    const social = gross * (Math.max(0, socialSecurityRate) / 100);
    const net = Math.max(0, gross - tax - social);
    const perPaycheck = paymentsCount > 0 ? net / paymentsCount : 0;
    const hourly = gross > 0 ? gross / (52 * 40) : 0;
    const netHourly = net > 0 ? net / (52 * 40) : 0;

    return {
      netAnnual: net,
      netPerPaycheck: perPaycheck,
      totalTax: tax,
      totalSocial: social,
      hourlyRate: hourly,
      grossMonthly: gross / 12,
      netMonthly: net / 12,
      grossBiweekly: gross / 26,
      netBiweekly: net / 26,
      grossWeekly: gross / 52,
      netWeekly: net / 52,
      netHourly,
    };
  }, [grossAnnual, taxRate, socialSecurityRate, paymentsCount]);

  const netPercent = grossAnnual > 0 ? Math.round((netAnnual / grossAnnual) * 100) : 100;
  const deductionPercent = 100 - netPercent;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl">
      {/* Header */}
      <div className="flex items-center gap-3 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="w-12 h-12 rounded-2xl bg-cyan-100 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
          <Briefcase className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {t.tools.salary.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {t.tools.salary.shortDesc}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        {/* Input Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Pay Input Mode Toggle */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Select Wage Frequency (Annual, Monthly, or Hourly)
            </label>
            <div className="grid grid-cols-3 gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => {
                  setPayMode('annual');
                  if (payMode === 'hourly') setInputValue(Math.round(inputValue * 2080));
                  else if (payMode === 'monthly') setInputValue(Math.round(inputValue * 12));
                }}
                className={`py-2 rounded-lg text-xs font-bold transition-all ${
                  payMode === 'annual'
                    ? 'bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Annual Salary
              </button>
              <button
                type="button"
                onClick={() => {
                  setPayMode('monthly');
                  if (payMode === 'annual') setInputValue(Math.round(inputValue / 12));
                  else if (payMode === 'hourly') setInputValue(Math.round(inputValue * 173.33));
                }}
                className={`py-2 rounded-lg text-xs font-bold transition-all ${
                  payMode === 'monthly'
                    ? 'bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Monthly Wage
              </button>
              <button
                type="button"
                onClick={() => {
                  setPayMode('hourly');
                  if (payMode === 'annual') setInputValue(Math.round(inputValue / 2080));
                  else if (payMode === 'monthly') setInputValue(Math.round(inputValue / 173.33));
                }}
                className={`py-2 rounded-lg text-xs font-bold transition-all ${
                  payMode === 'hourly'
                    ? 'bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Hourly Rate
              </button>
            </div>
          </div>

          {/* Wage Input Field */}
          <div>
            <div className="flex justify-between text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
              <label>
                {payMode === 'annual' ? 'Gross Annual Salary' : payMode === 'monthly' ? 'Gross Monthly Wage' : 'Hourly Pay Rate (40 hrs/wk)'}
              </label>
              <span className="text-cyan-600 dark:text-cyan-400 font-mono font-bold">
                {currencySymbol} {inputValue.toLocaleString()} {payMode === 'hourly' ? '/ hr' : payMode === 'monthly' ? '/ mo' : '/ yr'}
              </span>
            </div>
            <input
              type="number"
              min="0"
              step={payMode === 'hourly' ? '1' : '500'}
              value={inputValue}
              onChange={(e) => setInputValue(Number(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-base font-bold focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
            {payMode !== 'annual' && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-mono">
                = Gross Annual Equivalent: <span className="text-cyan-600 dark:text-cyan-400 font-bold">{currencySymbol} {grossAnnual.toLocaleString()}</span> / year
              </p>
            )}
          </div>

          {/* Income Tax Rate */}
          <div>
            <div className="flex justify-between text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
              <label>Estimated Income Tax Rate (IRPF / ISR / TDS)</label>
              <span className="text-cyan-600 dark:text-cyan-400 font-mono font-bold">
                {taxRate}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="45"
              step="0.5"
              value={taxRate}
              onChange={(e) => setTaxRate(Number(e.target.value))}
              className="w-full accent-cyan-600 cursor-pointer"
            />
          </div>

          {/* Social Security */}
          <div>
            <div className="flex justify-between text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
              <label>Social Security & Pension Contributions</label>
              <span className="text-cyan-600 dark:text-cyan-400 font-mono font-bold">
                {socialSecurityRate}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              step="0.25"
              value={socialSecurityRate}
              onChange={(e) => setSocialSecurityRate(Number(e.target.value))}
              className="w-full accent-cyan-600 cursor-pointer"
            />
          </div>

          {/* Number of Paychecks */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
              Number of Annual Payments (Pagas al Año)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentsCount(12)}
                className={`py-2.5 rounded-xl border text-xs font-bold transition-all ${
                  paymentsCount === 12
                    ? 'bg-cyan-600 text-white border-cyan-600 shadow-sm'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                12 Payments (Standard Monthly)
              </button>
              <button
                type="button"
                onClick={() => setPaymentsCount(14)}
                className={`py-2.5 rounded-xl border text-xs font-bold transition-all ${
                  paymentsCount === 14
                    ? 'bg-cyan-600 text-white border-cyan-600 shadow-sm'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                14 Payments (With 2 Extra Pagas Extras)
              </button>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-cyan-950 text-white rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xl">
          <div>
            <div className="text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-1">
              Net In-Hand Paycheck ({paymentsCount}x Year)
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400 mb-6">
              {currencySymbol} {netPerPaycheck.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>

            <div className="space-y-3 pt-4 border-t border-cyan-900/60 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-300">Net Annual Take-Home:</span>
                <span className="font-mono font-bold text-white">
                  {currencySymbol} {netAnnual.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Income Taxes Withheld:</span>
                <span className="font-mono text-amber-400">
                  -{currencySymbol} {totalTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Social Contributions:</span>
                <span className="font-mono text-amber-400">
                  -{currencySymbol} {totalSocial.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-cyan-900/40">
                <span className="text-slate-300">Equivalent Hourly Rate:</span>
                <span className="font-mono text-cyan-300 font-semibold">
                  {currencySymbol} {hourlyRate.toFixed(2)}/hr
                </span>
              </div>
            </div>

            {/* Proportion Bar */}
            <div className="mt-6">
              <div className="flex justify-between text-xs text-slate-300 mb-1.5 font-medium">
                <span>Net In-Pocket ({netPercent}%)</span>
                <span>Taxes & Deductions ({deductionPercent}%)</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden flex">
                <div style={{ width: `${netPercent}%` }} className="bg-emerald-500 h-full"></div>
                <div style={{ width: `${deductionPercent}%` }} className="bg-rose-500 h-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Annual to Gross & Net Salary Conversion Schedule Table */}
      <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-cyan-500" />
            Annual to Gross &amp; Net Salary Breakdown Table
          </h2>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            Based on {taxRate}% Tax + {socialSecurityRate}% Deductions
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300">
                <th className="py-2.5 px-3 font-semibold">Pay Frequency</th>
                <th className="py-2.5 px-3 font-semibold">Gross Pay</th>
                <th className="py-2.5 px-3 font-semibold">Taxes &amp; Deductions</th>
                <th className="py-2.5 px-3 font-semibold text-emerald-600 dark:text-emerald-400">Net Take-Home Pay</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
              <tr className="text-slate-800 dark:text-slate-200">
                <td className="py-2.5 px-3 font-sans font-bold">Annual (1 Year)</td>
                <td className="py-2.5 px-3 font-bold">{currencySymbol} {grossAnnual.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                <td className="py-2.5 px-3 text-amber-500">-{currencySymbol} {(totalTax + totalSocial).toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                <td className="py-2.5 px-3 font-bold text-emerald-600 dark:text-emerald-400">{currencySymbol} {netAnnual.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
              </tr>
              <tr className="text-slate-800 dark:text-slate-200">
                <td className="py-2.5 px-3 font-sans font-bold">Monthly (12x)</td>
                <td className="py-2.5 px-3">{currencySymbol} {grossMonthly.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td className="py-2.5 px-3 text-amber-500">-{currencySymbol} {((totalTax + totalSocial) / 12).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td className="py-2.5 px-3 font-bold text-emerald-600 dark:text-emerald-400">{currencySymbol} {netMonthly.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              </tr>
              <tr className="text-slate-800 dark:text-slate-200">
                <td className="py-2.5 px-3 font-sans font-bold">Bi-Weekly (26x)</td>
                <td className="py-2.5 px-3">{currencySymbol} {grossBiweekly.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td className="py-2.5 px-3 text-amber-500">-{currencySymbol} {((totalTax + totalSocial) / 26).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td className="py-2.5 px-3 font-bold text-emerald-600 dark:text-emerald-400">{currencySymbol} {netBiweekly.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              </tr>
              <tr className="text-slate-800 dark:text-slate-200">
                <td className="py-2.5 px-3 font-sans font-bold">Weekly (52x)</td>
                <td className="py-2.5 px-3">{currencySymbol} {grossWeekly.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td className="py-2.5 px-3 text-amber-500">-{currencySymbol} {((totalTax + totalSocial) / 52).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td className="py-2.5 px-3 font-bold text-emerald-600 dark:text-emerald-400">{currencySymbol} {netWeekly.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              </tr>
              <tr className="text-slate-800 dark:text-slate-200">
                <td className="py-2.5 px-3 font-sans font-bold">Hourly (2,080 hrs)</td>
                <td className="py-2.5 px-3">{currencySymbol} {hourlyRate.toFixed(2)}/hr</td>
                <td className="py-2.5 px-3 text-amber-500">-{currencySymbol} {((totalTax + totalSocial) / 2080).toFixed(2)}/hr</td>
                <td className="py-2.5 px-3 font-bold text-emerald-600 dark:text-emerald-400">{currencySymbol} {(netAnnual / 2080).toFixed(2)}/hr</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
