import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Compass, CheckCircle2, Building, Terminal } from 'lucide-react';
interface OurStoryProps {
  story?: {
    headline?: string;
    paragraphs?: string[];
    highlightQuote?: string;
  };
}

export default function OurStory({ story }: OurStoryProps) {
  const headline = story?.headline || 'Why we redesigned Ethixweb for the Indian digital ecosystem';
  const paragraphs = story?.paragraphs && story.paragraphs.length > 0
    ? story.paragraphs
    : [
        "In 2020, Ethixweb began with a straightforward observation: businesses were tired of fragmented agencies. Typically, a company would hire a designer who didn't understand conversion, a developer who built slow and insecure websites, and an ad agency that burned ad spend on vanity impressions.",
        "We engineered an alternative: one senior team handling website architecture, AI workflows, Google Ads, and continuous support under a disciplined, weekly sprint delivery rhythm.",
        "As India's digital revolution accelerated across startups, D2C retail, and industrial SMEs, we saw an immense opportunity. Indian businesses are building world-class products, yet many still rely on bloated legacy WordPress templates that buckle on mobile connections and leak customer leads.",
      ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white" id="our-story">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Visual Composition with Verified Entity Card */}
          <div className="lg:col-span-5 space-y-6 min-w-0">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-gray-200/80 shadow-xl bg-gray-100 group">
              <Image
                src="https://res.cloudinary.com/dwsdxem8w/image/upload/v1791972717/ethixweb/home/india-gate-hero.jpg"
                alt="Connecting global engineering rigor with the Indian market"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-medium">
                <span className="block font-bold text-sm text-white">Our India Focus</span>
                <span className="text-gray-200 text-xs">Delivering global engineering quality to Indian businesses</span>
              </div>
            </div>

            {/* Corporate Entity & Operating History Box */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gray-50/80 border border-gray-200/80 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-red">
                <Building className="w-4 h-4" />
                <span>Verified Entity &amp; Dual-Shore Model</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                <strong>Ethixweb USA LLC</strong> is a registered corporate entity in Wyoming, United States, operating continuously since 2020. Our delivery model pairs US contractual governance with dedicated senior software engineers in India.
              </p>
              <div className="pt-2 border-t border-gray-200/60 flex items-center gap-2 text-xs text-gray-500 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Verified since 2020 · 4.0★ Trustpilot rating</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative */}
          <div className="lg:col-span-7 space-y-6 min-w-0">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-xs sm:text-sm font-semibold text-brand-red border border-red-100">
                <Compass className="w-3.5 h-3.5" />
                <span>Our Story &amp; Mission</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold font-display text-gray-900 tracking-tight leading-tight">
                {headline}
              </h2>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
              {paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Core Commitments Checklist */}
            <div className="pt-2 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-gray-700 font-medium">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
                <span>Zero junior handoffs or trainees</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
                <span>2–4 week average launch velocity</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
                <span>Sub-second mobile speed standard</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
                <span>Revenue and lead-focused metrics</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
