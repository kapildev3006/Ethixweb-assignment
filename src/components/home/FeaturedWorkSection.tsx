import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, Layers, Sparkles } from 'lucide-react';

interface FeaturedWorkSectionProps {
  items?: any[];
}

export default function FeaturedWorkSection({ items }: FeaturedWorkSectionProps) {
  const caseStudiesToRender = items && items.length > 0
    ? items
        .filter((item) => !item.isBlueprint)
        .map((item) => ({
          client: item.client,
          badge: item.badge || 'Verified Client Project',
          headline: item.headline,
          category: item.category,
          screenshot: item.imageUrl || item.screenshot,
          description: item.description,
          metrics: item.metrics || [],
        }))
    : [];

  const blueprintsToRender = items && items.length > 0
    ? items
        .filter((item) => item.isBlueprint)
        .map((item) => ({
          title: item.client || item.title || item.headline,
          sector: item.category || item.sector,
          conceptImage: item.imageUrl || item.conceptImage,
          description: item.description,
          stack: Array.isArray(item.metrics) && item.metrics.length > 0 ? item.metrics.join(' · ') : 'Next.js · Headless Shopify · CDN Optimization',
        }))
    : [];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white" id="work">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-3 min-w-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-xs sm:text-sm font-semibold text-brand-red border border-red-100">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Proven Results</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold font-display text-gray-900 tracking-tight leading-tight">
              Featured Client Work
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-xl">
              Authentic projects engineered and shipped by our team, delivering measurable customer growth and revenue.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-colors flex-shrink-0 self-start md:self-auto"
          >
            <span>Discuss Your Project</span>
            <ArrowRight className="w-4 h-4 text-brand-red" />
          </Link>
        </div>

        {/* 4 Prominent Verified Client Case Study Cards (2x2 Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-10">
          {caseStudiesToRender.map((project, index) => (
            <div
              key={index}
              className="group rounded-2xl overflow-hidden bg-white border border-gray-200/80 shadow-subtle hover:shadow-card-hover hover:border-red-200 transition-all duration-300 flex flex-col justify-between min-w-0"
            >
              <div>
                {/* Screenshot Container */}
                <div className="relative aspect-[16/10] w-full bg-gray-100 overflow-hidden border-b border-gray-100">
                  <Image
                    src={project.screenshot}
                    alt={`${project.client} website screenshot`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-102"
                  />
                  {/* Verified Badge Overlay */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold text-emerald-700 shadow-sm flex items-center gap-1.5 border border-emerald-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{project.badge}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-7 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-brand-red truncate">
                      {project.category}
                    </span>
                    <span className="text-[11px] sm:text-xs text-gray-400 font-medium flex-shrink-0">Production Live</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold font-display text-gray-900 group-hover:text-brand-red transition-colors">
                    {project.client}
                  </h3>

                  <p className="text-xs sm:text-sm font-semibold text-gray-800 leading-snug">
                    &ldquo;{project.headline}&rdquo;
                  </p>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pt-1">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Metrics Pills Footer */}
              <div className="px-5 sm:px-7 pb-5 sm:pb-6 pt-3 border-t border-gray-100 flex flex-wrap gap-1.5 sm:gap-2">
                {project.metrics.map((metric: string, i: number) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-gray-50 border border-gray-200/60 text-[10px] sm:text-[11px] font-medium text-gray-600"
                  >
                    {metric}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Specialized Solutions for Indian Sectors */}
        <div className="mt-16 sm:mt-20 pt-12 sm:pt-14 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-2">
            <div>
              <div className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-brand-red">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Specialized Architecture Blueprints</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-gray-900 mt-1">
                Engineered Solutions for Indian Growth Sectors
              </h3>
            </div>
            <p className="text-xs text-gray-500 max-w-sm">
              Custom web and marketing architectures designed specifically for modern Indian business requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blueprintsToRender.map((blueprint, idx) => (
              <div
                key={idx}
                className="group rounded-xl overflow-hidden bg-gray-50/70 border border-gray-200/80 hover:bg-white hover:border-gray-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between min-w-0"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full bg-gray-200 overflow-hidden">
                    <Image
                      src={blueprint.conceptImage}
                      alt={blueprint.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-gray-900/80 backdrop-blur-xs text-white px-2.5 py-0.5 rounded text-[10px] font-semibold">
                      Solution Blueprint
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                      {blueprint.sector}
                    </span>
                    <h4 className="text-base font-bold text-gray-900 leading-snug group-hover:text-brand-red transition-colors">
                      {blueprint.title}
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {blueprint.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-3 border-t border-gray-200/60 flex items-center justify-between text-[11px] font-medium text-gray-500 gap-2">
                  <span className="flex items-center gap-1 truncate">
                    <Layers className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                    <span className="truncate">{blueprint.stack}</span>
                  </span>
                  <Link href="/contact" className="text-brand-red font-semibold hover:underline flex-shrink-0">
                    Inquire
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
