import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, HelpCircle, ShieldCheck, ExternalLink, Calculator } from 'lucide-react';

export const CurrencyArticle: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is the mid-market exchange rate?',
      a: 'The mid-market rate (also called the interbank rate) is the real-time midpoint between global wholesale buy and sell prices traded among major international banks. It represents the fair, true baseline value of a currency pair before retail markups.'
    },
    {
      q: 'Why does my bank or transfer app quote a worse rate than this converter?',
      a: 'Commercial banks and remittance providers add a hidden markup percentage (often 1% to 4.5%+) to the wholesale interbank rate, allowing them to advertise &ldquo;zero transfer fees&rdquo; while profiting quietly on the currency spread.'
    },
    {
      q: 'How do I calculate the true hidden cost of a currency exchange?',
      a: 'Subtract the actual foreign currency received from the true mid-market value of your funds, then divide by the mid-market value: Total Cost % = (Mid-Market Value − Amount Received) ÷ Mid-Market Value.'
    },
    {
      q: 'Is it cheaper to exchange currency at airports or use a debit card abroad?',
      a: 'Airport currency exchange booths and hotel kiosks charge the highest markups in the industry (often 7% to 15%+). Using a no-foreign-transaction-fee debit or credit card at an official bank ATM, always declining dynamic currency conversion, yields the lowest cost.'
    }
  ];

  return (
    <article className="mt-12 space-y-10 text-slate-800 dark:text-slate-200">
      {/* Editorial Byline & Live Rates Transparency Header */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span>
              By{' '}
              <a href="/about" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
                David Vance
              </a>
              , Senior Financial Modeler
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Rate Feed: <strong>European Central Bank (ECB)</strong></span>
            <span>•</span>
            <span>Refreshed: <strong>Daily at 16:00 UTC</strong></span>
          </div>
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            The rate you see is not the rate you get
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            When you look up &ldquo;USD to EUR&rdquo; or &ldquo;USD to INR&rdquo; on financial portals, you are viewing 
            the <strong>mid-market rate</strong>: the wholesale benchmark traded between institutional banks. Retail consumers 
            almost never receive this rate. High-street banks, airport kiosks, credit cards, and transfer apps add an exchange-rate markup—often 
            disguised behind &ldquo;0% commission&rdquo; claims. Our converter displays the pure mid-market rate so you can evaluate any quote.
          </p>
        </div>
      </section>

      {/* Worked Example Table */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Worked Example: The Hidden Cost of Sending $1,000 Overseas
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Suppose the current mid-market benchmark is 1 USD = 85.00 INR, meaning $1,000 is worth exactly ₹85,000. 
          See how retail markups erode what your recipient receives:
        </p>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700/80">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-850 text-slate-900 dark:text-white font-semibold border-b border-slate-200 dark:border-slate-700/80">
              <tr>
                <th className="py-3 px-4 sm:px-6">Provider Markup</th>
                <th className="py-3 px-4 sm:px-6">Exchange Rate Received</th>
                <th className="py-3 px-4 sm:px-6">Recipient Receives</th>
                <th className="py-3 px-4 sm:px-6 text-right">Hidden Spread Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-slate-700 dark:text-slate-300">
              <tr className="bg-emerald-50/60 dark:bg-emerald-950/30">
                <td className="py-3 px-4 sm:px-6 font-sans font-bold text-emerald-800 dark:text-emerald-300">0% (Mid-Market)</td>
                <td className="py-3 px-4 sm:px-6 font-bold">85.000</td>
                <td className="py-3 px-4 sm:px-6 font-bold text-emerald-700 dark:text-emerald-400">₹85,000</td>
                <td className="py-3 px-4 sm:px-6 text-right text-emerald-700 font-bold">$0.00</td>
              </tr>
              <tr>
                <td className="py-3 px-4 sm:px-6 font-sans font-medium">0.5% (Specialist FinTech)</td>
                <td className="py-3 px-4 sm:px-6">84.575</td>
                <td className="py-3 px-4 sm:px-6">₹84,575</td>
                <td className="py-3 px-4 sm:px-6 text-right text-slate-600 dark:text-slate-400">₹425 (≈ $5.00)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 sm:px-6 font-sans font-medium">1.0% (Online Broker)</td>
                <td className="py-3 px-4 sm:px-6">84.150</td>
                <td className="py-3 px-4 sm:px-6">₹84,150</td>
                <td className="py-3 px-4 sm:px-6 text-right text-slate-600 dark:text-slate-400">₹850 (≈ $10.00)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 sm:px-6 font-sans font-medium">3.0% (Standard Retail Bank)</td>
                <td className="py-3 px-4 sm:px-6">82.450</td>
                <td className="py-3 px-4 sm:px-6 text-amber-600 dark:text-amber-400 font-bold">₹82,450</td>
                <td className="py-3 px-4 sm:px-6 text-right text-amber-600 dark:text-amber-400 font-bold">₹2,550 (≈ $30.00)</td>
              </tr>
              <tr className="bg-rose-50/50 dark:bg-rose-950/20 text-rose-900 dark:text-rose-200">
                <td className="py-3 px-4 sm:px-6 font-sans font-medium">4.5% (Airport / Wire Desk)</td>
                <td className="py-3 px-4 sm:px-6">81.175</td>
                <td className="py-3 px-4 sm:px-6 font-bold text-rose-600 dark:text-rose-400">₹81,175</td>
                <td className="py-3 px-4 sm:px-6 text-right font-bold text-rose-600 dark:text-rose-400">₹3,825 (≈ $45.00)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          The difference between an honest 0.5% provider and a traditional 4.5% retail wire desk is <strong>₹3,400 ($40)</strong> on a single 
          $1,000 transfer. Always calculate the net currency delivered rather than relying on promotional fee waivers.
        </p>
      </section>

      {/* 30-Second Quote Check */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Transfer Settlement Times, Clearing Networks, and Rate Locks
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          When transferring funds overseas via SWIFT or international clearing networks, processing intervals 
          typically range from instantaneous delivery to two or three business days. Specialist digital money 
          transfer services frequently provide a guaranteed exchange-rate lock for 24 to 48 hours while your 
          domestic bank deposit clears. If your chosen provider does not offer a rate lock, your transaction 
          will execute at the prevailing floating market rate when funds arrive, introducing unpredictable 
          currency volatility risk on large remittances or business invoices.
        </p>
      </section>

      {/* 30-Second Quote Check */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          How to Audit Any Currency Quote in 30 Seconds
        </h2>
        <ol className="list-decimal pl-6 space-y-2 text-slate-600 dark:text-slate-300">
          <li><strong>Check the Mid-Market Rate:</strong> Note the current interbank rate on our calculator above.</li>
          <li><strong>Request Net Delivered Funds:</strong> Ask your bank or app exactly how much the beneficiary receives in hand after all wire fees and rate deductions.</li>
          <li><strong>Compute Total Drag:</strong> Divide the lost value by the mid-market expected total: <code>Total Fee % = 1 − (Delivered ÷ Mid-Market Value)</code>.</li>
        </ol>
      </section>

      {/* Four Traps */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          Four Traps That Quietly Drain Foreign Exchange
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Dynamic Currency Conversion (DCC)</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">When an overseas ATM or credit card terminal asks &ldquo;Pay in USD or EUR?&rdquo;, always choose the <strong>local currency (EUR)</strong>. Selecting your home currency triggers an exorbitant 5–8% DCC markup.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Weekend Spread Widening</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Forex markets close from Friday 22:00 UTC to Sunday 22:00 UTC. Apps often widen their spreads by 1–2% over weekends to buffer against market opening gaps.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Airport Exchange Kiosks</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Airport physical currency booths pay high terminal concessions and charge 10% to 18% spreads. Avoid exchanging physical cash in airport terminals.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Foreign Transaction Surcharges</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Standard credit cards tack on a 3% foreign transaction fee on every purchase made outside your domestic country. Switch to travel cards with 0% foreign transaction fees.</p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <HelpCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions: Foreign Exchange &amp; Transfers
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left p-4 sm:p-5 font-semibold text-slate-900 dark:text-white flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors"
              >
                <span className="text-base sm:text-lg">{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                )}
              </button>
              {openFaq === idx && (
                <div className="p-4 sm:p-5 pt-0 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Methodology & Citations */}
      <section className="bg-slate-50 dark:bg-slate-850 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 space-y-6 text-sm text-slate-600 dark:text-slate-400">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Foreign Exchange Methodology &amp; Sources
          </h2>
          <p className="leading-relaxed">
            Indicative reference exchange rates are sourced via European Central Bank (ECB) reference publications and interbank liquidity feeds, updated daily. 
            For consumer protections surrounding international remittances, refer to the{' '}
            <a
              href="https://www.consumerfinance.gov/consumer-tools/sending-money/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 underline font-medium inline-flex items-center gap-1"
            >
              CFPB International Money Transfer Guides <ExternalLink className="w-3.5 h-3.5" />
            </a>. Corrections: <a href="mailto:support@smartcalclab.com" className="underline">support@smartcalclab.com</a>.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex flex-wrap gap-4">
          <a
            href="/percentage"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium hover:border-indigo-500 transition-colors"
          >
            <Calculator className="w-4 h-4 text-indigo-600" />
            <span>Percentage &amp; Markup Calculator</span>
          </a>
          <a
            href="/compound"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium hover:border-indigo-500 transition-colors"
          >
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>Compound Interest Calculator</span>
          </a>
        </div>
      </section>
    </article>
  );
};
