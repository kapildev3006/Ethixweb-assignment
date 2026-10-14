import React from 'react';
import { Smartphone, Zap, ShoppingBag, Target, Bot, Cloud, CheckCircle2 } from 'lucide-react';

const opportunities = [
  {
    icon: Smartphone,
    title: 'Mobile-First Dominance',
    requirement: 'Over 80% of Indian internet traffic occurs on mobile devices.',
    solution:
      'We design exclusively mobile-first, ensuring fluid touch ergonomics, lightweight payloads, and resilient performance across diverse Indian 4G/5G connections.',
  },
  {
    icon: Zap,
    title: 'Sub-Second Page Speeds',
    requirement: 'Modern consumers abandon websites that take longer than 2.5 seconds.',
    solution:
      'Server-rendered Next.js platforms with edge CDN caching deliver sub-second initial loads, preventing pre-checkout bounce and maximizing ad spend conversion.',
  },
  {
    icon: ShoppingBag,
    title: 'D2C & Direct Commerce Surge',
    requirement: 'Indian brands require friction-free UPI and instant checkout funnels.',
    solution:
      'Headless e-commerce architectures ready for Razorpay, Cashfree, and UPI payments, paired with automated WhatsApp cart recovery flows.',
  },
  {
    icon: Target,
    title: 'Commercial Search Intent',
    requirement: 'B2B buyers and consumers search Google with specific regional intent.',
    solution:
      'Precision Google Search campaigns with strict negative keyword hygiene to eliminate wasted budget and capture verified commercial inquiries.',
  },
  {
    icon: Bot,
    title: 'AI-Assisted Operations',
    requirement: 'Customers expect immediate responses beyond standard business hours.',
    solution:
      'Intelligent RAG chatbots that understand colloquial Hinglish and brand documentation, pre-qualifying leads and scheduling appointments around the clock.',
  },
  {
    icon: Cloud,
    title: 'Festival Surge Scalability',
    requirement: 'Traffic can surge 10x during festive sales and product launches.',
    solution:
      'Cloud-native serverless deployments that automatically autoscale without infrastructure crashes or costly over-provisioning.',
  },
];

export default function IndiaOpportunity() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white" id="india-opportunity">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-xs sm:text-sm font-semibold text-brand-red border border-red-100">
            <span>Market Context</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold font-display text-gray-900 tracking-tight leading-tight">
            Why India, Why Now?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
            India is experiencing one of the fastest digital economic expansions in modern history. Scaling in this competitive ecosystem demands engineering built around its unique market dynamics.
          </p>
        </div>

        {/* 6 Market Imperatives (3x2 Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {opportunities.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-gray-50/70 border border-gray-200/80 shadow-subtle hover:bg-white hover:border-red-200 hover:shadow-card transition-all duration-300 min-w-0"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-red-50 text-brand-red flex items-center justify-center border border-red-100/70 group-hover:scale-105 transition-transform flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-gray-400">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-display text-gray-900 group-hover:text-brand-red transition-colors">
                    {item.title}
                  </h3>

                  <div className="p-3 rounded-lg bg-white border border-gray-200/60 text-xs text-gray-700 font-medium leading-snug">
                    <span className="text-brand-red font-bold block text-[11px] uppercase tracking-wider mb-0.5">
                      Market Dynamic:
                    </span>
                    <span>{item.requirement}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {item.solution}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-gray-200/50 flex items-center gap-1.5 text-xs font-semibold text-brand-red">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Ethixweb Core Standard</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
