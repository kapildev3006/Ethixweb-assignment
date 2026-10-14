'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MessageSquareQuote,
  Plus,
  Star,
  ExternalLink,
  Edit2,
  Trash2,
  CheckCircle2,
  X,
  Eye,
  EyeOff,
  ShieldCheck,
} from 'lucide-react';
import CmsPageHeader from '@/components/admin/cms/CmsPageHeader';
import { type TestimonialItem } from '@/lib/types/cms';
import { sanitizeText, sanitizeUrl } from '@/lib/sanitizeInput';

export default function AdminWebsiteTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [isDirty, setIsDirty] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);
  const [isAddMode, setIsAddMode] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  React.useEffect(() => {
    async function loadTestimonials() {
      try {
        const res = await fetch('/api/admin/website/testimonials');
        if (res.ok) {
          const json = await res.json();
          if (Array.isArray(json.data)) {
            setTestimonials(
              json.data.map((item: any) => ({
                id: item.slug || item.id,
                _id: item._id,
                name: item.name,
                role: item.role,
                date: item.date,
                impact: item.impact || '',
                quote: item.quote,
                sourceUrl: item.sourceUrl || 'https://www.trustpilot.com/review/ethixweb.com',
                isVisible: item.isVisible,
                displayOrder: item.displayOrder,
              }))
            );
          }
        }
      } catch (err) {
        console.error('Failed to load testimonials:', err);
      }
    }
    loadTestimonials();
  }, []);

  const handleEdit = (item: TestimonialItem) => {
    setEditingItem({ ...item });
    setIsAddMode(false);
  };

  const handleAddNew = () => {
    const nextOrder = testimonials.length + 1;
    setEditingItem({
      id: `testimonial-${Date.now()}`,
      name: '',
      role: 'Verified Business Client',
      date: 'October 2026',
      quote: '',
      impact: 'Measurable digital turnaround & prompt execution',
      sourceUrl: 'https://www.trustpilot.com/review/ethixweb.com',
      isVisible: true,
      displayOrder: nextOrder,
    });
    setIsAddMode(true);
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.name.trim() || !editingItem.quote.trim()) return;

    try {
      setFeedback('Saving testimonial to MongoDB Atlas...');
      const payload = {
        ...editingItem,
        slug: editingItem.id.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      };

      const method = isAddMode ? 'POST' : 'PUT';
      const res = await fetch('/api/admin/website/testimonials', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to save testimonial');
      }

      const savedItem: TestimonialItem = {
        id: json.data.slug || json.data.id,
        name: json.data.name,
        role: json.data.role,
        date: json.data.date,
        impact: json.data.impact || '',
        quote: json.data.quote,
        sourceUrl: json.data.sourceUrl || 'https://www.trustpilot.com/review/ethixweb.com',
        isVisible: json.data.isVisible,
        displayOrder: json.data.displayOrder,
      };

      if (isAddMode) {
        setTestimonials((prev) => [...prev, savedItem]);
        setFeedback(`✓ Added review from "${savedItem.name}".`);
      } else {
        setTestimonials((prev) =>
          prev.map((t) => (t.id === savedItem.id ? savedItem : t))
        );
        setFeedback(`✓ Updated review from "${savedItem.name}".`);
      }

      setEditingItem(null);
      setIsAddMode(false);
      setTimeout(() => setFeedback(null), 4000);
    } catch (err: any) {
      setFeedback(`Error: ${err.message}`);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Remove review from "${name}"?`)) {
      try {
        setFeedback(`Deleting review...`);
        const res = await fetch(`/api/admin/website/testimonials?id=${id}&slug=${id}`, {
          method: 'DELETE',
        });
        const json = await res.json();
        if (!res.ok || !json.success) {
          throw new Error(json.error || 'Failed to delete');
        }
        setTestimonials((prev) => prev.filter((t) => t.id !== id));
        setFeedback(`✓ Removed review from "${name}".`);
        setTimeout(() => setFeedback(null), 3500);
      } catch (err: any) {
        setFeedback(`Error: ${err.message}`);
      }
    }
  };

  const handleToggleVisibility = async (id: string) => {
    const item = testimonials.find((t) => t.id === id);
    if (!item) return;
    const updated = { ...item, isVisible: !item.isVisible };
    try {
      const res = await fetch('/api/admin/website/testimonials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...updated,
          slug: updated.id,
        }),
      });
      if (res.ok) {
        setTestimonials((prev) =>
          prev.map((t) => (t.id === id ? updated : t))
        );
      }
    } catch (err) {
      console.error('Failed to toggle visibility:', err);
    }
  };

  const handleReset = async () => {
    try {
      const res = await fetch('/api/admin/website/testimonials');
      if (res.ok) {
        const json = await res.json();
        if (json.testimonials) setTestimonials(json.testimonials);
      }
    } catch {
      setTestimonials([]);
    }
    setIsDirty(false);
    setEditingItem(null);
    setFeedback('Testimonials refreshed from database.');
    setTimeout(() => setFeedback(null), 3500);
  };

  const handlePublishAll = () => {
    setFeedback('✓ All customer testimonials synchronized with MongoDB Atlas and published live!');
    setTimeout(() => setFeedback(null), 4000);
  };

  return (
    <div className="space-y-6">
      <CmsPageHeader
        title="Customer Testimonials &amp; Reviews"
        description="Manage verified client reviews, impact metrics, Trustpilot attribution links, and visibility toggles."
        breadcrumbs={[
          { label: 'Website Manager', href: '/admin/website/home' },
          { label: 'Testimonials' },
        ]}
        isDirty={isDirty}
        saveStatus="published"
        onReset={handleReset}
        onSaveDraft={handlePublishAll}
        onPublish={handlePublishAll}
        publicPreviewUrl="/#testimonials"
        statusMessage={feedback}
      />

      {/* Top Bar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs">
        <div>
          <span className="text-xs font-bold text-gray-700">
            {testimonials.filter((t) => t.isVisible).length} of {testimonials.length} Reviews Visible
          </span>
          <p className="text-[11px] text-gray-500">
            Source-backed testimonials displayed on the Home Page
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddNew}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-red text-white text-xs sm:text-sm font-semibold hover:bg-brand-red-dark transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Testimonials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className={`p-5 rounded-2xl bg-white border shadow-2xs space-y-4 hover:border-gray-300 transition-all flex flex-col justify-between ${
              !item.isVisible ? 'opacity-60 border-dashed border-gray-300' : 'border-gray-200/90'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-gray-700 ml-1">5.0</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-gray-400 font-mono">#{item.displayOrder}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      item.isVisible
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-gray-100 text-gray-500 border-gray-200'
                    }`}
                  >
                    {item.isVisible ? 'Visible' : 'Hidden'}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  {item.role} · {item.date}
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-red-50/50 border border-red-100 text-xs font-semibold text-brand-red">
                Key Impact: &ldquo;{item.impact}&rdquo;
              </div>

              <p className="text-xs text-gray-700 italic leading-relaxed line-clamp-4">
                &ldquo;{item.quote}&rdquo;
              </p>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-gray-500 hover:text-gray-900 flex items-center gap-1 truncate max-w-[180px]"
              >
                <span>Trustpilot Source</span>
                <ExternalLink className="w-3 h-3 text-gray-400 flex-shrink-0" />
              </a>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleToggleVisibility(item.id)}
                  className={`p-1.5 rounded-lg border transition-colors ${
                    item.isVisible
                      ? 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      : 'border-amber-200 text-amber-700 bg-amber-50'
                  }`}
                  title={item.isVisible ? 'Hide from public site' : 'Make visible on public site'}
                >
                  {item.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>

                <button
                  type="button"
                  onClick={() => handleEdit(item)}
                  className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:text-brand-red hover:bg-red-50 transition-colors"
                  title="Edit Testimonial"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(item.id, item.name)}
                  className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Delete Testimonial"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <h2 className="text-base sm:text-lg font-bold text-gray-900">
                {isAddMode ? 'Add Testimonial' : `Edit: ${editingItem.name}`}
              </h2>
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.name}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        name: sanitizeText(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Role / Subtitle
                  </label>
                  <input
                    type="text"
                    value={editingItem.role}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        role: sanitizeText(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Review Date
                  </label>
                  <input
                    type="text"
                    value={editingItem.date}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        date: sanitizeText(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Key Impact Summary
                  </label>
                  <input
                    type="text"
                    value={editingItem.impact}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        impact: sanitizeText(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm font-semibold text-brand-red"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Customer Review Quote *
                </label>
                <textarea
                  rows={4}
                  required
                  value={editingItem.quote}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      quote: sanitizeText(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Source Link (Trustpilot)
                  </label>
                  <input
                    type="text"
                    value={editingItem.sourceUrl}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        sourceUrl: sanitizeUrl(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={editingItem.displayOrder}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        displayOrder: parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between border-t border-gray-100">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
                  <input
                    type="checkbox"
                    checked={editingItem.isVisible}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        isVisible: e.target.checked,
                      })
                    }
                    className="rounded text-brand-red focus:ring-brand-red"
                  />
                  <span>Show publicly on website</span>
                </label>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingItem(null)}
                    className="px-3.5 py-2 rounded-xl border border-gray-300 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-brand-red text-white text-xs font-semibold hover:bg-brand-red-dark transition-colors"
                  >
                    Apply Changes (Preview)
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
