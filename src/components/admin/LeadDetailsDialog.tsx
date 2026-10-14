'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Mail,
  Phone,
  Building,
  Calendar,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Send,
  MessageSquare,
  DollarSign,
  ShieldCheck,
  User,
} from 'lucide-react';
import { type Lead, type LeadStatus } from '@/lib/types/leads';

export interface LeadDetailsDialogProps {
  lead: Lead | null;
  onClose: () => void;
  onUpdateStatus?: (leadId: string, newStatus: LeadStatus) => void;
  onAddNote?: (leadId: string, noteText: string) => void;
}

const statusBadgeStyles: Record<LeadStatus, { bg: string; text: string; border: string }> = {
  New: { bg: 'bg-red-50', text: 'text-brand-red', border: 'border-red-200' },
  Contacted: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  Discovery: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  Proposal: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  Converted: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  Archived: { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-200' },
};

export default function LeadDetailsDialog({
  lead,
  onClose,
  onUpdateStatus,
  onAddNote,
}: LeadDetailsDialogProps) {
  const [mounted, setMounted] = useState(false);
  const [currentLead, setCurrentLead] = useState<Lead | null>(lead);
  const [newNote, setNewNote] = useState('');
  const [copied, setCopied] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  // Client hydration mount check for React portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync internal state when external lead changes
  useEffect(() => {
    setCurrentLead(lead);
  }, [lead]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (lead) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lead, onClose]);

  // Prevent background scrolling while dialog is open
  useEffect(() => {
    if (lead) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lead]);

  if (!mounted || !currentLead) return null;

  const badge = statusBadgeStyles[currentLead.status] || statusBadgeStyles.New;

  const handleCopyDetails = () => {
    const summary = `Lead: ${currentLead.fullName} (${currentLead.companyName || 'Individual'})\nEmail: ${currentLead.email} | Phone: ${currentLead.phone}\nCapability: ${currentLead.service}\nBudget: ${currentLead.budget || 'Custom'}\nTimeline: ${currentLead.timeline || 'Flexible'}\nStatus: ${currentLead.status}\nMessage:\n${currentLead.message}`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStatusChange = async (newStatus: LeadStatus) => {
    if (!currentLead) return;
    setIsUpdatingStatus(true);
    const updatedLead = { ...currentLead, status: newStatus };
    setCurrentLead(updatedLead);

    if (onUpdateStatus) {
      onUpdateStatus(currentLead.id, newStatus);
    } else {
      try {
        await fetch(`/api/admin/leads/${currentLead.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus }),
        });
      } catch (err) {
        console.error('Failed to update lead status:', err);
      }
    }
    setIsUpdatingStatus(false);
  };

  const handlePostNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !currentLead) return;
    const noteText = newNote.trim();

    const createdNote = {
      id: `n-${Date.now()}`,
      author: 'Admin',
      text: noteText,
      createdAt: new Date().toISOString(),
    };

    const updatedLead = {
      ...currentLead,
      notes: [...(currentLead.notes || []), createdNote],
    };
    setCurrentLead(updatedLead);
    setNewNote('');

    if (onAddNote) {
      onAddNote(currentLead.id, noteText);
    } else {
      try {
        await fetch(`/api/admin/leads/${currentLead.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ note: noteText }),
        });
      } catch (err) {
        console.error('Failed to post note:', err);
      }
    }
  };

  const formattedDate = new Date(currentLead.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-dialog-title"
    >
      {/* Dark backdrop overlay covering full viewport */}
      <div
        className="fixed inset-0 bg-gray-950/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Centering container - min-h-full prevents cut-off on short viewports */}
      <div className="min-h-full flex items-center justify-center p-3 sm:p-6 relative z-10 pointer-events-none">
        {/* Centered Dialog Box Modal Card */}
        <div
          className="pointer-events-auto relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-200 my-auto flex flex-col max-h-[calc(100vh-3rem)] sm:max-h-[calc(100vh-4rem)] overflow-hidden animate-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Dialog Header - Pinned at top */}
          <div className="p-4 sm:p-5 border-b border-gray-100 flex items-start justify-between bg-gray-50/90 flex-shrink-0">
            <div className="min-w-0 space-y-1 pr-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-[11px] font-bold text-gray-500 bg-gray-200/80 px-2 py-0.5 rounded-md">
                  {currentLead.id}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${badge.bg} ${badge.text} ${badge.border}`}
                >
                  {currentLead.status}
                </span>
                <span className="text-xs text-gray-400">· {formattedDate}</span>
              </div>

              <h2
                id="lead-dialog-title"
                className="text-lg sm:text-xl font-bold font-display text-gray-900 truncate"
              >
                {currentLead.fullName}
              </h2>

              {currentLead.companyName && (
                <p className="text-xs text-gray-600 flex items-center gap-1.5 font-medium">
                  <Building className="w-3.5 h-3.5 text-gray-400" />
                  <span>{currentLead.companyName}</span>
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-200/70 transition-colors cursor-pointer flex-shrink-0"
              aria-label="Close dialogue box"
              title="Close dialog (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Dialog Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 no-scrollbar">
            {/* Quick Communication Actions Bar */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <a
                href={`mailto:${currentLead.email}?subject=Ethixweb%20Discovery%20-%20${encodeURIComponent(
                  currentLead.companyName || currentLead.fullName
                )}`}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-gray-900 text-white text-xs font-bold hover:bg-black transition-colors shadow-2xs"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Client</span>
              </a>
              <a
                href={`tel:${currentLead.phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-gray-200 text-gray-800 text-xs font-bold hover:bg-gray-50 transition-colors shadow-2xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Client</span>
              </a>
              <button
                type="button"
                onClick={handleCopyDetails}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-gray-200 text-gray-800 text-xs font-bold hover:bg-gray-50 transition-colors cursor-pointer shadow-2xs"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copied ? 'Copied' : 'Copy Summary'}</span>
              </button>
            </div>

            {/* Status Lifecycle Selector */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-gray-50 border border-gray-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <label
                  htmlFor="dialogLeadStatusSelect"
                  className="block text-xs font-bold uppercase tracking-wider text-gray-600"
                >
                  Lead Lifecycle Status
                </label>
                <p className="text-[11px] text-gray-500">
                  Update status to organize your sales pipeline
                </p>
              </div>
              <select
                id="dialogLeadStatusSelect"
                value={currentLead.status}
                onChange={(e) => handleStatusChange(e.target.value as LeadStatus)}
                disabled={isUpdatingStatus}
                className="px-3.5 py-2 rounded-xl border border-gray-300 bg-white text-xs sm:text-sm font-semibold text-gray-900 focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20 cursor-pointer disabled:opacity-50"
              >
                <option value="New">New (Pending First Review)</option>
                <option value="Contacted">Contacted (Outreach Initiated)</option>
                <option value="Discovery">Discovery (Call / Scoping Scheduled)</option>
                <option value="Proposal">Proposal (Sprint SOW Delivered)</option>
                <option value="Converted">Converted (Contract Signed &amp; Paid)</option>
                <option value="Archived">Archived (Closed / Not a Fit)</option>
              </select>
            </div>

            {/* Project Scope & Requirements Grid */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Project Specification
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="p-3.5 rounded-xl border border-gray-200/90 bg-white space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                    Capability / Service
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-gray-900 leading-snug">
                    {currentLead.service}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-gray-200/90 bg-white space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                    Estimated Budget
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-gray-900">
                    {currentLead.budget || 'Custom / Flexible'}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-gray-200/90 bg-white space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                    Target Timeline
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-gray-900">
                    {currentLead.timeline || 'Immediate / Flexible'}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-gray-200/90 bg-white space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                    Contact Details
                  </span>
                  <p className="text-xs text-gray-700 font-medium truncate">
                    <span className="text-gray-400">Email:</span> {currentLead.email}
                  </p>
                  <p className="text-xs text-gray-700 font-medium">
                    <span className="text-gray-400">Phone:</span> {currentLead.phone}
                  </p>
                </div>
              </div>
            </div>

            {/* Customer Enquiry Message */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Customer Enquiry Message
              </h3>
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200/90 text-xs sm:text-sm text-gray-800 leading-relaxed whitespace-pre-wrap font-sans">
                {currentLead.message}
              </div>
            </div>

            {/* Internal Scoping Notes Section */}
            <div className="space-y-3 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Internal Notes ({currentLead.notes?.length || 0})</span>
                </h3>
              </div>

              {currentLead.notes && currentLead.notes.length > 0 ? (
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {currentLead.notes.map((note) => (
                    <div
                      key={note.id}
                      className="p-3 rounded-xl bg-gray-50 border border-gray-200/80 space-y-1 text-xs"
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-gray-900">{note.author}</span>
                        <span className="text-gray-400 font-mono">
                          {new Date(note.createdAt).toLocaleDateString('en-IN', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{note.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400 italic">
                  No internal notes recorded yet for this enquiry.
                </p>
              )}

              {/* Add Note Form */}
              <form onSubmit={handlePostNote} className="space-y-2">
                <textarea
                  rows={2}
                  placeholder="Add a scoping note, discovery call update, or next steps..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20"
                />
                <button
                  type="submit"
                  disabled={!newNote.trim()}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-brand-red text-white text-xs font-bold hover:bg-brand-red-dark disabled:opacity-50 disabled:pointer-events-none cursor-pointer transition-colors"
                >
                  <Send className="w-3 h-3" />
                  <span>Post Note</span>
                </button>
              </form>
            </div>
          </div>

          {/* Dialog Footer - Pinned at bottom */}
          <div className="p-3.5 sm:p-4 border-t border-gray-100 bg-gray-50/90 flex items-center justify-between text-xs text-gray-500 flex-shrink-0">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Ethixweb Enterprise CRM</span>
            </span>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-gray-200/80 hover:bg-gray-300 text-gray-800 font-bold text-xs transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
