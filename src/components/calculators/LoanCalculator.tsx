import React, { useState, useMemo } from 'react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../translations';
import { Landmark, Copy, Check, RotateCcw, PieChart, Table } from 'lucide-react';

interface LoanCalculatorProps {
  currentLang: Language;
}

export const LoanCalculator: React.FC<LoanCalculatorProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];
  const [principal, setPrincipal] = useState<number>(200000);
  const [interestRate, setInterestRate] = useState<number>(5.5);
  const [years, setYears] = useState<number>(20);
  const [currency, setCurrency] = useState<string>(
    currentLang === 'es' ? '€' : currentLang === 'ar' ? 'ر.س' : currentLang === 'hi' ? '₹' : '$'
  );
  const [copied, setCopied] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);

  // Amortization & monthly EMI calculations
  const calculation = useMemo(() => {
    const p = Math.max(0, principal);
    const annualRate = Math.max(0, interestRate);
    const totalMonths = Math.max(1, years * 12);

    if (p === 0) {
      return { monthlyPayment: 0, totalPayment: 0, totalInterest: 0, schedule: [] };
    }

    const monthlyRate = annualRate / 100 / 12;

    let monthlyPayment = 0;
    if (monthlyRate === 0) {
      monthlyPayment = p / totalMonths;
    } else {
      monthlyPayment =
        (p * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }

    const totalPayment = monthlyPayment * totalMonths;
    const totalInterest = totalPayment - p;

    // Generate annual amortization schedule preview
    const schedule: { year: number; principalPaid: number; interestPaid: number; remainingBalance: number }[] = [];
    let balance = p;
    for (let yr = 1; yr <= years; yr++) {
      let yrPrincipal = 0;
      let yrInterest = 0;

      for (let m = 1; m <= 12; m++) {
        const interestForMonth = balance * monthlyRate;
        const principalForMonth = monthlyPayment - interestForMonth;
        yrInterest += interestForMonth;
        yrPrincipal += principalForMonth;
        balance = Math.max(0, balance - principalForMonth);
      }

      schedule.push({
        year: yr,
        principalPaid: yrPrincipal,
        interestPaid: yrInterest,
        remainingBalance: balance,
      });
    }

    return {
      monthlyPayment,
      totalPayment,
      totalInterest,
      schedule,
    };
  }, [principal, interestRate, years]);

  const principalPercent = calculation.totalPayment > 0 
    ? Math.round((principal / calculation.totalPayment) * 100) 
    : 100;
  const interestPercent = 100 - principalPercent;

  const handleCopy = () => {
    const text = `${t.tools.loan.name}\n` +
      `${t.common.amount}: ${currency} ${principal.toLocaleString()}\n` +
      `${t.common.rate}: ${interestRate}%\n` +
      `${t.common.years}: ${years}\n` +
      `---------------------------------\n` +
      `${t.common.monthlyPayment}: ${currency} ${calculation.monthlyPayment.toFixed(2)}\n` +
      `${t.common.totalInterest}: ${currency} ${calculation.totalInterest.toFixed(2)}\n` +
      `${t.common.totalPayment}: ${currency} ${calculation.totalPayment.toFixed(2)}`;
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setPrincipal(100000);
    setInterestRate(5.0);
    setYears(15);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Landmark className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {t.tools.loan.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {t.tools.loan.shortDesc}
            </p>
          </div>
        </div>

        {/* Currency Switcher */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
          {['$', '€', '£', '₹', 'ر.س', 'Mex$'].map((curr) => (
            <button
              key={curr}
              onClick={() => setCurrency(curr)}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                currency === curr
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {curr}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        {/* Input Form Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Loan Amount Input */}
          <div>
            <div className="flex justify-between text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
              <label>{t.common.amount}</label>
              <span className="text-blue-600 dark:text-blue-400 font-mono font-bold">
                {currency} {principal.toLocaleString()}
              </span>
            </div>
            <div className="relative">
              <span className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                {currency}
              </span>
              <input
                type="number"
                min="1000"
                max="50000000"
                step="5000"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value) || 0)}
                className="w-full pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white font-mono text-base focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              />
            </div>
            <input
              type="range"
              min="5000"
              max="2000000"
              step="5000"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="w-full mt-2 accent-blue-600 cursor-pointer"
            />
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex justify-between text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
              <label>{t.common.rate}</label>
              <span className="text-blue-600 dark:text-blue-400 font-mono font-bold">
                {interestRate}%
              </span>
            </div>
            <div className="relative">
              <input
                type="number"
                min="0.1"
                max="35"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white font-mono text-base focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
              />
              <span className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                %
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="25"
              step="0.25"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full mt-2 accent-blue-600 cursor-pointer"
            />
          </div>

          {/* Loan Term (Years) */}
          <div>
            <div className="flex justify-between text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
              <label>{t.common.years}</label>
              <span className="text-blue-600 dark:text-blue-400 font-mono font-bold">
                {years} {t.common.years.toLowerCase()} ({years * 12} {t.common.months})
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2 mb-2">
              {[5, 10, 15, 20, 25, 30].slice(0, 4).map((yr) => (
                <button
                  key={yr}
                  type="button"
                  onClick={() => setYears(yr)}
                  className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                    years === yr
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {yr} Yrs
                </button>
              ))}
            </div>
            <input
              type="range"
              min="1"
              max="40"
              step="1"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? t.common.copied : t.common.copyResult}</span>
            </button>
            <button
              onClick={handleReset}
              className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={t.common.reset}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Results Card Column (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xl">
          <div>
            <div className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-1">
              {t.common.monthlyPayment}
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white mb-6">
              {currency} {calculation.monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>

            {/* Breakdown summary */}
            <div className="space-y-4 pt-4 border-t border-indigo-900/60 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-300">{t.common.amount}</span>
                <span className="font-mono font-bold text-white">
                  {currency} {principal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300">{t.common.totalInterest}</span>
                <span className="font-mono font-bold text-amber-400">
                  {currency} {calculation.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-indigo-900/40">
                <span className="text-slate-300 font-semibold">{t.common.totalPayment}</span>
                <span className="font-mono font-bold text-emerald-400 text-base">
                  {currency} {calculation.totalPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Proportion Bar */}
            <div className="mt-6">
              <div className="flex justify-between text-xs text-slate-300 mb-1.5 font-medium">
                <span>Principal ({principalPercent}%)</span>
                <span>Interest ({interestPercent}%)</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden flex">
                <div style={{ width: `${principalPercent}%` }} className="bg-blue-500 h-full"></div>
                <div style={{ width: `${interestPercent}%` }} className="bg-amber-400 h-full"></div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowSchedule(!showSchedule)}
            className="w-full mt-6 py-2.5 px-4 rounded-xl bg-indigo-900/60 hover:bg-indigo-900 text-indigo-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-indigo-700/50"
          >
            <Table className="w-4 h-4" />
            <span>{showSchedule ? 'Hide Amortization Table' : 'View Amortization Schedule'}</span>
          </button>
        </div>
      </div>

      {/* Amortization Schedule Modal / Dropdown */}
      {showSchedule && (
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
            Annual Amortization Schedule Preview
          </h3>
          <div className="max-h-72 overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-700">
            <table className="w-full text-xs text-left rtl:text-right text-slate-600 dark:text-slate-300 font-mono">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 uppercase font-bold sticky top-0">
                <tr>
                  <th className="p-3">Year</th>
                  <th className="p-3">Principal Paid</th>
                  <th className="p-3">Interest Paid</th>
                  <th className="p-3">Remaining Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {calculation.schedule.map((row) => (
                  <tr key={row.year} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-3 font-semibold text-slate-900 dark:text-white">Year {row.year}</td>
                    <td className="p-3 text-blue-600 dark:text-blue-400">{currency} {row.principalPaid.toFixed(2)}</td>
                    <td className="p-3 text-amber-600 dark:text-amber-400">{currency} {row.interestPaid.toFixed(2)}</td>
                    <td className="p-3">{currency} {row.remainingBalance.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
