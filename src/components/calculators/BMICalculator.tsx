import React, { useState, useMemo } from 'react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../translations';
import { Activity, Heart, Scale, AlertCircle } from 'lucide-react';

interface BMICalculatorProps {
  currentLang: Language;
}

export const BMICalculator: React.FC<BMICalculatorProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');

  // Metric state
  const [heightCm, setHeightCm] = useState<number>(175);
  const [weightKg, setWeightKg] = useState<number>(72);

  // Imperial state
  const [feet, setFeet] = useState<number>(5);
  const [inches, setInches] = useState<number>(9);
  const [weightLbs, setWeightLbs] = useState<number>(160);

  const { bmi, category, color, idealWeightMin, idealWeightMax } = useMemo(() => {
    let calculatedBmi = 0;
    let minIdeal = 0;
    let maxIdeal = 0;

    if (unit === 'metric') {
      const hMeters = heightCm / 100;
      if (hMeters > 0) {
        calculatedBmi = weightKg / (hMeters * hMeters);
        minIdeal = 18.5 * (hMeters * hMeters);
        maxIdeal = 24.9 * (hMeters * hMeters);
      }
    } else {
      const totalInches = feet * 12 + inches;
      if (totalInches > 0) {
        calculatedBmi = (703 * weightLbs) / (totalInches * totalInches);
        minIdeal = (18.5 * totalInches * totalInches) / 703;
        maxIdeal = (24.9 * totalInches * totalInches) / 703;
      }
    }

    let cat = 'Normal Weight';
    let col = 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800';

    if (calculatedBmi < 18.5) {
      cat = 'Underweight';
      col = 'text-amber-500 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800';
    } else if (calculatedBmi >= 18.5 && calculatedBmi <= 24.9) {
      cat = 'Normal / Healthy Weight';
      col = 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800';
    } else if (calculatedBmi >= 25 && calculatedBmi <= 29.9) {
      cat = 'Overweight';
      col = 'text-orange-500 bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-800';
    } else {
      cat = 'Obesity (High Risk)';
      col = 'text-red-600 bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800';
    }

    return {
      bmi: calculatedBmi,
      category: cat,
      color: col,
      idealWeightMin: minIdeal,
      idealWeightMax: maxIdeal,
    };
  }, [unit, heightCm, weightKg, feet, inches, weightLbs]);

  // Indicator gauge position (clamped between 5% and 95%)
  const gaugePercent = Math.min(95, Math.max(5, ((bmi - 15) / (40 - 15)) * 100));

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {t.tools.bmi.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {t.tools.bmi.shortDesc}
            </p>
          </div>
        </div>

        {/* Unit Toggle */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold self-start sm:self-auto">
          <button
            onClick={() => setUnit('metric')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              unit === 'metric'
                ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Metric (cm / kg)
          </button>
          <button
            onClick={() => setUnit('imperial')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              unit === 'imperial'
                ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Imperial (ft / lbs)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        {/* Input Form Column */}
        <div className="lg:col-span-7 space-y-6">
          {unit === 'metric' ? (
            <>
              {/* Height Cm */}
              <div>
                <div className="flex justify-between text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                  <label>Height (Estatura)</label>
                  <span className="text-rose-600 dark:text-rose-400 font-mono font-bold">
                    {heightCm} cm
                  </span>
                </div>
                <input
                  type="number"
                  min="90"
                  max="240"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-base focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
                <input
                  type="range"
                  min="120"
                  max="220"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full mt-2 accent-rose-600 cursor-pointer"
                />
              </div>

              {/* Weight Kg */}
              <div>
                <div className="flex justify-between text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                  <label>Weight (Peso)</label>
                  <span className="text-rose-600 dark:text-rose-400 font-mono font-bold">
                    {weightKg} kg
                  </span>
                </div>
                <input
                  type="number"
                  min="30"
                  max="250"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-base focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
                <input
                  type="range"
                  min="40"
                  max="160"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full mt-2 accent-rose-600 cursor-pointer"
                />
              </div>
            </>
          ) : (
            <>
              {/* Imperial Height (ft / in) */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                  Height (Feet & Inches)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      type="number"
                      min="3"
                      max="7"
                      value={feet}
                      onChange={(e) => setFeet(Number(e.target.value) || 0)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-base"
                    />
                    <span className="text-xs text-slate-400 mt-1 block">Feet</span>
                  </div>
                  <div>
                    <input
                      type="number"
                      min="0"
                      max="11"
                      value={inches}
                      onChange={(e) => setInches(Number(e.target.value) || 0)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-base"
                    />
                    <span className="text-xs text-slate-400 mt-1 block">Inches</span>
                  </div>
                </div>
              </div>

              {/* Imperial Weight (lbs) */}
              <div>
                <div className="flex justify-between text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">
                  <label>Weight (Pounds)</label>
                  <span className="text-rose-600 dark:text-rose-400 font-mono font-bold">
                    {weightLbs} lbs
                  </span>
                </div>
                <input
                  type="number"
                  min="60"
                  max="500"
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(Number(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-base"
                />
              </div>
            </>
          )}

          {/* Ideal Weight Range Banner */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center gap-3">
            <Scale className="w-5 h-5 text-emerald-500 flex-shrink-0" />
            <div className="text-xs text-slate-600 dark:text-slate-300">
              <span className="font-bold text-slate-900 dark:text-white">Optimal Healthy Weight Range: </span>
              {idealWeightMin.toFixed(1)} {unit === 'metric' ? 'kg' : 'lbs'} – {idealWeightMax.toFixed(1)} {unit === 'metric' ? 'kg' : 'lbs'}
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-rose-950 text-white rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xl">
          <div>
            <div className="text-xs font-semibold text-rose-300 uppercase tracking-wider mb-1">
              Your Body Mass Index (BMI)
            </div>
            <div className="text-4xl sm:text-5xl font-extrabold font-mono text-white mb-2">
              {bmi.toFixed(1)}
            </div>

            <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${color} mb-6`}>
              {category}
            </div>

            {/* Visual Gauge Bar */}
            <div className="space-y-1.5 pt-4 border-t border-rose-900/60">
              <div className="flex justify-between text-[11px] text-slate-300 font-medium">
                <span>Underweight (&lt;18.5)</span>
                <span>Normal (18.5-25)</span>
                <span>Overweight (25+)</span>
              </div>
              <div className="relative w-full h-3 rounded-full bg-slate-800 overflow-hidden flex">
                <div className="w-[20%] bg-amber-400 h-full"></div>
                <div className="w-[30%] bg-emerald-500 h-full"></div>
                <div className="w-[25%] bg-orange-400 h-full"></div>
                <div className="w-[25%] bg-rose-600 h-full"></div>
              </div>
              {/* Pointer */}
              <div className="relative w-full h-4">
                <div
                  style={{ left: `${gaugePercent}%` }}
                  className="absolute -top-1 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-white"
                ></div>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-rose-900/40 text-[11px] font-mono text-slate-300">
              <span className="text-rose-300 font-bold">Metric Formula: </span>
              {unit === 'metric' 
                ? `${weightKg} kg ÷ (${(heightCm / 100).toFixed(2)} m)² = ${bmi.toFixed(2)} kg/m²`
                : `703 × ${weightLbs} lbs ÷ (${feet * 12 + inches} in)² = ${bmi.toFixed(2)}`}
            </div>

            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800/40 text-xs text-rose-200 flex items-start gap-2">
              <Heart className="w-4 h-4 flex-shrink-0 text-rose-400 mt-0.5" />
              <span>
                Maintaining a healthy weight lowers lifetime cardiovascular risk and promotes longevity.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* WHO Body Mass Index Classification Table */}
      <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Scale className="w-5 h-5 text-rose-500" />
            Official WHO Body Mass Index (BMI) Standards
          </h2>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            kg &amp; cm Standards
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300">
                <th className="py-2.5 px-3 font-semibold">BMI Range (kg/m²)</th>
                <th className="py-2.5 px-3 font-semibold">Classification (WHO)</th>
                <th className="py-2.5 px-3 font-semibold">Sample Scores</th>
                <th className="py-2.5 px-3 font-semibold">Health Risk Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr className={bmi < 18.5 ? 'bg-amber-50/80 dark:bg-amber-950/30 font-semibold text-amber-700 dark:text-amber-400' : 'text-slate-700 dark:text-slate-300'}>
                <td className="py-2.5 px-3 font-mono">&lt; 18.5</td>
                <td className="py-2.5 px-3">Underweight</td>
                <td className="py-2.5 px-3 font-mono text-slate-500 dark:text-slate-400">16.5, 17.8</td>
                <td className="py-2.5 px-3">Nutritional deficiency risk</td>
              </tr>
              <tr className={bmi >= 18.5 && bmi <= 24.9 ? 'bg-emerald-50/80 dark:bg-emerald-950/30 font-semibold text-emerald-700 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'}>
                <td className="py-2.5 px-3 font-mono">18.5 – 24.9</td>
                <td className="py-2.5 px-3 flex items-center gap-1.5">
                  Normal / Healthy Weight
                  {bmi >= 18.5 && bmi <= 24.9 && (
                    <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold">You</span>
                  )}
                </td>
                <td className="py-2.5 px-3 font-mono text-slate-500 dark:text-slate-400">19.34, 21.3, 23.1</td>
                <td className="py-2.5 px-3">Lowest overall mortality risk</td>
              </tr>
              <tr className={bmi >= 25.0 && bmi <= 29.9 ? 'bg-orange-50/80 dark:bg-orange-950/30 font-semibold text-orange-700 dark:text-orange-400' : 'text-slate-700 dark:text-slate-300'}>
                <td className="py-2.5 px-3 font-mono">25.0 – 29.9</td>
                <td className="py-2.5 px-3 flex items-center gap-1.5">
                  Overweight (Pre-obese)
                  {bmi >= 25.0 && bmi <= 29.9 && (
                    <span className="text-[10px] bg-orange-600 text-white px-2 py-0.5 rounded-full font-bold">You</span>
                  )}
                </td>
                <td className="py-2.5 px-3 font-mono text-slate-500 dark:text-slate-400">26.2, 28.5</td>
                <td className="py-2.5 px-3">Moderate cardiovascular risk</td>
              </tr>
              <tr className={bmi >= 30.0 && bmi <= 34.9 ? 'bg-red-50/80 dark:bg-red-950/30 font-semibold text-red-700 dark:text-red-400' : 'text-slate-700 dark:text-slate-300'}>
                <td className="py-2.5 px-3 font-mono">30.0 – 34.9</td>
                <td className="py-2.5 px-3">Obesity Class I</td>
                <td className="py-2.5 px-3 font-mono text-slate-500 dark:text-slate-400">31.0, 33.4</td>
                <td className="py-2.5 px-3">High risk of hypertension &amp; diabetes</td>
              </tr>
              <tr className={bmi >= 35.0 ? 'bg-red-50/80 dark:bg-red-950/30 font-semibold text-red-700 dark:text-red-400' : 'text-slate-700 dark:text-slate-300'}>
                <td className="py-2.5 px-3 font-mono">&ge; 35.0</td>
                <td className="py-2.5 px-3">Obesity Class II &amp; III</td>
                <td className="py-2.5 px-3 font-mono text-slate-500 dark:text-slate-400">36.0, 41.2</td>
                <td className="py-2.5 px-3">Very severe clinical health risk</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
