import React from 'react';
import { GuideArticle, GUIDES } from '../../data/guides';
import { PageId } from '../../types';
import { Clock, ShieldCheck, ArrowLeft, ArrowRight, Calculator, HelpCircle, CheckCircle2, Bookmark } from 'lucide-react';

interface GuideDetailPageProps {
  slug: string;
  onNavigate: (page: PageId) => void;
  onSelectGuide: (slug: string) => void;
}

export const GuideDetailPage: React.FC<GuideDetailPageProps> = ({ slug, onNavigate, onSelectGuide }) => {
  const guide = GUIDES.find((g) => g.slug === slug) || GUIDES[0];
  const relatedGuides = GUIDES.filter((g) => g.slug !== guide.slug).slice(0, 3);

  // Map tool path to PageId
  const getToolPageId = (path: string): PageId => {
    const raw = path.replace('/', '') as PageId;
    return raw;
  };

  return (
    <article className="max-w-4xl mx-auto space-y-10 text-slate-800 dark:text-slate-200">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <button onClick={() => onNavigate('home')} className="hover:text-blue-600 transition-colors">
          Home
        </button>
        <span>&gt;</span>
        <button onClick={() => onNavigate('guides')} className="hover:text-blue-600 transition-colors">
          Guides
        </button>
        <span>&gt;</span>
        <span className="text-slate-800 dark:text-slate-200 font-medium truncate max-w-xs">{guide.title}</span>
      </nav>

      {/* Guide Header Card */}
      <header className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="font-bold px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
            {guide.category}
          </span>
          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {guide.readTime}
            </span>
            <span>•</span>
            <span>Updated: {guide.publishedDate}</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
          {guide.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          {guide.subtitle}
        </p>

        {/* E-E-A-T Editorial Byline */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span>
              <strong>Editorial Authors:</strong> {guide.author}
            </span>
          </div>
          <div>
            <span>Verified Benchmarks: <strong>{guide.reviewedBy}</strong></span>
          </div>
        </div>
      </header>

      {/* Interactive Tool Banner Callout (High Ranking & Authority Anchor) */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-200 mb-1 flex items-center gap-1.5">
            <Calculator className="w-4 h-4" />
            <span>Interactive Tool Available</span>
          </div>
          <h2 className="text-lg font-bold text-white">
            Calculate your numbers with our free {guide.toolName}
          </h2>
          <p className="text-xs text-blue-100 mt-0.5">
            Real-time computations, custom inputs, and dynamic visual breakdowns.
          </p>
        </div>
        <button
          onClick={() => onNavigate(getToolPageId(guide.toolPath))}
          className="px-5 py-2.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs shadow-md transition-colors whitespace-nowrap flex items-center gap-1.5"
        >
          <span>Open Calculator</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Editorial Sections */}
      <div className="space-y-8">
        {guide.sections.map((section, idx) => (
          <section
            key={idx}
            className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {section.heading}
            </h2>

            <div className="space-y-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
            </div>

            {/* Optional Callout */}
            {section.callout && (
              <div className="p-4 my-4 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900 text-xs sm:text-sm text-blue-900 dark:text-blue-200">
                <strong className="block font-bold mb-1 text-blue-700 dark:text-blue-300">
                  💡 {section.callout.title}
                </strong>
                <span>{section.callout.text}</span>
              </div>
            )}

            {/* Optional Table */}
            {section.table && (
              <div className="my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white">
                      {section.table.headers.map((h, hIdx) => (
                        <th key={hIdx} className="p-3 font-semibold">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {section.table.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="p-3 text-slate-700 dark:text-slate-300">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Frequently Asked Questions */}
      {guide.faqs && guide.faqs.length > 0 && (
        <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>Frequently Asked Questions</span>
          </h2>
          <div className="space-y-4 pt-2">
            {guide.faqs.map((faq, fIdx) => (
              <div key={fIdx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
                <h3 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white">
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Educational Guides */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Continue Learning: Related Financial &amp; Health Guides
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {relatedGuides.map((rel) => (
            <div
              key={rel.slug}
              onClick={() => onSelectGuide(rel.slug)}
              className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-1">
                  {rel.category}
                </span>
                <h3 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white line-clamp-2 mb-2">
                  {rel.title}
                </h3>
              </div>
              <span className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1 pt-2">
                Read Guide &rarr;
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Back to Guides Hub */}
      <div className="pt-4 text-center">
        <button
          onClick={() => onNavigate('guides')}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-xs text-slate-700 dark:text-slate-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Guides</span>
        </button>
      </div>
    </article>
  );
};
