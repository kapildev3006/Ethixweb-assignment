'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, CheckCircle2, AlertCircle, RefreshCw, Send, ShieldCheck, Info } from 'lucide-react';
import { enquirySchema, type EnquiryInput } from '@/lib/validators/enquiry';

const serviceOptions = [
  'Website Engineering & Redesign',
  'Custom LLM Chatbot & AI Automation',
  'Google Ads & Local Service Ads',
  'Full-Funnel Analytics & Tracking',
  'Accessibility Testing & WCAG Improvements',
  'Ongoing Operations & Technical Support',
  'Comprehensive Growth Package (Code + Ads + AI)',
];

const budgetOptions = [
  'Under ₹1,00,000 / $1,200 (Planning)',
  '₹1,00,000 – ₹2,50,000 / $1,200 – $3,000',
  '₹2,50,000 – ₹5,00,000 / $3,000 – $6,000',
  '₹5,00,000+ / $6,000+ (Enterprise)',
  'Flexible / Need Technical Scope First',
];

const timelineOptions = [
  'Immediately (Sprint 1 Kickoff)',
  '2–4 Weeks (Standard Velocity)',
  '1–3 Months (Quarterly Planning)',
  'Exploring Options / Early Scoping',
];

export default function ContactForm() {
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState<{
    fullName: string;
    email: string;
    phone: string;
    companyName: string;
    service: string;
    budget: string;
    timeline: string;
    message: string;
    privacyAccepted: boolean;
    website_url_hp: string;
    form_load_time: number;
  }>({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    service: serviceOptions[0],
    budget: '',
    timeline: '',
    message: '',
    privacyAccepted: false,
    website_url_hp: '',
    form_load_time: Date.now(),
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean | null>(null);

  // Pre-select service from URL query param (?service=... or ?sector=...)
  useEffect(() => {
    const serviceParam = searchParams?.get('service');
    const sectorParam = searchParams?.get('sector');

    if (serviceParam) {
      const match = serviceOptions.find(
        (opt) => opt.toLowerCase().includes(serviceParam.toLowerCase()) || serviceParam.toLowerCase().includes(opt.toLowerCase())
      );
      if (match) {
        setFormData((prev) => ({ ...prev, service: match }));
      }
    } else if (sectorParam) {
      setFormData((prev) => ({
        ...prev,
        message: `Inquiring regarding specialized solutions for: ${sectorParam}\n\n`,
      }));
    }
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear specific error on change
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSubmissionSuccess(null);

    // Validate using Zod schema
    const result = enquirySchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);

      // Scroll to the first error input
      const firstErrorField = document.querySelector('[aria-invalid="true"]');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Send real enquiry to MongoDB Atlas backed API
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      setIsSubmitting(false);

      if (!res.ok || !json.success) {
        if (json.validationErrors) {
          setErrors(json.validationErrors);
        } else {
          setErrors({ general: json.error || 'Failed to submit enquiry. Please try again.' });
        }
        return;
      }

      setSubmissionSuccess(true);
    } catch (err: any) {
      setIsSubmitting(false);
      setErrors({ general: 'Network error submitting enquiry. Please try again.' });
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      companyName: '',
      service: serviceOptions[0],
      budget: '',
      timeline: '',
      message: '',
      privacyAccepted: false,
      website_url_hp: '',
      form_load_time: Date.now(),
    });
    setErrors({});
    setSubmissionSuccess(null);
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 border border-gray-200/90 shadow-xl min-w-0" id="contact-form">
      {/* Form Header */}
      <div className="mb-6 sm:mb-8 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-xs font-semibold text-brand-red border border-red-100">
          <Send className="w-3.5 h-3.5" />
          <span>Project Enquiry</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-gray-900 tracking-tight">
          Tell Us About Your Project
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
          Fill out the details below. Our team will review your project scope and discuss technical approaches with you.
        </p>
      </div>

      {/* Real Success Banner */}
      {submissionSuccess && (
        <div
          role="status"
          aria-live="polite"
          className="mb-8 p-5 sm:p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-3 animate-in fade-in duration-300"
        >
          <div className="flex items-center gap-2 font-bold text-sm sm:text-base text-emerald-950">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>Enquiry Successfully Submitted!</span>
          </div>
          <div className="text-xs sm:text-sm text-emerald-900/90 space-y-1.5 leading-relaxed">
            <p>
              Your project requirements have been recorded directly in our verified MongoDB Atlas intake funnel.
            </p>
            <p className="text-emerald-800">
              Our engineering team will inspect the scope and reach out within 24 business hours.
            </p>
          </div>
          <div className="pt-2 flex items-center justify-between border-t border-emerald-200">
            <span className="text-[11px] text-emerald-800 font-mono font-medium">
              Status: Verified Lead · Stored in Database
            </span>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-950 hover:underline cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Submit Another Project</span>
            </button>
          </div>
        </div>
      )}

      {/* Submission Error Banner */}
      {errors.general && (
        <div
          role="alert"
          aria-live="assertive"
          className="mb-8 p-5 sm:p-6 rounded-2xl bg-red-50 border border-red-200 text-red-950 space-y-2 animate-in fade-in duration-300"
        >
          <div className="flex items-center gap-2 font-bold text-sm sm:text-base text-red-950">
            <AlertCircle className="w-5 h-5 text-brand-red flex-shrink-0" />
            <span>Submission Error</span>
          </div>
          <p className="text-xs sm:text-sm text-red-900 leading-relaxed">
            {errors.general}
          </p>
          <p className="text-[11px] sm:text-xs text-red-800 font-medium pt-1 border-t border-red-200">
            Your form inputs have been preserved. Please review and try submitting again.
          </p>
        </div>
      )}

      {/* The Interactive Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
        {/* Anti-Spam Honeypot (Hidden) */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website_url_hp">Leave this field blank</label>
          <input
            id="website_url_hp"
            name="website_url_hp"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={formData.website_url_hp}
            onChange={handleChange}
          />
        </div>

        {/* Row 1: Full Name & Business Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div className="space-y-1.5">
            <label htmlFor="fullName" className="block text-xs sm:text-[13px] font-bold uppercase tracking-wider text-gray-800">
              Full Name <span className="text-brand-red">*</span>
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              autoComplete="name"
              placeholder="e.g. Vikram Malhotra"
              value={formData.fullName}
              onChange={handleChange}
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? 'fullName-error' : undefined}
              className={`w-full px-3.5 sm:px-4 py-3 rounded-xl border text-sm sm:text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red/30 transition-all ${
                errors.fullName
                  ? 'border-red-400 bg-red-50/20 focus:border-brand-red'
                  : 'border-gray-300 bg-gray-50/50 hover:border-gray-400 focus:border-brand-red focus:bg-white'
              }`}
            />
            {errors.fullName && (
              <p id="fullName-error" className="text-xs sm:text-[13px] font-medium text-red-600 flex items-center gap-1.5 mt-1.5">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{errors.fullName}</span>
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-xs sm:text-[13px] font-bold uppercase tracking-wider text-gray-800">
              Business Email <span className="text-brand-red">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="vikram@company.com"
              value={formData.email}
              onChange={handleChange}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={`w-full px-3.5 sm:px-4 py-3 rounded-xl border text-sm sm:text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red/30 transition-all ${
                errors.email
                  ? 'border-red-400 bg-red-50/20 focus:border-brand-red'
                  : 'border-gray-300 bg-gray-50/50 hover:border-gray-400 focus:border-brand-red focus:bg-white'
              }`}
            />
            {errors.email && (
              <p id="email-error" className="text-xs sm:text-[13px] font-medium text-red-600 flex items-center gap-1.5 mt-1.5">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{errors.email}</span>
              </p>
            )}
          </div>
        </div>

        {/* Row 2: Phone Number & Company Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div className="space-y-1.5">
            <label htmlFor="phone" className="block text-xs sm:text-[13px] font-bold uppercase tracking-wider text-gray-800">
              Phone Number <span className="text-brand-red">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={handleChange}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              className={`w-full px-3.5 sm:px-4 py-3 rounded-xl border text-sm sm:text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red/30 transition-all ${
                errors.phone
                  ? 'border-red-400 bg-red-50/20 focus:border-brand-red'
                  : 'border-gray-300 bg-gray-50/50 hover:border-gray-400 focus:border-brand-red focus:bg-white'
              }`}
            />
            {errors.phone && (
              <p id="phone-error" className="text-xs sm:text-[13px] font-medium text-red-600 flex items-center gap-1.5 mt-1.5">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{errors.phone}</span>
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="companyName" className="block text-xs sm:text-[13px] font-bold uppercase tracking-wider text-gray-800">
              Company / Brand Name <span className="text-gray-500 font-medium normal-case text-[11px] sm:text-xs">(optional)</span>
            </label>
            <input
              id="companyName"
              name="companyName"
              type="text"
              autoComplete="organization"
              placeholder="e.g. Nexus Logistics India"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full px-3.5 sm:px-4 py-3 rounded-xl border border-gray-300 bg-gray-50/50 text-sm sm:text-base text-gray-900 placeholder:text-gray-400 hover:border-gray-400 focus:border-brand-red focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-red/30 transition-all"
            />
          </div>
        </div>

        {/* Row 3: Service of Interest */}
        <div className="space-y-1.5">
          <label htmlFor="service" className="block text-xs sm:text-[13px] font-bold uppercase tracking-wider text-gray-800">
            Primary Capability Needed <span className="text-brand-red">*</span>
          </label>
          <select
            id="service"
            name="service"
            required
            value={formData.service}
            onChange={handleChange}
            className="w-full px-3.5 sm:px-4 py-3 rounded-xl border border-gray-300 bg-gray-50/50 text-sm sm:text-base text-gray-900 hover:border-gray-400 focus:border-brand-red focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-red/30 transition-all cursor-pointer"
          >
            {serviceOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Row 4: Estimated Budget (Optional) & Timeline (Optional) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div className="space-y-1.5">
            <label htmlFor="budget" className="block text-xs sm:text-[13px] font-bold uppercase tracking-wider text-gray-800">
              Estimated Budget <span className="text-gray-500 font-medium normal-case text-[11px] sm:text-xs">(optional)</span>
            </label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full px-3.5 sm:px-4 py-3 rounded-xl border border-gray-300 bg-gray-50/50 text-sm sm:text-base text-gray-900 hover:border-gray-400 focus:border-brand-red focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-red/30 transition-all cursor-pointer"
            >
              <option value="">Select planning range (optional)</option>
              {budgetOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="timeline" className="block text-xs sm:text-[13px] font-bold uppercase tracking-wider text-gray-800">
              Target Timeline <span className="text-gray-500 font-medium normal-case text-[11px] sm:text-xs">(optional)</span>
            </label>
            <select
              id="timeline"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              className="w-full px-3.5 sm:px-4 py-3 rounded-xl border border-gray-300 bg-gray-50/50 text-sm sm:text-base text-gray-900 hover:border-gray-400 focus:border-brand-red focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-red/30 transition-all cursor-pointer"
            >
              <option value="">Select target timeline (optional)</option>
              {timelineOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 5: Project Description */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="message" className="block text-xs sm:text-[13px] font-bold uppercase tracking-wider text-gray-800">
              Project Description <span className="text-brand-red">*</span>
            </label>
            <span className="text-[11px] sm:text-xs font-mono text-gray-500">
              {formData.message.length} / 3000 chars
            </span>
          </div>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            maxLength={3000}
            placeholder="Tell us about your current digital setup, conversion challenges, or target launch goals..."
            value={formData.message}
            onChange={handleChange}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className={`w-full px-3.5 sm:px-4 py-3 rounded-xl border text-sm sm:text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red/30 transition-all ${
              errors.message
                ? 'border-red-400 bg-red-50/20 focus:border-brand-red'
                : 'border-gray-300 bg-gray-50/50 hover:border-gray-400 focus:border-brand-red focus:bg-white'
            }`}
          />
          {errors.message && (
            <p id="message-error" className="text-xs sm:text-[13px] font-medium text-red-600 flex items-center gap-1.5 mt-1.5">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{errors.message}</span>
            </p>
          )}
        </div>

        {/* Row 6: Privacy Acknowledgment Checkbox */}
        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              name="privacyAccepted"
              checked={formData.privacyAccepted}
              onChange={handleChange}
              aria-invalid={!!errors.privacyAccepted}
              aria-describedby={errors.privacyAccepted ? 'privacy-error' : undefined}
              className="mt-0.5 h-5 w-5 rounded border-gray-300 text-brand-red focus:ring-brand-red/30 cursor-pointer flex-shrink-0"
            />
            <span className="text-xs sm:text-[13px] text-gray-800 leading-relaxed select-none">
              I acknowledge that Ethixweb will use the provided information to review my project enquiry in accordance with the{' '}
              <a
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-red font-semibold underline underline-offset-2 hover:text-brand-red-dark"
              >
                Privacy Policy
              </a>
              . Your information will never be shared with third parties.
            </span>
          </label>
          {errors.privacyAccepted && (
            <p id="privacy-error" className="text-xs sm:text-[13px] text-red-600 flex items-center gap-1.5 mt-1.5 ml-8 font-medium">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{errors.privacyAccepted}</span>
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2 sm:pt-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl bg-brand-red text-white text-sm sm:text-base font-bold shadow-md hover:bg-brand-red-dark transition-all duration-200 hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:pointer-events-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-red"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Validating Your Details...</span>
              </>
            ) : (
              <>
                <span>Submit Technical Enquiry</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Confidentiality Footer */}
        <div className="pt-2 text-center flex items-center justify-center gap-2 text-xs text-gray-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
          <span>Confidential Technical Inquiry · Ethixweb Operating Standard</span>
        </div>
      </form>
    </div>
  );
}
