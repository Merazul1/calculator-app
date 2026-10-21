import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';
import { ADS_CONFIG } from '../config/ads';
import { Sparkles, Code2, AlertCircle } from 'lucide-react';

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

interface AdSlotProps {
  currentLang: Language;
  format?: 'leaderboard' | 'in-article' | 'sidebar' | 'square';
  className?: string;
  adSlotId?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({
  currentLang,
  format = 'in-article',
  className = '',
  adSlotId,
}) => {
  const [showCode, setShowCode] = useState(false);
  const adRef = useRef<HTMLModElement | null>(null);
  const isPushed = useRef(false);
  const t = TRANSLATIONS[currentLang];

  const resolvedSlotId = adSlotId || (
    format === 'leaderboard' 
      ? ADS_CONFIG.slots.leaderboardTop 
      : format === 'sidebar' 
        ? ADS_CONFIG.slots.sidebar 
        : ADS_CONFIG.slots.inArticleMid
  );

  const isLive = ADS_CONFIG.isLive();

  // Handle live Google AdSense push on mount
  useEffect(() => {
    if (isLive && adRef.current && !isPushed.current) {
      try {
        // Ensure the official script is in the document
        if (!document.querySelector(`script[src*="adsbygoogle.js"]`)) {
          const script = document.createElement('script');
          script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADS_CONFIG.client}`;
          script.async = true;
          script.crossOrigin = 'anonymous';
          document.head.appendChild(script);
        }

        // Push adsbygoogle queue safely
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isPushed.current = true;
      } catch (err) {
        console.warn('AdSense push warning:', err);
      }
    }
  }, [isLive]);

  // Dimension styling with anti-CLS minimum heights
  const formatStyles = {
    leaderboard: 'w-full min-h-[90px] max-w-[728px] mx-auto',
    'in-article': 'w-full min-h-[140px] max-w-4xl mx-auto',
    sidebar: 'w-full min-h-[250px] max-w-[300px]',
    square: 'w-full min-h-[250px] max-w-[336px] mx-auto',
  };

  return (
    <div className={`my-6 text-center select-none ${className}`}>
      {/* Policy requirement: Clearly label ads */}
      <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2 mb-1.5 max-w-4xl mx-auto">
        <span>{t.ads.advertisement}</span>
        <button
          onClick={() => setShowCode(!showCode)}
          className="flex items-center gap-1 text-[10px] text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
          title="Toggle AdSense Code Preview"
        >
          <Code2 className="w-3 h-3" />
          <span>{showCode ? 'Close Tag' : 'AdSense Tag'}</span>
        </button>
      </div>

      {showCode ? (
        <div className="p-4 bg-slate-900 text-slate-200 text-xs font-mono text-left rounded-xl border border-slate-700 max-w-4xl mx-auto overflow-x-auto shadow-inner">
          <div className="text-slate-400 mb-1">// Google AdSense Unit (Configured in src/config/ads.ts)</div>
          <div className="text-amber-400">&lt;script async src=&quot;https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client={ADS_CONFIG.client}&quot; crossorigin=&quot;anonymous&quot;&gt;&lt;/script&gt;</div>
          <div className="text-blue-400">&lt;ins className=&quot;adsbygoogle&quot;</div>
          <div className="pl-4 text-emerald-400">style=&#123;&#123; display: &#39;block&#39; &#125;&#125;</div>
          <div className="pl-4 text-emerald-400">data-ad-client=&quot;{ADS_CONFIG.client}&quot;</div>
          <div className="pl-4 text-emerald-400">data-ad-slot=&quot;{resolvedSlotId}&quot;</div>
          <div className="pl-4 text-emerald-400">data-ad-format=&quot;auto&quot;</div>
          <div className="pl-4 text-emerald-400">data-full-width-responsive=&quot;true&quot;&gt;&lt;/ins&gt;</div>
          <div className="text-blue-400">&lt;script&gt;(adsbygoogle = window.adsbygoogle || []).push(&#123;&#125;);&lt;/script&gt;</div>
        </div>
      ) : isLive ? (
        /* Real live Google AdSense unit */
        <div className={`overflow-hidden ${formatStyles[format]}`}>
          <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client={ADS_CONFIG.client}
            data-ad-slot={resolvedSlotId}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      ) : (
        /* Development / Preview placeholder unit */
        <div
          className={`relative border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-slate-100/70 dark:from-slate-900/40 dark:to-slate-850/60 overflow-hidden ${formatStyles[format]}`}
        >
          <div className="absolute top-2 right-2 text-slate-300 dark:text-slate-700">
            <Sparkles className="w-4 h-4 opacity-40" />
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">
            <span>Google AdSense Slot</span>
            <span className="text-[10px] bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-400">
              {format}
            </span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
            {t.ads.sponsoredNotice}
          </p>
          <div className="text-[11px] text-blue-500/80 dark:text-blue-400/80 mt-1 font-mono">
            Ready: Set Client ID in <code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">src/config/ads.ts</code>
          </div>
        </div>
      )}
    </div>
  );
};
