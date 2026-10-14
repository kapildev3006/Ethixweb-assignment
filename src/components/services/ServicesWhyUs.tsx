import React from 'react';
import { Layers, MessageSquare, Gauge, CheckSquare, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const strengths = [
  {
    icon: Layers,
    title: 'Senior-Led Engineering',
    tag: 'Direct Access',
    description:
      'You collaborate directly with the senior developers and marketing strategists executing your project. Zero layers of account coordinators or junior trainees learning on your budget.',
  },
  {
    icon: MessageSquare,
    title: 'Direct, Transparent Communication',
    tag: 'Weekly Sprints',
    description:
      'Direct communication channels, regular video sprint demos, and written updates so you always know exactly what was built, what shipped, and what is next.',
  },
  {
    icon: Gauge,
    title: 'Performance-First Engineering',
    tag: 'Sub-Second Speeds',
    description:
      'We write clean semantic code optimized for sub-second mobile loads, high Core Web Vitals scores, and zero conversion leakage on Indian mobile networks.',
  },
  {
    icon: CheckSquare,
    title: 'One Integrated Growth Team',
    tag: 'Cohesive Delivery',
    description:
      'Website development, AI automation, Google Ads, and continuous support handled by one cohesive team instead of five disconnected agencies with misaligned incentives.',
  },
];

export default function ServicesWhyUs() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white" id="why-choose-us">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-xs sm:text-sm font-semibold text-brand-red border border-red-100">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-red" />
            <span>The Ethixweb Standard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold font-display text-gray-900 tracking-tight leading-tight">
            Why Partner with Ethixweb
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
            A disciplined engineering framework built to replace the friction of traditional outsourced agency models.
          </p>
        </div>

        {/* 4 Value Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {strengths.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-gray-50/70 border border-gray-200/80 shadow-subtle hover:bg-white hover:border-red-200 hover:shadow-card transition-all duration-300 min-w-0"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-red-50 text-brand-red flex items-center justify-center border border-red-100/70 group-hover:scale-105 transition-transform flex-shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 group-hover:text-brand-red transition-colors">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-display text-gray-900 mb-2 group-hover:text-brand-red transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-gray-200/60 flex items-center text-xs font-semibold text-brand-red">
                  <span>Operating Standard</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Note */}
        <div className="mt-12 text-center">
          <p className="text-xs sm:text-sm text-gray-500">
            Backed by contractual accountability under Ethixweb USA LLC (Wyoming, US) with senior engineering hubs in India.{' '}
            <Link href="/about" className="text-brand-red font-semibold hover:underline">
              Read our company background →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
