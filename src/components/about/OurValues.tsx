import React from 'react';
import { Code2, MessageSquare, TrendingUp, Handshake, Check, Shield } from 'lucide-react';

const values = [
  {
    number: '01',
    title: 'Engineering Excellence',
    subtitle: 'Code Quality Over Quick Hacks',
    description:
      'We treat web development as software engineering. Clean TypeScript, semantic HTML5, zero unnecessary runtime dependencies, and architectures engineered for sub-second load times on 4G and 5G networks.',
    principles: [
      'Strict TypeScript and ESLint standards',
      'Target 90+ PageSpeed benchmarks on mobile',
      'Zero layout shifts (CLS < 0.1)',
      'Accessible WCAG 2.1 AA compliant components',
    ],
    icon: Code2,
  },
  {
    number: '02',
    title: 'Transparent Communication',
    subtitle: 'Direct Developer Access',
    description:
      'You communicate directly with the senior engineers and strategists building your project. No message-relaying account managers, opaque ticketing systems, or surprise billing invoices.',
    principles: [
      'Direct Slack/WhatsApp and video collaboration',
      'Weekly sprint demos with working code',
      'Plain-language technical explanations',
      'Transparent scope and milestone tracking',
    ],
    icon: MessageSquare,
  },
  {
    number: '03',
    title: 'Business-First Thinking',
    subtitle: 'Measuring Revenue, Not Vanity',
    description:
      'A beautiful website that does not generate qualified inquiries is a failure. We align every design choice, headline, and campaign parameter around booked calls, customer inquiries, and verifiable revenue.',
    principles: [
      'Conversion rate optimization (CRO) focus',
      'Strict negative keyword hygiene in ad spend',
      'End-to-end attribution from click to CRM lead',
      'Clear cost-per-acquisition (CPA) targets',
    ],
    icon: TrendingUp,
  },
  {
    number: '04',
    title: 'Long-Term Stewardship',
    subtitle: 'Committed Beyond the Launch Date',
    description:
      'Software is a living operational asset. We stay by your side after deployment with proactive security patching, dependency monitoring, and continuous weekly campaign tuning.',
    principles: [
      '24/7 automated uptime & SSL monitoring',
      'Weekly dependency security audits',
      'Continuous AI chatbot prompt and knowledge updates',
      'Rapid emergency break-fix response SLAs',
    ],
    icon: Handshake,
  },
];

export default function OurValues() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gray-50/70 border-t border-gray-100" id="values">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-xs sm:text-sm font-semibold text-brand-red border border-red-100">
            <Shield className="w-3.5 h-3.5" />
            <span>Guiding Principles</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold font-display text-gray-900 tracking-tight leading-tight">
            Our Core Philosophy
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
            The engineering standards and ethical commitments that govern every line of code we write and every ad campaign we manage.
          </p>
        </div>

        {/* 2x2 Creative Asymmetric Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="group relative flex flex-col justify-between p-7 sm:p-9 rounded-2xl bg-white border border-gray-200/80 shadow-subtle hover:shadow-card hover:border-red-200 transition-all duration-300 min-w-0"
              >
                <div>
                  {/* Card Header with Big Monogram Number and Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-red-50 text-brand-red flex items-center justify-center border border-red-100 group-hover:scale-105 transition-transform flex-shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-brand-red block">
                          {val.subtitle}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold font-display text-gray-900 group-hover:text-brand-red transition-colors">
                          {val.title}
                        </h3>
                      </div>
                    </div>
                    <span className="text-2xl sm:text-3xl font-extrabold font-mono text-gray-200 group-hover:text-red-200 transition-colors">
                      {val.number}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-5">
                    {val.description}
                  </p>
                </div>

                {/* Principles Checklist */}
                <div className="pt-4 border-t border-gray-100 space-y-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
                    Execution Standard:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {val.principles.map((principle, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-xs text-gray-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{principle}</span>
                      </div>
                    ))}
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
