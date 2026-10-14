import React from 'react';
import Link from 'next/link';
import { Monitor, Bot, Target, LineChart, Wrench, ArrowRight, CheckCircle2 } from 'lucide-react';

const practiceAreas = [
  {
    icon: Monitor,
    title: 'Website Engineering',
    summary: 'Next.js, React, and headless architectures engineered for high mobile conversion.',
    capabilities: ['Custom Web Development', 'Headless CMS', 'Landing Pages', 'Security'],
    href: '/services#website-redesign',
  },
  {
    icon: Bot,
    title: 'AI & Automation',
    summary: 'Intelligent RAG chatbots, conversational receptionists, and automated inquiry triage.',
    capabilities: ['Custom LLM Chatbots', 'Knowledge Bots', 'AI CSR Dispatch', 'Human Handoff'],
    href: '/services#llm-chatbot',
  },
  {
    icon: Target,
    title: 'Google Ads & Digital Growth',
    summary: 'High-intent search campaigns, negative keyword hygiene, and Meta paid ad funnels.',
    capabilities: ['Google Ads + LSA', 'Meta Ads', 'Local & Technical SEO', 'Social Strategy'],
    href: '/services#google-ads-lsa',
  },
  {
    icon: LineChart,
    title: 'Analytics & Pipeline Integration',
    summary: 'Connecting ad clicks to closed sales with server-side GA4 and automated CRM sync.',
    capabilities: ['Full-Funnel Analytics', 'Live Dashboards', 'CRM Synchronization', 'ROI Audits'],
    href: '/services#full-funnel-analytics',
  },
  {
    icon: Wrench,
    title: 'Dedicated Technical Support',
    summary: 'Direct engineer access for maintenance, API webhook monitoring, and rapid bug triage.',
    capabilities: ['Emergency Break-Fix', 'API Monitoring', 'AI Knowledge Upkeep', 'Cloud Health'],
    href: '/services#technical-support',
  },
];

export default function AboutExpertise() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white" id="expertise">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-3 min-w-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-xs sm:text-sm font-semibold text-brand-red border border-red-100">
              <span>Core Practices</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold font-display text-gray-900 tracking-tight leading-tight">
              Our Core Technical Disciplines
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-xl font-normal">
              Specialized digital engineering and performance practices aligned into one cohesive delivery framework.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-colors flex-shrink-0 self-start md:self-auto"
          >
            <span>Explore All 22 Services</span>
            <ArrowRight className="w-4 h-4 text-brand-red" />
          </Link>
        </div>

        {/* 5 Practices (3 + 2 Grid Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {practiceAreas.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white border border-gray-200/80 shadow-subtle hover:shadow-card-hover hover:border-red-200 transition-all duration-300 min-w-0"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-brand-red flex items-center justify-center border border-red-100/70 group-hover:bg-brand-red group-hover:text-white transition-all duration-300 shadow-2xs flex-shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold font-display text-gray-900 group-hover:text-brand-red transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {item.summary}
                  </p>

                  <div className="pt-2 border-t border-gray-100 space-y-1.5">
                    {item.capabilities.map((cap, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-gray-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-gray-100">
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-red hover:text-brand-red-dark transition-colors"
                  >
                    <span>View Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
