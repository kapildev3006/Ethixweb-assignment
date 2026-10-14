'use client';

import React from 'react';
import Link from 'next/link';
import {
  Inbox,
  Globe,
  Layers,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Clock,
  ExternalLink,
  ShieldCheck,
  FileText,
  Briefcase,
  MessageSquareQuote,
  Sparkles,
  PhoneCall,
  Settings,
  AlertCircle,
} from 'lucide-react';
import type { LeadStatus } from '@/lib/types/leads';
import LeadDetailsDialog from '@/components/admin/LeadDetailsDialog';

const statusBadgeStyles: Record<LeadStatus, string> = {
  New: 'bg-blue-50 text-blue-700 border-blue-200',
  Contacted: 'bg-amber-50 text-amber-700 border-amber-200',
  Discovery: 'bg-purple-50 text-purple-700 border-purple-200',
  Proposal: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  Converted: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Archived: 'bg-gray-100 text-gray-700 border-gray-200',
};

export default function AdminOverviewPage() {
  const [leads, setLeads] = React.useState<any[]>([]);
  const [kpis, setKpis] = React.useState({
    total: 0,
    newCount: 0,
  });
  const [isLiveDb, setIsLiveDb] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedLead, setSelectedLead] = React.useState<any | null>(null);

  const handleInspectLead = (lead: any) => {
    setSelectedLead(lead);
    if (lead?.id) {
      fetch(`/api/admin/leads/${lead.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isSeen: true }),
      }).catch(() => {});
    }
  };

  React.useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch('/api/admin/leads?page=1&limit=5', {
          credentials: 'include',
          cache: 'no-store',
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setIsLiveDb(true);
            setLeads(Array.isArray(data.leads) ? data.leads : []);
            if (data.kpis) {
              setKpis(data.kpis);
            }
          }
        }
      } catch (err) {
        console.error('Failed to load admin overview stats:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadStats();
  }, []);

  const recentLeads = leads.slice(0, 5);

  const websiteSections = [
    {
      title: 'Home Page',
      href: '/admin/website/home',
      description: 'Hero headline, CTAs, value propositions & Why Ethixweb',
      status: 'Ready',
      icon: Globe,
      itemCount: '4 Highlights',
    },
    {
      title: 'Services Catalog',
      href: '/admin/website/services',
      description: '22 verified capabilities across AI, Web, and Growth',
      status: 'Active',
      icon: Layers,
      itemCount: '22 Services',
    },
    {
      title: 'About Page',
      href: '/admin/website/about',
      description: 'Dual-shore model, company story & India focus',
      status: 'Ready',
      icon: FileText,
      itemCount: '4 Pillars',
    },
    {
      title: 'Featured Work',
      href: '/admin/website/work',
      description: 'Client case studies, metrics & blueprint architectures',
      status: 'Active',
      icon: Briefcase,
      itemCount: '4 Case Studies',
    },
    {
      title: 'Client Testimonials',
      href: '/admin/website/testimonials',
      description: 'Verified reviews from Trustpilot with customer ratings',
      status: 'Published',
      icon: MessageSquareQuote,
      itemCount: '4 Reviews',
    },
    {
      title: 'Contact & FAQs',
      href: '/admin/website/contact',
      description: 'Office details, phone, email & 6 expandable FAQs',
      status: 'Active',
      icon: PhoneCall,
      itemCount: '6 FAQs',
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* 1. Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-1">
            <span>Admin Workspace</span>
            <span>/</span>
            <span className="text-gray-900 font-bold">Workspace Overview</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-gray-900 tracking-tight">
            Ethixweb Command Center
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Unified administration for customer lead intake and public website content management.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-red text-white text-xs sm:text-sm font-semibold hover:bg-brand-red-dark transition-colors shadow-xs"
          >
            <Inbox className="w-4 h-4" />
            <span>Manage Leads</span>
          </Link>
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-gray-200 text-gray-700 text-xs sm:text-sm font-semibold hover:bg-gray-50 transition-colors shadow-2xs"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 2. Overview KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Total Inquiries */}
        <div className="p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Total Enquiries
            </span>
            <div className="w-8 h-8 rounded-xl bg-red-50 text-brand-red flex items-center justify-center">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-display text-gray-900">
              {kpis.total}
            </span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{kpis.newCount} new</span>
            </span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">
            Indian enterprise &amp; startup project requests
          </p>
        </div>

        {/* Managed Sections */}
        <div className="p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Website Sections
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Globe className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-display text-gray-900">6</span>
            <span className="text-xs font-semibold text-blue-600">
              Content Editors
            </span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">
            Home, Services, About, Work, Reviews, Contact
          </p>
        </div>

        {/* Live Services */}
        <div className="p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Live Capabilities
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-display text-gray-900">22</span>
            <span className="text-xs font-semibold text-emerald-600">
              Verified
            </span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">
            Bespoke engineering &amp; marketing capabilities
          </p>
        </div>

        {/* Platform Status */}
        <div className="p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              CRM Engine
            </span>
            <div className={`w-8 h-8 rounded-xl ${isLiveDb ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'} flex items-center justify-center`}>
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className={`text-sm font-extrabold ${isLiveDb ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-amber-700 bg-amber-50 border-amber-200'} px-2.5 py-1 rounded-lg border`}>
              {isLiveDb ? 'MongoDB Atlas Live' : 'Database Ready'}
            </span>
          </div>
          <p className="text-[11px] text-gray-500 mt-2">
            Real-time persistence · Cloudinary media
          </p>
        </div>
      </div>

      {/* 3. Main Two-Column Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Left Column: Recent Customer Inquiries (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold font-display text-gray-900">
                Recent Customer Enquiries
              </h2>
              <p className="text-xs text-gray-500">
                Latest submissions from the high-intent contact funnel
              </p>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs font-semibold text-brand-red hover:text-brand-red-dark flex items-center gap-1 group"
            >
              <span>View All {kpis.total} Leads</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200/90 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-gray-50/80 border-b border-gray-200 text-gray-500 font-semibold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Capability</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {isLoading ? (
                    <tr>
                      <td colSpan={4} className="py-10 text-center text-gray-500">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-brand-red border-t-transparent rounded-full animate-spin" />
                          <span className="text-xs text-gray-500 font-medium">Loading real leads from MongoDB...</span>
                        </div>
                      </td>
                    </tr>
                  ) : recentLeads.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center justify-center gap-2 max-w-sm mx-auto">
                          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">
                            <Inbox className="w-5 h-5" />
                          </div>
                          <span className="text-sm font-bold text-gray-800">No customer enquiries yet</span>
                          <span className="text-xs text-gray-400">
                            Submissions from the public website contact funnel will automatically appear here in real time.
                          </span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    recentLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-gray-50/70 transition-colors">
                        <td className="py-3 px-4">
                          <div className="font-bold text-gray-900 leading-tight">
                            {lead.fullName || lead.name}
                          </div>
                          <div className="text-[11px] text-gray-500 font-medium">
                            {lead.companyName ? `${lead.companyName} · ` : ''}Budget: {lead.budget || 'Not specified'}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-xs text-gray-700 font-medium line-clamp-1">
                            {lead.service}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                              statusBadgeStyles[lead.status as LeadStatus] || statusBadgeStyles.New
                            }`}
                          >
                            {lead.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => handleInspectLead(lead)}
                            className="text-xs font-semibold text-brand-red hover:underline cursor-pointer"
                          >
                            Inspect
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-gray-50/60 border-t border-gray-100 text-center">
              <Link
                href="/admin/leads"
                className="text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors"
              >
                Go to Full Leads Management Dashboard with Filter &amp; Search →
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Website Manager Fast Shortcuts (1 Col) */}
        <div className="space-y-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold font-display text-gray-900">
              Website Content Manager
            </h2>
            <p className="text-xs text-gray-500">
              Direct access to edit public website pages
            </p>
          </div>

          <div className="space-y-2.5">
            {websiteSections.map((sec) => {
              const Icon = sec.icon;
              return (
                <Link
                  key={sec.title}
                  href={sec.href}
                  className="group flex items-start gap-3 p-3.5 rounded-xl bg-white border border-gray-200/90 shadow-2xs hover:border-brand-red/40 hover:shadow-xs transition-all"
                >
                  <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-red-50 text-gray-700 group-hover:text-brand-red flex items-center justify-center flex-shrink-0 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-brand-red transition-colors">
                        {sec.title}
                      </span>
                      <span className="text-[10px] font-semibold text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">
                        {sec.itemCount}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                      {sec.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Quick link to Site Settings */}
          <Link
            href="/admin/settings"
            className="flex items-center justify-between p-3.5 rounded-xl bg-gray-900 text-white hover:bg-black transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Settings className="w-4 h-4 text-brand-red-light" />
              <div>
                <div className="text-xs font-bold leading-tight">Global Site Settings</div>
                <div className="text-[10px] text-gray-400">SEO metadata, branding &amp; social</div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400" />
          </Link>
        </div>
      </div>

      {/* Centered Modal Dialogue Box */}
      <LeadDetailsDialog
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
      />
    </div>
  );
}
