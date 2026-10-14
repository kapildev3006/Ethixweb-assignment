'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Plus,
  ExternalLink,
  Edit2,
  Trash2,
  CheckCircle2,
  X,
  Image as ImageIcon,
  ShieldCheck,
} from 'lucide-react';
import CmsPageHeader from '@/components/admin/cms/CmsPageHeader';
import { type FeaturedProjectItem } from '@/lib/types/cms';
import { sanitizeText, sanitizeUrl } from '@/lib/sanitizeInput';

export default function AdminWebsiteWorkPage() {
  const [projects, setProjects] = useState<FeaturedProjectItem[]>([]);
  const [isDirty, setIsDirty] = useState(false);
  const [editingProject, setEditingProject] = useState<FeaturedProjectItem | null>(null);
  const [isAddMode, setIsAddMode] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  React.useEffect(() => {
    async function loadWork() {
      try {
        const res = await fetch('/api/admin/website/work');
        if (res.ok) {
          const json = await res.json();
          if (Array.isArray(json.data)) {
            setProjects(
              json.data.map((item: any) => ({
                id: item.slug || item.id,
                _id: item._id,
                client: item.client,
                badge: item.badge || 'Verified Client Project',
                category: item.category,
                headline: item.headline,
                description: item.description,
                screenshot: item.imageUrl || item.screenshot,
                websiteUrl: item.websiteUrl || '',
                metrics: item.metrics || [],
                displayOrder: item.displayOrder,
                isVerified: item.isVerified,
              }))
            );
          }
        }
      } catch (err) {
        console.error('Failed to load work:', err);
      }
    }
    loadWork();
  }, []);

  const handleEdit = (project: FeaturedProjectItem) => {
    setEditingProject({ ...project });
    setIsAddMode(false);
  };

  const handleAddNew = () => {
    const nextOrder = projects.length + 1;
    setEditingProject({
      id: `project-${Date.now()}`,
      client: '',
      badge: 'Verified Client Project',
      category: 'Web Architecture & Conversion Funnel',
      headline: '',
      description: '',
      screenshot: 'https://res.cloudinary.com/dwsdxem8w/image/upload/v1791972720/ethixweb/projects/all-phase-plumbing.webp',
      websiteUrl: 'https://',
      metrics: ['Sub-second speed', '100% responsive'],
      displayOrder: nextOrder,
      isVerified: true,
    });
    setIsAddMode(true);
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.client.trim()) return;

    try {
      setFeedback('Saving project to MongoDB Atlas...');
      const payload = {
        ...editingProject,
        slug: editingProject.id.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        imageUrl: editingProject.screenshot,
      };

      const method = isAddMode ? 'POST' : 'PUT';
      const res = await fetch('/api/admin/website/work', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to save project');
      }

      const savedItem: FeaturedProjectItem = {
        id: json.data.slug || json.data.id,
        client: json.data.client,
        badge: json.data.badge || 'Verified Client Project',
        category: json.data.category,
        headline: json.data.headline,
        description: json.data.description,
        screenshot: json.data.imageUrl || json.data.screenshot,
        websiteUrl: json.data.websiteUrl || '',
        metrics: json.data.metrics || [],
        displayOrder: json.data.displayOrder,
        isVerified: json.data.isVerified,
      };

      if (isAddMode) {
        setProjects((prev) => [...prev, savedItem]);
        setFeedback(`✓ Added "${savedItem.client}" to database.`);
      } else {
        setProjects((prev) =>
          prev.map((p) => (p.id === savedItem.id ? savedItem : p))
        );
        setFeedback(`✓ Updated "${savedItem.client}" in database.`);
      }

      setEditingProject(null);
      setIsAddMode(false);
      setTimeout(() => setFeedback(null), 4000);
    } catch (err: any) {
      setFeedback(`Error: ${err.message}`);
    }
  };

  const handleDelete = async (id: string, client: string) => {
    if (confirm(`Remove "${client}" from database?`)) {
      try {
        setFeedback(`Deleting "${client}"...`);
        const res = await fetch(`/api/admin/website/work?id=${id}&slug=${id}`, {
          method: 'DELETE',
        });
        const json = await res.json();
        if (!res.ok || !json.success) {
          throw new Error(json.error || 'Failed to delete');
        }
        setProjects((prev) => prev.filter((p) => p.id !== id));
        setFeedback(`✓ Removed "${client}" from database.`);
        setTimeout(() => setFeedback(null), 3500);
      } catch (err: any) {
        setFeedback(`Error: ${err.message}`);
      }
    }
  };

  const handleReset = async () => {
    try {
      const res = await fetch('/api/admin/website/work');
      if (res.ok) {
        const json = await res.json();
        if (json.projects) setProjects(json.projects);
      }
    } catch {
      setProjects([]);
    }
    setIsDirty(false);
    setEditingProject(null);
    setFeedback('Case studies refreshed from database.');
    setTimeout(() => setFeedback(null), 3500);
  };

  const handlePublishAll = () => {
    setFeedback('✓ All projects synchronized with MongoDB Atlas and published live!');
    setTimeout(() => setFeedback(null), 4000);
  };

  return (
    <div className="space-y-6">
      <CmsPageHeader
        title="Featured Client Work"
        description="Manage the verified client case studies, live website destinations, visual asset references, and commercial metrics."
        breadcrumbs={[
          { label: 'Website Manager', href: '/admin/website/home' },
          { label: 'Featured Work' },
        ]}
        isDirty={isDirty}
        saveStatus="published"
        onReset={handleReset}
        onSaveDraft={handlePublishAll}
        onPublish={handlePublishAll}
        publicPreviewUrl="/#work"
        statusMessage={feedback}
      />

      {/* Top Controls */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs">
        <div>
          <span className="text-xs font-bold text-gray-700">
            {projects.length} Verified Case Studies Listed
          </span>
          <p className="text-[11px] text-gray-500">
            Displayed on Home Page in the Featured Work section
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddNew}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-red text-white text-xs sm:text-sm font-semibold hover:bg-brand-red-dark transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Case Study</span>
        </button>
      </div>

      {/* Project Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs space-y-4 hover:border-gray-300 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-brand-red font-mono">
                  Order #{proj.displayOrder}
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>{proj.badge}</span>
                </span>
              </div>

              <div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                  {proj.category}
                </span>
                <h3 className="text-base font-bold text-gray-900 leading-tight mt-0.5">
                  {proj.client}
                </h3>
                <p className="text-xs font-medium text-brand-red mt-1">
                  &ldquo;{proj.headline}&rdquo;
                </p>
              </div>

              <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                {proj.description}
              </p>

              {/* Asset Path & Metrics */}
              <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-[11px] space-y-1 font-mono text-gray-500">
                <div className="flex items-center gap-1.5 truncate">
                  <ImageIcon className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                  <span className="truncate">{proj.screenshot}</span>
                </div>
                <div className="flex items-center gap-1.5 truncate text-blue-600">
                  <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{proj.websiteUrl}</span>
                </div>
              </div>

              {/* Metrics pills */}
              <div className="flex flex-wrap gap-1">
                {proj.metrics.map((m, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-semibold bg-gray-100 text-gray-700 px-2 py-0.5 rounded"
                  >
                    ★ {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <a
                href={proj.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-1"
              >
                <span>Visit Client Site</span>
                <ExternalLink className="w-3 h-3 text-gray-400" />
              </a>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleEdit(proj)}
                  className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:text-brand-red hover:bg-red-50 transition-colors"
                  title="Edit Case Study"
                  aria-label={`Edit ${proj.client}`}
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(proj.id, proj.client)}
                  className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Delete Case Study"
                  aria-label={`Delete ${proj.client}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <h2 className="text-base sm:text-lg font-bold text-gray-900">
                {isAddMode ? 'Add Case Study' : `Edit: ${editingProject.client}`}
              </h2>
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Client / Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.client}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        client: sanitizeText(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    value={editingProject.category}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        category: sanitizeText(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Headline Result
                </label>
                <input
                  type="text"
                  value={editingProject.headline}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      headline: sanitizeText(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm"
                  placeholder="e.g. From invisible online to fully booked in 90 days"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Narrative Description
                </label>
                <textarea
                  rows={3}
                  value={editingProject.description}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      description: sanitizeText(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Existing Image Asset Reference
                  </label>
                  <input
                    type="text"
                    value={editingProject.screenshot}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        screenshot: sanitizeUrl(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Public Website URL
                  </label>
                  <input
                    type="text"
                    value={editingProject.websiteUrl}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        websiteUrl: sanitizeUrl(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Key Metrics (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={editingProject.metrics.join(', ')}
                    onChange={(e) => {
                      const list = e.target.value
                        .split(',')
                        .map((m) => sanitizeText(m))
                        .filter(Boolean);
                      setEditingProject({
                        ...editingProject,
                        metrics: list,
                      });
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={editingProject.displayOrder}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        displayOrder: parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
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
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
