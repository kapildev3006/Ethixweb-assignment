'use client';

import React from 'react';
import { Search, X, Filter, ArrowUpDown, RefreshCw, Download } from 'lucide-react';
import { type Lead, type LeadStatus } from '@/lib/types/leads';

interface DashboardControlsProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  statusFilter: string;
  onStatusFilterChange: (val: string) => void;
  serviceFilter: string;
  onServiceFilterChange: (val: string) => void;
  sortBy: string;
  onSortByChange: (val: string) => void;
  allLeads: Lead[];
  isLoading: boolean;
  onToggleLoading: () => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

const statusOptions: Array<{ label: string; value: string }> = [
  { label: 'All', value: 'all' },
  { label: 'New', value: 'New' },
  { label: 'Contacted', value: 'Contacted' },
  { label: 'Discovery', value: 'Discovery' },
  { label: 'Proposal', value: 'Proposal' },
  { label: 'Converted', value: 'Converted' },
  { label: 'Archived', value: 'Archived' },
];

const serviceOptions = [
  'All Capabilities',
  'Website Engineering & Redesign',
  'Custom LLM Chatbot & AI Automation',
  'Google Ads & Local Service Ads',
  'Full-Funnel Analytics & Tracking',
  'Accessibility Testing & WCAG Improvements',
  'Ongoing Operations & Technical Support',
  'Comprehensive Growth Package (Code + Ads + AI)',
];

export default function DashboardControls({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  serviceFilter,
  onServiceFilterChange,
  sortBy,
  onSortByChange,
  allLeads,
  isLoading,
  onToggleLoading,
  onResetFilters,
  hasActiveFilters,
}: DashboardControlsProps) {
  // Count per status
  const getStatusCount = (status: string) => {
    if (status === 'all') return allLeads.length;
    return allLeads.filter((l) => l.status === status).length;
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/90 shadow-2xs space-y-4">
      {/* Top Controls Row: Search + Capability Filter + Sort + Loading Toggle */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search Bar */}
        <div className="relative flex-1 min-w-0">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search by client name, company, email, phone, or requirement..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filters Group */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Service Capability Filter */}
          <div className="flex-1 sm:flex-none">
            <select
              value={serviceFilter}
              onChange={(e) => onServiceFilterChange(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-gray-700 hover:border-gray-300 focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 cursor-pointer"
              aria-label="Filter by service capability"
            >
              {serviceOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Selector */}
          <div className="flex-1 sm:flex-none">
            <select
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-gray-700 hover:border-gray-300 focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 cursor-pointer"
              aria-label="Sort leads by"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="oldest">Sort: Oldest First</option>
              <option value="name">Sort: Client Name A-Z</option>
            </select>
          </div>

          {/* Test Loading State Button */}
          <button
            type="button"
            onClick={onToggleLoading}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer border ${
              isLoading
                ? 'bg-amber-50 text-amber-800 border-amber-200'
                : 'bg-gray-50 text-gray-600 hover:text-gray-900 border-gray-200 hover:bg-gray-100'
            }`}
            title="Toggle skeleton loading state for evaluation"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-amber-600' : ''}`} />
            <span className="hidden sm:inline">{isLoading ? 'Loading Active' : 'Test Shimmer'}</span>
          </button>
        </div>
      </div>

      {/* Bottom Status Filter Tabs */}
      <div className="pt-2 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {statusOptions.map((opt) => {
            const count = getStatusCount(opt.value);
            const isSelected = statusFilter === opt.value;

            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onStatusFilterChange(opt.value)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gray-900 text-white shadow-2xs'
                    : 'bg-gray-100/80 text-gray-600 hover:bg-gray-200/70 hover:text-gray-900'
                }`}
              >
                <span>{opt.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="text-xs font-bold text-brand-red hover:underline cursor-pointer inline-flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>
    </div>
  );
}
