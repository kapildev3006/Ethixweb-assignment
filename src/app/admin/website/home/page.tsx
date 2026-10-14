'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Eye,
  Type,
  MousePointerClick,
  Award,
} from 'lucide-react';
import CmsPageHeader from '@/components/admin/cms/CmsPageHeader';
import { emptyHomePageContent, type HomePageContent } from '@/lib/types/cms';
import { sanitizeText, sanitizeUrl } from '@/lib/sanitizeInput';

export default function AdminWebsiteHomePage() {
  const [formData, setFormData] = useState<HomePageContent>(emptyHomePageContent);
  const [isDirty, setIsDirty] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'unsaved' | 'draft' | 'published' | 'saving' | 'publishing' | 'error'>('saved');
  const [activeTab, setActiveTab] = useState<'hero' | 'valueProps' | 'whyEthixweb'>('hero');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  React.useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/admin/website/content?page=home');
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
              setStatusMessage('Loaded unpublished draft from MongoDB Atlas. Click "Publish Changes" when ready to push live.');
              setTimeout(() => setStatusMessage(null), 5000);
            } else {
              setSaveStatus('published');
            }
          }
        }
      } catch (err) {
        console.error('Failed to load home page content:', err);
      }
    }
    loadData();
  }, []);

  // Field change handler with sanitization
  const handleHeroChange = (field: keyof HomePageContent, value: string) => {
    setIsDirty(true);
    setSaveStatus('unsaved');
    setFormData((prev) => ({
      ...prev,
      [field]: field.toLowerCase().includes('destination')
        ? sanitizeUrl(value)
        : sanitizeText(value),
    }));
  };

  const handleValuePropChange = (index: number, field: 'title' | 'description', value: string) => {
    setIsDirty(true);
    setSaveStatus('unsaved');
    setFormData((prev) => {
      const updated = [...prev.valueProps];
      updated[index] = { ...updated[index], [field]: sanitizeText(value) };
      return { ...prev, valueProps: updated };
    });
  };

  const handleWhyEthixwebChange = (field: 'eyebrow' | 'headline' | 'description', value: string) => {
    setIsDirty(true);
    setSaveStatus('unsaved');
    setFormData((prev) => ({
      ...prev,
      whyEthixweb: {
        ...prev.whyEthixweb,
        [field]: sanitizeText(value),
      },
    }));
  };

  const handlePillarChange = (
    index: number,
    field: 'title' | 'description' | 'tag',
    value: string
  ) => {
    setIsDirty(true);
    setSaveStatus('unsaved');
    setFormData((prev) => {
      const updatedPillars = [...prev.whyEthixweb.pillars];
      updatedPillars[index] = {
        ...updatedPillars[index],
        [field]: sanitizeText(value),
      };
      return {
        ...prev,
        whyEthixweb: {
          ...prev.whyEthixweb,
          pillars: updatedPillars,
        },
      };
    });
  };

  const handleReset = () => {
    setFormData(emptyHomePageContent);
    setIsDirty(false);
    setSaveStatus('saved');
    setValidationErrors({});
    setStatusMessage('Form content reset to default values.');
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.heroHeadline.trim()) errors.heroHeadline = 'Headline is required';
    if (!formData.heroDescription.trim()) errors.heroDescription = 'Description is required';
    if (!formData.primaryCtaLabel.trim()) errors.primaryCtaLabel = 'Primary CTA label is required';
    return errors;
  };

  // 1. SAVE DRAFT (Persists to MongoDB Atlas without publishing to public page)
  const handleSaveDraft = async () => {
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setSaveStatus('saving');
    setStatusMessage(null);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/admin/website/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageSlug: 'home',
          title: 'Home Page Content',
          sections: formData,
          action: 'draft',
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to save draft');
      }

      setValidationErrors({});
      setIsDirty(false);
      setSaveStatus('draft');
      setStatusMessage('✓ Draft successfully saved in MongoDB Atlas! Public website remains on previous published content.');
      setTimeout(() => setStatusMessage(null), 4500);
    } catch (err: any) {
      setSaveStatus('error');
      setErrorMessage(`Error saving draft: ${err.message}`);
    }
  };

  // 2. PUBLISH (Persists to MongoDB Atlas and revalidates public page)
  const handlePublish = async () => {
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setSaveStatus('publishing');
    setStatusMessage(null);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/admin/website/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageSlug: 'home',
          title: 'Home Page Content',
          sections: formData,
          action: 'publish',
          isPublished: true,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to publish changes');
      }

      setValidationErrors({});
      setIsDirty(false);
      setSaveStatus('published');
      setStatusMessage('✓ Published successfully to live MongoDB Atlas and public website cache revalidated!');
      setTimeout(() => setStatusMessage(null), 4500);
    } catch (err: any) {
      setSaveStatus('error');
      setErrorMessage(`Error publishing content: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header with CMS controls */}
      <CmsPageHeader
        title="Home Page Content"
        description="Configure hero messaging, conversion CTAs, value proposition cards, and Why Ethixweb differentiator pillars."
        breadcrumbs={[
          { label: 'Website Manager', href: '/admin/website/home' },
          { label: 'Home Page' },
        ]}
        isDirty={isDirty}
        saveStatus={saveStatus}
        onReset={handleReset}
        onSaveDraft={handleSaveDraft}
        onPublish={handlePublish}
        publicPreviewUrl="/"
        statusMessage={statusMessage}
        errorMessage={errorMessage}
      />

      {/* Editor Section Tabs */}
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
          <Type className="w-4 h-4" />
          <span>1. Hero &amp; Conversion CTAs</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('valueProps')}
          className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'valueProps'
              ? 'border-brand-red text-brand-red'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>2. Value Proposition Cards (4)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('whyEthixweb')}
          className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'whyEthixweb'
              ? 'border-brand-red text-brand-red'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>3. Why Ethixweb Section</span>
        </button>
      </div>

      {/* TAB 1: HERO & CTAS */}
      {activeTab === 'hero' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Form Inputs */}
          <div className="lg:col-span-2 space-y-5 bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/90 shadow-2xs">
            <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
              <Type className="w-4 h-4 text-brand-red" />
              <span>Hero Headline &amp; Narrative</span>
            </h2>

            <div className="space-y-4">
              {/* Eyebrow */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Hero Eyebrow Label
                </label>
                <input
                  type="text"
                  value={formData.heroEyebrow}
                  onChange={(e) => handleHeroChange('heroEyebrow', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red transition-all"
                  placeholder="e.g. ETHIXWEB DIGITAL ACCELERATION"
                />
              </div>

              {/* Headline & Crimson Highlight */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Main Headline
                  </label>
                  <input
                    type="text"
                    value={formData.heroHeadline}
                    onChange={(e) => handleHeroChange('heroHeadline', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red transition-all"
                    placeholder="e.g. Digital Growth Engine for Modern"
                  />
                  {validationErrors.heroHeadline && (
                    <p className="text-xs text-rose-600 mt-1 font-semibold">
                      {validationErrors.heroHeadline}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-red uppercase tracking-wider mb-1">
                    Crimson Highlight Words
                  </label>
                  <input
                    type="text"
                    value={formData.heroHeadlineHighlight}
                    onChange={(e) => handleHeroChange('heroHeadlineHighlight', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-red-300 text-xs sm:text-sm text-brand-red font-semibold focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red transition-all bg-red-50/30"
                    placeholder="e.g. Indian Businesses"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Hero Supporting Description
                </label>
                <textarea
                  rows={4}
                  value={formData.heroDescription}
                  onChange={(e) => handleHeroChange('heroDescription', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red transition-all leading-relaxed"
                  placeholder="Enter supporting hero copy..."
                />
                {validationErrors.heroDescription && (
                  <p className="text-xs text-rose-600 mt-1 font-semibold">
                    {validationErrors.heroDescription}
                  </p>
                )}
              </div>
            </div>

            {/* CTAs Section */}
            <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pt-3 pb-3 flex items-center gap-2">
              <MousePointerClick className="w-4 h-4 text-brand-red" />
              <span>Conversion Call-to-Actions (CTAs)</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Primary CTA */}
              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200/90 space-y-3">
                <span className="text-xs font-extrabold text-brand-red uppercase tracking-wider">
                  Primary Button (Filled)
                </span>
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">
                    Button Label
                  </label>
                  <input
                    type="text"
                    value={formData.primaryCtaLabel}
                    onChange={(e) => handleHeroChange('primaryCtaLabel', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">
                    Destination URL
                  </label>
                  <input
                    type="text"
                    value={formData.primaryCtaDestination}
                    onChange={(e) => handleHeroChange('primaryCtaDestination', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs font-mono"
                  />
                </div>
              </div>

              {/* Secondary CTA */}
              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200/90 space-y-3">
                <span className="text-xs font-extrabold text-gray-700 uppercase tracking-wider">
                  Secondary Button (Outline)
                </span>
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">
                    Button Label
                  </label>
                  <input
                    type="text"
                    value={formData.secondaryCtaLabel}
                    onChange={(e) => handleHeroChange('secondaryCtaLabel', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">
                    Destination URL
                  </label>
                  <input
                    type="text"
                    value={formData.secondaryCtaDestination}
                    onChange={(e) => handleHeroChange('secondaryCtaDestination', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right 1 Col: Live Visual Preview */}
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-gray-900 text-white shadow-card space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-800 text-xs text-gray-400">
                <span className="font-bold flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-brand-red-light" />
                  <span>Real-Time Hero Preview</span>
                </span>
                <span className="text-[10px] bg-gray-800 px-2 py-0.5 rounded text-gray-300">
                  Client View
                </span>
              </div>

              <div className="space-y-3">
                <div className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider bg-red-950/80 text-brand-red-light border border-red-800/60">
                  {formData.heroEyebrow || 'EYEBROW'}
                </div>

                <h3 className="text-lg sm:text-xl font-extrabold font-display leading-tight">
                  {formData.heroHeadline}{' '}
                  <span className="text-brand-red-light">
                    {formData.heroHeadlineHighlight}
                  </span>
                </h3>

                <p className="text-xs text-gray-300 leading-relaxed line-clamp-4">
                  {formData.heroDescription}
                </p>

                <div className="pt-2 flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 rounded-lg bg-brand-red text-white text-xs font-bold shadow-xs">
                    {formData.primaryCtaLabel}
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-gray-800 text-gray-200 border border-gray-700 text-xs font-semibold">
                    {formData.secondaryCtaLabel}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-600 space-y-1">
              <p className="font-bold text-gray-900">Content Validation Rule</p>
              <p>
                Free-form HTML tags and executable scripts are automatically stripped by the administrative sanitizer.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: VALUE PROPOSITIONS */}
      {activeTab === 'valueProps' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-gray-900">
                Core Value Propositions (4 Highlights)
              </h2>
              <p className="text-xs text-gray-500">
                Shown prominently beneath the home page hero
              </p>
            </div>
            <span className="text-xs text-gray-500 font-semibold">
              4 of 4 Active Cards
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.valueProps.map((vp, index) => (
              <div
                key={vp.id}
                className="p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-brand-red uppercase tracking-wider">
                    Card #{vp.number}
                  </span>
                  <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                    Home Highlight
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Card Title
                  </label>
                  <input
                    type="text"
                    value={vp.title}
                    onChange={(e) => handleValuePropChange(index, 'title', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm font-semibold text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={vp.description}
                    onChange={(e) => handleValuePropChange(index, 'description', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs text-gray-700 leading-relaxed"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: WHY ETHIXWEB */}
      {activeTab === 'whyEthixweb' && (
        <div className="space-y-6">
          {/* Section Headers */}
          <div className="p-5 bg-white rounded-2xl border border-gray-200/90 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-2">
              Why Ethixweb Section Header
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Section Eyebrow
                </label>
                <input
                  type="text"
                  value={formData.whyEthixweb.eyebrow}
                  onChange={(e) => handleWhyEthixwebChange('eyebrow', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Section Headline
                </label>
                <input
                  type="text"
                  value={formData.whyEthixweb.headline}
                  onChange={(e) => handleWhyEthixwebChange('headline', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Section Description
              </label>
              <textarea
                rows={2}
                value={formData.whyEthixweb.description}
                onChange={(e) => handleWhyEthixwebChange('description', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm"
              />
            </div>
          </div>

          {/* 4 Differentiator Pillars */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
              Differentiator Pillars (4)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.whyEthixweb.pillars.map((pillar, idx) => (
                <div
                  key={pillar.id}
                  className="p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-brand-red">
                      Pillar 0{idx + 1}
                    </span>
                    <input
                      type="text"
                      value={pillar.tag}
                      onChange={(e) => handlePillarChange(idx, 'tag', e.target.value)}
                      className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded border border-gray-200 w-36 text-right"
                      placeholder="Badge tag"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">
                      Pillar Title
                    </label>
                    <input
                      type="text"
                      value={pillar.title}
                      onChange={(e) => handlePillarChange(idx, 'title', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 mb-1">
                      Pillar Narrative
                    </label>
                    <textarea
                      rows={2}
                      value={pillar.description}
                      onChange={(e) => handlePillarChange(idx, 'description', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs text-gray-700 leading-relaxed"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
