import React from 'react';
import { Sparkles, ArrowDown, ShieldCheck, Mail, Calendar, PhoneCall } from 'lucide-react';

interface ContactHeroProps {
  email?: string;
  whatsappNumber?: string;
  calendlyUrl?: string;
  heroData?: {
    heroEyebrow?: string;
    heroHeadline?: string;
    heroHeadlineHighlight?: string;
    heroDescription?: string;
  };
}

export default function ContactHero({
  email = 'info@ethixweb.com',
  whatsappNumber,
  calendlyUrl = 'https://calendly.com/ethixweb-agency/30min',
  heroData,
}: ContactHeroProps) {
  const eyebrow = heroData?.heroEyebrow || "LET'S CONNECT";
  const headline = heroData?.heroHeadline || "Let's Turn Your Vision Into";
  const highlight = heroData?.heroHeadlineHighlight || 'Digital Growth.';
  const description =
    heroData?.heroDescription ||
    "Whether you're building a new website, scaling your digital marketing, or exploring AI-powered solutions, we'd love to hear about your project.";

  const activeWhatsapp = whatsappNumber ? whatsappNumber.replace(/[^0-9]/g, '') : null;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50/40 to-white pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-20 border-b border-gray-100">
      {/* Decorative background glow isolated in an overflow-hidden wrapper */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute top-10 right-0 w-80 h-80 sm:w-96 sm:h-96 bg-red-100/35 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-gray-100/60 rounded-full blur-2xl" />
      </div>

      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-6 min-w-0">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50/90 border border-red-200/60 text-xs sm:text-sm font-semibold text-brand-red shadow-2xs max-w-full">
            <Sparkles className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
            <span className="tracking-wide uppercase font-bold text-[11px] sm:text-xs">
              {eyebrow}
            </span>
            <span className="text-gray-300">|</span>
            <span className="text-gray-600 font-medium truncate">Technical Consultation &amp; Scoping</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-[2.2rem] sm:text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold font-display tracking-tight text-gray-900 leading-[1.12] break-words">
            {headline}{' '}
            <span className="text-brand-red relative inline-block">
              {highlight}
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-brand-red to-brand-red-glow rounded-full" />
            </span>
          </h1>

          {/* Supporting Copy */}
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-normal">
            {description}
          </p>

          {/* Action Links */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href="#enquiry-form"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-lg bg-brand-red text-white text-sm sm:text-base font-bold shadow-md hover:bg-brand-red-dark transition-all duration-200 hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0 min-w-[160px]"
            >
              <span>Fill Enquiry Form</span>
              <ArrowDown className="w-4 h-4" />
            </a>
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-lg border border-gray-300 text-gray-700 text-sm sm:text-base font-semibold bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 min-w-[160px]"
            >
              <Calendar className="w-4 h-4 text-brand-red" />
              <span>Book Discovery Call</span>
            </a>
          </div>

          {/* Sourced Highlights */}
          <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-center gap-y-2 gap-x-5 text-xs sm:text-sm text-gray-600 font-medium">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Technical Scoping &amp; Review</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-brand-red flex-shrink-0" />
              <span>Direct Email: {email}</span>
            </div>
            {activeWhatsapp && (
              <a
                href={`https://wa.me/${activeWhatsapp}?text=${encodeURIComponent('Hello Ethixweb technical team, I would like to inquire about an engineering consultation.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-emerald-700 hover:text-emerald-900 font-semibold transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>WhatsApp: +{activeWhatsapp}</span>
              </a>
            )}
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Confidential Consultation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
