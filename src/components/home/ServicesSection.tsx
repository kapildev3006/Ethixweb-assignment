import React from 'react';
import Link from 'next/link';
import { ArrowRight, Monitor, Target, Megaphone, Check } from 'lucide-react';

const defaultServices = [
  {
    tag: '01 / ARCHITECTURE',
    title: 'Web Development',
    description:
      'Fast, modern, SEO-friendly websites and headless platforms engineered for high conversion rates and seamless mobile commerce.',
    capabilities: [
      'Custom Next.js & React engineering',
      'Headless architectures & lightning speed',
      'High-converting landing pages',
      'Mobile-first UX for Indian 4G/5G users',
    ],
    icon: Monitor,
    href: '/services#web-development',
  },
  {
    tag: '02 / ACQUISITION',
    title: 'Google Ads',
    description:
      'Data-driven Google search, display, and high-intent campaigns built and optimized weekly to capture ready-to-buy customers.',
    capabilities: [
      'High-intent search keyword targeting',
      'Negative keyword and waste reduction',
      'Conversion tracking & pipeline sync',
      'Weekly transparent performance audits',
    ],
    icon: Target,
    href: '/services#google-ads',
  },
  {
    tag: '03 / GROWTH ENGINE',
    title: 'Digital Marketing',
    description:
      'Integrated digital marketing solutions to build market authority, nurture prospects, and turn traffic into compound revenue.',
    capabilities: [
      'Technical and local SEO dominance',
      'Meta (Instagram & Facebook) paid funnels',
      'Content strategy & brand positioning',
      'CRM integration & lead routing',
    ],
    icon: Megaphone,
    href: '/services#digital-marketing',
  },
];

interface ServicesSectionProps {
  items?: any[];
}

export default function ServicesSection({ items }: ServicesSectionProps) {
  // Map dynamic services if provided from MongoDB, or fallback to core 3 capabilities
  const displayServices =
    items && items.length >= 3
      ? items.slice(0, 3).map((item, idx) => ({
          tag: `${item.number || '0' + (idx + 1)} / ${item.categoryLabel?.toUpperCase() || 'CAPABILITY'}`,
          title: item.title,
          description: item.description,
          capabilities: item.capabilities?.slice(0, 4) || [],
          icon: idx === 0 ? Monitor : idx === 1 ? Target : Megaphone,
          href: `/services#${item.slug || 'service'}`,
        }))
      : defaultServices;

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white" id="services">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-xs sm:text-sm font-semibold text-brand-red border border-red-100">
            <span>Our Core Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold font-display text-gray-900 tracking-tight leading-tight">
            Everything you need to grow online
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
            From high-speed web platforms to precision performance marketing, we help Indian businesses establish a dominant digital footprint.
          </p>
        </div>

        {/* 3-Column Premium Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {displayServices.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-white border border-gray-200/80 shadow-subtle hover:shadow-card-hover hover:border-red-200 transition-all duration-300 h-full min-w-0"
              >
                {/* Top Subtle Red Accent Line on Hover */}
                <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-brand-red to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t" />

                <div className="space-y-5">
                  {/* Category Tag & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold tracking-wider uppercase text-gray-400 group-hover:text-brand-red transition-colors">
                      {item.tag}
                    </span>
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-red-50 text-brand-red flex items-center justify-center border border-red-100/70 group-hover:bg-brand-red group-hover:text-white transition-all duration-300 shadow-xs flex-shrink-0">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-gray-900 group-hover:text-brand-red transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Feature Checklist */}
                  <div className="pt-2 border-t border-gray-100 space-y-2.5">
                    {item.capabilities.map((cap: string, i: number) => (
                      <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                        <Check className="w-4 h-4 text-brand-red flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Link */}
                <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-red group-hover:text-brand-red-dark transition-colors"
                  >
                    <span>Explore {item.title}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                  <span className="text-[11px] sm:text-xs text-gray-400 font-medium">Sprint-ready</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
