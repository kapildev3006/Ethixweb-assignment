import React from 'react';
import { Search, Compass, Code2, Rocket } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Understand Your Goals',
    subtitle: 'Audit & Analysis',
    description:
      'We tear down your existing website, ad spend, and conversion bottlenecks to identify exactly where revenue is leaking.',
    icon: Search,
  },
  {
    number: '02',
    title: 'Plan & Create Strategy',
    subtitle: 'Prioritized Roadmap',
    description:
      'A crystal-clear action plan with milestones, expected ROI, and tech stack recommendations. You approve what we build, and why.',
    icon: Compass,
  },
  {
    number: '03',
    title: 'Design & Develop',
    subtitle: 'Senior Craftsmanship',
    description:
      'Senior engineers code clean, responsive, and SEO-optimized systems in weeks, not quarters. No junior trainees learning on your budget.',
    icon: Code2,
  },
  {
    number: '04',
    title: 'Launch & Grow Together',
    subtitle: 'Continuous Optimization',
    description:
      'Weekly iteration based on real data: booked jobs, qualified leads, and verifiable revenue, supported by rapid break-fix care.',
    icon: Rocket,
  },
];

export default function ProcessSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gray-50/70 border-t border-gray-100" id="process">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-xs sm:text-sm font-semibold text-brand-red border border-red-100">
            <span>Our Operating Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-gray-900 tracking-tight leading-tight">
            The 4-Step Delivery Rhythm
          </h2>
          <p className="text-base text-gray-600 leading-relaxed">
            Every engagement follows the same disciplined execution model so you always know what ships next.
          </p>
        </div>

        {/* Desktop Connected Workflow Timeline */}
        <div className="relative">
          {/* Subtle horizontal connecting line on desktop */}
          <div className="hidden lg:block absolute top-12 left-16 right-16 h-0.5 bg-gradient-to-r from-red-100 via-brand-red/30 to-red-100 -z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white border border-gray-200/80 shadow-subtle hover:shadow-card hover:border-red-200 transition-all duration-300"
                >
                  <div>
                    {/* Number & Icon Header */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-white border-2 border-brand-red text-brand-red font-display font-extrabold text-base flex items-center justify-center shadow-xs ring-4 ring-red-50 group-hover:scale-105 transition-transform">
                        {step.number}
                      </div>
                      <div className="w-9 h-9 rounded-lg bg-gray-50 text-gray-500 flex items-center justify-center border border-gray-100 group-hover:bg-red-50 group-hover:text-brand-red transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="space-y-1 mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-red">
                        {step.subtitle}
                      </span>
                      <h3 className="text-lg font-bold font-display text-gray-900 group-hover:text-brand-red transition-colors">
                        {step.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-2">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-gray-100 text-[11px] font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                    <span>Step {step.number} of 04</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
