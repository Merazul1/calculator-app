import React, { useState, useMemo } from 'react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../translations';
import { TrendingUp, DollarSign, Calendar, Layers } from 'lucide-react';

interface CompoundInterestCalculatorProps {
  currentLang: Language;
}

export const CompoundInterestCalculator: React.FC<CompoundInterestCalculatorProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];
  const [initialDeposit, setInitialDeposit] = useState<number>(5000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(300);
  const [annualRate, setAnnualRate] = useState<number>(8.0);
  const [years, setYears] = useState<number>(20);
  const [compoundingFreq, setCompoundingFreq] = useState<number>(12); // 12 = monthly

  const currencySymbol = currentLang === 'es' ? '€' : currentLang === 'ar' ? 'ر.س' : currentLang === 'hi' ? '₹' : '$';

  const { futureValue, totalContributed, totalInterestEarned, timeline } = useMemo(() => {
    const P = Math.max(0, initialDeposit);
    const PMT = Math.max(0, monthlyContribution);
    const r = Math.max(0, annualRate) / 100;
    const n = compoundingFreq;
    const tYears = Math.max(1, years);

    // FV of lump sum: P * (1 + r/n)^(n*t)
    // FV of monthly series: PMT * [((1 + r/12)^(12*t) - 1) / (r/12)]
    const ratePerMonth = r / 12;
    const totalMonths = tYears * 12;

    let currentBalance = P;
    let totalInvested = P;

    const milestones: { year: number; balance: number; contributions: number }[] = [];

    for (let yr = 1; yr <= tYears; yr++) {
      for (let m = 1; m <= 12; m++) {
        currentBalance = currentBalance * (1 + ratePerMonth) + PMT;
        totalInvested += PMT;
      }
      if (yr % 5 === 0 || yr === tYears) {
        milestones.push({
          year: yr,
          balance: currentBalance,
          contributions: totalInvested,
        });
      }
    }

    const interestEarned = Math.max(0, currentBalance - totalInvested);

    return {
      futureValue: currentBalance,
      totalContributed: totalInvested,
      totalInterestEarned: interestEarned,
      timeline: milestones,
    };
  }, [initialDeposit, monthlyContribution, annualRate, years, compoundingFreq]);

  const contributionPercent = futureValue > 0 ? Math.round((totalContributed / futureValue) * 100) : 100;
  const interestPercent = 100 - contributionPercent;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl">
      {/* Header */}
      <div className="flex items-center gap-3 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
          <TrendingUp className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {t.tools.compound.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {t.tools.compound.shortDesc}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        {/* Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Initial Deposit */}
          <div>
            <div className="flex justify-between text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
              <label>Initial Deposit (Capital Inicial)</label>
              <span className="text-indigo-600 dark:text-indigo-400 font-mono font-bold">
                {currencySymbol} {initialDeposit.toLocaleString()}
              </span>
            </div>
            <input
              type="number"
              min="0"
              step="500"
              value={initialDeposit}
              onChange={(e) => setInitialDeposit(Number(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-base font-bold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Monthly Addition */}
          <div>
            <div className="flex justify-between text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
              <label>Monthly Contribution (Aportación Mensual)</label>
              <span className="text-indigo-600 dark:text-indigo-400 font-mono font-bold">
                {currencySymbol} {monthlyContribution.toLocaleString()}
              </span>
            </div>
            <input
              type="number"
              min="0"
              step="50"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-base font-bold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Expected Return Rate */}
          <div>
            <div className="flex justify-between text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
              <label>Estimated Annual Return (%)</label>
              <span className="text-indigo-600 dark:text-indigo-400 font-mono font-bold">
                {annualRate}%
              </span>
            </div>
            <input
              type="number"
              min="1"
              max="30"
              step="0.5"
              value={annualRate}
              onChange={(e) => setAnnualRate(Number(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-base font-bold"
            />
            <input
              type="range"
              min="1"
              max="20"
              step="0.5"
              value={annualRate}
              onChange={(e) => setAnnualRate(Number(e.target.value))}
              className="w-full mt-2 accent-indigo-600 cursor-pointer"
            />
          </div>

          {/* Investment Horizon Years */}
          <div>
            <div className="flex justify-between text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
              <label>Investment Time Horizon</label>
              <span className="text-indigo-600 dark:text-indigo-400 font-mono font-bold">
                {years} Years
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2 mb-2">
              {[5, 10, 20, 30].map((yr) => (
                <button
                  key={yr}
                  type="button"
                  onClick={() => setYears(yr)}
                  className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                    years === yr
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {yr} Years
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xl">
          <div>
            <div className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-1">
              Projected Total Future Wealth
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400 mb-6">
              {currencySymbol} {futureValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>

            <div className="space-y-3 pt-4 border-t border-indigo-900/60 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-300">Your Out-of-Pocket Principal:</span>
                <span className="font-mono font-bold text-white">
                  {currencySymbol} {totalContributed.toLocaleString(undefined, { minimumFractionDigits: 0 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Total Compound Interest Earned:</span>
                <span className="font-mono font-bold text-amber-400">
                  {currencySymbol} {totalInterestEarned.toLocaleString(undefined, { minimumFractionDigits: 0 })}
                </span>
              </div>
            </div>

            {/* Proportion Bar */}
            <div className="mt-6">
              <div className="flex justify-between text-xs text-slate-300 mb-1.5 font-medium">
                <span>Principal ({contributionPercent}%)</span>
                <span>Interest Growth ({interestPercent}%)</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden flex">
                <div style={{ width: `${contributionPercent}%` }} className="bg-indigo-500 h-full"></div>
                <div style={{ width: `${interestPercent}%` }} className="bg-emerald-400 h-full"></div>
              </div>
            </div>

            {/* 5-Year Milestones */}
            <div className="mt-6 pt-4 border-t border-indigo-900/40">
              <div className="text-xs font-bold text-indigo-300 uppercase mb-2">Milestone Forecast</div>
              <div className="space-y-1.5 text-xs font-mono">
                {timeline.map((m) => (
                  <div key={m.year} className="flex justify-between text-slate-300">
                    <span>Year {m.year}:</span>
                    <span className="text-white font-bold">{currencySymbol} {Math.round(m.balance).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
