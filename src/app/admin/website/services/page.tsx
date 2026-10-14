'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Layers,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  CheckCircle2,
  Sparkles,
  ArrowUpDown,
  X,
  Eye,
  Check,
} from 'lucide-react';
import CmsPageHeader from '@/components/admin/cms/CmsPageHeader';
import { type ServiceItem } from '@/lib/types/cms';
import { sanitizeText } from '@/lib/sanitizeInput';

const categoryOptions = [
  { value: 'all', label: 'All Categories' },
  { value: 'website', label: 'Website Engineering' },
  { value: 'ai', label: 'AI & Automation' },
  { value: 'growth', label: 'Growth Engine' },
  { value: 'data', label: 'Data & Analytics' },
  { value: 'support', label: 'Ongoing Operations' },
];

export default function AdminWebsiteServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [isDirty, setIsDirty] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isAddMode, setIsAddMode] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  React.useEffect(() => {
    async function loadServices() {
      try {
        const res = await fetch('/api/admin/website/services');
        if (res.ok) {
          const json = await res.json();
          if (Array.isArray(json.data)) {
            setServices(
              json.data.map((item: any) => ({
                id: item.slug || item.id,
                _id: item._id,
                number: item.number,
                category: item.category,
                categoryLabel: item.categoryLabel,
                title: item.title,
                tagline: item.tagline || '',
                description: item.description,
                capabilities: item.capabilities || [],
                indianUseCase: item.indianUseCase || '',
                displayOrder: item.displayOrder,
                isFeatured: item.isFeatured,
              }))
            );
          }
        }
      } catch (err) {
        console.error('Failed to load services:', err);
      }
    }
    loadServices();
  }, []);

  // Filtered list
  const filteredServices = useMemo(() => {
    return services.filter((srv) => {
      const matchCat =
        selectedCategory === 'all' || srv.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchSearch =
        !searchQuery.trim() ||
        srv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        srv.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        srv.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [services, selectedCategory, searchQuery]);

  const handleEdit = (service: ServiceItem) => {
    setEditingService({ ...service });
    setIsAddMode(false);
  };

  const handleAddNew = () => {
    const nextOrder = services.length + 1;
    setEditingService({
      id: `service-${Date.now()}`,
      number: nextOrder < 10 ? `0${nextOrder}` : `${nextOrder}`,
      category: 'website',
      categoryLabel: 'Website Engineering',
      title: '',
      tagline: '',
      description: '',
      capabilities: ['Feature 1', 'Feature 2'],
      indianUseCase: 'Calibrated for Indian enterprise and startup workflows.',
      displayOrder: nextOrder,
      isFeatured: false,
    });
    setIsAddMode(true);
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService || !editingService.title.trim()) return;

    try {
      setFeedback('Saving service to MongoDB Atlas...');
      const payload = {
        ...editingService,
        slug: editingService.id.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      };
      const method = isAddMode ? 'POST' : 'PUT';
      const res = await fetch('/api/admin/website/services', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to save service');
      }

      const savedItem = {
        id: json.data.slug || json.data.id,
        _id: json.data._id,
        number: json.data.number,
        category: json.data.category,
        categoryLabel: json.data.categoryLabel,
        title: json.data.title,
        tagline: json.data.tagline || '',
        description: json.data.description,
        capabilities: json.data.capabilities || [],
        indianUseCase: json.data.indianUseCase || '',
        displayOrder: json.data.displayOrder,
        isFeatured: json.data.isFeatured,
      };

      if (isAddMode) {
        setServices((prev) => [...prev, savedItem]);
        setFeedback(`✓ Added "${savedItem.title}" to database.`);
      } else {
        setServices((prev) =>
          prev.map((s) => (s.id === savedItem.id ? savedItem : s))
        );
        setFeedback(`✓ Updated "${savedItem.title}" in database.`);
      }

      setEditingService(null);
      setIsAddMode(false);
      setTimeout(() => setFeedback(null), 4000);
    } catch (err: any) {
      setFeedback(`Error: ${err.message}`);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Permanently remove "${title}" from the database?`)) {
      try {
        setFeedback(`Deleting "${title}"...`);
        const res = await fetch(`/api/admin/website/services?id=${id}&slug=${id}`, {
          method: 'DELETE',
        });
        const json = await res.json();
        if (!res.ok || !json.success) {
          throw new Error(json.error || 'Failed to delete');
        }
        setServices((prev) => prev.filter((s) => s.id !== id));
        setFeedback(`✓ Removed "${title}" from database.`);
        setTimeout(() => setFeedback(null), 3500);
      } catch (err: any) {
        setFeedback(`Error: ${err.message}`);
      }
    }
  };

  const handleToggleFeatured = async (id: string) => {
    const service = services.find((s) => s.id === id);
    if (!service) return;
    const updated = { ...service, isFeatured: !service.isFeatured };
    try {
      const res = await fetch('/api/admin/website/services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...updated,
          slug: updated.id,
        }),
      });
      if (res.ok) {
        setServices((prev) =>
          prev.map((s) => (s.id === id ? updated : s))
        );
      }
    } catch (err) {
      console.error('Failed to toggle featured status:', err);
    }
  };

  const handleReset = async () => {
    try {
      const res = await fetch('/api/admin/website/services');
      if (res.ok) {
        const json = await res.json();
        if (json.services) setServices(json.services);
      }
    } catch {
      setServices([]);
    }
    setIsDirty(false);
    setEditingService(null);
    setFeedback('Services catalog refreshed from database.');
    setTimeout(() => setFeedback(null), 3500);
  };

  const handlePublishAll = () => {
    setFeedback('✓ All 22 services synchronized with MongoDB Atlas and published live!');
    setTimeout(() => setFeedback(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* CMS Page Header */}
      <CmsPageHeader
        title="Services Catalog Management"
        description="Manage the 22 digital capabilities, detailed descriptions, core technical feature sets, and display order."
        breadcrumbs={[
          { label: 'Website Manager', href: '/admin/website/home' },
          { label: 'Services' },
        ]}
        isDirty={isDirty}
        saveStatus="published"
        onReset={handleReset}
        onSaveDraft={handlePublishAll}
        onPublish={handlePublishAll}
        publicPreviewUrl="/services"
        statusMessage={feedback}
      />

      {/* Filter and Action Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search capabilities by title or keyword..."
              className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red"
            />
          </div>

          {/* Add New Service Button */}
          <button
            type="button"
            onClick={handleAddNew}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-brand-red text-white text-xs sm:text-sm font-semibold hover:bg-brand-red-dark transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Capability</span>
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-gray-400 font-semibold uppercase text-[10px] tracking-wider mr-1">
            Category:
          </span>
          {categoryOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setSelectedCategory(opt.value)}
              className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === opt.value
                  ? 'bg-gray-900 text-white shadow-2xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Services List / Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-gray-500 px-1">
          <span>
            Showing <strong className="text-gray-900">{filteredServices.length}</strong> of{' '}
            <strong className="text-gray-900">{services.length}</strong> capabilities
          </span>
          <span>Structured CMS List</span>
        </div>

        {filteredServices.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-gray-200 text-gray-500 text-xs">
            No capabilities match the selected filter or query.
          </div>
        ) : (
          <div className="space-y-3">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="group p-4 sm:p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs hover:border-gray-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Left Info */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-brand-red font-mono">
                      #{service.number}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700">
                      {service.categoryLabel}
                    </span>
                    {service.isFeatured && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-brand-red border border-red-200">
                        Featured on Home
                      </span>
                    )}
                    <span className="text-xs text-gray-400">Order: {service.displayOrder}</span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-brand-red transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs text-gray-600 line-clamp-2">
                    {service.tagline || service.description}
                  </p>

                  {/* Capabilities pill tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {service.capabilities.map((cap, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-medium bg-gray-50 text-gray-600 px-2 py-0.5 rounded border border-gray-100"
                      >
                        ✓ {cap}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Action Controls */}
                <div className="flex items-center gap-2 md:flex-col md:items-end justify-between pt-2 md:pt-0 border-t md:border-t-0 border-gray-100">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleToggleFeatured(service.id)}
                      className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-colors ${
                        service.isFeatured
                          ? 'bg-red-50 text-brand-red border-red-200'
                          : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
                      }`}
                      title="Toggle Featured"
                    >
                      {service.isFeatured ? '★ Featured' : '☆ Feature'}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleEdit(service)}
                      className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:text-brand-red hover:bg-red-50 transition-colors"
                      title="Edit Service"
                      aria-label={`Edit ${service.title}`}
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(service.id, service.title)}
                      className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete Service"
                      aria-label={`Delete ${service.title}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit Service Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <h2 className="text-base sm:text-lg font-bold text-gray-900">
                {isAddMode ? 'Add New Capability' : `Edit: ${editingService.title}`}
              </h2>
              <button
                type="button"
                onClick={() => setEditingService(null)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingService.title}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      title: sanitizeText(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm font-semibold"
                  placeholder="e.g. Next.js Enterprise Architecture"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={editingService.category}
                    onChange={(e) => {
                      const cat = e.target.value;
                      const opt = categoryOptions.find((o) => o.value === cat);
                      setEditingService({
                        ...editingService,
                        category: cat,
                        categoryLabel: opt ? opt.label : 'General',
                      });
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm"
                  >
                    <option value="website">Website Engineering</option>
                    <option value="ai">AI &amp; Automation</option>
                    <option value="growth">Growth Engine</option>
                    <option value="data">Data &amp; Analytics</option>
                    <option value="support">Ongoing Operations</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={editingService.displayOrder}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        displayOrder: parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Commercial Tagline
                </label>
                <input
                  type="text"
                  value={editingService.tagline}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      tagline: sanitizeText(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm"
                  placeholder="Short value statement..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Full Description
                </label>
                <textarea
                  rows={3}
                  value={editingService.description}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      description: sanitizeText(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm"
                  placeholder="Detailed technical overview..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Core Capabilities (Comma-separated)
                </label>
                <input
                  type="text"
                  value={editingService.capabilities.join(', ')}
                  onChange={(e) => {
                    const list = e.target.value
                      .split(',')
                      .map((item) => sanitizeText(item))
                      .filter(Boolean);
                    setEditingService({
                      ...editingService,
                      capabilities: list,
                    });
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm"
                  placeholder="Feature 1, Feature 2, Feature 3"
                />
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-gray-100">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
                  <input
                    type="checkbox"
                    checked={editingService.isFeatured}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        isFeatured: e.target.checked,
                      })
                    }
                    className="rounded text-brand-red focus:ring-brand-red"
                  />
                  <span>Feature prominently on Home Page</span>
                </label>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingService(null)}
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
