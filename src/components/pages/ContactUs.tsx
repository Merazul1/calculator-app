import React, { useState, useMemo } from 'react';
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
  ExternalLink,
  Check
} from 'lucide-react';

interface ContactUsProps {
  currentLang: Language;
}

interface FormFields {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const VALID_SUBJECTS = ['Feedback', 'Bug', 'New Feature', 'Advertising', 'General'] as const;

export const ContactUs: React.FC<ContactUsProps> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];
  
  const [formData, setFormData] = useState<FormFields>({ 
    name: '', 
    email: '', 
    subject: 'Feedback', 
    message: '' 
  });
  
  // Honeypot field for anti-spam bot trap
  const [honeypot, setHoneypot] = useState('');
  
  // Track which fields have been touched/blurred by the user
  const [touched, setTouched] = useState<Record<keyof FormFields, boolean>>({
    name: false,
    email: false,
    subject: false,
    message: false,
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);

  // Field validation rules
  const errors = useMemo<FormErrors>(() => {
    const errs: FormErrors = {};

    // 1. Name Validation
    const nameTrimmed = formData.name.trim();
    if (!nameTrimmed) {
      errs.name = 'Your name is required.';
    } else if (nameTrimmed.length < 2) {
      errs.name = 'Name must be at least 2 characters long.';
    } else if (nameTrimmed.length > 70) {
      errs.name = 'Name cannot exceed 70 characters.';
    } else if (!/^[\p{L}\p{M}'\-\s.]+$/u.test(nameTrimmed)) {
      errs.name = 'Name contains invalid characters (numbers or special symbols).';
    }

    // 2. Email Validation
    const emailTrimmed = formData.email.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailTrimmed) {
      errs.email = 'Email address is required.';
    } else if (!emailRegex.test(emailTrimmed)) {
      errs.email = 'Please provide a valid email address (e.g. name@example.com).';
    } else if (emailTrimmed.length > 100) {
      errs.email = 'Email address is too long (maximum 100 characters).';
    }

    // 3. Subject Validation
    if (!formData.subject || !VALID_SUBJECTS.includes(formData.subject as typeof VALID_SUBJECTS[number])) {
      errs.subject = 'Please choose a valid topic.';
    }

    // 4. Message Validation
    const messageTrimmed = formData.message.trim();
    if (!messageTrimmed) {
      errs.message = 'Please provide a message description.';
    } else if (messageTrimmed.length < 15) {
      errs.message = `Message is too brief (${messageTrimmed.length}/15 characters minimum).`;
    } else if (messageTrimmed.length > 3000) {
      errs.message = `Message exceeds the 3,000 character limit (${messageTrimmed.length}/3000).`;
    }

    return errs;
  }, [formData]);

  const isFormValid = Object.keys(errors).length === 0;

  const handleBlur = (field: keyof FormFields) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleChange = (field: keyof FormFields, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched to display errors if any exist
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
    });

    // Check validation
    if (!isFormValid) {
      return;
    }

    // Anti-spam honeypot detection
    if (honeypot) {
      // Silently simulate success for bots
      setSubmitted(true);
      return;
    }

    // Anti-spam cooldown (15 seconds between submissions)
    const now = Date.now();
    if (now - lastSubmitTime < 15000) {
      setErrorMessage('Please wait a few moments before sending another message.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject,
      message: formData.message.trim(),
      _subject: `[SmartCalcLab Contact] ${formData.subject}: ${formData.name.trim()}`,
      _template: 'table',
      _captcha: 'false',
    };

    try {
      const response = await fetch(CONTACT_CONFIG.serviceUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => null);

      if (response.ok && (result?.success === 'true' || result?.success === true || result?.message)) {
        setSubmitted(true);
        setLastSubmitTime(Date.now());
        setFormData({ name: '', email: '', subject: 'Feedback', message: '' });
        setTouched({ name: false, email: false, subject: false, message: false });
      } else {
        const errorDetail = result?.message || 'Unable to submit your message right now. Please try again.';
        setErrorMessage(errorDetail);
      }
    } catch (err) {
      setErrorMessage(
        'A network connection error occurred while submitting. Please send an email directly or check your connection.'
      );
    } finally {
      setLoading(false);
    }
  };

  const mailtoLink = `mailto:${CONTACT_CONFIG.recipientEmail}?subject=${encodeURIComponent(
    `[SmartCalcLab] ${formData.subject || 'Inquiry'}`
  )}&body=${encodeURIComponent(
    `Name: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\n\nMessage:\n${formData.message.trim()}`
  )}`;

  const currentMsgLength = formData.message.trim().length;

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
            Have a suggestion for a new calculator, found a math bug, or have a business inquiry? All messages are sent directly to our support team at{' '}
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
          <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-4 animate-in fade-in duration-300">
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
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Honeypot hidden input to entrap automated spam bots */}
            <input
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="opacity-0 absolute -z-10 w-0 h-0 pointer-events-none"
              aria-hidden="true"
            />

            {/* General Error Banner */}
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
              {/* Name Field */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Your Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    disabled={loading}
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                    className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none transition-all disabled:opacity-60 pr-10 ${
                      touched.name && errors.name
                        ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                        : touched.name && !errors.name
                        ? 'border-emerald-500/70 focus:ring-2 focus:ring-emerald-500/20'
                        : 'border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500'
                    }`}
                    placeholder="e.g. Alex Morgan"
                    maxLength={70}
                  />
                  {touched.name && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      {errors.name ? (
                        <AlertCircle className="w-4 h-4 text-rose-500" />
                      ) : (
                        <Check className="w-4 h-4 text-emerald-500" />
                      )}
                    </div>
                  )}
                </div>
                {touched.name && errors.name && (
                  <p className="text-xs text-rose-500 flex items-center gap-1 mt-1.5 animate-in fade-in duration-150">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    disabled={loading}
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none transition-all disabled:opacity-60 pr-10 ${
                      touched.email && errors.email
                        ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                        : touched.email && !errors.email
                        ? 'border-emerald-500/70 focus:ring-2 focus:ring-emerald-500/20'
                        : 'border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500'
                    }`}
                    placeholder="alex@example.com"
                    maxLength={100}
                  />
                  {touched.email && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      {errors.email ? (
                        <AlertCircle className="w-4 h-4 text-rose-500" />
                      ) : (
                        <Check className="w-4 h-4 text-emerald-500" />
                      )}
                    </div>
                  )}
                </div>
                {touched.email && errors.email && (
                  <p className="text-xs text-rose-500 flex items-center gap-1 mt-1.5 animate-in fade-in duration-150">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
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
                onChange={(e) => handleChange('subject', e.target.value)}
                onBlur={() => handleBlur('subject')}
                className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none transition-all disabled:opacity-60 cursor-pointer ${
                  touched.subject && errors.subject
                    ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                    : 'border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500'
                }`}
              >
                <option value="Feedback">💡 Tool Feedback / Suggestion</option>
                <option value="Bug">🐛 Report a Calculation Bug</option>
                <option value="New Feature">🚀 Request a New Calculator Tool</option>
                <option value="Advertising">📢 Advertising & Partnerships</option>
                <option value="General">✉️ General Inquiry / Other</option>
              </select>
              {touched.subject && errors.subject && (
                <p className="text-xs text-rose-500 flex items-center gap-1 mt-1.5">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{errors.subject}</span>
                </p>
              )}
            </div>

            {/* Message Textarea */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Message <span className="text-rose-500">*</span>
                </label>
                <span
                  className={`text-[11px] font-mono transition-colors ${
                    currentMsgLength === 0
                      ? 'text-slate-400'
                      : currentMsgLength < 15
                      ? 'text-amber-500 font-semibold'
                      : currentMsgLength > 3000
                      ? 'text-rose-500 font-bold'
                      : 'text-emerald-600 dark:text-emerald-400 font-medium'
                  }`}
                >
                  {currentMsgLength} / 3,000 chars {currentMsgLength < 15 && '(min 15)'}
                </span>
              </div>
              <textarea
                rows={5}
                disabled={loading}
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                onBlur={() => handleBlur('message')}
                className={`w-full px-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none transition-all disabled:opacity-60 resize-y ${
                  touched.message && errors.message
                    ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                    : touched.message && !errors.message
                    ? 'border-emerald-500/70 focus:ring-2 focus:ring-emerald-500/20'
                    : 'border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500'
                }`}
                placeholder="Tell us what you think, what formula you need, or how we can improve SmartCalcLab (minimum 15 characters)..."
                maxLength={3000}
              />
              {touched.message && errors.message && (
                <p className="text-xs text-rose-500 flex items-center gap-1 mt-1.5 animate-in fade-in duration-150">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{errors.message}</span>
                </p>
              )}
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
                  <span>Validating & Sending...</span>
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
