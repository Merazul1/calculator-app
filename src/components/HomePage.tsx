import React, { useState } from 'react';
import { ToolId, Language } from '../types';
import { TRANSLATIONS, LANGUAGES } from '../translations';
import { ToolCard } from './ToolCard';
import { AdSlot } from './AdSlot';
import { Search, Sparkles, Shield, Cpu, Zap, Globe2 } from 'lucide-react';

interface HomePageProps {
  currentLang: Language;
  onSelectTool: (id: ToolId) => void;
  onSelectLang: (lang: Language) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ currentLang, onSelectTool, onSelectLang }) => {
  const t = TRANSLATIONS[currentLang];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'finance' | 'health' | 'daily'>('all');

  const toolIds: ToolId[] = ['loan', 'autoloan', 'currency', 'bmi', 'percentage', 'compound', 'salary'];

  // Filter tools based on search and category
  const filteredTools = toolIds.filter((id) => {
    const tool = t.tools[id];
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesQuery =
      searchQuery.trim() === '' ||
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.seo.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-8 sm:py-12 max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-4 animate-in fade-in duration-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Multilingual High-Precision Utility Suite</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight sm:leading-none mb-4">
          {t.tagline}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
          Free calculators for mortgages, live currencies, body mass index, percentages, and take-home salary. Fast, private, and 100% free with no registration required.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto mb-6">
          <Search className="absolute left-4 rtl:left-auto rtl:right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-12 rtl:pl-4 rtl:pr-12 pr-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 text-sm shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold">
          {[
            { id: 'all', label: t.categories.all },
            { id: 'finance', label: t.categories.finance },
            { id: 'health', label: t.categories.health },
            { id: 'daily', label: t.categories.daily },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Top Banner AdSlot */}
      <AdSlot currentLang={currentLang} format="leaderboard" />

      {/* Calculators Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {selectedCategory === 'all' ? 'Popular Tools' : t.categories[selectedCategory]}
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'} available
          </span>
        </div>

        {filteredTools.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              No calculators found matching &quot;{searchQuery}&quot;.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-3 text-xs text-blue-600 font-bold hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((id) => (
              <ToolCard
                key={id}
                id={id}
                currentLang={currentLang}
                onSelect={onSelectTool}
              />
            ))}
          </div>
        )}
      </section>

      {/* Middle AdSlot */}
      <AdSlot currentLang={currentLang} format="in-article" />

      {/* Multilingual Market Selector Banner */}
      <section className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-8 text-white shadow-xl">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-blue-300 text-xs font-bold uppercase tracking-wider">
            <Globe2 className="w-4 h-4" />
            <span>Target Global Non-English Search Markets</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Available in 4 Major Global Languages
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Targeting low-competition, high-volume search traffic across Latin America, Spain, Middle East, and India.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => onSelectLang(lang.code)}
                className={`p-3.5 rounded-2xl border text-left rtl:text-right transition-all cursor-pointer ${
                  currentLang === lang.code
                    ? 'bg-blue-600/40 border-blue-400 shadow-md'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="text-2xl mb-1">{lang.flag}</div>
                <div className="font-bold text-sm text-white">{lang.nativeName}</div>
                <div className="text-[11px] text-slate-400 truncate">{lang.region}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Value Props */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">
              100% Client-Side Privacy
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Calculations run in your browser. We never log or store your sensitive personal finances or metrics.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">
              Google Core Web Vitals (95+)
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Ultra-lightweight static architecture optimized for instant page speeds and high search rankings.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">
              AdSense Ready Architecture
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Equipped with in-depth educational text, formulas, and schema FAQs on every page to prevent thin-content rejection.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
