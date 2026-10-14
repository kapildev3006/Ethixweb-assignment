import React from 'react';
import { Layers, Zap, TrendingUp, ShieldCheck, Check, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const pillars = [
  {
    icon: Layers,
    title: 'Senior-Led Engineering',
    tag: 'Direct Access',
    description:
      'You work directly with the developers and strategists building your project. No message-relaying account managers or junior trainees learning on your budget.',
  },
  {
    icon: Zap,
    title: '2–4 Week Launch Velocity',
    tag: 'Disciplined Sprints',
    description:
      'We run lean, weekly iterations designed to ship clean production code and ad funnels in weeks rather than dragging projects across quarters.',
  },
  {
    icon: TrendingUp,
    title: 'Revenue-First Measurement',
    tag: 'Real Business ROI',
    description:
      'We measure project success by booked inquiries, customer conversion rates, and revenue impact—never by surface-level vanity metrics.',
  },
  {
    icon: ShieldCheck,
    title: 'Dual-Shore Governance',
    tag: 'Global Delivery',
    description:
      'Backed by Ethixweb USA LLC (Wyoming, US) with dedicated engineering teams in India, providing contractual accountability and global engineering rigor.',
  },
];

const comparisonData = [
  {
    dimension: 'Delivery Team',
    traditional: 'Layers of account reps; work often delegated to junior interns',
    ethixweb: '100% Senior engineers and seasoned practitioners on your project',
  },
  {
    dimension: 'Communication',
    traditional: 'Slow email ticketing with delayed handoffs',
    ethixweb: 'Direct communication with the builders via dedicated channels & video',
  },
  {
    dimension: 'Launch Turnaround',
    traditional: 'Often 3 to 6 months with frequent scope slippage',
    ethixweb: '2 to 4 weeks average production deployment with weekly deliverables',
  },
  {
    dimension: 'Core Success Metric',
    traditional: 'Traffic vanity numbers, impressions, and design awards',
    ethixweb: 'Verified qualified leads, booked jobs, and measurable revenue',
  },
  {
    dimension: 'Post-Launch Care',
    traditional: 'Slow support tickets and surprise maintenance invoices',
    ethixweb: 'Responsive break-fix support and continuous weekly optimization',
  },
];

interface WhyEthixwebSectionProps {
  data?: {
    eyebrow?: string;
    headline?: string;
    description?: string;
    pillars?: {
      id?: string;
      title: string;
      description: string;
      tag: string;
    }[];
  };
}

export default function WhyEthixwebSection({ data }: WhyEthixwebSectionProps) {
  const eyebrow = data?.eyebrow || 'Why Choose Ethixweb';
  const headline = data?.headline || 'Built like an internal technology team';
  const description =
    data?.description ||
    'We bring software engineering, digital advertising, and operational maintenance into one cohesive delivery system.';

  const defaultIcons = [Layers, Zap, TrendingUp, ShieldCheck];
  const pillarsToRender = data?.pillars && data.pillars.length > 0
    ? data.pillars.map((p: { title: string; tag: string; description: string }, idx: number) => ({
        icon: defaultIcons[idx % defaultIcons.length],
        title: p.title,
        tag: p.tag,
        description: p.description,
      }))
    : pillars;

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gray-50/60 border-t border-gray-100" id="why-us">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-xs sm:text-sm font-semibold text-brand-red border border-red-100">
            <span>{eyebrow}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold font-display text-gray-900 tracking-tight leading-tight">
            {headline}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
            {description}
          </p>
        </div>

        {/* 4 Value Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
          {pillarsToRender.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={index}
                className="group flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white border border-gray-200/80 shadow-subtle hover:shadow-card hover:border-red-200 transition-all duration-300 h-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-red-50 text-brand-red flex items-center justify-center border border-red-100/70 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 group-hover:text-brand-red transition-colors">
                      {pillar.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-display text-gray-900 mb-2 group-hover:text-brand-red transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-gray-100 flex items-center text-xs font-semibold text-brand-red">
                  <span>Verified Standard</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Section */}
        <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-subtle">
          <div className="bg-gray-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-brand-red-glow uppercase tracking-wider">
                Operating Model
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
                Comparing Service Delivery Approaches
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 max-w-md">
              A transparent look at how our direct engineering framework contrasts with traditional outsourced agency structures.
            </p>
          </div>

          {/* Desktop Table View (>=640px) */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/80 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="py-4 px-6 w-1/4">Evaluation Vector</th>
                  <th className="py-4 px-6 w-3/8 text-gray-600">Traditional Agency Model</th>
                  <th className="py-4 px-6 w-3/8 text-brand-red font-bold">Ethixweb Engineering Model</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {comparisonData.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-4 px-6 font-semibold text-gray-900">{row.dimension}</td>
                    <td className="py-4 px-6 text-gray-600 text-xs sm:text-sm">
                      {row.traditional}
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-900 text-xs sm:text-sm">
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="font-semibold text-brand-charcoal">{row.ethixweb}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card-Based Comparison View (<640px) with Zero Horizontal Scroll */}
          <div className="block sm:hidden divide-y divide-gray-100 p-4 space-y-4">
            {comparisonData.map((item, index) => (
              <div key={index} className="pt-4 first:pt-0 space-y-2.5">
                <h4 className="text-sm font-bold text-gray-900">{item.dimension}</h4>
                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-lg bg-gray-50 border border-gray-200/70 text-gray-600">
                    <span className="font-semibold text-gray-800 block mb-1">Traditional Agency:</span>
                    <span className="flex items-start gap-1.5">
                      <X className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <span>{item.traditional}</span>
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-red-50/50 border border-red-100 text-brand-charcoal">
                    <span className="font-bold text-brand-red block mb-1">Ethixweb Model:</span>
                    <span className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="font-semibold">{item.ethixweb}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 sm:p-5 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3">
            <span>Want to review how this applies to your current website or ad spend?</span>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 font-bold text-brand-red hover:text-brand-red-dark"
            >
              Request a Technical Stack Audit
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
