import React from 'react';
import { Search, Compass, Code2, Rocket, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    step: '01',
    title: 'Discover',
    tag: 'Technical Audit',
    description:
      'We conduct a deep architectural teardown of your existing website, analytics tracking, and ad account spend to uncover exact conversion bottlenecks.',
    deliverable: 'Written Technical & Funnel Audit',
    icon: Search,
  },
  {
    step: '02',
    title: 'Strategize',
    tag: 'Actionable Roadmap',
    description:
      'Together, we outline a clear milestone roadmap detailing technical stack selection, conversion benchmarks, and projected return on investment.',
    deliverable: 'Sprint Plan & Scope Agreement',
    icon: Compass,
  },
  {
    step: '03',
    title: 'Engineer',
    tag: 'Senior Craftsmanship',
    description:
      'Senior developers code clean, responsive, and SEO-optimized systems in disciplined 2–4 week sprints with regular demo walkthroughs.',
    deliverable: 'Production Staging Environment',
    icon: Code2,
  },
  {
    step: '04',
    title: 'Launch & Improve',
    tag: 'Continuous Optimization',
    description:
      'We orchestrate zero-downtime production deployment, followed by weekly iterative optimizations based on real inquiries and conversion data.',
    deliverable: 'Weekly Performance Reviews',
    icon: Rocket,
  },
];

export default function CollaborationProcess() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gray-50/70 border-t border-gray-100" id="collaboration">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-xs sm:text-sm font-semibold text-brand-red border border-red-100">
            <span>Operating Rhythm</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold font-display text-gray-900 tracking-tight leading-tight">
            How We Collaborate
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
            A disciplined four-step delivery process engineered to eliminate surprises and maintain continuous momentum.
          </p>
        </div>

        {/* Desktop Connected Workflow Timeline */}
        <div className="relative">
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-12 left-16 right-16 h-0.5 bg-gradient-to-r from-red-100 via-brand-red/30 to-red-100 -z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10">
            {steps.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white border border-gray-200/80 shadow-subtle hover:shadow-card hover:border-red-200 transition-all duration-300 min-w-0"
                >
                  <div>
                    {/* Header: Step Number & Icon */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-white border-2 border-brand-red text-brand-red font-display font-extrabold text-base flex items-center justify-center shadow-xs ring-4 ring-red-50 group-hover:scale-105 transition-transform flex-shrink-0">
                        {item.step}
                      </div>
                      <div className="w-9 h-9 rounded-lg bg-gray-50 text-gray-500 flex items-center justify-center border border-gray-100 group-hover:bg-red-50 group-hover:text-brand-red transition-colors flex-shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="space-y-1 mb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-red">
                        {item.tag}
                      </span>
                      <h3 className="text-xl font-bold font-display text-gray-900 group-hover:text-brand-red transition-colors">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-gray-100">
                    <span className="text-[10px] uppercase font-bold text-gray-400 block mb-0.5">
                      Key Milestone:
                    </span>
                    <span className="text-xs font-semibold text-gray-800">
                      {item.deliverable}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Collaboration Prompt */}
        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-brand-red hover:text-brand-red-dark transition-colors"
          >
            <span>Learn how we would structure your project timeline</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
