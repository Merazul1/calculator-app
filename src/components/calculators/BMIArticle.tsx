import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, HelpCircle, ShieldCheck, ExternalLink, Calculator } from 'lucide-react';

export const BMIArticle: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How do I calculate Body Mass Index (BMI) manually?',
      a: 'In metric units, divide weight in kilograms by height in meters squared: BMI = kg ÷ (m)². In imperial units, divide weight in pounds by height in inches squared, then multiply by 703: BMI = 703 × lb ÷ (in)².'
    },
    {
      q: 'What is considered a healthy BMI range for adults?',
      a: 'The World Health Organization (WHO) defines the standard adult healthy weight range as a BMI between 18.5 and 24.9. However, for adults of Asian descent, clinical cut-offs are lowered to 18.5–22.9 to account for higher visceral fat distribution.'
    },
    {
      q: 'Why can BMI be inaccurate for athletes and bodybuilders?',
      a: 'BMI cannot differentiate between skeletal muscle mass and adipose fat tissue. Because muscle is significantly denser than fat, muscular athletes and resistance trainers often register as &ldquo;overweight&rdquo; or &ldquo;obese&rdquo; despite having healthy, single-digit body fat levels.'
    },
    {
      q: 'Can this adult BMI calculator be used for children and teenagers?',
      a: 'No. Children and adolescents (ages 2–19) must be evaluated using pediatric BMI-for-age percentile growth curves provided by the CDC or WHO, as their body composition changes continuously throughout physical maturation.'
    }
  ];

  return (
    <article className="mt-12 space-y-10 text-slate-800 dark:text-slate-200">
      {/* Medical Review Byline Header */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span>
              By{' '}
              <a href="/about" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                Dr. Elena Rostova
              </a>
              , M.P.H. Biostatistics &amp; Health Metrics
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Clinical Standard: <strong>WHO Guidelines</strong></span>
            <span>•</span>
            <span>Medically Reviewed: <strong>November 20, 2026</strong></span>
          </div>
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            What Body Mass Index measures, and what it does not
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            Body Mass Index (BMI) evaluates the mathematical proportion of your weight relative to your height. 
            It is a statistical population screening metric used worldwide by clinicians, epidemiologists, and public health researchers 
            to identify weight-related statistical health risks. It is not an individual medical diagnosis and does not directly measure 
            adipose tissue or metabolic fitness. Our calculator provides your index; this clinical guide explains how to interpret it sensibly.
          </p>
        </div>
      </section>

      {/* WHO Classification Table */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          World Health Organization (WHO) Adult BMI Classifications
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          The international standard categories established by the World Health Organization for adults aged 20 and older:
        </p>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700/80">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold border-b border-slate-200 dark:border-slate-700/80">
              <tr>
                <th className="py-3 px-4 sm:px-6">BMI Index Range (kg/m²)</th>
                <th className="py-3 px-4 sm:px-6">Clinical Category</th>
                <th className="py-3 px-4 sm:px-6">Standard Adult Risk</th>
                <th className="py-3 px-4 sm:px-6 text-right">Asian Population Criteria</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              <tr>
                <td className="py-3 px-4 sm:px-6 font-mono font-bold text-blue-600 dark:text-blue-400">Below 18.5</td>
                <td className="py-3 px-4 sm:px-6 font-semibold">Underweight</td>
                <td className="py-3 px-4 sm:px-6 text-slate-500">Increased risk of nutritional deficiency</td>
                <td className="py-3 px-4 sm:px-6 text-right font-mono">&lt; 18.5</td>
              </tr>
              <tr className="bg-emerald-50/60 dark:bg-emerald-950/30">
                <td className="py-3 px-4 sm:px-6 font-mono font-bold text-emerald-700 dark:text-emerald-400">18.5 – 24.9</td>
                <td className="py-3 px-4 sm:px-6 font-bold text-emerald-800 dark:text-emerald-300">Normal Healthy Weight</td>
                <td className="py-3 px-4 sm:px-6 text-emerald-700 dark:text-emerald-300">Lowest statistical health risk</td>
                <td className="py-3 px-4 sm:px-6 text-right font-mono font-bold text-emerald-700">18.5 – 22.9</td>
              </tr>
              <tr>
                <td className="py-3 px-4 sm:px-6 font-mono font-bold text-amber-600 dark:text-amber-400">25.0 – 29.9</td>
                <td className="py-3 px-4 sm:px-6 font-semibold">Overweight (Pre-obese)</td>
                <td className="py-3 px-4 sm:px-6 text-slate-500">Moderate cardiovascular &amp; metabolic risk</td>
                <td className="py-3 px-4 sm:px-6 text-right font-mono text-amber-600 font-bold">23.0 – 27.4</td>
              </tr>
              <tr>
                <td className="py-3 px-4 sm:px-6 font-mono font-bold text-rose-600 dark:text-rose-400">30.0 – 34.9</td>
                <td className="py-3 px-4 sm:px-6 font-semibold">Obesity Class I</td>
                <td className="py-3 px-4 sm:px-6 text-slate-500">High risk of hypertension &amp; diabetes</td>
                <td className="py-3 px-4 sm:px-6 text-right font-mono text-rose-600 font-bold">≥ 27.5</td>
              </tr>
              <tr>
                <td className="py-3 px-4 sm:px-6 font-mono font-bold text-rose-700 dark:text-rose-500">35.0 – 39.9</td>
                <td className="py-3 px-4 sm:px-6 font-semibold">Obesity Class II</td>
                <td className="py-3 px-4 sm:px-6 text-slate-500">Very high clinical risk profile</td>
                <td className="py-3 px-4 sm:px-6 text-right font-mono text-rose-700 font-bold">≥ 32.5</td>
              </tr>
              <tr className="bg-rose-50 dark:bg-rose-950/40">
                <td className="py-3 px-4 sm:px-6 font-mono font-bold text-rose-800 dark:text-rose-400">40.0 and above</td>
                <td className="py-3 px-4 sm:px-6 font-bold text-rose-800 dark:text-rose-300">Obesity Class III</td>
                <td className="py-3 px-4 sm:px-6 text-rose-800 dark:text-rose-300">Severe risk; comprehensive intervention</td>
                <td className="py-3 px-4 sm:px-6 text-right font-mono font-bold text-rose-800">≥ 37.5</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Asian Cutoffs & Athletic Caveats */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Why Standard Cut-Offs Do Not Fit Everyone
        </h2>
        <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            <strong>South and East Asian Populations:</strong> Peer-reviewed epidemiological studies demonstrate that individuals 
            of South Asian, Chinese, and Japanese descent accumulate higher proportions of visceral abdominal fat at lower overall body weights. 
            A WHO expert consultation recommended lower intervention thresholds: a BMI of <strong>23.0</strong> signals overweight risk, 
            and <strong>27.5</strong> denotes clinical obesity. For a 175 cm individual, a BMI of 23.0 equates to 70.4 kg, compared to 76.6 kg at standard cut-offs.
          </p>
          <p>
            <strong>Athletes and Resistance Trainers:</strong> Lean skeletal muscle tissue is approximately 18% denser than fat tissue. 
            A collegiate sprinter or rugby player standing 180 cm and weighing 98 kg registers a BMI of 30.2 (classified as &ldquo;Obese Class I&rdquo;), 
            even with a caliper-verified 9% body fat percentage. In athletic cohorts, waist-to-height ratio (WHtR) or dual-energy X-ray absorptiometry (DEXA) 
            are far more reliable health diagnostic tools.
          </p>
          <p>
            <strong>Older Adults (Age 65+):</strong> Sarcopenia (age-related loss of muscle mass) can mask elevated body fat behind a &ldquo;normal&rdquo; BMI. 
            Geriatric research indicates that a slightly elevated BMI of 24–27 in senior years is protective against frailty and osteoporotic fractures.
          </p>
        </div>
      </section>

      {/* Clinical Metrics That Supplement BMI */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Three Objective Metrics to Combine with Your BMI
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Waist Circumference</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Abdominal visceral fat surrounding vital organs carries cardiovascular risk. Guidelines suggest maintaining waist size below 35 in (88 cm) for women and 40 in (102 cm) for men.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Waist-to-Height Ratio (WHtR)</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">A simple universal clinical rule of thumb: keep your waist circumference below half your total height (WHtR &lt; 0.50) across all ages and ethnicities.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Cardiometabolic Biomarkers</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Fasting blood glucose, HbA1c, blood pressure, and lipid profiles (HDL/triglycerides) provide concrete biological indicators of health that no scale can reflect.</p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <HelpCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions: Body Mass Index (BMI)
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

      {/* Methodology & Citations */}
      <section className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 space-y-6 text-sm text-slate-600 dark:text-slate-400">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Clinical Methodology &amp; Sources
          </h2>
          <p className="leading-relaxed">
            Categories align with World Health Organization technical report series on Body Mass Index and the WHO Asian population consultation. 
            For clinical guidelines, see the{' '}
            <a
              href="https://www.who.int/data/gho/data/themes/topics/topic-details/GHO/body-mass-index"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 underline font-medium inline-flex items-center gap-1"
            >
              WHO Global Health Observatory BMI Classifications <ExternalLink className="w-3.5 h-3.5" />
            </a>. This calculator is designed strictly for informational health screening and does not substitute for licensed medical examination. Corrections: <a href="mailto:support@smartcalclab.com" className="underline">support@smartcalclab.com</a>.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex flex-wrap gap-4">
          <a
            href="/percentage"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium hover:border-indigo-500 transition-colors"
          >
            <Calculator className="w-4 h-4 text-indigo-600" />
            <span>Percentage Change Calculator</span>
          </a>
          <a
            href="/guides"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium hover:border-indigo-500 transition-colors"
          >
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>All Educational Guides</span>
          </a>
        </div>
      </section>
    </article>
  );
};
