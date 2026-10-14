import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Mail, ArrowLeft, Lock, FileText, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Ethixweb',
  description:
    'Privacy Policy for Ethixweb USA LLC. Learn how we handle your technical inquiries, project data, and communications with strict confidentiality.',
  keywords: ['Ethixweb Privacy Policy', 'Data Confidentiality', 'Client IP Protection'],
};

export default function PrivacyPolicyPage() {
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
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Corporate Governance &amp; Data Standards</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-gray-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 font-mono">
            Effective Date: {lastUpdated} · Entity: Ethixweb USA LLC (Wyoming, USA)
          </p>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed pt-2">
            This Privacy Policy describes how Ethixweb USA LLC (&ldquo;Ethixweb&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) collects, uses, protects, and discloses information when you visit our website (ethixweb.com), submit project inquiries, or engage our engineering and growth services.
          </p>
        </div>

        {/* Content Sections */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/90 shadow-sm space-y-10 text-gray-700 leading-relaxed text-sm sm:text-base">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-gray-900 flex items-center gap-2">
              <span className="text-brand-red font-mono text-lg">01.</span> Information We Collect
            </h2>
            <p>
              When you interact with Ethixweb through our contact forms, email channels, or discovery scheduling, we may collect:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 text-sm">
              <li>
                <strong>Contact Information:</strong> Full name, business email address, phone number, and company name.
              </li>
              <li>
                <strong>Project Specifications:</strong> Selected capabilities of interest (e.g., website engineering, custom AI chatbots, Google Ads campaigns), estimated budgets, target launch timelines, and technical requirements provided in your messages.
              </li>
              <li>
                <strong>Technical Browsing Data:</strong> Anonymized usage data, browser type, operating system, and performance metrics collected to ensure responsive mobile rendering and site security.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-gray-900 flex items-center gap-2">
              <span className="text-brand-red font-mono text-lg">02.</span> How We Use Your Information
            </h2>
            <p>
              We use the collected information strictly for legitimate commercial and engineering purposes:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 text-sm">
              <li>To evaluate project feasibility and prepare technical scoping proposals.</li>
              <li>To contact you regarding your discovery call or technical consultation.</li>
              <li>To establish communication channels for sprint planning and project deliverables.</li>
              <li>To protect our infrastructure against spam, abuse, and automated intrusions.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-gray-900 flex items-center gap-2">
              <span className="text-brand-red font-mono text-lg">03.</span> Client Confidentiality &amp; Zero-Sale Guarantee
            </h2>
            <div className="p-4 sm:p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-gray-900 text-sm">
                <Lock className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Strict Non-Disclosure &amp; Information Protection</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                We treat all project specifications, proprietary business logic, product roadmaps, and customer data with utmost confidentiality. <strong>We do not sell, rent, monetize, or trade your personal or business data to any third parties for advertising or marketing purposes.</strong>
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-gray-900 flex items-center gap-2">
              <span className="text-brand-red font-mono text-lg">04.</span> Cross-Border Operations &amp; Corporate Structure
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Ethixweb operates under <strong>Ethixweb USA LLC</strong>, legally registered in the State of Wyoming, United States (operating since 2020), in coordination with our engineering delivery centers in India. Data shared with us is handled with appropriate security standards across our international operations.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-gray-900 flex items-center gap-2">
              <span className="text-brand-red font-mono text-lg">05.</span> Your Rights &amp; Data Retention
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              You have the right to request access to the information you have submitted to us, request correction of any inaccuracies, or request complete deletion of your inquiry data from our communication records. Inquiries that do not progress to an active engagement are periodically purged.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3 pt-4 border-t border-gray-100">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-gray-900 flex items-center gap-2">
              <span className="text-brand-red font-mono text-lg">06.</span> Contact Our Privacy Officer
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              If you have any questions about this Privacy Policy, your rights, or our security practices, please contact our team directly:
            </p>
            <div className="p-4 sm:p-5 rounded-2xl bg-red-50/50 border border-red-100 flex items-center gap-3">
              <Mail className="w-5 h-5 text-brand-red flex-shrink-0" />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block">
                  Direct Inquiries
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
            <Link href="/terms" className="text-gray-600 hover:text-brand-red font-medium">
              Terms of Service
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
