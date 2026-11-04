import React, { useState, useMemo } from 'react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../translations';
import { Briefcase, Wallet, DollarSign, FileSpreadsheet, Code2, Copy, Check, Globe2, Sparkles, ArrowRight } from 'lucide-react';

interface SalaryCalculatorProps {
  currentLang: Language;
}

type CountryPreset = 'us' | 'uk' | 'ca' | 'es' | 'in' | 'custom';

export const SalaryCalculator: React.FC<SalaryCalculatorProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];
  const [payMode, setPayMode] = useState<'annual' | 'monthly' | 'hourly'>('annual');
  const [inputValue, setInputValue] = useState<number>(60000);
  const [countryPreset, setCountryPreset] = useState<CountryPreset>('us');
  const [taxRate, setTaxRate] = useState<number>(15.0);
  const [socialSecurityRate, setSocialSecurityRate] = useState<number>(7.65);
  const [paymentsCount, setPaymentsCount] = useState<number>(12); // 12 or 14 payments
  const [showEmbedModal, setShowEmbedModal] = useState<boolean>(false);
  const [copiedEmbed, setCopiedEmbed] = useState<boolean>(false);

  // Set country preset handler
  const handleCountryPresetChange = (preset: CountryPreset) => {
    setCountryPreset(preset);
    if (preset === 'us') {
      setTaxRate(15.0);
      setSocialSecurityRate(7.65); // FICA (6.2% SS + 1.45% Medicare)
      setPaymentsCount(12);
    } else if (preset === 'uk') {
      setTaxRate(20.0);
      setSocialSecurityRate(8.0); // National Insurance
      setPaymentsCount(12);
    } else if (preset === 'ca') {
      setTaxRate(16.0);
      setSocialSecurityRate(7.2); // CPP & EI
      setPaymentsCount(12);
    } else if (preset === 'es') {
      setTaxRate(19.0);
      setSocialSecurityRate(6.35); // Seguridad Social
      setPaymentsCount(14); // Pagas extras
    } else if (preset === 'in') {
      setTaxRate(10.0);
      setSocialSecurityRate(12.0); // Employee Provident Fund (EPF)
      setPaymentsCount(12);
    }
  };

  const currencySymbol = useMemo(() => {
    if (countryPreset === 'uk') return '£';
    if (countryPreset === 'ca') return 'C$';
    if (countryPreset === 'es') return '€';
    if (countryPreset === 'in') return '₹';
    if (currentLang === 'es' || currentLang === 'de' || currentLang === 'fr') return '€';
    if (currentLang === 'pt') return 'R$';
    if (currentLang === 'ar') return 'ر.س';
    if (currentLang === 'hi') return '₹';
    return '$';
  }, [countryPreset, currentLang]);

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

  const embedCodeSnippet = `<iframe src="https://smartcalclab.com/salary" width="100%" height="700" frameborder="0" style="border:none;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.08);"></iframe>\n<p style="font-size:12px;text-align:center;color:#64748b;margin-top:8px;">Powered by <a href="https://smartcalclab.com/salary" target="_blank" rel="noopener noreferrer" style="color:#0284c7;text-decoration:underline;">SmartCalcLab Salary Calculator</a></p>`;

  const copyEmbedCode = () => {
    navigator.clipboard.writeText(embedCodeSnippet);
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 3000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
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

        {/* Embed Widget Action */}
        <button
          onClick={() => setShowEmbedModal(true)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-cyan-500 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors self-start sm:self-auto"
          title="Embed this calculator widget on your website"
        >
          <Code2 className="w-4 h-4" />
          <span>Embed Widget</span>
        </button>
      </div>

      {/* Country & Regional Tax System Presets */}
      <div className="mt-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
          <Globe2 className="w-4 h-4 text-cyan-500" />
          <span>Select Regional Tax &amp; Payroll Preset:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'us', label: '🇺🇸 United States (FICA + Tax)', desc: '15% Fed/State + 7.65% FICA' },
            { id: 'uk', label: '🇬🇧 United Kingdom (PAYE)', desc: '20% PAYE + 8% NI' },
            { id: 'ca', label: '🇨🇦 Canada (Fed/Prov + CPP)', desc: '16% Tax + 7.2% CPP/EI' },
            { id: 'es', label: '🇪🇸 España (IRPF + 14 Pagas)', desc: '19% IRPF + 6.35% SS' },
            { id: 'in', label: '🇮🇳 India (New Regime + PF)', desc: '10% Tax + 12% PF' },
            { id: 'custom', label: '🌐 Custom / Global', desc: 'Manual sliders' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleCountryPresetChange(item.id as CountryPreset)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                countryPreset === item.id
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-750'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
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
              <label>Estimated Income Tax Rate (Federal / Provincial / IRPF)</label>
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
              onChange={(e) => {
                setTaxRate(Number(e.target.value));
                setCountryPreset('custom');
              }}
              className="w-full accent-cyan-600 cursor-pointer"
            />
          </div>

          {/* Social Security */}
          <div>
            <div className="flex justify-between text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
              <label>Social Security, Pension &amp; FICA Withholdings</label>
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
              onChange={(e) => {
                setSocialSecurityRate(Number(e.target.value));
                setCountryPreset('custom');
              }}
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
                14 Payments (With 2 Extra Pagas)
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
                <span className="text-slate-300">Social / Pension / FICA:</span>
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
                <span>Taxes &amp; Deductions ({deductionPercent}%)</span>
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

      {/* Popular Salary Conversions Benchmark Table (Captures 120000/52/40 & common salary queries) */}
      <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Popular Salary Benchmarks: Annual to Hourly &amp; Monthly
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Standard 2,080 working hours formula: (Annual Salary ÷ 52 weeks ÷ 40 hours = Hourly Rate)
            </p>
          </div>
          <span className="text-[11px] font-semibold text-cyan-600 dark:text-cyan-400 self-start sm:self-auto">
            Click row to calculate
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300">
                <th className="py-2.5 px-3 font-semibold">Annual Salary</th>
                <th className="py-2.5 px-3 font-semibold">Monthly Gross</th>
                <th className="py-2.5 px-3 font-semibold">Bi-Weekly (26x)</th>
                <th className="py-2.5 px-3 font-semibold">Hourly Rate (2,080 hrs)</th>
                <th className="py-2.5 px-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
              {[
                { annual: 35000, monthly: 2916.67, biweekly: 1346.15, hourly: 16.83 },
                { annual: 50000, monthly: 4166.67, biweekly: 1923.08, hourly: 24.04 },
                { annual: 75000, monthly: 6250.00, biweekly: 2884.62, hourly: 36.06 },
                { annual: 100000, monthly: 8333.33, biweekly: 3846.15, hourly: 48.08 },
                { annual: 120000, monthly: 10000.00, biweekly: 4615.38, hourly: 57.69, tag: 'Most Searched: 120000/52/40' },
                { annual: 150000, monthly: 12500.00, biweekly: 5769.23, hourly: 72.12 },
              ].map((bench) => (
                <tr
                  key={bench.annual}
                  onClick={() => {
                    setPayMode('annual');
                    setInputValue(bench.annual);
                  }}
                  className={`cursor-pointer transition-colors hover:bg-cyan-50/50 dark:hover:bg-cyan-950/20 ${
                    grossAnnual === bench.annual ? 'bg-cyan-50/80 dark:bg-cyan-950/40 font-bold text-cyan-600 dark:text-cyan-400' : 'text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <td className="py-2.5 px-3 font-bold flex items-center gap-1.5">
                    {currencySymbol} {bench.annual.toLocaleString()}
                    {bench.tag && (
                      <span className="text-[10px] bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 px-1.5 py-0.5 rounded-full font-sans font-bold">
                        {bench.tag}
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 px-3">{currencySymbol} {bench.monthly.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  <td className="py-2.5 px-3">{currencySymbol} {bench.biweekly.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  <td className="py-2.5 px-3 font-bold text-emerald-600 dark:text-emerald-400">{currencySymbol} {bench.hourly.toFixed(2)}/hr</td>
                  <td className="py-2.5 px-3 text-right">
                    <span className="text-[11px] text-cyan-600 dark:text-cyan-400 font-sans font-bold inline-flex items-center gap-1">
                      Calculate <ArrowRight className="w-3 h-3" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Embed Modal */}
      {showEmbedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-cyan-600" />
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Embed Salary Calculator on Your Website
                </h3>
              </div>
              <button
                onClick={() => setShowEmbedModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Copy and paste this HTML snippet into your blog, financial website, or CMS (WordPress, Webflow, Wix, Squarespace) to embed this interactive salary calculator for your visitors:
            </p>
            <div className="p-3 bg-slate-900 text-slate-200 rounded-xl font-mono text-xs overflow-x-auto border border-slate-800">
              <code>{embedCodeSnippet}</code>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowEmbedModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Close
              </button>
              <button
                onClick={copyEmbedCode}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-600 text-white flex items-center gap-1.5 hover:bg-cyan-700 shadow-sm"
              >
                {copiedEmbed ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmbed ? 'Copied Code!' : 'Copy Embed Code'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
