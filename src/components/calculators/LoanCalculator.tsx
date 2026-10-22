import React, { useState, useMemo } from 'react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../translations';
import { 
  Landmark, 
  Home, 
  Copy, 
  Check, 
  RotateCcw, 
  Table, 
  ShieldCheck, 
  AlertCircle, 
  Percent, 
  DollarSign, 
  ChevronDown, 
  ChevronUp,
  Sparkles 
} from 'lucide-react';

interface LoanCalculatorProps {
  currentLang: Language;
}

type CalculatorMode = 'mortgage' | 'simple';

export const LoanCalculator: React.FC<LoanCalculatorProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];
  
  // Mode selection: 'mortgage' (with home price, down payment, taxes, insurance) vs 'simple' (basic loan)
  const [mode, setMode] = useState<CalculatorMode>('mortgage');

  // Currency
  const [currency, setCurrency] = useState<string>(
    currentLang === 'es' ? '€' : currentLang === 'ar' ? 'ر.س' : currentLang === 'hi' ? '₹' : '$'
  );

  // --- Mortgage Mode State ---
  const [homePrice, setHomePrice] = useState<number>(400000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [years, setYears] = useState<number>(30);
  
  // Taxes, Insurance & Fees
  const [includeTaxesInsurance, setIncludeTaxesInsurance] = useState<boolean>(true);
  const [propertyTaxAnnual, setPropertyTaxAnnual] = useState<number>(4800); // ~$400/mo (approx 1.2%)
  const [homeInsuranceAnnual, setHomeInsuranceAnnual] = useState<number>(1200); // ~$100/mo
  const [hoaMonthly, setHoaMonthly] = useState<number>(0);
  const [showAdvancedFees, setShowAdvancedFees] = useState<boolean>(false);

  // --- Simple Loan Mode State ---
  const [simplePrincipal, setSimplePrincipal] = useState<number>(25000);
  const [simpleRate, setSimpleRate] = useState<number>(7.5);
  const [simpleYears, setSimpleYears] = useState<number>(5);

  // Interactive UI
  const [copied, setCopied] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);

  // Derived loan principal for mortgage
  const downPaymentAmount = useMemo(() => {
    return Math.round((homePrice * downPaymentPercent) / 100);
  }, [homePrice, downPaymentPercent]);

  const mortgagePrincipal = useMemo(() => {
    return Math.max(0, homePrice - downPaymentAmount);
  }, [homePrice, downPaymentAmount]);

  // Main Amortization & Monthly Calculations
  const calculation = useMemo(() => {
    const isMortgage = mode === 'mortgage';
    const p = isMortgage ? mortgagePrincipal : Math.max(0, simplePrincipal);
    const annualRate = isMortgage ? Math.max(0, interestRate) : Math.max(0, simpleRate);
    const termYears = isMortgage ? Math.max(1, years) : Math.max(1, simpleYears);
    const totalMonths = termYears * 12;

    if (p === 0) {
      return {
        monthlyPI: 0,
        monthlyTax: 0,
        monthlyInsurance: 0,
        monthlyHoa: 0,
        monthlyPmi: 0,
        totalMonthly: 0,
        totalInterest: 0,
        totalPayment: 0,
        totalLifetimeCost: 0,
        schedule: [],
      };
    }

    const monthlyRate = annualRate / 100 / 12;

    // Monthly Principal & Interest (P&I)
    let monthlyPI = 0;
    if (monthlyRate === 0) {
      monthlyPI = p / totalMonths;
    } else {
      monthlyPI =
        (p * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }

    // Monthly escrow / add-ons
    let monthlyTax = 0;
    let monthlyInsurance = 0;
    let monthlyHoa = 0;
    let monthlyPmi = 0;

    if (isMortgage && includeTaxesInsurance) {
      monthlyTax = Math.max(0, propertyTaxAnnual) / 12;
      monthlyInsurance = Math.max(0, homeInsuranceAnnual) / 12;
      monthlyHoa = Math.max(0, hoaMonthly);
      // PMI applies if down payment < 20% (approx 0.6% annual of original loan)
      if (downPaymentPercent < 20) {
        monthlyPmi = (p * 0.006) / 12;
      }
    }

    const totalMonthly = monthlyPI + monthlyTax + monthlyInsurance + monthlyHoa + monthlyPmi;
    const totalLoanRepayment = monthlyPI * totalMonths;
    const totalInterest = Math.max(0, totalLoanRepayment - p);
    const totalLifetimeCost = isMortgage
      ? downPaymentAmount + (totalMonthly * totalMonths)
      : totalLoanRepayment;

    // Generate annual amortization schedule preview
    const schedule: {
      year: number;
      principalPaid: number;
      interestPaid: number;
      remainingBalance: number;
    }[] = [];

    let balance = p;
    for (let yr = 1; yr <= termYears; yr++) {
      let yrPrincipal = 0;
      let yrInterest = 0;

      for (let m = 1; m <= 12; m++) {
        const interestForMonth = balance * monthlyRate;
        const principalForMonth = monthlyPI - interestForMonth;
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
      monthlyPI,
      monthlyTax,
      monthlyInsurance,
      monthlyHoa,
      monthlyPmi,
      totalMonthly,
      totalInterest,
      totalPayment: totalLoanRepayment,
      totalLifetimeCost,
      schedule,
    };
  }, [
    mode,
    mortgagePrincipal,
    simplePrincipal,
    interestRate,
    simpleRate,
    years,
    simpleYears,
    includeTaxesInsurance,
    propertyTaxAnnual,
    homeInsuranceAnnual,
    hoaMonthly,
    downPaymentPercent,
    downPaymentAmount,
  ]);

  // Breakdown proportions for visual chart
  const proportions = useMemo(() => {
    const total = calculation.totalMonthly;
    if (total <= 0) return { pi: 100, tax: 0, ins: 0, fees: 0 };
    return {
      pi: Math.round((calculation.monthlyPI / total) * 100),
      tax: Math.round((calculation.monthlyTax / total) * 100),
      ins: Math.round((calculation.monthlyInsurance / total) * 100),
      fees: Math.round(((calculation.monthlyHoa + calculation.monthlyPmi) / total) * 100),
    };
  }, [calculation]);

  const handleCopy = () => {
    const isMortgage = mode === 'mortgage';
    const text = isMortgage
      ? `Mortgage Cost Estimator - SmartCalcLab\n` +
        `Home Purchase Price: ${currency} ${homePrice.toLocaleString()}\n` +
        `Down Payment (${downPaymentPercent}%): ${currency} ${downPaymentAmount.toLocaleString()}\n` +
        `Loan Amount: ${currency} ${mortgagePrincipal.toLocaleString()}\n` +
        `Interest Rate: ${interestRate}%\n` +
        `Loan Term: ${years} Years\n` +
        `-----------------------------------------\n` +
        `Total Monthly Payment (PITI): ${currency} ${calculation.totalMonthly.toFixed(2)}/mo\n` +
        ` - Principal & Interest: ${currency} ${calculation.monthlyPI.toFixed(2)}\n` +
        ` - Property Taxes: ${currency} ${calculation.monthlyTax.toFixed(2)}\n` +
        ` - Home Insurance: ${currency} ${calculation.monthlyInsurance.toFixed(2)}\n` +
        (calculation.monthlyPmi > 0 ? ` - PMI: ${currency} ${calculation.monthlyPmi.toFixed(2)}\n` : '') +
        (calculation.monthlyHoa > 0 ? ` - HOA Dues: ${currency} ${calculation.monthlyHoa.toFixed(2)}\n` : '') +
        `Total Lifetime Interest: ${currency} ${calculation.totalInterest.toFixed(2)}\n` +
        `Total Home Cost: ${currency} ${calculation.totalLifetimeCost.toFixed(2)}`
      : `Loan Payment Calculator - SmartCalcLab\n` +
        `Loan Amount: ${currency} ${simplePrincipal.toLocaleString()}\n` +
        `Interest Rate: ${simpleRate}%\n` +
        `Term: ${simpleYears} Years\n` +
        `-----------------------------------------\n` +
        `Monthly Payment: ${currency} ${calculation.monthlyPI.toFixed(2)}\n` +
        `Total Interest: ${currency} ${calculation.totalInterest.toFixed(2)}\n` +
        `Total Repayment: ${currency} ${calculation.totalPayment.toFixed(2)}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    if (mode === 'mortgage') {
      setHomePrice(400000);
      setDownPaymentPercent(20);
      setInterestRate(6.5);
      setYears(30);
      setPropertyTaxAnnual(4800);
      setHomeInsuranceAnnual(1200);
      setHoaMonthly(0);
    } else {
      setSimplePrincipal(25000);
      setSimpleRate(7.5);
      setSimpleYears(5);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
            {mode === 'mortgage' ? <Home className="w-6 h-6" /> : <Landmark className="w-6 h-6" />}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {mode === 'mortgage' ? 'Mortgage Cost Estimator & Calculator' : t.tools.loan.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {mode === 'mortgage'
                ? 'Estimate home mortgage payment with taxes, insurance, down payment, and PMI.'
                : t.tools.loan.shortDesc}
            </p>
          </div>
        </div>

        {/* Currency Switcher */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
          {['$', '€', '£', '₹', 'ر.س', 'Mex$'].map((curr) => (
            <button
              key={curr}
              onClick={() => setCurrency(curr)}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                currency === curr
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {curr}
            </button>
          ))}
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl max-w-md">
        <button
          onClick={() => setMode('mortgage')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            mode === 'mortgage'
              ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Mortgage & Home Loan</span>
        </button>
        <button
          onClick={() => setMode('simple')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            mode === 'simple'
              ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Landmark className="w-4 h-4" />
          <span>Simple Loan / EMI</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {mode === 'mortgage' ? (
            <>
              {/* Home Price */}
              <div>
                <div className="flex justify-between text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                  <label>Home Purchase Price</label>
                  <span className="text-blue-600 dark:text-blue-400 font-mono font-bold text-base">
                    {currency} {homePrice.toLocaleString()}
                  </span>
                </div>
                <div className="relative">
                  <span className="absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                    {currency}
                  </span>
                  <input
                    type="number"
                    min="10000"
                    max="10000000"
                    step="5000"
                    value={homePrice}
                    onChange={(e) => setHomePrice(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-base focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  />
                </div>
                <input
                  type="range"
                  min="50000"
                  max="1500000"
                  step="10000"
                  value={homePrice}
                  onChange={(e) => setHomePrice(Number(e.target.value))}
                  className="w-full mt-2 accent-blue-600 cursor-pointer"
                />
              </div>

              {/* Down Payment (% and $) */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-3">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <label className="flex items-center gap-1.5">
                    <span>Down Payment</span>
                    <span className="text-xs text-slate-400 font-normal">
                      (Loan Amount: {currency} {mortgagePrincipal.toLocaleString()})
                    </span>
                  </label>
                  <span className="text-blue-600 dark:text-blue-400 font-mono font-bold">
                    {currency} {downPaymentAmount.toLocaleString()} ({downPaymentPercent}%)
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                      Percentage (%)
                    </span>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="1"
                        value={downPaymentPercent}
                        onChange={(e) => {
                          const val = Math.min(100, Math.max(0, Number(e.target.value) || 0));
                          setDownPaymentPercent(val);
                        }}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                        %
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
                      Cash Down ({currency})
                    </span>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        max={homePrice}
                        step="1000"
                        value={downPaymentAmount}
                        onChange={(e) => {
                          const cash = Math.max(0, Number(e.target.value) || 0);
                          const pct = homePrice > 0 ? Math.round((cash / homePrice) * 100) : 0;
                          setDownPaymentPercent(Math.min(100, pct));
                        }}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Quick Down Payment Preset Buttons */}
                <div className="flex items-center gap-2 pt-1">
                  {[3.5, 5, 10, 15, 20, 25].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setDownPaymentPercent(pct)}
                      className={`flex-1 py-1 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                        downPaymentPercent === pct
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>

                {/* PMI Advice Notice */}
                {downPaymentPercent >= 20 ? (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium pt-1">
                    <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                    <span>20%+ Down: No Private Mortgage Insurance (PMI) required!</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-medium pt-1">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>
                      Down payment under 20% adds ~{currency} {Math.round(calculation.monthlyPmi)}/mo PMI.
                    </span>
                  </div>
                )}
              </div>

              {/* Interest Rate & Term */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Rate */}
                <div>
                  <div className="flex justify-between text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                    <label>Interest Rate</label>
                    <span className="text-blue-600 dark:text-blue-400 font-mono font-bold">
                      {interestRate}%
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      min="0.1"
                      max="25"
                      step="0.125"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value) || 0))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-base focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                      %
                    </span>
                  </div>
                </div>

                {/* Term */}
                <div>
                  <div className="flex justify-between text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                    <label>Loan Duration</label>
                    <span className="text-blue-600 dark:text-blue-400 font-mono font-bold">
                      {years} Years
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[15, 20, 30].map((yr) => (
                      <button
                        key={yr}
                        type="button"
                        onClick={() => setYears(yr)}
                        className={`py-3 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                          years === yr
                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                            : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                      >
                        {yr} Yrs
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Taxes, Insurance & Fees Toggle Section */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4 bg-slate-50/50 dark:bg-slate-800/40 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span>Include Taxes & Insurance (PITI)</span>
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Property taxes, homeowners insurance, and HOA dues.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeTaxesInsurance}
                      onChange={(e) => setIncludeTaxesInsurance(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {includeTaxesInsurance && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 animate-in fade-in duration-200">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Property Tax ({currency}/yr)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="100"
                        value={propertyTaxAnnual}
                        onChange={(e) => setPropertyTaxAnnual(Math.max(0, Number(e.target.value) || 0))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      <span className="text-[10px] text-slate-400 mt-0.5 block">
                        ~{currency} {Math.round(propertyTaxAnnual / 12)}/mo
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Home Insurance ({currency}/yr)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="50"
                        value={homeInsuranceAnnual}
                        onChange={(e) => setHomeInsuranceAnnual(Math.max(0, Number(e.target.value) || 0))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      <span className="text-[10px] text-slate-400 mt-0.5 block">
                        ~{currency} {Math.round(homeInsuranceAnnual / 12)}/mo
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        HOA Dues ({currency}/mo)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="10"
                        value={hoaMonthly}
                        onChange={(e) => setHoaMonthly(Math.max(0, Number(e.target.value) || 0))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      <span className="text-[10px] text-slate-400 mt-0.5 block">
                        Optional condo/HOA
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Simple Personal/Auto Loan Form */
            <>
              <div>
                <div className="flex justify-between text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                  <label>{t.common.amount}</label>
                  <span className="text-blue-600 dark:text-blue-400 font-mono font-bold">
                    {currency} {simplePrincipal.toLocaleString()}
                  </span>
                </div>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                    {currency}
                  </span>
                  <input
                    type="number"
                    min="500"
                    max="1000000"
                    step="1000"
                    value={simplePrincipal}
                    onChange={(e) => setSimplePrincipal(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full pl-9 pr-3 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <input
                  type="range"
                  min="1000"
                  max="100000"
                  step="1000"
                  value={simplePrincipal}
                  onChange={(e) => setSimplePrincipal(Number(e.target.value))}
                  className="w-full mt-2 accent-blue-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                  <label>{t.common.rate}</label>
                  <span className="text-blue-600 dark:text-blue-400 font-mono font-bold">
                    {simpleRate}%
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    min="0.1"
                    max="35"
                    step="0.25"
                    value={simpleRate}
                    onChange={(e) => setSimpleRate(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                    %
                  </span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                  <label>{t.common.years}</label>
                  <span className="text-blue-600 dark:text-blue-400 font-mono font-bold">
                    {simpleYears} Years ({simpleYears * 12} Months)
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {[1, 3, 5, 7].map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => setSimpleYears(yr)}
                      className={`py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                        simpleYears === yr
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {yr} Yrs
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Summary Copied to Clipboard!' : 'Copy Calculation Summary'}</span>
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
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xl">
          <div>
            <div className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-1">
              {mode === 'mortgage' ? 'Estimated Total Monthly Payment' : t.common.monthlyPayment}
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white mb-6">
              {currency}{' '}
              {calculation.totalMonthly.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              <span className="text-sm font-normal text-indigo-300 ml-1">/ month</span>
            </div>

            {/* Monthly breakdown itemization */}
            <div className="space-y-3.5 pt-4 border-t border-indigo-900/60 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-slate-300 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                  <span>Principal & Interest</span>
                </span>
                <span className="font-mono font-bold text-white">
                  {currency}{' '}
                  {calculation.monthlyPI.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>

              {mode === 'mortgage' && includeTaxesInsurance && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                      <span>Property Taxes</span>
                    </span>
                    <span className="font-mono font-bold text-amber-300">
                      {currency}{' '}
                      {calculation.monthlyTax.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                      <span>Home Insurance</span>
                    </span>
                    <span className="font-mono font-bold text-emerald-300">
                      {currency}{' '}
                      {calculation.monthlyInsurance.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>

                  {calculation.monthlyPmi > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                        <span>PMI (Under 20% down)</span>
                      </span>
                      <span className="font-mono font-bold text-rose-300">
                        {currency}{' '}
                        {calculation.monthlyPmi.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  )}

                  {calculation.monthlyHoa > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-400"></span>
                        <span>HOA Dues</span>
                      </span>
                      <span className="font-mono font-bold text-indigo-300">
                        {currency}{' '}
                        {calculation.monthlyHoa.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  )}
                </>
              )}

              {/* Total Interest & Lifetime Loan Cost */}
              <div className="pt-3 border-t border-indigo-900/60 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Total Interest (Lifetime)</span>
                  <span className="font-mono font-bold text-amber-400">
                    {currency}{' '}
                    {calculation.totalInterest.toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Total Loan Payments</span>
                  <span className="font-mono font-bold text-white">
                    {currency}{' '}
                    {calculation.totalPayment.toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Proportion Bar Chart */}
            <div className="mt-6">
              <div className="flex justify-between text-xs text-slate-300 mb-1.5 font-medium">
                <span>P&I ({proportions.pi}%)</span>
                {mode === 'mortgage' && includeTaxesInsurance && (
                  <span>Taxes & Fees ({100 - proportions.pi}%)</span>
                )}
              </div>
              <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden flex">
                <div style={{ width: `${proportions.pi}%` }} className="bg-blue-500 h-full"></div>
                <div style={{ width: `${proportions.tax}%` }} className="bg-amber-400 h-full"></div>
                <div style={{ width: `${proportions.ins}%` }} className="bg-emerald-400 h-full"></div>
                <div style={{ width: `${proportions.fees}%` }} className="bg-rose-400 h-full"></div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowSchedule(!showSchedule)}
            className="w-full mt-6 py-2.5 px-4 rounded-xl bg-indigo-900/60 hover:bg-indigo-900 text-indigo-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-indigo-700/50 cursor-pointer"
          >
            <Table className="w-4 h-4" />
            <span>{showSchedule ? 'Hide Amortization Schedule' : 'View Full Amortization Schedule'}</span>
          </button>
        </div>
      </div>

      {/* Amortization Schedule Table */}
      {showSchedule && (
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 animate-in fade-in duration-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Annual Amortization Schedule & Loan Payoff
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Year-by-year principal reduction vs cumulative interest payments.
              </p>
            </div>
            <button
              onClick={() => setShowSchedule(false)}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            >
              Close Table
            </button>
          </div>

          <div className="max-h-80 overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-700">
            <table className="w-full text-xs text-left rtl:text-right text-slate-600 dark:text-slate-300 font-mono">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 uppercase font-bold sticky top-0 shadow-sm">
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
                    <td className="p-3 font-semibold text-slate-900 dark:text-white">
                      Year {row.year}
                    </td>
                    <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">
                      {currency} {row.principalPaid.toFixed(2)}
                    </td>
                    <td className="p-3 text-amber-600 dark:text-amber-400 font-bold">
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
