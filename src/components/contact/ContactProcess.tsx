import React from 'react';
import { FileText, Cpu, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    step: '01',
    title: 'Tell Us About Your Project',
    tag: 'Step One',
    description:
      'Share your current website challenges, conversion bottlenecks, or target growth objectives through our structured enquiry form or direct email.',
    icon: FileText,
  },
  {
    step: '02',
    title: 'Explore the Right Solution',
    tag: 'Step Two',
    description:
      'Our technical team reviews your requirements, identifies potential opportunities, and schedules a discovery conversation to assess fit.',
    icon: Cpu,
  },
  {
    step: '03',
    title: 'Plan the Next Steps',
    tag: 'Step Three',
    description:
      'Receive a transparent sprint roadmap outlining recommended architecture, milestone deliverables, and straightforward commercial terms.',
    icon: CheckCircle2,
  },
];

export default function ContactProcess() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white" id="contact-process">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-xs sm:text-sm font-semibold text-brand-red border border-red-100">
            <span>Engagement Pathway</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold font-display text-gray-900 tracking-tight leading-tight">
            How We&apos;ll Work Together
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
            A transparent, low-friction discovery rhythm designed to provide immediate clarity on technical feasibility and scope.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group relative flex flex-col justify-between p-7 sm:p-8 rounded-2xl bg-gray-50/70 border border-gray-200/80 shadow-subtle hover:bg-white hover:border-red-200 hover:shadow-card transition-all duration-300 min-w-0"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl sm:text-3xl font-extrabold font-mono text-gray-300 group-hover:text-brand-red transition-colors">
                      {item.step}
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-red-50 text-brand-red flex items-center justify-center border border-red-100/70 group-hover:scale-105 transition-transform flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-red block mb-1">
                    {item.tag}
                  </span>

                  <h3 className="text-xl font-bold font-display text-gray-900 mb-2 group-hover:text-brand-red transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-gray-200/60 flex items-center text-xs font-semibold text-gray-500">
                  <span>Proposed Collaboration Rhythm</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
