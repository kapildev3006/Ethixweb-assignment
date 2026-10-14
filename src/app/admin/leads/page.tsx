'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { ShieldCheck, RefreshCw, AlertCircle, Sparkles, Filter, Inbox, ArrowLeft } from 'lucide-react';
import DashboardKpiCards from '@/components/admin/DashboardKpiCards';
import DashboardControls from '@/components/admin/DashboardControls';
import LeadsTable from '@/components/admin/LeadsTable';
import DashboardPagination from '@/components/admin/DashboardPagination';
import DashboardEmptyState from '@/components/admin/DashboardEmptyState';
import LeadDetailsDialog from '@/components/admin/LeadDetailsDialog';
import { type Lead, type LeadStatus } from '@/lib/types/leads';
import { getAdminSession, type AdminUser } from '@/lib/adminSession';

export default function AdminLeadsPage() {
  // Authentication session
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);

  // Leads dataset in memory - strictly initialized empty, populated exclusively from MongoDB Atlas
  const [leads, setLeads] = useState<Lead[]>([]);

  // Filters & Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('All Capabilities');
  const [sortBy, setSortBy] = useState('newest');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  // Interaction state
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleSelectLead = async (lead: Lead) => {
    setSelectedLead(lead);
    if (lead && lead.id) {
      try {
        await fetch(`/api/admin/leads/${lead.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isSeen: true }),
        });
      } catch (e) {
        // Silently catch
      }
    }
  };

  const fetchLeads = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/admin/leads?page=1&limit=100', {
        credentials: 'include',
        cache: 'no-store',
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.leads)) {
          setLeads(data.leads);
        }
      }
    } catch (err) {
      console.error('Failed to fetch leads from API:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const session = getAdminSession();
    if (session) {
      setCurrentUser(session);
    }
    fetchLeads();
  }, []);

  // Filter & Sort computation
  const filteredLeads = useMemo(() => {
    let result = [...leads];

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter((l) => l.status === statusFilter);
    }

    // Service capability filter
    if (serviceFilter !== 'All Capabilities') {
      result = result.filter((l) => l.service === serviceFilter);
    }

    // Text search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (l) =>
          l.fullName.toLowerCase().includes(q) ||
          l.companyName.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q) ||
          l.phone.toLowerCase().includes(q) ||
          l.service.toLowerCase().includes(q) ||
          l.message.toLowerCase().includes(q)
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === 'oldest') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      if (sortBy === 'name') {
        return a.fullName.localeCompare(b.fullName);
      }
      return 0;
    });

    return result;
  }, [leads, statusFilter, serviceFilter, searchQuery, sortBy]);

  // Pagination slicing
  const totalItems = filteredLeads.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const paginatedLeads = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredLeads.slice(start, start + pageSize);
  }, [filteredLeads, currentPage, pageSize]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, serviceFilter, searchQuery, pageSize]);

  // Update lead status
  const handleUpdateStatus = async (leadId: string, newStatus: LeadStatus) => {
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id === leadId) {
          const updated = {
            ...lead,
            status: newStatus,
            notes: [
              ...lead.notes,
              {
                id: `n-${Date.now()}`,
                author: currentUser?.name || 'Admin',
                text: `Lifecycle status updated to "${newStatus}".`,
                createdAt: new Date().toISOString(),
              },
            ],
          };
          if (selectedLead?.id === leadId) {
            setSelectedLead(updated);
          }
          return updated;
        }
        return lead;
      })
    );

    try {
      await fetch(`/api/admin/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (err) {
      console.error('Failed to sync status update to server:', err);
    }
  };

  // Add internal scoping note
  const handleAddNote = async (leadId: string, noteText: string) => {
    const newNote = {
      id: `n-${Date.now()}`,
      author: currentUser?.name || 'Admin',
      text: noteText,
      createdAt: new Date().toISOString(),
    };

    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id === leadId) {
          const updated = {
            ...lead,
            notes: [...lead.notes, newNote],
          };
          if (selectedLead?.id === leadId) {
            setSelectedLead(updated);
          }
          return updated;
        }
        return lead;
      })
    );

    try {
      await fetch(`/api/admin/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note: noteText }),
      });
    } catch (err) {
      console.error('Failed to sync note to server:', err);
    }
  };

  // Checkbox toggle helpers
  const handleToggleSelectLead = (leadId: string) => {
    setSelectedLeadIds((prev) =>
      prev.includes(leadId) ? prev.filter((id) => id !== leadId) : [...prev, leadId]
    );
  };

  const handleToggleSelectAll = () => {
    const currentPageIds = paginatedLeads.map((l) => l.id);
    const allSelected = currentPageIds.every((id) => selectedLeadIds.includes(id));
    if (allSelected) {
      setSelectedLeadIds((prev) => prev.filter((id) => !currentPageIds.includes(id)));
    } else {
      setSelectedLeadIds((prev) => Array.from(new Set([...prev, ...currentPageIds])));
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setServiceFilter('All Capabilities');
    setSortBy('newest');
    setCurrentPage(1);
    fetchLeads();
  };

  const hasActiveFilters =
    searchQuery !== '' || statusFilter !== 'all' || serviceFilter !== 'All Capabilities';

  // Refresh leads from live API
  const handleToggleLoading = () => {
    fetchLeads();
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Page Title & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-1">
            <Link href="/admin" className="hover:text-gray-900 transition-colors">
              Workspace
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-bold">Leads &amp; Enquiries</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-gray-900 tracking-tight">
            Lead Management Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Review, scope, and update lifecycle statuses for Indian enterprise &amp; startup enquiries.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-gray-200/90 shadow-2xs text-xs font-semibold text-gray-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Live MongoDB Database</span>
        </div>
      </div>

      {/* 1. KPI Cards Row */}
      <DashboardKpiCards leads={leads} />

      {/* 2. Interactive Search & Controls Bar */}
      <DashboardControls
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        serviceFilter={serviceFilter}
        onServiceFilterChange={setServiceFilter}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        allLeads={leads}
        isLoading={isLoading}
        onToggleLoading={handleToggleLoading}
        onResetFilters={handleResetFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* 3. Table / Card View or Empty State */}
      {filteredLeads.length === 0 ? (
        <DashboardEmptyState
          onReset={handleResetFilters}
          searchQuery={searchQuery}
          isTotalEmpty={leads.length === 0 && !hasActiveFilters}
        />
      ) : (
        <div className="space-y-4">
          <LeadsTable
            leads={paginatedLeads}
            isLoading={isLoading}
            onSelectLead={handleSelectLead}
            onUpdateStatus={handleUpdateStatus}
            selectedLeadIds={selectedLeadIds}
            onToggleSelectLead={handleToggleSelectLead}
            onToggleSelectAll={handleToggleSelectAll}
          />

          {/* 4. Pagination */}
          <DashboardPagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            totalItems={totalItems}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />
        </div>
      )}

      {/* Centered Modal Dialogue Box */}
      <LeadDetailsDialog
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
        onUpdateStatus={handleUpdateStatus}
        onAddNote={handleAddNote}
      />
    </div>
  );
}
