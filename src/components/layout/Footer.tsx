'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Linkedin, Twitter, Instagram, ShieldCheck } from 'lucide-react';
import EthixwebLogo from '@/components/ui/EthixwebLogo';

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-brand-dark text-gray-300 border-t border-gray-800">
      <div className="container-custom py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-5 min-w-0">
            <Link href="/" className="inline-block" aria-label="Ethixweb Home">
              <EthixwebLogo variant="dark" className="h-8 w-auto" />
            </Link>
            <p className="text-xs sm:text-sm text-gray-400 max-w-sm leading-relaxed">
              Web Development, Google Ads &amp; Digital Marketing for Indian businesses. We engineer high-performing digital operations that drive measurable revenue.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>Ethixweb USA LLC (Wyoming) &amp; India Engineering Hub</span>
            </div>
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Ethixweb. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 sm:space-y-4 min-w-0">
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#work" className="text-gray-400 hover:text-white transition-colors">
                  Featured Work
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div className="space-y-3 sm:space-y-4 min-w-0">
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/services#web-development" className="text-gray-400 hover:text-white transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/services#google-ads" className="text-gray-400 hover:text-white transition-colors">
                  Google Ads
                </Link>
              </li>
              <li>
                <Link href="/services#digital-marketing" className="text-gray-400 hover:text-white transition-colors">
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link href="/services#ai-automation" className="text-gray-400 hover:text-white transition-colors">
                  AI &amp; Automation
                </Link>
              </li>
              <li>
                <Link href="/services#maintenance" className="text-gray-400 hover:text-white transition-colors">
                  Ongoing Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us & Portal */}
          <div className="space-y-3 sm:space-y-4 min-w-0">
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white">
              Follow Us
            </h4>
            <div className="flex items-center space-x-3 text-gray-400">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-900 border border-gray-800 hover:text-white hover:border-gray-700 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-900 border border-gray-800 hover:text-white hover:border-gray-700 transition-colors"
                aria-label="X / Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-900 border border-gray-800 hover:text-white hover:border-gray-700 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3">
          <p>Designed for Indian startups, D2C brands, and growing enterprises.</p>
          <div className="flex space-x-5">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
