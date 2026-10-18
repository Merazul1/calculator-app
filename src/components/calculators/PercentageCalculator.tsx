import React, { useState } from 'react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../translations';
import { Percent, ShoppingBag, ArrowRight } from 'lucide-react';

interface PercentageCalculatorProps {
  currentLang: Language;
}

export const PercentageCalculator: React.FC<PercentageCalculatorProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];
  const [activeTab, setActiveTab] = useState<'of' | 'change' | 'discount'>('of');

  // Mode 1: What is X% of Y?
  const [percentVal, setPercentVal] = useState<number>(15);
  const [totalVal, setTotalVal] = useState<number>(200);

  // Mode 2: X is what % of Y?
  const [partVal, setPartVal] = useState<number>(45);
  const [baseVal, setBaseVal] = useState<number>(180);

  // Mode 3: Discount & Sales Tax
  const [origPrice, setOrigPrice] = useState<number>(120);
  const [discountPercent, setDiscountPercent] = useState<number>(25);
  const [taxPercent, setTaxPercent] = useState<number>(10);

  // Results
  const result1 = (percentVal / 100) * totalVal;
  const result2 = baseVal !== 0 ? (partVal / baseVal) * 100 : 0;
  
  const discountSavings = origPrice * (discountPercent / 100);
  const priceAfterDiscount = origPrice - discountSavings;
  const taxAmount = priceAfterDiscount * (taxPercent / 100);
  const finalPrice = priceAfterDiscount + taxAmount;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Percent className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {t.tools.percentage.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {t.tools.percentage.shortDesc}
            </p>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex flex-wrap gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('of')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'of'
                ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            X% of Y
          </button>
          <button
            onClick={() => setActiveTab('change')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'change'
                ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            X is what % of Y
          </button>
          <button
            onClick={() => setActiveTab('discount')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${
              activeTab === 'discount'
                ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Discount & Tax</span>
          </button>
        </div>
      </div>

      <div className="mt-8">
        {/* Mode 1 */}
        {activeTab === 'of' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  What is percentage (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={percentVal}
                    onChange={(e) => setPercentVal(Number(e.target.value) || 0)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-base font-bold"
                  />
                  <span className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                    %
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  Of number (Total)
                </label>
                <input
                  type="number"
                  value={totalVal}
                  onChange={(e) => setTotalVal(Number(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-base font-bold"
                />
              </div>
            </div>

            {/* Result Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg text-center">
              <div className="text-xs uppercase tracking-wider text-amber-100 font-semibold mb-1">
                Calculated Value
              </div>
              <div className="text-4xl sm:text-5xl font-extrabold font-mono mb-2">
                {result1.toFixed(2)}
              </div>
              <div className="text-xs text-amber-100 font-mono">
                {percentVal}% of {totalVal} = {result1.toFixed(2)}
              </div>
            </div>
          </div>
        )}

        {/* Mode 2 */}
        {activeTab === 'change' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  Number X
                </label>
                <input
                  type="number"
                  value={partVal}
                  onChange={(e) => setPartVal(Number(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-base font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  Is what percentage of Number Y
                </label>
                <input
                  type="number"
                  value={baseVal}
                  onChange={(e) => setBaseVal(Number(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-base font-bold"
                />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg text-center">
              <div className="text-xs uppercase tracking-wider text-amber-100 font-semibold mb-1">
                Percentage Ratio
              </div>
              <div className="text-4xl sm:text-5xl font-extrabold font-mono mb-2">
                {result2.toFixed(2)}%
              </div>
              <div className="text-xs text-amber-100 font-mono">
                {partVal} is {result2.toFixed(2)}% of {baseVal}
              </div>
            </div>
          </div>
        )}

        {/* Mode 3 */}
        {activeTab === 'discount' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Original Price ($)
                  </label>
                  <input
                    type="number"
                    value={origPrice}
                    onChange={(e) => setOrigPrice(Number(e.target.value) || 0)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-base font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(Number(e.target.value) || 0)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-base font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Sales Tax / IVA (%)
                  </label>
                  <input
                    type="number"
                    value={taxPercent}
                    onChange={(e) => setTaxPercent(Number(e.target.value) || 0)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-base font-bold"
                  />
                </div>
              </div>
            </div>

            <div className="md:col-span-5 p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-amber-950 text-white shadow-xl">
              <div className="text-xs uppercase tracking-wider text-amber-300 font-semibold mb-1">
                Final Checkout Total
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400 mb-4">
                ${finalPrice.toFixed(2)}
              </div>
              <div className="space-y-2 text-xs border-t border-amber-900/40 pt-3">
                <div className="flex justify-between">
                  <span className="text-slate-300">You Save:</span>
                  <span className="font-mono text-emerald-400 font-bold">-${discountSavings.toFixed(2)} ({discountPercent}%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Sale Price:</span>
                  <span className="font-mono">${priceAfterDiscount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Estimated Tax:</span>
                  <span className="font-mono text-amber-300">+${taxAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
