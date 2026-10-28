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

  const isRealSlot = Boolean(
    resolvedSlotId && 
    !['1234567890', '2345678901', '3456789012', '4567890123'].includes(resolvedSlotId) &&
    resolvedSlotId.length >= 8
  );

  const isLive = ADS_CONFIG.isLive() && isRealSlot;

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

  // If in review and no real slot ID is configured yet, do not render broken tags to avoid policy flags
  if (!isLive) {
    return null;
  }

  return (
    <div className={`my-6 text-center select-none ${className}`}>
      {/* Policy requirement: Clearly label ads */}
      <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2 mb-1.5 max-w-4xl mx-auto text-left">
        <span>{t.ads.advertisement}</span>
      </div>

      {/* Real live Google AdSense unit */}
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
    </div>
  );
};
