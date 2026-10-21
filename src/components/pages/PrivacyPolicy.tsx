import React from 'react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../translations';
import { ShieldCheck, Lock, Eye, Cookie } from 'lucide-react';

interface PrivacyPolicyProps {
  currentLang: Language;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-8 text-slate-700 dark:text-slate-300">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider mb-2">
          <ShieldCheck className="w-4 h-4" />
          <span>Trust & Transparency</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          {t.legal.privacyTitle}
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {t.legal.privacyLastUpdated}
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Lock className="w-4 h-4 text-blue-500" />
          1. Information We Collect
        </h2>
        <p className="text-sm leading-relaxed">
          At {t.siteName}, we respect and value your privacy. All calculation tools provided on this website run entirely client-side in your web browser. 
          We do not store, log, or transmit the personal numbers, loan figures, salaries, or health metrics you enter into our calculation inputs.
        </p>
      </section>

      {/* Critical AdSense Mandatory Section */}
      <section className="space-y-3 p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Cookie className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          2. Google AdSense & Third-Party Cookies (Mandatory Disclosure)
        </h2>
        <div className="text-sm space-y-2 leading-relaxed">
          <p>
            We use <strong>Google AdSense</strong> to display advertisements when you visit our website. Third-party vendors, including Google, 
            use cookies to serve ads based on a user’s prior visits to this website or other websites.
          </p>
          <p>
            Google’s use of advertising cookies enables it and its partners to serve ads to our users based on their visits to our site and/or other sites on the Internet.
          </p>
          <p>
            Users may opt out of personalized advertising by visiting{' '}
            <a 
              href="https://www.google.com/settings/ads" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 dark:text-blue-400 underline font-semibold"
            >
              Google Ads Settings
            </a>
            . Alternatively, you can opt out of a third-party vendor’s use of cookies for personalized advertising by visiting{' '}
            <a 
              href="https://www.aboutads.info/choices/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 dark:text-blue-400 underline font-semibold"
            >
              www.aboutads.info
            </a>
            .
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Eye className="w-4 h-4 text-emerald-500" />
          3. Web Analytics & Log Data
        </h2>
        <p className="text-sm leading-relaxed">
          Like many web operators, we collect non-identifiable log data transmitted by your browser whenever you visit our website. 
          This data may include your computer’s Internet Protocol (&quot;IP&quot;) address, browser type, browser version, the pages of our site that you visit, the time and date of your visit, and other statistics.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          4. GDPR & CCPA Compliance
        </h2>
        <p className="text-sm leading-relaxed">
          If you reside in the European Economic Area (EEA) or California (USA), you have legal rights regarding your personal information under the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA).
          You have the right to request access, correction, deletion, or portability of any personal data held.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          5. Contact Privacy Officer
        </h2>
        <p className="text-sm leading-relaxed">
          If you have any questions or inquiries about this Privacy Policy, please contact our team at: <span className="font-mono text-blue-600 dark:text-blue-400">privacy@smartcalclab.com</span>.
        </p>
      </section>
    </div>
  );
};
