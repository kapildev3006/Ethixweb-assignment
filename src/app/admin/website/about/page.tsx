'use client';

import React, { useState } from 'react';
import {
  FileText,
  Building2,
  Award,
  Globe2,
  CheckCircle2,
  Eye,
  RotateCcw,
} from 'lucide-react';
import CmsPageHeader from '@/components/admin/cms/CmsPageHeader';
import { emptyAboutPageContent, type AboutPageContent } from '@/lib/types/cms';
import { sanitizeText } from '@/lib/sanitizeInput';

export default function AdminWebsiteAboutPage() {
  const [formData, setFormData] = useState<AboutPageContent>(emptyAboutPageContent);
  const [isDirty, setIsDirty] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'unsaved' | 'draft' | 'published' | 'saving' | 'publishing' | 'error'>('saved');
  const [activeTab, setActiveTab] = useState<'hero' | 'story' | 'values' | 'india'>('hero');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  React.useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/admin/website/content?page=about');
        if (res.ok) {
          const json = await res.json();
          if (json.data) {
            const hasDraft = json.data.hasDraft && json.data.draftSections;
            const contentToLoad = hasDraft ? json.data.draftSections : json.data.sections;
            if (contentToLoad) {
              setFormData((prev) => ({
                ...prev,
                ...contentToLoad,
              }));
            }
            if (hasDraft) {
              setSaveStatus('draft');
              setStatusMessage('Loaded unpublished draft from MongoDB Atlas.');
              setTimeout(() => setStatusMessage(null), 4000);
            } else {
              setSaveStatus('published');
            }
          }
        }
      } catch (err) {
        console.error('Failed to load about page content:', err);
      }
    }
    loadData();
  }, []);

  const handleHeroChange = (field: keyof AboutPageContent, value: string) => {
    setIsDirty(true);
    setSaveStatus('unsaved');
    setFormData((prev) => ({
      ...prev,
      [field]: sanitizeText(value),
    }));
  };

  const handleParagraphChange = (index: number, value: string) => {
    setIsDirty(true);
    setSaveStatus('unsaved');
    setFormData((prev) => {
      const updated = [...prev.companyStory.paragraphs];
      updated[index] = sanitizeText(value);
      return {
        ...prev,
        companyStory: { ...prev.companyStory, paragraphs: updated },
      };
    });
  };

  const handleDualShoreChange = (
    field: 'usHeadquarters' | 'indiaEngineeringHub' | 'advantage',
    value: string
  ) => {
    setIsDirty(true);
    setSaveStatus('unsaved');
    setFormData((prev) => ({
      ...prev,
      dualShoreModel: {
        ...prev.dualShoreModel,
        [field]: sanitizeText(value),
      },
    }));
  };

  const handleValueChange = (index: number, field: 'title' | 'description', value: string) => {
    setIsDirty(true);
    setSaveStatus('unsaved');
    setFormData((prev) => {
      const updated = [...prev.coreValues];
      updated[index] = { ...updated[index], [field]: sanitizeText(value) };
      return { ...prev, coreValues: updated };
    });
  };

  const handleMetricChange = (index: number, field: 'label' | 'value', value: string) => {
    setIsDirty(true);
    setSaveStatus('unsaved');
    setFormData((prev) => {
      const metricsList = prev.indiaOpportunity?.metrics || [];
      const updated = [...metricsList];
      updated[index] = { ...updated[index], [field]: sanitizeText(value) };
      return {
        ...prev,
        indiaOpportunity: { ...prev.indiaOpportunity, metrics: updated },
      };
    });
  };

  const handleReset = () => {
    setFormData(emptyAboutPageContent);
    setIsDirty(false);
    setSaveStatus('saved');
    setStatusMessage('About Page content reset to initial values.');
    setTimeout(() => setStatusMessage(null), 3500);
  };

  // 1. SAVE DRAFT
  const handleSaveDraft = async () => {
    setSaveStatus('saving');
    setStatusMessage(null);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/admin/website/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageSlug: 'about',
          title: 'About Page Content',
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
      setStatusMessage('✓ Draft saved to MongoDB Atlas! Public website unchanged.');
      setTimeout(() => setStatusMessage(null), 4500);
    } catch (err: any) {
      setSaveStatus('error');
      setErrorMessage(`Error: ${err.message}`);
    }
  };

  // 2. PUBLISH
  const handlePublish = async () => {
    setSaveStatus('publishing');
    setStatusMessage(null);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/admin/website/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageSlug: 'about',
          title: 'About Page Content',
          sections: formData,
          action: 'publish',
          isPublished: true,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to update about content');
      }

      setIsDirty(false);
      setSaveStatus('published');
      setStatusMessage('✓ Successfully published to live MongoDB Atlas! Public About Page cache revalidated.');
      setTimeout(() => setStatusMessage(null), 4500);
    } catch (err: any) {
      setSaveStatus('error');
      setErrorMessage(`Error: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6">
      <CmsPageHeader
        title="About Page Content"
        description="Configure the company story, dual-shore engineering governance, foundational values, and India digital opportunity copy."
        breadcrumbs={[
          { label: 'Website Manager', href: '/admin/website/home' },
          { label: 'About Page' },
        ]}
        isDirty={isDirty}
        saveStatus={saveStatus}
        onReset={handleReset}
        onSaveDraft={handleSaveDraft}
        onPublish={handlePublish}
        publicPreviewUrl="/about"
        statusMessage={statusMessage}
        errorMessage={errorMessage}
      />

      {/* Tabs */}
      <div className="flex border-b border-gray-200 gap-2 sm:gap-4 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('hero')}
          className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'hero'
              ? 'border-brand-red text-brand-red'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>1. Introduction &amp; Hero</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('story')}
          className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'story'
              ? 'border-brand-red text-brand-red'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>2. Story &amp; Dual-Shore Model</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('values')}
          className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'values'
              ? 'border-brand-red text-brand-red'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>3. Core Values (4)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('india')}
          className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'india'
              ? 'border-brand-red text-brand-red'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <Globe2 className="w-4 h-4" />
          <span>4. India Opportunity &amp; Metrics</span>
        </button>
      </div>

      {/* TAB 1: HERO */}
      {activeTab === 'hero' && (
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/90 shadow-2xs space-y-4 max-w-4xl">
          <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-2">
            About Hero Narrative
          </h2>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Eyebrow Label
            </label>
            <input
              type="text"
              value={formData.heroEyebrow}
              onChange={(e) => handleHeroChange('heroEyebrow', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Main Headline
              </label>
              <input
                type="text"
                value={formData.heroHeadline}
                onChange={(e) => handleHeroChange('heroHeadline', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm"
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
              Supporting Statement
            </label>
            <textarea
              rows={4}
              value={formData.heroDescription}
              onChange={(e) => handleHeroChange('heroDescription', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm leading-relaxed"
            />
          </div>
        </div>
      )}

      {/* TAB 2: STORY & DUAL-SHORE */}
      {activeTab === 'story' && (
        <div className="space-y-6 max-w-4xl">
          {/* Story Paragraphs */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/90 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-2">
              Company Story Narrative
            </h2>

            {formData.companyStory.paragraphs.map((para, idx) => (
              <div key={idx}>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Paragraph #{idx + 1}
                </label>
                <textarea
                  rows={3}
                  value={para}
                  onChange={(e) => handleParagraphChange(idx, e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm leading-relaxed"
                />
              </div>
            ))}
          </div>

          {/* Dual-Shore Model */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/90 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-2">
              Dual-Shore Model Specifics
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  US Headquarters Description
                </label>
                <textarea
                  rows={2}
                  value={formData.dualShoreModel.usHeadquarters}
                  onChange={(e) => handleDualShoreChange('usHeadquarters', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  India Engineering Hub Description
                </label>
                <textarea
                  rows={2}
                  value={formData.dualShoreModel.indiaEngineeringHub}
                  onChange={(e) => handleDualShoreChange('indiaEngineeringHub', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Strategic Synergy Advantage
              </label>
              <textarea
                rows={2}
                value={formData.dualShoreModel.advantage}
                onChange={(e) => handleDualShoreChange('advantage', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CORE VALUES */}
      {activeTab === 'values' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-gray-900">
            Four Foundational Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.coreValues.map((val, idx) => (
              <div
                key={val.id}
                className="p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs space-y-3"
              >
                <span className="text-xs font-extrabold text-brand-red">
                  Value #{idx + 1}
                </span>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Value Title
                  </label>
                  <input
                    type="text"
                    value={val.title}
                    onChange={(e) => handleValueChange(idx, 'title', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Statement
                  </label>
                  <textarea
                    rows={3}
                    value={val.description}
                    onChange={(e) => handleValueChange(idx, 'description', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs text-gray-700 leading-relaxed"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: INDIA FOCUS */}
      {activeTab === 'india' && (
        <div className="space-y-6 max-w-4xl">
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/90 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-2">
              India Opportunity Messaging
            </h2>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Headline
              </label>
              <input
                type="text"
                value={formData.indiaOpportunity?.headline || formData.indiaOpportunity?.heading || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    indiaOpportunity: {
                      ...formData.indiaOpportunity,
                      headline: sanitizeText(e.target.value),
                      heading: sanitizeText(e.target.value),
                    },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Context Narrative
              </label>
              <textarea
                rows={3}
                value={formData.indiaOpportunity?.description || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    indiaOpportunity: {
                      ...formData.indiaOpportunity,
                      description: sanitizeText(e.target.value),
                    },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm leading-relaxed"
              />
            </div>

            {/* Metrics */}
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider pt-2">
              Highlight Metrics
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(formData.indiaOpportunity?.metrics || []).map((m: { label: string; value: string }, idx: number) => (
                <div key={idx} className="p-3 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                  <input
                    type="text"
                    value={m.value}
                    onChange={(e) => handleMetricChange(idx, 'value', e.target.value)}
                    className="w-full font-black text-brand-red text-base bg-transparent border-b border-gray-300 focus:outline-none"
                  />
                  <input
                    type="text"
                    value={m.label}
                    onChange={(e) => handleMetricChange(idx, 'label', e.target.value)}
                    className="w-full text-[10px] text-gray-600 font-semibold bg-transparent border-b border-gray-200 focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
