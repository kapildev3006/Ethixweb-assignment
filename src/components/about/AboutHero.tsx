import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Globe2, ShieldCheck, Cpu } from 'lucide-react';

interface AboutHeroProps {
  data?: {
    heroEyebrow?: string;
    heroHeadline?: string;
    heroHeadlineHighlight?: string;
    heroDescription?: string;
    heroImage?: string;
    heroImageAlt?: string;
  };
}

export default function AboutHero({ data }: AboutHeroProps) {
  const eyebrow = data?.heroEyebrow || 'About Ethixweb';
  const headline = data?.heroHeadline || 'Global Thinking. Built for';
  const headlineHighlight = data?.heroHeadlineHighlight || "India's Next Generation";
  const description =
    data?.heroDescription ||
    'Ethixweb brings together modern web development, intelligent AI automation, performance-driven digital marketing, and continuous operations. We combine global technical standards with deep empathy for the Indian business ecosystem.';
  const heroImage = data?.heroImage || 'https://res.cloudinary.com/dwsdxem8w/image/upload/v1791972719/ethixweb/about/about-architecture.jpg';
  const heroAlt = data?.heroImageAlt || 'Modern architectural digital technology studio';

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50/40 to-white pt-8 pb-14 sm:pt-12 sm:pb-20 lg:pt-18 lg:pb-24 border-b border-gray-100">
      {/* Decorative background glow isolated in an overflow-hidden wrapper */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
        <div className="absolute top-10 right-0 w-80 h-80 sm:w-96 sm:h-96 bg-red-100/35 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-gray-100/60 rounded-full blur-2xl" />
      </div>

      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column (7 cols) */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 min-w-0">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50/90 border border-red-200/60 text-xs sm:text-sm font-semibold text-brand-red shadow-2xs max-w-full">
              <Sparkles className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
              <span className="tracking-wide uppercase font-bold text-[11px] sm:text-xs">
                {eyebrow}
              </span>
              <span className="text-gray-300">|</span>
              <span className="text-gray-600 font-medium truncate">Engineering &amp; Growth Studio</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-[2.2rem] sm:text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold font-display tracking-tight text-gray-900 leading-[1.12] break-words">
              {headline}{' '}
              <span className="text-brand-red relative inline-block">
                {headlineHighlight}
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-brand-red to-brand-red-glow rounded-full" />
              </span>{' '}
              of Businesses.
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl leading-relaxed font-normal">
              {description}
            </p>

            {/* CTA Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-lg bg-brand-red text-white text-sm sm:text-base font-bold shadow-md hover:bg-brand-red-dark transition-all duration-200 hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0 min-w-[150px]"
              >
                <span>Our Capabilities</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-lg border border-gray-300 text-gray-700 text-sm sm:text-base font-semibold bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 min-w-[150px]"
              >
                <span>Get in Touch</span>
              </Link>
            </div>

            {/* Sourced Operating Highlights */}
            <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs sm:text-sm text-gray-600 font-medium">
              <div className="flex items-center gap-1.5">
                <Globe2 className="w-4 h-4 text-brand-red flex-shrink-0" />
                <span>Dual-Shore Delivery (US &amp; India)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-brand-red flex-shrink-0" />
                <span>Next.js &amp; Cloud Native</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-red flex-shrink-0" />
                <span>Operating Since 2020</span>
              </div>
            </div>
          </div>

          {/* Right Visual Column (5 cols) */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0 min-w-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Architecture Studio Image */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-gray-200/80 bg-white group">
                <Image
                  src={heroImage}
                  alt={heroAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Neutral Caption */}
                <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-medium drop-shadow-sm flex items-center justify-between">
                  <span className="truncate">Digital Engineering Framework</span>
                  <span className="px-2 py-0.5 rounded bg-black/40 backdrop-blur-xs text-[10px] tracking-wider uppercase text-emerald-300 font-bold border border-emerald-400/30 flex-shrink-0 ml-2">
                    Ethixweb Standard
                  </span>
                </div>
              </div>

              {/* Floating Entity Disclosure Pill */}
              <div className="mt-3 sm:mt-0 sm:absolute sm:-bottom-5 sm:-left-3 z-20 flex items-center gap-3 px-3.5 py-2.5 sm:px-4 sm:py-3 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-gray-200/80 sm:max-w-xs">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-red-50 flex items-center justify-center text-brand-red border border-red-100 flex-shrink-0">
                  <ShieldCheck className="w-4 h-4 fill-brand-red/20 text-brand-red" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                      Verified Entity
                    </span>
                  </div>
                  <p className="text-xs font-bold text-gray-900 leading-snug truncate sm:whitespace-normal">
                    Ethixweb USA LLC (Wyoming, US)
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
