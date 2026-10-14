import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Rocket,
  ShoppingBag,
  Building2,
  Stethoscope,
  ArrowRight,
  CheckCircle2,
  Smartphone,
  Zap,
} from 'lucide-react';

const businessSegments = [
  {
    icon: Rocket,
    segment: 'High-Growth Startups & Tech Ventures',
    badge: 'Rapid Velocity',
    headline: 'Modern codebases built to scale without technical debt',
    description:
      'We build clean Next.js and TypeScript web applications engineered for rapid feature iteration, investor demonstrations, and zero-latency performance.',
    capabilities: [
      'Production MVP launch in 2–4 week disciplined sprints',
      'Clean modular architecture ready for technical due diligence',
      'Native developer documentation and structured repository handoff',
      'Scalable cloud infrastructure configured on Vercel or AWS',
    ],
    image: 'https://res.cloudinary.com/dwsdxem8w/image/upload/v1791972715/ethixweb/home/indian-tech-founders.jpg',
  },
  {
    icon: ShoppingBag,
    segment: 'D2C & Consumer E-Commerce Brands',
    badge: 'Mobile First',
    headline: 'Sub-second shopping flows engineered for Indian mobile networks',
    description:
      'Headless product catalogs, instant load speeds, and friction-free checkout workflows tailored for Indian mobile consumers on variable 4G/5G connections.',
    capabilities: [
      'Sub-500ms edge catalog browsing to prevent pre-checkout drop-off',
      'Seamless Razorpay, Cashfree, and UPI payment gateway preparation',
      'Automated WhatsApp cart abandonment recovery sequences',
      'Server-side Meta CAPI and Google Ads conversion attribution',
    ],
    image: 'https://res.cloudinary.com/dwsdxem8w/image/upload/v1791972725/ethixweb/projects/ecommerce-showcase.jpg',
  },
  {
    icon: Building2,
    segment: 'SMEs & B2B Industrial Enterprises',
    badge: 'Lead Engines',
    headline: 'Turning search traffic into verified commercial RFQ inquiries',
    description:
      'Replacing static brochure websites with interactive Request for Quote (RFQ) pipelines that capture high-intent commercial buyers searching Google.',
    capabilities: [
      'High-intent commercial search keyword targeting and SEO dominance',
      'Interactive product specification sheets and quotation generators',
      'Immediate lead dispatch to sales teams via WhatsApp and CRM sync',
      'Negative keyword hygiene eliminating consumer retail waste',
    ],
    image: 'https://res.cloudinary.com/dwsdxem8w/image/upload/v1791972728/ethixweb/projects/realestate-showcase.jpg',
  },
  {
    icon: Stethoscope,
    segment: 'Professional Services & Clinic Networks',
    badge: 'Zero Friction',
    headline: 'Streamlined online appointment booking without phone tag',
    description:
      'Turn prospective clients and patients into confirmed calendar bookings across mobile, tablet, and desktop with zero friction.',
    capabilities: [
      'One-step mobile reservation flows for consultations and services',
      'Automated WhatsApp and SMS confirmation & reminder dispatches',
      'Multi-branch location SEO and Google Maps optimization',
      'HIPAA and Indian data privacy aligned intake forms',
    ],
    image: 'https://res.cloudinary.com/dwsdxem8w/image/upload/v1791972727/ethixweb/projects/healthcare-showcase.jpg',
  },
];

export default function IndiaSolutionsSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gray-50/70 border-t border-gray-100" id="india-solutions">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-xs sm:text-sm font-semibold text-brand-red border border-red-100">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Tailored Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold font-display text-gray-900 tracking-tight leading-tight">
            Built for the Way India Does Business
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
            Digital architectures purpose-engineered to solve the real operational challenges of Indian consumer behaviour, mobile bandwidth, and lead conversion.
          </p>
        </div>

        {/* 4 Alternating Business Segments */}
        <div className="space-y-8 sm:space-y-12">
          {businessSegments.map((item, index) => {
            const Icon = item.icon;
            const isReversed = index % 2 === 1;

            return (
              <div
                key={index}
                className="group rounded-2xl bg-white border border-gray-200/80 shadow-subtle hover:shadow-card hover:border-red-200 transition-all duration-300 p-6 sm:p-8 lg:p-10 min-w-0"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                    isReversed ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Text Column (7 cols) */}
                  <div
                    className={`space-y-4 min-w-0 ${
                      isReversed ? 'lg:col-span-7 lg:order-2' : 'lg:col-span-7'
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-red-50 text-brand-red flex items-center justify-center border border-red-100 flex-shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-red">
                        {item.segment}
                      </span>
                      <span className="text-gray-300">·</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-700">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-display text-gray-900 group-hover:text-brand-red transition-colors leading-snug">
                      {item.headline}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="pt-2 border-t border-gray-100 space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block">
                        Engineered Capabilities:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {item.capabilities.map((cap, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-gray-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-brand-red flex-shrink-0 mt-0.5" />
                            <span className="leading-snug">{cap}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3">
                      <Link
                        href={`/contact?sector=${encodeURIComponent(item.segment)}`}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-red hover:text-brand-red-dark transition-colors"
                      >
                        <span>Discuss Solutions for {item.segment.split('&')[0].trim()}</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>

                  {/* Image Column (5 cols) */}
                  <div
                    className={`min-w-0 ${
                      isReversed ? 'lg:col-span-5 lg:order-1' : 'lg:col-span-5'
                    }`}
                  >
                    <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-xl overflow-hidden border border-gray-200 shadow-md bg-gray-100">
                      <Image
                        src={item.image}
                        alt={`${item.segment} solution blueprint`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover group-hover:scale-102 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold flex items-center justify-between">
                        <span className="truncate">{item.segment}</span>
                        <span className="flex items-center gap-1 text-[10px] bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded text-white font-mono flex-shrink-0">
                          <Zap className="w-3 h-3 text-amber-300" />
                          Solution Blueprint
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
