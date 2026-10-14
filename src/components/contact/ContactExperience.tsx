'use client';

import React, { Suspense } from 'react';
import { Mail, Clock, Calendar, ShieldCheck, CheckCircle2, Building, RefreshCw, MessageSquare, PhoneCall } from 'lucide-react';
import ContactForm from './ContactForm';

interface ContactExperienceProps {
  whatsappNumber?: string;
  contactEmail?: string;
  salesPhone?: string;
  operatingHours?: string;
  calendlyUrl?: string;
}

export default function ContactExperience({
  whatsappNumber = '919876543210',
  contactEmail = 'info@ethixweb.com',
  salesPhone = '+1 (888) 555-ETHIX / +91 (80) 4123-ETHX',
  operatingHours = 'Monday – Friday · 9:00 AM – 7:00 PM IST',
  calendlyUrl = 'https://calendly.com/ethixweb-agency/30min',
}: ContactExperienceProps) {
  const activeWhatsapp = (whatsappNumber || '919876543210').replace(/[^0-9]/g, '');

  return (
    <section className="py-14 sm:py-18 lg:py-22 bg-gray-50/70 border-b border-gray-100" id="contact-details">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Verified Contact Information & Trust Messaging (5 cols) */}
          <div className="lg:col-span-5 space-y-8 min-w-0">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-xs sm:text-sm font-semibold text-brand-red border border-red-100">
                <Mail className="w-3.5 h-3.5" />
                <span>Verified Direct Channels</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-gray-900 tracking-tight leading-tight">
                Direct Project Scoping
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
                When you contact Ethixweb, your project scope and technical requirements are reviewed carefully to assess feasibility and growth fit.
              </p>
            </div>

            {/* Verified Information Cards */}
            <div className="space-y-4">
              {/* Direct WhatsApp Consultation (Sourced from MongoDB) */}
              <div className="p-5 rounded-2xl bg-white border border-emerald-200/90 shadow-subtle flex items-start gap-4 transition-all hover:border-emerald-300 hover:shadow-card">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 flex-shrink-0">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">
                      Direct WhatsApp Routing
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Active Chat
                    </span>
                  </div>
                  <a
                    href={`https://wa.me/${activeWhatsapp}?text=${encodeURIComponent('Hello Ethixweb technical team, I would like to inquire about an engineering consultation.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-bold text-gray-900 hover:text-emerald-600 transition-colors block truncate mt-0.5 font-mono"
                  >
                    +{activeWhatsapp}
                  </a>
                  <div className="mt-1 flex items-center justify-between gap-2">
                    <p className="text-xs text-gray-500">
                      Direct consultation with the technical team.
                    </p>
                    <a
                      href={`https://wa.me/${activeWhatsapp}?text=${encodeURIComponent('Hello Ethixweb technical team, I would like to inquire about an engineering consultation.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:underline flex-shrink-0"
                    >
                      Chat Now →
                    </a>
                  </div>
                </div>
              </div>

              {/* Direct Email */}
              <div className="p-5 rounded-2xl bg-white border border-gray-200/80 shadow-subtle flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-brand-red flex items-center justify-center border border-red-100 flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
                    Direct Email
                  </span>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="text-base font-bold text-gray-900 hover:text-brand-red transition-colors block truncate"
                  >
                    {contactEmail}
                  </a>
                  <p className="text-xs text-gray-500 mt-0.5">
                    For technical inquiries, RFP documents, and partnership questions.
                  </p>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="p-5 rounded-2xl bg-white border border-gray-200/80 shadow-subtle flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-brand-red flex items-center justify-center border border-red-100 flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
                    Operating Schedule
                  </span>
                  <p className="text-base font-bold text-gray-900">
                    {operatingHours}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Sprint planning, client demo calls, and deployment windows.
                  </p>
                </div>
              </div>

              {/* Calendly Booking */}
              <div className="p-5 rounded-2xl bg-white border border-gray-200/80 shadow-subtle flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-brand-red flex items-center justify-center border border-red-100 flex-shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
                    Direct Video Discovery
                  </span>
                  <a
                    href={calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-bold text-brand-red hover:underline block"
                  >
                    Schedule 30-Min Discovery Call →
                  </a>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Direct video consultation with the Ethixweb team.
                  </p>
                </div>
              </div>
            </div>

            {/* Corporate Accountability Card */}
            <div className="p-5 rounded-2xl bg-white border border-gray-200/80 shadow-subtle space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-900">
                <Building className="w-4 h-4 text-brand-red" />
                <span>Corporate Structure &amp; Governance</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                <strong>Ethixweb USA LLC</strong> is registered in Wyoming, United States (operating since 2020), providing contractual and IP protection, paired with modern engineering delivery hubs in India.
              </p>
              <div className="pt-2 border-t border-gray-100 flex flex-wrap gap-y-1.5 gap-x-4 text-xs text-gray-500">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Wyoming Entity</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Zero Sales Spam</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Form Card (7 cols) */}
          <div className="lg:col-span-7 min-w-0">
            <Suspense
              fallback={
                <div className="bg-white rounded-3xl p-10 border border-gray-200 shadow-xl flex items-center justify-center min-h-[400px]">
                  <RefreshCw className="w-6 h-6 animate-spin text-brand-red" />
                </div>
              }
            >
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
