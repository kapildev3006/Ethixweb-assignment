'use client';

import React from 'react';
import {
  Mail,
  Phone,
  Building,
  Calendar,
  ChevronRight,
  MoreVertical,
  ExternalLink,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { type Lead, type LeadStatus } from '@/lib/types/leads';

interface LeadsTableProps {
  leads: Lead[];
  isLoading: boolean;
  onSelectLead: (lead: Lead) => void;
  onUpdateStatus: (leadId: string, status: LeadStatus) => void;
  selectedLeadIds: string[];
  onToggleSelectLead: (leadId: string) => void;
  onToggleSelectAll: () => void;
}

const statusBadgeStyles: Record<LeadStatus, { bg: string; text: string; border: string }> = {
  New: { bg: 'bg-red-50', text: 'text-brand-red', border: 'border-red-200' },
  Contacted: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  Discovery: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  Proposal: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  Converted: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  Archived: { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-200' },
};

export default function LeadsTable({
  leads,
  isLoading,
  onSelectLead,
  onUpdateStatus,
  selectedLeadIds,
  onToggleSelectLead,
  onToggleSelectAll,
}: LeadsTableProps) {
  const allSelected = leads.length > 0 && selectedLeadIds.length === leads.length;

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200/90 overflow-hidden shadow-2xs">
        <div className="p-4 sm:p-5 space-y-4 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4" />
          <div className="space-y-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-16 bg-gray-100 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200/90 shadow-2xs overflow-hidden min-w-0">
      {/* Desktop Table View (Hidden on mobile) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/75 text-[11px] font-bold uppercase tracking-wider text-gray-500">
              <th className="py-3.5 pl-5 pr-3 w-10">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={onToggleSelectAll}
                  className="h-4 w-4 rounded border-gray-300 text-brand-red focus:ring-brand-red/30 cursor-pointer"
                  aria-label="Select all leads on current page"
                />
              </th>
              <th className="py-3.5 px-3">Lead &amp; Company</th>
              <th className="py-3.5 px-3">Primary Capability</th>
              <th className="py-3.5 px-3">Budget &amp; Timeline</th>
              <th className="py-3.5 px-3">Status</th>
              <th className="py-3.5 px-3">Received</th>
              <th className="py-3.5 pr-5 pl-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {leads.map((lead) => {
              const badge = statusBadgeStyles[lead.status];
              const isSelected = selectedLeadIds.includes(lead.id);

              return (
                <tr
                  key={lead.id}
                  className={`hover:bg-red-50/20 transition-colors group cursor-pointer ${
                    isSelected ? 'bg-red-50/30' : ''
                  }`}
                  onClick={() => onSelectLead(lead)}
                >
                  {/* Checkbox */}
                  <td className="py-4 pl-5 pr-3" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleSelectLead(lead.id)}
                      className="h-4 w-4 rounded border-gray-300 text-brand-red focus:ring-brand-red/30 cursor-pointer"
                      aria-label={`Select lead ${lead.fullName}`}
                    />
                  </td>

                  {/* Lead Info */}
                  <td className="py-4 px-3 min-w-[200px]">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 font-bold text-gray-900 group-hover:text-brand-red transition-colors">
                        <span>{lead.fullName}</span>
                        {lead.status === 'New' && (
                          <span className="w-2 h-2 rounded-full bg-brand-red inline-block" title="New unread enquiry" />
                        )}
                      </div>
                      {lead.companyName && (
                        <p className="text-xs text-gray-500 flex items-center gap-1 font-medium truncate">
                          <Building className="w-3 h-3 text-gray-400 flex-shrink-0" />
                          <span>{lead.companyName}</span>
                        </p>
                      )}
                      <p className="text-[11px] text-gray-400 font-mono truncate">
                        {lead.email} · {lead.phone}
                      </p>
                    </div>
                  </td>

                  {/* Service Capability */}
                  <td className="py-4 px-3 max-w-[220px]">
                    <span className="inline-block text-xs font-semibold text-gray-800 bg-gray-100/80 px-2.5 py-1 rounded-lg border border-gray-200/60 truncate">
                      {lead.service}
                    </span>
                  </td>

                  {/* Budget & Timeline */}
                  <td className="py-4 px-3 text-xs text-gray-600">
                    <p className="font-semibold text-gray-900 truncate">
                      {lead.budget ? lead.budget.split('/')[0].trim() : 'Flexible'}
                    </p>
                    <p className="text-[11px] text-gray-400 truncate">
                      {lead.timeline || 'Standard'}
                    </p>
                  </td>

                  {/* Status Badge + Quick Dropdown */}
                  <td className="py-4 px-3" onClick={(e) => e.stopPropagation()}>
                    <select
                      value={lead.status}
                      onChange={(e) => onUpdateStatus(lead.id, e.target.value as LeadStatus)}
                      className={`text-xs font-bold px-2.5 py-1 rounded-full border cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-red/20 ${badge.bg} ${badge.text} ${badge.border}`}
                      aria-label={`Change status for ${lead.fullName}`}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Discovery">Discovery</option>
                      <option value="Proposal">Proposal</option>
                      <option value="Converted">Converted</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </td>

                  {/* Date */}
                  <td className="py-4 px-3 text-xs text-gray-500 whitespace-nowrap font-mono">
                    {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>

                  {/* View Details Action */}
                  <td className="py-4 pr-5 pl-3 text-right">
                    <button
                      type="button"
                      onClick={() => onSelectLead(lead)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-700 hover:text-brand-red hover:bg-red-50 border border-gray-200 hover:border-red-200 transition-all cursor-pointer"
                    >
                      <span>View</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View (<768px) */}
      <div className="md:hidden divide-y divide-gray-100">
        {leads.map((lead) => {
          const badge = statusBadgeStyles[lead.status];

          return (
            <div
              key={lead.id}
              className="p-4 space-y-3 hover:bg-gray-50 transition-colors cursor-pointer active:bg-gray-100"
              onClick={() => onSelectLead(lead)}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-gray-900 text-sm">{lead.fullName}</span>
                    {lead.status === 'New' && (
                      <span className="w-2 h-2 rounded-full bg-brand-red inline-block" />
                    )}
                  </div>
                  {lead.companyName && (
                    <p className="text-xs text-gray-500 font-medium truncate">
                      {lead.companyName}
                    </p>
                  )}
                </div>

                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${badge.bg} ${badge.text} ${badge.border} flex-shrink-0`}>
                  {lead.status}
                </span>
              </div>

              <div className="text-xs space-y-1">
                <p className="text-gray-700 font-medium">
                  {lead.service}
                </p>
                <div className="flex items-center justify-between text-[11px] text-gray-400 font-mono">
                  <span>{lead.email}</span>
                  <span>
                    {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-gray-100 text-xs">
                <span className="text-[11px] font-mono text-gray-400">
                  {lead.id}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-red">
                  <span>Inspect Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
