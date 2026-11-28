import React from 'react';
import { Language, PageId } from '../types';
import { buildPath } from '../lib/routes';

interface NavLinkProps {
  lang: Language;
  page: PageId;
  onNavigate: (page: PageId) => void;
  className?: string;
  onAfterClick?: () => void;
  children: React.ReactNode;
}

// Real <a href> for crawlers, SPA navigation for users
export const NavLink: React.FC<NavLinkProps> = ({ lang, page, onNavigate, className, onAfterClick, children }) => (
  <a
    href={buildPath(lang, page)}
    className={className}
    onClick={(e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; // allow new-tab clicks
      e.preventDefault();
      onNavigate(page);
      onAfterClick?.();
    }}
  >
    {children}
  </a>
);
