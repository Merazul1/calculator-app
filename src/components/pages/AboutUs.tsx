import React from 'react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../translations';
import { Calculator, Target, Users, Zap, Award } from 'lucide-react';

interface AboutUsProps {
  currentLang: Language;
}

export const AboutUs: React.FC<AboutUsProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-8 text-slate-700 dark:text-slate-300">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 text-center sm:text-left rtl:sm:text-right">
        <div className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider mb-2">
          <Award className="w-4 h-4" />
          <span>Our Mission & Vision</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          {t.legal.aboutTitle}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-2xl">
          Empowering everyday people and professionals across the globe with instantaneous, verified, and 100% free calculation utilities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl bg-blue-50/60 dark:bg-slate-800/60 border border-blue-100 dark:border-slate-700">
          <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-3" />
          <h3 className="font-bold text-slate-900 dark:text-white mb-2">Lightning Fast</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            All calculations execute in real-time right in your browser with zero server latency or data lag.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-indigo-50/60 dark:bg-slate-800/60 border border-indigo-100 dark:border-slate-700">
          <Target className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mb-3" />
          <h3 className="font-bold text-slate-900 dark:text-white mb-2">High Accuracy</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Every formula is modeled on internationally accepted banking, WHO medical, and financial standards.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-slate-800/60 border border-emerald-100 dark:border-slate-700">
          <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mb-3" />
          <h3 className="font-bold text-slate-900 dark:text-white mb-2">Global & Multilingual</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Designed from the ground up to support English, Spanish, Arabic (with RTL), and Hindi natively.
          </p>
        </div>
      </div>

      <div className="space-y-4 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Why We Built {t.siteName}
        </h2>
        <p>
          Too many utility sites on the web today are cluttered with slow pop-ups, misleading subscription paywalls, or lack native support for non-English speakers. 
          We believe that basic mathematical clarity—whether you are figuring out your mortgage payment, your shopping discount, or your healthy weight—should be accessible, instant, and completely free to anyone, anywhere in the world.
        </p>
      </div>
    </div>
  );
};
