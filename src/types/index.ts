export type Language = 'en' | 'es' | 'ar' | 'hi' | 'pt' | 'fr' | 'de';

export type ToolId = 
  | 'loan' 
  | 'autoloan'
  | 'currency' 
  | 'bmi' 
  | 'percentage' 
  | 'compound' 
  | 'salary';

export type PageId = 
  | 'home'
  | ToolId
  | 'privacy' 
  | 'terms' 
  | 'about' 
  | 'contact' 
  | 'disclaimer';

export interface LanguageInfo {
  code: Language;
  name: string;
  nativeName: string;
  dir: 'ltr' | 'rtl';
  flag: string;
  region: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface ToolSEOData {
  title: string;
  subtitle: string;
  metaDesc: string;
  badge: string;
  introParagraphs: string[];
  howItWorksTitle: string;
  howItWorksSteps: { step: string; desc: string }[];
  formulaTitle: string;
  formulaMath: string;
  formulaExplanation: string;
  exampleTitle: string;
  exampleText: string;
  faqsTitle: string;
  faqs: FAQItem[];
  tips: string[];
}
