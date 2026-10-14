import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Zap, CheckCircle2, Globe2 } from 'lucide-react';

interface HeroProps {
  data?: {
    heroEyebrow?: string;
    heroHeadline?: string;
    heroHeadlineHighlight?: string;
    heroDescription?: string;
    primaryCtaLabel?: string;
    primaryCtaDestination?: string;
    secondaryCtaLabel?: string;
    secondaryCtaDestination?: string;
    heroBannerImage?: string;
    heroBannerAlt?: string;
  };
}

export default function Hero({ data }: HeroProps) {
  const headline = data?.heroHeadline || 'Digital Growth';
  const headlineHighlight = data?.heroHeadlineHighlight || 'Indian Businesses';
  const description =
    data?.heroDescription ||
    'We build high-performing websites, run result-driven Google Ads, and create digital marketing strategies that help Indian startups, D2C brands, and SMEs scale customer acquisition and revenue.';
  const primaryLabel = data?.primaryCtaLabel || 'Get Started';
  const primaryDest = data?.primaryCtaDestination || '/contact';
  const secondaryLabel = data?.secondaryCtaLabel || 'View Our Work';
  const secondaryDest = data?.secondaryCtaDestination || '/#work';
  const heroImage = data?.heroBannerImage || 'https://res.cloudinary.com/dwsdxem8w/image/upload/v1791972715/ethixweb/home/indian-tech-founders.jpg';
  const heroAlt = data?.heroBannerAlt || 'Modern digital operations and technology collaboration';

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50/30 to-white pt-6 pb-12 sm:pt-10 sm:pb-18 lg:pt-16 lg:pb-22">
      {/* Subtle background decorative shapes isolated in an overflow-hidden container */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute top-1/4 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-red-100/30 rounded-full blur-3xl" />
        <div className="absolute top-10 left-10 w-64 h-64 sm:w-72 sm:h-72 bg-gray-100/50 rounded-full blur-2xl" />
      </div>

      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column (7 cols) */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 min-w-0">
            {/* Eyebrow Pill */}
            <div className="inline-flex flex-wrap items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-red-50/90 border border-red-200/60 text-xs sm:text-sm font-semibold text-brand-red shadow-2xs max-w-full">
              <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse flex-shrink-0" />
              <span className="truncate">Web Development • Google Ads • Digital Marketing</span>
              <span className="hidden sm:inline text-gray-300">|</span>
              <span className="hidden sm:inline-flex items-center gap-1 text-gray-600 font-medium">
                <Globe2 className="w-3.5 h-3.5 text-gray-400" />
                Pan-India &amp; Global Delivery
              </span>
            </div>

            {/* Main Headline with responsive text scaling */}
            <h1 className="text-[2.15rem] sm:text-4xl md:text-5xl lg:text-[3.65rem] font-extrabold font-display tracking-tight text-gray-900 leading-[1.14] break-words">
              {headline} <br className="hidden sm:inline" />
              {!headline.trim().toLowerCase().endsWith('for') && 'for '}
              <span className="text-brand-red relative inline-block">
                {headlineHighlight}
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-brand-red to-brand-red-glow rounded-full" />
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl leading-relaxed font-normal">
              {description}
            </p>

            {/* CTA Buttons */}
            <div className="pt-1 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href={primaryDest}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-lg bg-brand-red text-white text-sm sm:text-base font-bold shadow-md hover:bg-brand-red-dark transition-all duration-200 hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0 min-w-[140px]"
              >
                <span>{primaryLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={secondaryDest}
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-lg border border-gray-300 text-gray-700 text-sm sm:text-base font-semibold bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 min-w-[140px]"
              >
                <span>{secondaryLabel}</span>
              </Link>
            </div>

            {/* Verified Operational Highlights */}
            <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs sm:text-sm text-gray-600 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>2–4 Weeks Typical Launch</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Senior Engineers Only</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>4.0★ Trustpilot Rating</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Composition (5 cols) */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0 min-w-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Tech Team Image Card with Neutral Descriptive Label */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-gray-200/80 bg-white group">
                <Image
                  src={heroImage}
                  alt={heroAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                {/* Neutral, Honest Caption */}
                <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-medium drop-shadow-sm flex items-center justify-between">
                  <span className="truncate">Digital Engineering &amp; Growth Studio</span>
                  <span className="px-2 py-0.5 rounded bg-black/40 backdrop-blur-xs text-[10px] tracking-wider uppercase text-emerald-300 font-bold border border-emerald-400/30 flex-shrink-0 ml-2">
                    Production Stack
                  </span>
                </div>
              </div>

              {/* Floating Architectural Insight Pill (Top Right on desktop/tablet) */}
              <div className="hidden sm:flex absolute -top-3.5 -right-3.5 z-20 items-center gap-2.5 px-3.5 py-1.5 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/70">
                <div className="relative w-7 h-7 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                  <Image
                    src="https://res.cloudinary.com/dwsdxem8w/image/upload/v1791972717/ethixweb/home/india-gate-hero.jpg"
                    alt="India operations"
                    fill
                    sizes="28px"
                    className="object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">India Focus</p>
                  <p className="text-xs font-bold text-gray-900 leading-none">Pan-India Reach</p>
                </div>
              </div>

              {/* Floating Business & Technology Insight Card (Positioned safely) */}
              <div className="mt-3 sm:mt-0 sm:absolute sm:-bottom-5 sm:-left-3 z-20 flex items-center gap-3 px-3.5 py-2.5 sm:px-4 sm:py-3 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/80 sm:max-w-xs">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-red-50 flex items-center justify-center text-brand-red border border-red-100 flex-shrink-0">
                  <Zap className="w-4 h-4 fill-brand-red/20 text-brand-red" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                      Performance Focus
                    </span>
                  </div>
                  <p className="text-xs font-bold text-gray-900 leading-snug truncate sm:whitespace-normal">
                    Sub-second load times for Indian mobile users
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
