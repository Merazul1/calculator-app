import React, { useState } from 'react';
import { Language, PageId, ToolId } from '../types';
import { LANGUAGES, TRANSLATIONS } from '../translations';
import { Calculator, Moon, Sun, Globe, Menu, X, Landmark, RefreshCw, Activity, Percent, TrendingUp, Briefcase } from 'lucide-react';

interface HeaderProps {
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  isDark: boolean;
  onToggleDark: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onSelectLang,
  currentPage,
  onNavigate,
  isDark,
  onToggleDark,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const t = TRANSLATIONS[currentLang];
  const currentLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  const toolsList: { id: ToolId; name: string; icon: React.ReactNode }[] = [
    { id: 'loan', name: t.tools.loan.name, icon: <Landmark className="w-4 h-4" /> },
    { id: 'currency', name: t.tools.currency.name, icon: <RefreshCw className="w-4 h-4" /> },
    { id: 'bmi', name: t.tools.bmi.name, icon: <Activity className="w-4 h-4" /> },
    { id: 'percentage', name: t.tools.percentage.name, icon: <Percent className="w-4 h-4" /> },
    { id: 'compound', name: t.tools.compound.name, icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'salary', name: t.tools.salary.name, icon: <Briefcase className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div 
            onClick={() => onNavigate('home')} 
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                {t.siteName}
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                LAB
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => onNavigate('home')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                currentPage === 'home'
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
              }`}
            >
              {t.navigation.home}
            </button>

            {toolsList.slice(0, 4).map((tool) => (
              <button
                key={tool.id}
                onClick={() => onNavigate(tool.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === tool.id
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                {tool.icon}
                <span className="truncate max-w-[130px]">{tool.name.split('(')[0]}</span>
              </button>
            ))}
          </nav>

          {/* Language Switcher & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/80 transition-colors"
                title="Change Language"
              >
                <span className="text-base">{currentLangObj.flag}</span>
                <span className="hidden md:inline font-semibold">{currentLangObj.nativeName}</span>
                <Globe className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <div 
                  className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onClick={() => setLangDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Select Language / Idioma / اللغة
                  </div>
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onSelectLang(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm text-left rtl:text-right hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors ${
                        currentLang === lang.code
                          ? 'font-bold text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/30'
                          : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">{lang.flag}</span>
                        <div>
                          <div>{lang.nativeName}</div>
                          <div className="text-[11px] text-slate-400 font-normal">{lang.region}</div>
                        </div>
                      </div>
                      {currentLang === lang.code && (
                        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark / Light Toggle */}
            <button
              onClick={onToggleDark}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 py-3 space-y-1">
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
                currentPage === 'home'
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
                  : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              <Calculator className="w-4 h-4" />
              {t.navigation.home}
            </button>

            {toolsList.map((tool) => (
              <button
                key={tool.id}
                onClick={() => {
                  onNavigate(tool.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
                  currentPage === tool.id
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
                    : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                {tool.icon}
                {tool.name}
              </button>
            ))}

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-2 text-xs">
              <button onClick={() => { onNavigate('about'); setMobileMenuOpen(false); }} className="text-slate-500 hover:underline">
                {t.navigation.about}
              </button>
              <span>•</span>
              <button onClick={() => { onNavigate('privacy'); setMobileMenuOpen(false); }} className="text-slate-500 hover:underline">
                {t.navigation.privacy}
              </button>
              <span>•</span>
              <button onClick={() => { onNavigate('contact'); setMobileMenuOpen(false); }} className="text-slate-500 hover:underline">
                {t.navigation.contact}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
