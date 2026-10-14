'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'Which services does Ethixweb specialize in?',
    answer:
      'We provide 22 verified capabilities structured across six core categories: Website Engineering, AI & Automation, Growth Engine (Google Ads, Meta & SEO), Data & Analytics, Accessibility, and Ongoing Technical Operations. Every service is engineered according to proven architecture and modern development standards.',
  },
  {
    question: 'Can you help Indian startups, D2C brands, and SMEs?',
    answer:
      'Yes. Our engineering standard is built around the realities of the Indian market—including sub-second page performance on variable mobile networks, seamless UPI and payment gateway integration preparation, high-intent local Google Search acquisition, and automated WhatsApp lead notifications.',
  },
  {
    question: 'Can you redesign our existing website without hurting our organic search rankings?',
    answer:
      'Absolutely. Every website redesign includes a comprehensive technical SEO preservation audit. We map all legacy URLs with permanent 301 redirects, maintain semantic HTML5 heading structures, enhance Core Web Vitals, and optimize schema markup so your hard-earned rankings are protected and grown.',
  },
  {
    question: 'Can you support our ongoing digital growth and marketing after launch?',
    answer:
      'Yes. Beyond shipping web platforms, we manage weekly Google Ads optimization, negative keyword filtering, Meta paid ad funnels, conversion tracking attribution, and proactive framework security updates under an integrated monthly growth engagement.',
  },
  {
    question: 'How do we begin a project with Ethixweb?',
    answer:
      'Start by submitting the enquiry form above. Our technical team will review your project requirements, outline recommended architectures, and propose a prioritized milestone timeline for your approval.',
  },
  {
    question: 'What core technologies and frameworks do you build with?',
    answer:
      'We build modern, scalable web applications primarily with Next.js, React, TypeScript, and Tailwind CSS, backed by cloud serverless infrastructure and headless content management systems for blazing-fast edge performance.',
  },
];

interface ContactFAQProps {
  faqs?: { question: string; answer: string }[];
}

export default function ContactFAQ({ faqs: initialFaqs }: ContactFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqsToRender = initialFaqs && initialFaqs.length > 0 ? initialFaqs : faqs;

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gray-50/70 border-t border-gray-100" id="faq">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-xs sm:text-sm font-semibold text-brand-red border border-red-100">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Common Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold font-display text-gray-900 tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
            Everything you need to know about our engineering approach, collaboration model, and delivery standards.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqsToRender.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden bg-white ${
                  isOpen
                    ? 'border-red-200 shadow-md ring-1 ring-red-100'
                    : 'border-gray-200/80 shadow-2xs hover:border-gray-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red cursor-pointer"
                >
                  <span className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-red-50 text-brand-red rotate-180'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 border-t border-gray-100 animate-in fade-in duration-200">
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pt-3">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
