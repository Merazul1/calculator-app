import React from 'react';
import { GUIDES, GuideArticle } from '../../data/guides';
import { BookOpen, Clock, ArrowRight, ShieldCheck, Sparkles, Calculator } from 'lucide-react';
import { PageId } from '../../types';

interface GuidesPageProps {
  onSelectGuide: (slug: string) => void;
  onNavigate: (page: PageId) => void;
}

export const GuidesPage: React.FC<GuidesPageProps> = ({ onSelectGuide, onNavigate }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-blue-200 mb-4 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            <span>Educational Learning Hub</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4">
            Financial &amp; Health Calculation Guides
          </h1>
          <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed">
            In-depth educational guides, mathematical breakdowns, and actionable benchmarks crafted by the SmartCalcLab editorial team. Master your mortgage, paycheck withholdings, compound growth, and health metrics.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-6 text-xs text-blue-200/80">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>CFPB &amp; WHO Standards Aligned</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-300" />
              <span>{GUIDES.length} Long-Form Reference Guides</span>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {GUIDES.map((guide) => (
          <article
            key={guide.slug}
            onClick={() => onSelectGuide(guide.slug)}
            className="group bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200 flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900/50">
                  {guide.category}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  <Clock className="w-3 h-3" />
                  {guide.readTime}
                </span>
              </div>

              <h2 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2.5 line-clamp-2">
                {guide.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-3">
                {guide.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
              <span className="flex items-center gap-1">
                Read Guide <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="text-slate-400 dark:text-slate-500 font-normal text-[11px]">
                {guide.publishedDate}
              </span>
            </div>
          </article>
        ))}
      </section>

      {/* Bottom CTA to Interactive Tools */}
      <section className="bg-slate-100 dark:bg-slate-850 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Looking for Interactive Calculators?
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Calculate your exact numbers instantly with zero lag and total privacy.
          </p>
        </div>
        <button
          onClick={() => onNavigate('home')}
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md transition-colors flex items-center gap-2 whitespace-nowrap"
        >
          <Calculator className="w-4 h-4" />
          <span>Explore All 7 Calculators</span>
        </button>
      </section>
    </div>
  );
};
