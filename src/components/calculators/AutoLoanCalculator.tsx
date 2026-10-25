import React, { useState, useMemo } from 'react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../translations';
import { 
  Car, 
  Copy, 
  Check, 
  RotateCcw, 
  Table, 
  Percent, 
  ShieldCheck, 
  AlertCircle, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface AutoLoanCalculatorProps {
  currentLang: Language;
}

export const AutoLoanCalculator: React.FC<AutoLoanCalculatorProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];

  // Currency
  const [currency, setCurrency] = useState<string>(
    currentLang === 'es' ? '€' : currentLang === 'ar' ? 'ر.س' : currentLang === 'hi' ? '₹' : currentLang === 'pt' ? 'R$' : '$'
  );

  // Vehicle Financing Inputs
  const [vehiclePrice, setVehiclePrice] = useState<number>(35000);
  const [downPayment, setDownPayment] = useState<number>(5000);
  const [tradeInValue, setTradeInValue] = useState<number>(3000);
  const [salesTaxRate, setSalesTaxRate] = useState<number>(7.0);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [termMonths, setTermMonths] = useState<number>(60); // 5 years

  // Interactive UI
  const [copied, setCopied] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);

  // Calculations
  const calculation = useMemo(() => {
    const price = Math.max(0, vehiclePrice);
    const down = Math.max(0, downPayment);
    const tradeIn = Math.max(0, tradeInValue);
    const taxRate = Math.max(0, salesTaxRate);
    const apr = Math.max(0, interestRate);
    const n = Math.max(1, termMonths);

    // In most jurisdictions, sales tax applies to vehicle price minus trade-in
    const taxableAmount = Math.max(0, price - tradeIn);
    const salesTaxAmount = Math.round((taxableAmount * taxRate) / 100);

    // Total Amount to Finance (Principal)
    const principal = Math.max(0, price - down - tradeIn + salesTaxAmount);

    if (principal === 0) {
      return {
        monthlyPayment: 0,
        principal: 0,
        salesTaxAmount,
        totalInterest: 0,
        totalPayments: 0,
        totalCost: down + tradeIn,
        schedule: [],
      };
    }

    const monthlyRate = apr / 100 / 12;

    let monthlyPayment = 0;
    if (monthlyRate === 0) {
      monthlyPayment = principal / n;
    } else {
      monthlyPayment =
        (principal * (monthlyRate * Math.pow(1 + monthlyRate, n))) /
        (Math.pow(1 + monthlyRate, n) - 1);
    }

    const totalPayments = monthlyPayment * n;
    const totalInterest = Math.max(0, totalPayments - principal);
    const totalCost = down + tradeIn + totalPayments;

    // Monthly Amortization Schedule
    const schedule: {
      month: number;
      principalPaid: number;
      interestPaid: number;
      remainingBalance: number;
    }[] = [];

    let balance = principal;
    for (let m = 1; m <= n; m++) {
      const interestForMonth = balance * monthlyRate;
      const principalForMonth = monthlyPayment - interestForMonth;
      balance = Math.max(0, balance - principalForMonth);

      // Save yearly milestone or first 12 months & full end
      schedule.push({
        month: m,
        principalPaid: principalForMonth,
        interestPaid: interestForMonth,
        remainingBalance: balance,
      });
    }

    return {
      monthlyPayment,
      principal,
      salesTaxAmount,
      totalInterest,
      totalPayments,
      totalCost,
      schedule,
    };
  }, [vehiclePrice, downPayment, tradeInValue, salesTaxRate, interestRate, termMonths]);

  // Proportions for visual breakdown bar
  const proportions = useMemo(() => {
    const total = calculation.totalCost;
    if (total <= 0) return { vehicle: 80, tax: 8, interest: 12 };
    return {
      vehicle: Math.round(((vehiclePrice - calculation.salesTaxAmount) / total) * 100),
      tax: Math.round((calculation.salesTaxAmount / total) * 100),
      interest: Math.round((calculation.totalInterest / total) * 100),
    };
  }, [calculation, vehiclePrice]);

  const handleCopy = () => {
    const text =
      `Auto Loan & Car Payment Calculator - SmartCalcLab\n` +
      `Vehicle Price: ${currency} ${vehiclePrice.toLocaleString()}\n` +
      `Down Payment: ${currency} ${downPayment.toLocaleString()}\n` +
      `Trade-in Value: ${currency} ${tradeInValue.toLocaleString()}\n` +
      `Sales Tax (${salesTaxRate}%): ${currency} ${calculation.salesTaxAmount.toLocaleString()}\n` +
      `Amount Financed (Principal): ${currency} ${calculation.principal.toLocaleString()}\n` +
      `Loan Term: ${termMonths} Months (${(termMonths / 12).toFixed(1)} Years)\n` +
      `Interest Rate (APR): ${interestRate}%\n` +
      `-----------------------------------------\n` +
      `Estimated Monthly Payment: ${currency} ${calculation.monthlyPayment.toFixed(2)}/mo\n` +
      `Total Loan Interest: ${currency} ${calculation.totalInterest.toFixed(2)}\n` +
      `Total Cost of Car: ${currency} ${calculation.totalCost.toFixed(2)}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setVehiclePrice(35000);
    setDownPayment(5000);
    setTradeInValue(3000);
    setSalesTaxRate(7.0);
    setInterestRate(6.5);
    setTermMonths(60);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400 flex items-center justify-center flex-shrink-0">
            <Car className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {t.tools.autoloan?.name || 'Auto Loan & Car Payment Calculator'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {t.tools.autoloan?.shortDesc || 'Calculate monthly car payments, trade-in allowance, sales tax, and APR interest.'}
            </p>
          </div>
        </div>

        {/* Currency Switcher */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
          {['$', '€', '£', '₹', 'R$', 'Mex$'].map((curr) => (
            <button
              key={curr}
              onClick={() => setCurrency(curr)}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                currency === curr
                  ? 'bg-white dark:bg-slate-900 text-orange-600 dark:text-orange-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {curr}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Vehicle Price */}
          <div>
            <div className="flex justify-between text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
              <label>Vehicle Purchase Price</label>
              <span className="text-orange-600 dark:text-orange-400 font-mono font-bold text-base">
                {currency} {vehiclePrice.toLocaleString()}
              </span>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                {currency}
              </span>
              <input
                type="number"
                min="1000"
                max="500000"
                step="1000"
                value={vehiclePrice}
                onChange={(e) => setVehiclePrice(Math.max(0, Number(e.target.value) || 0))}
                className="w-full pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-base focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
              />
            </div>
            <input
              type="range"
              min="5000"
              max="120000"
              step="1000"
              value={vehiclePrice}
              onChange={(e) => setVehiclePrice(Number(e.target.value))}
              className="w-full mt-2 accent-orange-600 cursor-pointer"
            />
          </div>

          {/* Down Payment & Trade-In (2 Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Down Payment */}
            <div>
              <div className="flex justify-between text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                <label>Cash Down Payment</label>
                <span className="text-orange-600 dark:text-orange-400 font-mono font-bold">
                  {currency} {downPayment.toLocaleString()}
                </span>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                  {currency}
                </span>
                <input
                  type="number"
                  min="0"
                  max={vehiclePrice}
                  step="500"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Trade-in Allowance */}
            <div>
              <div className="flex justify-between text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                <label>Trade-in Value</label>
                <span className="text-orange-600 dark:text-orange-400 font-mono font-bold">
                  {currency} {tradeInValue.toLocaleString()}
                </span>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                  {currency}
                </span>
                <input
                  type="number"
                  min="0"
                  max={vehiclePrice}
                  step="500"
                  value={tradeInValue}
                  onChange={(e) => setTradeInValue(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Sales Tax & Interest Rate */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Sales Tax */}
            <div>
              <div className="flex justify-between text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                <label>Sales Tax Rate (%)</label>
                <span className="text-orange-600 dark:text-orange-400 font-mono font-bold">
                  {salesTaxRate}%
                </span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="20"
                  step="0.25"
                  value={salesTaxRate}
                  onChange={(e) => setSalesTaxRate(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                  %
                </span>
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">
                Tax: {currency} {calculation.salesTaxAmount.toLocaleString()}
              </span>
            </div>

            {/* Interest Rate */}
            <div>
              <div className="flex justify-between text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                <label>Interest Rate (APR)</label>
                <span className="text-orange-600 dark:text-orange-400 font-mono font-bold">
                  {interestRate}%
                </span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  min="0.1"
                  max="25"
                  step="0.25"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                  %
                </span>
              </div>
            </div>
          </div>

          {/* Loan Term (Months) */}
          <div>
            <div className="flex justify-between text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
              <label>Loan Duration (Months)</label>
              <span className="text-orange-600 dark:text-orange-400 font-mono font-bold">
                {termMonths} Months ({(termMonths / 12).toFixed(1)} Years)
              </span>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {[24, 36, 48, 60, 72, 84].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setTermMonths(m)}
                  className={`py-2.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                    termMonths === m
                      ? 'bg-orange-600 text-white border-orange-600 shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {m}m
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 active:scale-[0.99] text-white font-bold text-sm shadow-md shadow-orange-500/20 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Calculation Summary'}</span>
            </button>
            <button
              onClick={handleReset}
              className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Reset inputs to defaults"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Results Card Column (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-amber-950 text-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xl">
          <div>
            <div className="text-xs font-semibold text-orange-300 uppercase tracking-wider mb-1">
              Estimated Monthly Car Payment
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white mb-6">
              {currency}{' '}
              {calculation.monthlyPayment.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              <span className="text-sm font-normal text-orange-200 ml-1">/ month</span>
            </div>

            {/* Financial itemization breakdown */}
            <div className="space-y-3.5 pt-4 border-t border-amber-900/60 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Vehicle Price</span>
                <span className="font-mono font-bold text-white">
                  {currency} {vehiclePrice.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center text-emerald-400">
                <span>Down Payment & Trade-In</span>
                <span className="font-mono font-bold">
                  - {currency} {(downPayment + tradeInValue).toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center text-amber-300">
                <span>Sales Tax ({salesTaxRate}%)</span>
                <span className="font-mono font-bold">
                  + {currency} {calculation.salesTaxAmount.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-amber-900/40">
                <span className="text-slate-200 font-semibold">Total Amount Financed</span>
                <span className="font-mono font-bold text-white text-base">
                  {currency} {calculation.principal.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-400">Total Loan Interest</span>
                <span className="font-mono font-bold text-rose-400">
                  {currency}{' '}
                  {calculation.totalInterest.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-amber-900/40">
                <span className="text-slate-300 font-semibold">Total Vehicle Cost</span>
                <span className="font-mono font-bold text-orange-300 text-base">
                  {currency}{' '}
                  {calculation.totalCost.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>

            {/* Visual Breakdown Proportions */}
            <div className="mt-6">
              <div className="flex justify-between text-xs text-slate-300 mb-1.5 font-medium">
                <span>Vehicle ({proportions.vehicle}%)</span>
                <span>Tax ({proportions.tax}%)</span>
                <span>Interest ({proportions.interest}%)</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden flex">
                <div style={{ width: `${proportions.vehicle}%` }} className="bg-orange-500 h-full"></div>
                <div style={{ width: `${proportions.tax}%` }} className="bg-amber-400 h-full"></div>
                <div style={{ width: `${proportions.interest}%` }} className="bg-rose-500 h-full"></div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowSchedule(!showSchedule)}
            className="w-full mt-6 py-2.5 px-4 rounded-xl bg-amber-900/60 hover:bg-amber-900 text-orange-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-amber-700/50 cursor-pointer"
          >
            <Table className="w-4 h-4" />
            <span>{showSchedule ? 'Hide Amortization Table' : 'View Full Amortization Schedule'}</span>
          </button>
        </div>
      </div>

      {/* Amortization Schedule Table */}
      {showSchedule && (
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 animate-in fade-in duration-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Auto Loan Monthly Amortization Schedule
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Detailed monthly payment schedule showing principal paydown and interest costs.
              </p>
            </div>
            <button
              onClick={() => setShowSchedule(false)}
              className="text-xs text-orange-600 dark:text-orange-400 hover:underline cursor-pointer"
            >
              Close Table
            </button>
          </div>

          <div className="max-h-80 overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-700">
            <table className="w-full text-xs text-left rtl:text-right text-slate-600 dark:text-slate-300 font-mono">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 uppercase font-bold sticky top-0 shadow-sm">
                <tr>
                  <th className="p-3">Month</th>
                  <th className="p-3">Principal Paid</th>
                  <th className="p-3">Interest Paid</th>
                  <th className="p-3">Remaining Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {calculation.schedule.map((row) => (
                  <tr key={row.month} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-3 font-semibold text-slate-900 dark:text-white">
                      Month {row.month}
                    </td>
                    <td className="p-3 text-orange-600 dark:text-orange-400 font-bold">
                      {currency} {row.principalPaid.toFixed(2)}
                    </td>
                    <td className="p-3 text-rose-600 dark:text-rose-400 font-bold">
                      {currency} {row.interestPaid.toFixed(2)}
                    </td>
                    <td className="p-3">
                      {currency} {row.remainingBalance.toFixed(2)}
                    </td>
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
