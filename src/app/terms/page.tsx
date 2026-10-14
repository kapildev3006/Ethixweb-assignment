import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, ShieldCheck, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | Ethixweb',
  description:
    'Terms of Service for Ethixweb USA LLC. Commercial and technical terms governing our digital engineering, web development, AI automation, and marketing services.',
  keywords: ['Ethixweb Terms of Service', 'Engineering Terms', 'Commercial Deliverables'],
};

export default function TermsOfServicePage() {
  const lastUpdated = 'October 14, 2026';

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 sm:py-16 lg:py-20">
      <div className="container-custom max-w-4xl mx-auto px-4 sm:px-6">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-600 hover:text-brand-red transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/90 shadow-sm mb-8 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-xs font-semibold text-brand-red border border-red-100">
            <FileText className="w-3.5 h-3.5" />
            <span>Contractual &amp; Engagement Framework</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-gray-900 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-sm text-gray-500 font-mono">
            Effective Date: {lastUpdated} · Entity: Ethixweb USA LLC (Wyoming, USA)
          </p>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed pt-2">
            These Terms of Service (&ldquo;Terms&rdquo;) govern the provision of digital engineering, custom software development, AI automation, and paid growth services by Ethixweb USA LLC (&ldquo;Ethixweb&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) to clients and prospective clients (&ldquo;Client&rdquo;, &ldquo;you&rdquo;).
          </p>
        </div>

        {/* Content Sections */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/90 shadow-sm space-y-10 text-gray-700 leading-relaxed text-sm sm:text-base">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-gray-900 flex items-center gap-2">
              <span className="text-brand-red font-mono text-lg">01.</span> Engagement &amp; Scope of Work
            </h2>
            <p>
              All professional engagements are formalized via a written Statement of Work (SOW) or sprint proposal detailing specific deliverables, milestone schedules, technical specifications, and compensation. Any scope revisions requested during delivery will be documented and agreed upon in writing prior to execution.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-gray-900 flex items-center gap-2">
              <span className="text-brand-red font-mono text-lg">02.</span> Intellectual Property Rights &amp; Code Ownership
            </h2>
            <p>
              We firmly respect client intellectual property:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 text-sm">
              <li>
                <strong>Client Ownership:</strong> Upon receipt of full payment for agreed milestones, all bespoke custom software, user interface designs, and content produced specifically for the Client become the exclusive property of the Client.
              </li>
              <li>
                <strong>Pre-Existing Tools &amp; Libraries:</strong> Ethixweb retains ownership of pre-existing frameworks, proprietary accelerators, and open-source utilities utilized to deliver the solution, granting the Client a perpetual, royalty-free license to use them in connection with the deliverables.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-gray-900 flex items-center gap-2">
              <span className="text-brand-red font-mono text-lg">03.</span> Confidentiality &amp; Non-Disclosure
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Both parties agree to protect and maintain confidential all non-public information, business operations, trade secrets, source code, and customer data disclosed during the engagement. Confidential obligations survive the termination or completion of any agreement.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-gray-900 flex items-center gap-2">
              <span className="text-brand-red font-mono text-lg">04.</span> Delivery, Review &amp; Milestone Acceptance
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Upon delivery of a sprint milestone or deployment artifact, the Client receives an agreed review window (typically 5 to 10 business days) to test functionality in staging against the accepted technical criteria. Any functional defects identified within this window are corrected as part of the milestone commitment.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-gray-900 flex items-center gap-2">
              <span className="text-brand-red font-mono text-lg">05.</span> Corporate Entity &amp; Governing Law
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Agreements are executed with <strong>Ethixweb USA LLC</strong>, registered in the State of Wyoming, USA (operating since 2020), or its authorized local billing subsidiaries as specified in the applicable Statement of Work. Contracts are governed in accordance with the substantive laws specified in the respective agreement.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3 pt-4 border-t border-gray-100">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-gray-900 flex items-center gap-2">
              <span className="text-brand-red font-mono text-lg">06.</span> Contact &amp; Legal Notices
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              For commercial notices, legal inquiries, or contract questions, please write to:
            </p>
            <div className="p-4 sm:p-5 rounded-2xl bg-red-50/50 border border-red-100 flex items-center gap-3">
              <Mail className="w-5 h-5 text-brand-red flex-shrink-0" />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block">
                  Legal &amp; Commercial Department
                </span>
                <a
                  href="mailto:info@ethixweb.com"
                  className="text-base font-bold text-gray-900 hover:text-brand-red transition-colors"
                >
                  info@ethixweb.com
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Ethixweb USA LLC. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-gray-600 hover:text-brand-red font-medium">
              Privacy Policy
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-brand-red font-medium">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
