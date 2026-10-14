import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, PhoneCall } from 'lucide-react';

interface ServicesCtaProps {
  whatsappNumber?: string;
}

export default function ServicesCta({ whatsappNumber }: ServicesCtaProps) {
  const activeWhatsapp = (whatsappNumber || '919876543210').replace(/[^0-9]/g, '');

  return (
    <section className="py-14 sm:py-18 lg:py-20 bg-white">
      <div className="container-custom">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-red via-[#B51E24] to-brand-red-dark text-white px-5 py-10 sm:px-12 sm:py-16 lg:px-16 lg:py-18 shadow-xl text-center">
          {/* Subtle geometric background light elements isolated in an overflow-hidden container */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 right-0 w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-black/20 blur-2xl" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-4 sm:space-y-6 min-w-0">
            <div className="inline-flex max-w-full items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-xs sm:text-sm font-semibold tracking-wide text-white border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-200 flex-shrink-0" />
              <span className="truncate">Engineering Consultation</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white leading-tight break-words">
              Have a Project in Mind? Let&apos;s Build It.
            </h2>

            <p className="text-xs sm:text-base lg:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed font-normal">
              Whether you need a high-converting website rebuild, an AI chatbot tailored to your customer inquiries, or an ROI-driven Google Ads campaign, our senior engineering team is ready to deliver.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white text-brand-red text-sm sm:text-base font-bold shadow-lg hover:bg-gray-50 transition-all duration-200 hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Discuss Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`https://wa.me/${activeWhatsapp}?text=${encodeURIComponent(
                  'Hi Ethixweb team, I would like to schedule a consultation regarding your digital services for my business.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30 text-white text-sm sm:text-base font-semibold backdrop-blur-xs transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-emerald-300" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
