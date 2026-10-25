import React from 'react';
import { ToolId, Language } from '../types';
import { TRANSLATIONS } from '../translations';
import { Landmark, RefreshCw, Activity, Percent, TrendingUp, Briefcase, Car, ArrowRight } from 'lucide-react';

interface ToolCardProps {
  id: ToolId;
  currentLang: Language;
  onSelect: (id: ToolId) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({ id, currentLang, onSelect }) => {
  const t = TRANSLATIONS[currentLang];
  const tool = t.tools[id];

  const iconMap: Record<ToolId, { icon: React.ReactNode; bg: string; text: string }> = {
    loan: {
      icon: <Landmark className="w-6 h-6" />,
      bg: 'bg-blue-100 dark:bg-blue-950/80',
      text: 'text-blue-600 dark:text-blue-400',
    },
    currency: {
      icon: <RefreshCw className="w-6 h-6" />,
      bg: 'bg-emerald-100 dark:bg-emerald-950/80',
      text: 'text-emerald-600 dark:text-emerald-400',
    },
    bmi: {
      icon: <Activity className="w-6 h-6" />,
      bg: 'bg-rose-100 dark:bg-rose-950/80',
      text: 'text-rose-600 dark:text-rose-400',
    },
    percentage: {
      icon: <Percent className="w-6 h-6" />,
      bg: 'bg-amber-100 dark:bg-amber-950/80',
      text: 'text-amber-600 dark:text-amber-400',
    },
    compound: {
      icon: <TrendingUp className="w-6 h-6" />,
      bg: 'bg-indigo-100 dark:bg-indigo-950/80',
      text: 'text-indigo-600 dark:text-indigo-400',
    },
    salary: {
      icon: <Briefcase className="w-6 h-6" />,
      bg: 'bg-cyan-100 dark:bg-cyan-950/80',
      text: 'text-cyan-600 dark:text-cyan-400',
    },
    autoloan: {
      icon: <Car className="w-6 h-6" />,
      bg: 'bg-orange-100 dark:bg-orange-950/80',
      text: 'text-orange-600 dark:text-orange-400',
    },
  };

  const currentIcon = iconMap[id];

  return (
    <div
      onClick={() => onSelect(id)}
      className="group relative bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-200 cursor-pointer flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 rounded-2xl ${currentIcon.bg} ${currentIcon.text} flex items-center justify-center transition-transform group-hover:scale-110 duration-200`}>
            {currentIcon.icon}
          </div>
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {tool.seo.badge}
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {tool.name}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-4">
          {tool.shortDesc}
        </p>
      </div>

      <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
        <span>{t.common.calculate}</span>
        <ArrowRight className="w-4 h-4 rtl:rotate-180" />
      </div>
    </div>
  );
};
