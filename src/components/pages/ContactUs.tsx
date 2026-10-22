import React, { useState } from 'react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../translations';
import { CONTACT_CONFIG } from '../../config/contact';
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Loader2, 
  ShieldCheck,
  ExternalLink 
} from 'lucide-react';

interface ContactUsProps {
  currentLang: Language;
}

export const ContactUs: React.FC<ContactUsProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    subject: 'Feedback', 
    message: '' 
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch(CONTACT_CONFIG.serviceUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _subject: `[SmartCalcLab Contact] ${formData.subject}: ${formData.name}`,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const result = await response.json().catch(() => null);

      if (response.ok && (result?.success === 'true' || result?.success === true || result?.message)) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: 'Feedback', message: '' });
      } else {
        const errorDetail = result?.message || 'Unable to submit your message right now.';
        setErrorMessage(errorDetail);
      }
    } catch (err) {
      setErrorMessage(
        'A network connection error occurred. Please check your connection or contact us directly via email.'
      );
    } finally {
      setLoading(false);
    }
  };

  const mailtoLink = `mailto:${CONTACT_CONFIG.recipientEmail}?subject=${encodeURIComponent(
    `[SmartCalcLab] ${formData.subject || 'Inquiry'}`
  )}&body=${encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
  )}`;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Main Contact Container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-8 text-slate-700 dark:text-slate-300">
        {/* Header Section */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6 text-center sm:text-left rtl:sm:text-right">
          <div className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider mb-2">
            <Mail className="w-4 h-4" />
            <span>Get in Touch</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {t.legal.contactTitle}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Have a suggestion for a new calculator, found a math bug, or have a business inquiry? All messages are sent directly to our team at{' '}
            <a
              href={`mailto:${CONTACT_CONFIG.recipientEmail}`}
              className="font-medium text-blue-600 dark:text-blue-400 underline hover:no-underline"
            >
              {CONTACT_CONFIG.recipientEmail}
            </a>
            .
          </p>
        </div>

        {/* Success Banner */}
        {submitted ? (
          <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/60 flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Message Sent Successfully!
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                Thank you for reaching out. Your inquiry has been forwarded directly to our inbox at{' '}
                <span className="font-semibold text-slate-900 dark:text-white">{CONTACT_CONFIG.recipientEmail}</span>.
                We usually respond within 24 to 48 hours.
              </p>
            </div>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setSubmitted(false)}
                className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors cursor-pointer shadow-sm shadow-emerald-600/30"
              >
                Send Another Message
              </button>
              <a
                href={`mailto:${CONTACT_CONFIG.recipientEmail}`}
                className="px-5 py-2.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors inline-flex items-center gap-1.5"
              >
                <span>Direct Mail</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Notification */}
            {errorMessage && (
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 flex items-start gap-3 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-rose-600 dark:text-rose-400" />
                <div className="space-y-2 flex-1">
                  <p className="font-medium">{errorMessage}</p>
                  <p className="text-xs text-rose-600 dark:text-rose-400">
                    You can still reach us directly by sending an email to{' '}
                    <a
                      href={mailtoLink}
                      className="font-bold underline hover:no-underline"
                    >
                      {CONTACT_CONFIG.recipientEmail}
                    </a>
                  </p>
                </div>
              </div>
            )}

            {/* Inputs: Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Your Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  disabled={loading}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all disabled:opacity-60"
                  placeholder="e.g. Alex Morgan"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  disabled={loading}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all disabled:opacity-60"
                  placeholder="alex@example.com"
                />
              </div>
            </div>

            {/* Subject Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Topic / Subject <span className="text-rose-500">*</span>
              </label>
              <select
                disabled={loading}
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all disabled:opacity-60 cursor-pointer"
              >
                <option value="Feedback">💡 Tool Feedback / Suggestion</option>
                <option value="Bug">🐛 Report a Calculation Bug</option>
                <option value="New Feature">🚀 Request a New Calculator Tool</option>
                <option value="Advertising">📢 Advertising & Partnerships</option>
                <option value="General">✉️ General Inquiry / Other</option>
              </select>
            </div>

            {/* Message Textarea */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Message <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={5}
                required
                disabled={loading}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all disabled:opacity-60 resize-y"
                placeholder="Tell us what you think, what formula you need, or how we can improve SmartCalcLab..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold text-sm shadow-md shadow-blue-500/25 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Delivering Your Message...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message to Team</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>

      {/* Information Cards (Direct Email, SLA, Privacy) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Direct Inbox */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex-shrink-0">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Direct Contact
            </h4>
            <a
              href={`mailto:${CONTACT_CONFIG.recipientEmail}`}
              className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline break-all mt-0.5 block"
            >
              {CONTACT_CONFIG.recipientEmail}
            </a>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Monitored daily by engineering.
            </p>
          </div>
        </div>

        {/* Card 2: Turnaround Time */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex-shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Response Time
            </h4>
            <p className="text-sm font-semibold text-slate-900 dark:text-white mt-0.5">
              24 – 48 Hours
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Prompt replies for bugs & requests.
            </p>
          </div>
        </div>

        {/* Card 3: Privacy & Security */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex-shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Strict Privacy
            </h4>
            <p className="text-sm font-semibold text-slate-900 dark:text-white mt-0.5">
              100% Confidential
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Your details are never shared or sold.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
