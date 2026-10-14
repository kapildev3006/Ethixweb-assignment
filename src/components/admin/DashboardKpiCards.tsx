'use client';

import React from 'react';
import { Inbox, Clock, CheckCircle2, TrendingUp, Sparkles, AlertCircle } from 'lucide-react';
import { type Lead } from '@/lib/types/leads';

interface DashboardKpiCardsProps {
  leads: Lead[];
}

export default function DashboardKpiCards({ leads }: DashboardKpiCardsProps) {
  const totalCount = leads.length;
  const newCount = leads.filter((l) => l.status === 'New').length;
  const discoveryCount = leads.filter((l) => l.status === 'Discovery' || l.status === 'Proposal' || l.status === 'Contacted').length;
  const convertedCount = leads.filter((l) => l.status === 'Converted').length;

  const conversionRate = totalCount > 0 ? Math.round((convertedCount / totalCount) * 100) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {/* Card 1: Total Enquiries */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-gray-200/90 shadow-2xs hover:shadow-subtle transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Total Enquiries
          </span>
          <div className="w-9 h-9 rounded-xl bg-gray-100 text-gray-700 flex items-center justify-center">
            <Inbox className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-2xl sm:text-3xl font-extrabold font-display text-gray-900 tracking-tight">
            {totalCount}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            <TrendingUp className="w-3 h-3" />
            <span>+18% MoM</span>
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Technical proposals &amp; discovery requests
        </p>
      </div>

      {/* Card 2: New / Action Required */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-red-200/80 shadow-2xs hover:shadow-subtle transition-shadow ring-1 ring-red-50">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-red">
            New Pending Action
          </span>
          <div className="w-9 h-9 rounded-xl bg-red-50 text-brand-red flex items-center justify-center border border-red-100">
            <AlertCircle className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-2xl sm:text-3xl font-extrabold font-display text-gray-900 tracking-tight">
            {newCount}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-red bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
            <Sparkles className="w-3 h-3" />
            <span>Needs Scoping</span>
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Unreviewed inquiries awaiting technical audit
        </p>
      </div>

      {/* Card 3: In Active Discovery */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-gray-200/90 shadow-2xs hover:shadow-subtle transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
            In Active Discovery
          </span>
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
            <Clock className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-2xl sm:text-3xl font-extrabold font-display text-gray-900 tracking-tight">
            {discoveryCount}
          </span>
          <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
            In Pipeline
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Discovery calls &amp; sprint proposals sent
        </p>
      </div>

      {/* Card 4: Converted SOWs */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-gray-200/90 shadow-2xs hover:shadow-subtle transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Converted Contracts
          </span>
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-2xl sm:text-3xl font-extrabold font-display text-gray-900 tracking-tight">
            {convertedCount}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
            <span>{conversionRate}% Win Rate</span>
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Active sprint milestones underway
        </p>
      </div>
    </div>
  );
}
