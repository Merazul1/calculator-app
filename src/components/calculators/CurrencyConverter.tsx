import React, { useState } from 'react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../translations';
import { RefreshCw, ArrowRightLeft, TrendingUp, Info } from 'lucide-react';

interface CurrencyConverterProps {
  currentLang: Language;
}

interface CurrencyInfo {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  rateToUSD: number; // 1 USD = X Currency
}

const CURRENCIES: CurrencyInfo[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸', rateToUSD: 1.0 },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺', rateToUSD: 0.92 },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧', rateToUSD: 0.78 },
  { code: 'MXN', name: 'Mexican Peso', symbol: 'Mex$', flag: '🇲🇽', rateToUSD: 18.45 },
  { code: 'COP', name: 'Colombian Peso', symbol: 'COL$', flag: '🇨🇴', rateToUSD: 3950.0 },
  { code: 'ARS', name: 'Argentine Peso', symbol: 'Arg$', flag: '🇦🇷', rateToUSD: 980.0 },
  { code: 'SAR', name: 'Saudi Riyal', symbol: 'ر.س', flag: '🇸🇦', rateToUSD: 3.75 },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪', rateToUSD: 3.67 },
  { code: 'EGP', name: 'Egyptian Pound', symbol: 'ج.م', flag: '🇪🇬', rateToUSD: 48.50 },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳', rateToUSD: 83.75 },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$', flag: '🇨🇦', rateToUSD: 1.36 },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵', rateToUSD: 154.20 },
];

export const CurrencyConverter: React.FC<CurrencyConverterProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];
  
  // Default based on language
  const defaultFrom = currentLang === 'es' ? 'EUR' : currentLang === 'ar' ? 'SAR' : currentLang === 'hi' ? 'USD' : 'USD';
  const defaultTo = currentLang === 'es' ? 'MXN' : currentLang === 'ar' ? 'EGP' : currentLang === 'hi' ? 'INR' : 'EUR';

  const [fromCode, setFromCode] = useState<string>(defaultFrom);
  const [toCode, setToCode] = useState<string>(defaultTo);
  const [amount, setAmount] = useState<number>(1000);

  const fromCurr = CURRENCIES.find((c) => c.code === fromCode) || CURRENCIES[0];
  const toCurr = CURRENCIES.find((c) => c.code === toCode) || CURRENCIES[1];

  // Exchange rate: 1 From = X To
  const rate = (1 / fromCurr.rateToUSD) * toCurr.rateToUSD;
  const inverseRate = 1 / rate;
  const convertedAmount = amount * rate;

  const handleSwap = () => {
    setFromCode(toCode);
    setToCode(fromCode);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl">
      {/* Header */}
      <div className="flex items-center gap-3 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
          <RefreshCw className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {t.tools.currency.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {t.tools.currency.shortDesc}
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        {/* Converter Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
          {/* Amount */}
          <div className="md:col-span-3">
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              {t.common.amount}
            </label>
            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value) || 0)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-lg font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* From Currency */}
          <div className="md:col-span-3">
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              From
            </label>
            <select
              value={fromCode}
              onChange={(e) => setFromCode(e.target.value)}
              className="w-full px-3 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.code} - {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div className="md:col-span-1 flex justify-center pt-2 md:pt-6">
            <button
              onClick={handleSwap}
              className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-950 hover:text-emerald-600 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700 shadow-sm"
              title="Swap Currencies"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>
          </div>

          {/* To Currency */}
          <div className="md:col-span-4">
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              To
            </label>
            <select
              value={toCode}
              onChange={(e) => setToCode(e.target.value)}
              className="w-full px-3 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.code} - {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Live Conversion Banner */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl p-6 sm:p-7 shadow-lg">
          <div className="text-xs uppercase tracking-wider text-emerald-100 font-semibold mb-1">
            Converted Result (Mid-Market Rate)
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold font-mono mb-2">
            {toCurr.symbol} {convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {toCurr.code}
          </div>
          <div className="text-xs sm:text-sm text-emerald-100 font-mono">
            1 {fromCurr.code} = {rate.toFixed(4)} {toCurr.code} &nbsp;|&nbsp; 1 {toCurr.code} = {inverseRate.toFixed(4)} {fromCurr.code}
          </div>
        </div>

        {/* Quick Conversion Multipliers Table */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          {[1, 10, 50, 100, 500].map((val) => (
            <div
              key={val}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-center"
            >
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {val} {fromCurr.code}
              </div>
              <div className="text-sm font-bold font-mono text-slate-900 dark:text-white mt-1">
                {(val * rate).toFixed(2)} {toCurr.code}
              </div>
            </div>
          ))}
        </div>

        {/* Hidden Bank Fees Warning Box */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-800 dark:text-amber-200">
          <Info className="w-5 h-5 flex-shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
          <div>
            <span className="font-bold">Avoid Hidden Bank Spreads: </span>
            Most retail banks add an unstated 2.5% to 4% markup to this real mid-market exchange rate. 
            On a transfer of {fromCurr.symbol}{amount.toLocaleString()}, that represents up to {toCurr.symbol}{(convertedAmount * 0.035).toFixed(2)} lost in hidden fees.
          </div>
        </div>
      </div>
    </div>
  );
};
