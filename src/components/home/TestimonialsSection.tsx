import React from 'react';
import { Star, Quote, ExternalLink, ShieldCheck } from 'lucide-react';

const testimonials = [
  {
    name: 'Ryan Taylor',
    role: 'Verified Business Client',
    date: 'October 2026',
    quote:
      'I have been contacted by many people that want to build a website, but I was always skeptical. I decided to give Ethixweb that chance and they have proven themselves! I have been with them 2 years and within that first year my business had doubled. The second year my business had doubled again. My website is easy to follow, has everything on it I asked for, it loads fast and it is easy to maintain. The folks at Ethixweb are very professional, schedule meetings via video when I need something fixed and are on top of it.',
    impact: 'Business doubled in Year 1, doubled again in Year 2',
  },
  {
    name: 'Clinton Mcculloch',
    role: 'Verified Business Client',
    date: 'October 2026',
    quote:
      'I had Ethixweb.com create me a website. Not only did they do it extremely professionally, but they did it extremely fast and it came out fabulous. They are very professional and they communicate great. I would highly recommend this company to create your next website. They are exceptional.',
    impact: 'Extremely fast delivery & fabulous execution',
  },
  {
    name: 'Leslie Whitehurst-Manners',
    role: 'Verified Business Client',
    date: 'April 2026',
    quote:
      'Amar is very thorough and quick to make changes on our website. Over the years that has been my biggest issue with web designers. Small changes can take way too long. Thankfully that is not the case here. Good service! Very happy customer!!',
    impact: 'Prompt, thorough engineering turnaround',
  },
  {
    name: 'Kayla Kjl',
    role: 'Verified Business Client',
    date: 'March 2025',
    quote:
      'Ethixweb did an incredible job on our business website. It is very sharp, modern looking and has all the extra bells and whistles we need. The team was easy to work with, great communication and done in efficient time. They provided all details from start to finish.',
    impact: 'Sharp, modern design & clear communication',
  },
];

interface TestimonialsSectionProps {
  items?: any[];
}

export default function TestimonialsSection({ items }: TestimonialsSectionProps) {
  const testimonialsToRender = items && items.length > 0 ? items : testimonials;

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white" id="testimonials">
      <div className="container-custom">
        {/* Header with Verified Trustpilot Rating */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-3 min-w-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs sm:text-sm font-semibold border border-emerald-100">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Public Client Reviews</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold font-display text-gray-900 tracking-tight leading-tight">
              Feedback from Clients We Serve
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-xl font-normal">
              Direct reviews from verified business owners who trusted Ethixweb to design, build, and support their digital operations.
            </p>
          </div>

          {/* Genuine Trustpilot External Card */}
          <a
            href="https://www.trustpilot.com/review/ethixweb.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3.5 bg-gray-50 hover:bg-gray-100/80 p-4 rounded-xl border border-gray-200 transition-colors flex-shrink-0 self-start md:self-auto min-w-0"
          >
            <div className="flex text-emerald-500 flex-shrink-0">
              {[...Array(4)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-emerald-500" />
              ))}
              <Star className="w-4 h-4 text-gray-300 fill-gray-200" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-gray-900 flex items-center gap-1 group-hover:text-brand-red transition-colors">
                <span>4.0 / 5.0 on Trustpilot</span>
                <ExternalLink className="w-3 h-3 text-gray-400 flex-shrink-0" />
              </div>
              <p className="text-[11px] text-gray-500 truncate">Verified Independent Reviews</p>
            </div>
          </a>
        </div>

        {/* Testimonials 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {testimonialsToRender.map((item: any, index: number) => (
            <div
              key={index}
              className="group p-6 sm:p-8 rounded-2xl bg-white border border-gray-200/80 shadow-subtle hover:shadow-card hover:border-red-200 transition-all duration-300 flex flex-col justify-between min-w-0"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-block max-w-[85%] px-3 py-1 rounded-md bg-red-50 text-brand-red text-xs font-bold border border-red-100/50 truncate">
                    {item.impact}
                  </span>
                  <Quote className="w-6 h-6 text-gray-200 group-hover:text-red-200 transition-colors flex-shrink-0" />
                </div>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic pt-1">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{item.name}</h4>
                  <p className="text-xs text-gray-500">
                    {item.role} · {item.date}
                  </p>
                </div>
                <div className="flex text-amber-400 flex-shrink-0">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
