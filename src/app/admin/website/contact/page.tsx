'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  HelpCircle,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  X,
  ExternalLink,
} from 'lucide-react';
import CmsPageHeader from '@/components/admin/cms/CmsPageHeader';
import { emptyContactPageContent, type ContactPageContent, type FAQItem } from '@/lib/types/cms';
import { sanitizeText, sanitizeUrl } from '@/lib/sanitizeInput';

export default function AdminWebsiteContactPage() {
  const [formData, setFormData] = useState<ContactPageContent>(emptyContactPageContent);
  const [isDirty, setIsDirty] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'unsaved' | 'draft' | 'published' | 'saving' | 'publishing' | 'error'>('saved');
  const [activeTab, setActiveTab] = useState<'channels' | 'faqs'>('channels');
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);
  const [isAddFaqMode, setIsAddFaqMode] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  React.useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/admin/website/content?page=contact');
        if (res.ok) {
          const json = await res.json();
          if (json.data) {
            const hasDraft = json.data.hasDraft && json.data.draftSections;
            const s = hasDraft ? json.data.draftSections : (json.data.sections || {});
            const hero = s.hero || {};
            const cd = s.contactDetails || {};
            setFormData((prev) => ({
              ...prev,
              ...s,
              heroEyebrow: hero.heroEyebrow || s.heroEyebrow || prev.heroEyebrow,
              heroHeadline: hero.heroHeadline || s.heroHeadline || prev.heroHeadline,
              heroHeadlineHighlight: hero.heroHeadlineHighlight || s.heroHeadlineHighlight || prev.heroHeadlineHighlight,
              heroDescription: hero.heroDescription || s.heroDescription || prev.heroDescription,
              contactEmail: cd.contactEmail || s.contactEmail || prev.contactEmail,
              salesPhone: cd.salesPhone || s.salesPhone || prev.salesPhone,
              whatsappNumber: s.whatsappNumber || cd.whatsappNumber || prev.whatsappNumber || '919876543210',
              officeAddress: cd.officeAddress || s.officeAddress || prev.officeAddress,
              operatingHours: cd.operatingHours || s.operatingHours || prev.operatingHours,
              calendlyUrl: cd.calendlyUrl || s.calendlyUrl || prev.calendlyUrl,
              faqs: s.faqs || prev.faqs,
            }));
            if (hasDraft) {
              setSaveStatus('draft');
              setFeedback('Loaded unpublished draft from MongoDB Atlas.');
              setTimeout(() => setFeedback(null), 4000);
            } else {
              setSaveStatus('published');
            }
          }
        }
      } catch (err) {
        console.error('Failed to load contact page content:', err);
      }
    }
    loadData();
  }, []);

  const handleHeroChange = (field: keyof ContactPageContent, value: string) => {
    setIsDirty(true);
    setFormData((prev) => ({
      ...prev,
      [field]: field.toLowerCase().includes('url') ? sanitizeUrl(value) : sanitizeText(value),
    }));
  };

  const handleEditFaq = (faq: FAQItem) => {
    setEditingFaq({ ...faq });
    setIsAddFaqMode(false);
  };

  const handleAddFaq = () => {
    const nextOrder = formData.faqs.length + 1;
    setEditingFaq({
      id: `faq-${Date.now()}`,
      question: '',
      answer: '',
      category: 'General',
      displayOrder: nextOrder,
    });
    setIsAddFaqMode(true);
  };

  const handleSaveFaqModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq || !editingFaq.question.trim() || !editingFaq.answer.trim()) return;

    setIsDirty(true);
    if (isAddFaqMode) {
      setFormData((prev) => ({
        ...prev,
        faqs: [...prev.faqs, editingFaq],
      }));
      setFeedback('Added new FAQ question.');
    } else {
      setFormData((prev) => ({
        ...prev,
        faqs: prev.faqs.map((f) => (f.id === editingFaq.id ? editingFaq : f)),
      }));
      setFeedback('Updated FAQ question.');
    }

    setEditingFaq(null);
    setIsAddFaqMode(false);
    setTimeout(() => setFeedback(null), 3500);
  };

  const handleDeleteFaq = (id: string) => {
    if (confirm('Remove this FAQ item?')) {
      setIsDirty(true);
      setFormData((prev) => ({
        ...prev,
        faqs: prev.faqs.filter((f) => f.id !== id),
      }));
      setFeedback('FAQ item removed.');
      setTimeout(() => setFeedback(null), 3500);
    }
  };

  const handleReset = () => {
    setFormData(emptyContactPageContent);
    setIsDirty(false);
    setEditingFaq(null);
    setFeedback('Contact page content reset to defaults.');
    setTimeout(() => setFeedback(null), 3500);
  };

  // 1. SAVE DRAFT
  const handleSaveDraft = async () => {
    setSaveStatus('saving');
    setFeedback(null);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/admin/website/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageSlug: 'contact',
          title: 'Contact Page Content',
          sections: formData,
          action: 'draft',
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to save draft');
      }

      setIsDirty(false);
      setSaveStatus('draft');
      setFeedback('✓ Draft saved to MongoDB Atlas! Public website unchanged.');
      setTimeout(() => setFeedback(null), 4500);
    } catch (err: any) {
      setSaveStatus('error');
      setErrorMessage(`Error: ${err.message}`);
    }
  };

  // 2. PUBLISH
  const handlePublish = async () => {
    setSaveStatus('publishing');
    setFeedback(null);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/admin/website/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageSlug: 'contact',
          title: 'Contact Page Content',
          sections: formData,
          action: 'publish',
          isPublished: true,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to update contact content');
      }

      setIsDirty(false);
      setSaveStatus('published');
      setFeedback('✓ Successfully published to live MongoDB Atlas! WhatsApp routing and Contact Page cache revalidated.');
      setTimeout(() => setFeedback(null), 4500);
    } catch (err: any) {
      setSaveStatus('error');
      setErrorMessage(`Error: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6">
      <CmsPageHeader
        title="Contact Page &amp; FAQs"
        description="Configure public contact channels, operating schedules, Calendly consultation destinations, and expandable FAQs."
        breadcrumbs={[
          { label: 'Website Manager', href: '/admin/website/home' },
          { label: 'Contact Page' },
        ]}
        isDirty={isDirty}
        saveStatus={saveStatus}
        onReset={handleReset}
        onSaveDraft={handleSaveDraft}
        onPublish={handlePublish}
        publicPreviewUrl="/contact"
        statusMessage={feedback}
        errorMessage={errorMessage}
      />

      {/* Tabs */}
      <div className="flex border-b border-gray-200 gap-2 sm:gap-4 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('channels')}
          className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'channels'
              ? 'border-brand-red text-brand-red'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <PhoneCall className="w-4 h-4" />
          <span>1. Contact Info &amp; Hero Copy</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('faqs')}
          className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'faqs'
              ? 'border-brand-red text-brand-red'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>2. Frequently Asked Questions ({formData.faqs.length})</span>
        </button>
      </div>

      {/* TAB 1: CHANNELS & HERO */}
      {activeTab === 'channels' && (
        <div className="space-y-6 max-w-4xl">
          {/* Hero Copy */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/90 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-2">
              Contact Page Hero Copy
            </h2>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Eyebrow Label
              </label>
              <input
                type="text"
                value={formData.heroEyebrow}
                onChange={(e) => handleHeroChange('heroEyebrow', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm font-semibold"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Headline
                </label>
                <input
                  type="text"
                  value={formData.heroHeadline}
                  onChange={(e) => handleHeroChange('heroHeadline', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-red uppercase tracking-wider mb-1">
                  Crimson Highlight
                </label>
                <input
                  type="text"
                  value={formData.heroHeadlineHighlight}
                  onChange={(e) => handleHeroChange('heroHeadlineHighlight', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-red-300 bg-red-50/30 text-xs sm:text-sm text-brand-red font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Supporting Subtext
              </label>
              <textarea
                rows={3}
                value={formData.heroDescription}
                onChange={(e) => handleHeroChange('heroDescription', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm leading-relaxed"
              />
            </div>
          </div>

          {/* Operational Channels */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/90 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-2">
              Public Operational Channels
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Primary Contact Email
                </label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => handleHeroChange('contactEmail', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Sales &amp; Support Phone
                </label>
                <input
                  type="text"
                  value={formData.salesPhone}
                  onChange={(e) => handleHeroChange('salesPhone', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm font-semibold"
                />
              </div>
            </div>

            {/* Direct Consultation WhatsApp Routing (Managed in MongoDB Atlas) */}
            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/90 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="block text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Direct Consultation WhatsApp Number</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-semibold border border-emerald-200">
                    Live Client Routing
                  </span>
                </label>
                {formData.whatsappNumber && (
                  <a
                    href={`https://wa.me/${formData.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Ethixweb technical team, I would like to inquire about an engineering consultation.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-900 hover:underline"
                  >
                    <span>Test WhatsApp Link</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              <input
                type="text"
                placeholder="e.g. 919876543210 (country code + number, digits only)"
                value={formData.whatsappNumber || ''}
                onChange={(e) => handleHeroChange('whatsappNumber', e.target.value.replace(/[^0-9+]/g, ''))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-300 bg-white text-xs sm:text-sm font-bold font-mono text-gray-900 focus:ring-2 focus:ring-emerald-500 shadow-2xs"
              />
              <p className="text-[11px] text-emerald-800/80 leading-relaxed">
                Stored in MongoDB Atlas. The public website Contact Channels, CTA banners, and floating WhatsApp buttons fetch dynamically from this field in the database.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Operating Hours / SLAs
                </label>
                <input
                  type="text"
                  value={formData.operatingHours}
                  onChange={(e) => handleHeroChange('operatingHours', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Calendly Booking Link
                </label>
                <input
                  type="text"
                  value={formData.calendlyUrl}
                  onChange={(e) => handleHeroChange('calendlyUrl', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Office / Operational Address
              </label>
              <textarea
                rows={2}
                value={formData.officeAddress}
                onChange={(e) => handleHeroChange('officeAddress', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FAQS */}
      {activeTab === 'faqs' && (
        <div className="space-y-4 max-w-4xl">
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs">
            <div>
              <span className="text-xs font-bold text-gray-700">
                {formData.faqs.length} Active FAQ Items
              </span>
              <p className="text-[11px] text-gray-500">
                Accordion items rendered on the Contact page
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddFaq}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-red text-white text-xs sm:text-sm font-semibold hover:bg-brand-red-dark transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add FAQ Question</span>
            </button>
          </div>

          <div className="space-y-3">
            {formData.faqs.map((faq, idx) => (
              <div
                key={faq.id}
                className="p-4 sm:p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs space-y-2 hover:border-gray-300 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 flex-1 min-w-0">
                    <span className="text-xs font-bold text-brand-red font-mono">
                      Q0{idx + 1}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-gray-900">
                      {faq.question}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed pt-1">
                      {faq.answer}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => handleEditFaq(faq)}
                      className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:text-brand-red hover:bg-red-50 transition-colors"
                      title="Edit FAQ"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteFaq(faq.id)}
                      className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete FAQ"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit / Add FAQ Modal */}
      {editingFaq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <h2 className="text-base sm:text-lg font-bold text-gray-900">
                {isAddFaqMode ? 'Add FAQ Question' : 'Edit FAQ Item'}
              </h2>
              <button
                type="button"
                onClick={() => setEditingFaq(null)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFaqModal} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Question *
                </label>
                <input
                  type="text"
                  required
                  value={editingFaq.question}
                  onChange={(e) =>
                    setEditingFaq({
                      ...editingFaq,
                      question: sanitizeText(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm font-semibold"
                  placeholder="e.g. Which services does Ethixweb specialize in?"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Answer *
                </label>
                <textarea
                  rows={4}
                  required
                  value={editingFaq.answer}
                  onChange={(e) =>
                    setEditingFaq({
                      ...editingFaq,
                      answer: sanitizeText(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm leading-relaxed"
                  placeholder="Comprehensive technical answer..."
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditingFaq(null)}
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
