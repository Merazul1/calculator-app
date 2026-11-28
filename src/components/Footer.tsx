import React from 'react';
import { Language, PageId } from '../types';
import { TRANSLATIONS } from '../translations';
import { NavLink } from './NavLink';
import { Calculator, ShieldCheck, FileText, HelpCircle, Mail, AlertTriangle } from 'lucide-react';

interface FooterProps {
  currentLang: Language;
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, onNavigate }) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <footer className="bg-slate-900 text-slate-400 text-sm mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Calculator className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white">{t.siteName}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t.tagline}
            </p>
            <div className="text-xs text-slate-500">
              © {new Date().getFullYear()} {t.siteName}. All rights reserved.
            </div>
          </div>

          {/* Quick Calculators */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">{t.categories.finance}</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <NavLink lang={currentLang} page="loan" onNavigate={onNavigate} className="hover:text-blue-400 transition-colors">
                  {t.tools.loan.name}
                </NavLink>
              </li>
              <li>
                <NavLink lang={currentLang} page="currency" onNavigate={onNavigate} className="hover:text-blue-400 transition-colors">
                  {t.tools.currency.name}
                </NavLink>
              </li>
              <li>
                <NavLink lang={currentLang} page="compound" onNavigate={onNavigate} className="hover:text-blue-400 transition-colors">
                  {t.tools.compound.name}
                </NavLink>
              </li>
              <li>
                <NavLink lang={currentLang} page="salary" onNavigate={onNavigate} className="hover:text-blue-400 transition-colors">
                  {t.tools.salary.name}
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Daily & Health */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">{t.categories.health} & {t.categories.daily}</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <NavLink lang={currentLang} page="bmi" onNavigate={onNavigate} className="hover:text-blue-400 transition-colors">
                  {t.tools.bmi.name}
                </NavLink>
              </li>
              <li>
                <NavLink lang={currentLang} page="percentage" onNavigate={onNavigate} className="hover:text-blue-400 transition-colors">
                  {t.tools.percentage.name}
                </NavLink>
              </li>
              <li>
                <NavLink lang={currentLang} page="guides" onNavigate={onNavigate} className="text-blue-400 font-semibold hover:text-blue-300 transition-colors">
                  Educational Guides &amp; Articles
                </NavLink>
              </li>
              <li>
                <NavLink lang={currentLang} page="home" onNavigate={onNavigate} className="hover:text-blue-400 transition-colors">
                  {t.categories.all}
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Legal & AdSense Compliance */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Legal & Trust</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <NavLink lang={currentLang} page="privacy" onNavigate={onNavigate} className="flex items-center gap-1.5 hover:text-blue-400 transition-colors">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {t.navigation.privacy}
                </NavLink>
              </li>
              <li>
                <NavLink lang={currentLang} page="terms" onNavigate={onNavigate} className="flex items-center gap-1.5 hover:text-blue-400 transition-colors">
                  <FileText className="w-3.5 h-3.5" />
                  {t.navigation.terms}
                </NavLink>
              </li>
              <li>
                <NavLink lang={currentLang} page="disclaimer" onNavigate={onNavigate} className="flex items-center gap-1.5 hover:text-blue-400 transition-colors">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {t.navigation.disclaimer}
                </NavLink>
              </li>
              <li>
                <NavLink lang={currentLang} page="about" onNavigate={onNavigate} className="flex items-center gap-1.5 hover:text-blue-400 transition-colors">
                  <HelpCircle className="w-3.5 h-3.5" />
                  {t.navigation.about}
                </NavLink>
              </li>
              <li>
                <NavLink lang={currentLang} page="contact" onNavigate={onNavigate} className="flex items-center gap-1.5 hover:text-blue-400 transition-colors">
                  <Mail className="w-3.5 h-3.5" />
                  {t.navigation.contact}
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* AdSense Compliance Warning Banner */}
        <div className="pt-6 border-t border-slate-800 text-[11px] text-slate-500 text-center leading-relaxed">
          <p>
            <strong>Disclaimer:</strong> All calculations provided on this website are for instructional, informational, and general estimation purposes only. 
            They do not constitute professional financial, accounting, legal, or medical advice. Results are estimates based on standard mathematical formulas.
          </p>
        </div>
      </div>
    </footer>
  );
};
