import React from 'react';
import { Globe2, ShieldCheck, CheckCircle2, Building, Terminal } from 'lucide-react';

export default function GlobalFootprint() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gray-50/70 border-t border-gray-100" id="global-footprint">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto rounded-3xl bg-white border border-gray-200/90 shadow-md overflow-hidden min-w-0">
          {/* Header Strip */}
          <div className="bg-gray-900 text-white p-7 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-semibold border border-red-500/30">
                <Globe2 className="w-3.5 h-3.5" />
                <span>Operating Framework</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-white">
                Global Expertise, India-Focused Solutions
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 max-w-sm leading-relaxed">
              Transparent contractual governance paired with senior engineering delivery.
            </p>
          </div>

          {/* Content Grid */}
          <div className="p-7 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Left: US Corporate Anchor */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-brand-red flex items-center justify-center border border-red-100 flex-shrink-0">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
                    Corporate Entity
                  </span>
                  <h3 className="text-lg font-bold text-gray-900">
                    Ethixweb USA LLC (Wyoming, US)
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Registered in Wyoming, United States, since 2020. Provides clients with established legal accountability, transparent contracting, and established operational governance.
              </p>

              <div className="space-y-2 pt-2 border-t border-gray-100 text-xs text-gray-700">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Wyoming registered entity since 2020</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Contractual accountability and IP protection</span>
                </div>
              </div>
            </div>

            {/* Right: India Engineering Hub */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-brand-red flex items-center justify-center border border-red-100 flex-shrink-0">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
                    Engineering Execution
                  </span>
                  <h3 className="text-lg font-bold text-gray-900">
                    India Engineering Hub
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Senior engineering and performance marketing talent executing weekly sprint deliverables for Indian businesses and global client engagements.
              </p>

              <div className="space-y-2 pt-2 border-t border-gray-100 text-xs text-gray-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-red flex-shrink-0" />
                  <span>Senior developers and architects directly on projects</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-red flex-shrink-0" />
                  <span>Indian business hours collaboration &amp; sprint demos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
