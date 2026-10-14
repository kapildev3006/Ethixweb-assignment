'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Settings,
  Globe,
  Share2,
  ShieldCheck,
  CheckCircle2,
  Palette,
  ExternalLink,
} from 'lucide-react';
import CmsPageHeader from '@/components/admin/cms/CmsPageHeader';
import { emptySiteSettingsContent, type SiteSettingsContent } from '@/lib/types/cms';
import { sanitizeText, sanitizeUrl } from '@/lib/sanitizeInput';

export default function AdminSettingsPage() {
  const [formData, setFormData] = useState<SiteSettingsContent>(emptySiteSettingsContent);
  const [isDirty, setIsDirty] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  React.useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch('/api/admin/settings');
        if (res.ok) {
          const json = await res.json();
          if (json.data) {
            setFormData((prev) => ({
              ...prev,
              ...json.data,
            }));
          }
        }
      } catch (err) {
        console.error('Failed to load settings:', err);
      }
    }
    loadSettings();
  }, []);

  const handleFieldChange = (field: keyof SiteSettingsContent, value: string) => {
    setIsDirty(true);
    setFormData((prev) => ({
      ...prev,
      [field]: sanitizeText(value),
    }));
  };

  const handleSocialChange = (key: keyof SiteSettingsContent['socialLinks'], value: string) => {
    setIsDirty(true);
    setFormData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [key]: sanitizeUrl(value),
      },
    }));
  };

  const handleReset = () => {
    setFormData(emptySiteSettingsContent);
    setIsDirty(false);
    setStatusMessage('Site settings reset to defaults.');
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const handlePublish = async () => {
    try {
      setStatusMessage('Saving settings to MongoDB Atlas and revalidating cache...');
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to update settings');
      }

      setIsDirty(false);
      setStatusMessage('✓ Site settings successfully updated in live MongoDB Atlas!');
      setTimeout(() => setStatusMessage(null), 4500);
    } catch (err: any) {
      setStatusMessage(`Error: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <CmsPageHeader
        title="Site Settings &amp; SEO Configuration"
        description="Manage global page metadata, target SEO search keywords, verified social media channels, and public branding parameters."
        breadcrumbs={[
          { label: 'Settings', href: '/admin/settings' },
          { label: 'Site Settings' },
        ]}
        isDirty={isDirty}
        saveStatus={isDirty ? 'unsaved' : 'published'}
        onReset={handleReset}
        onSaveDraft={handlePublish}
        onPublish={handlePublish}
        publicPreviewUrl="/"
        statusMessage={statusMessage}
      />

      {/* 1. Global Metadata & SEO */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/90 shadow-2xs space-y-4">
        <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-2">
          <Globe className="w-4 h-4 text-brand-red" />
          <span>SEO &amp; Search Engine Metadata</span>
        </h2>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
            Global Site Title Tag
          </label>
          <input
            type="text"
            value={formData.websiteTitle}
            onChange={(e) => handleFieldChange('websiteTitle', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm font-semibold"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
            SEO Meta Description
          </label>
          <textarea
            rows={3}
            value={formData.seoDescription}
            onChange={(e) => handleFieldChange('seoDescription', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm leading-relaxed"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
            Primary Target Keywords (Comma-separated)
          </label>
          <input
            type="text"
            value={formData.keywords.join(', ')}
            onChange={(e) => {
              const list = e.target.value
                .split(',')
                .map((k) => sanitizeText(k))
                .filter(Boolean);
              setIsDirty(true);
              setFormData((prev) => ({ ...prev, keywords: list }));
            }}
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm"
          />
        </div>
      </div>

      {/* 2. Public Branding Details */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/90 shadow-2xs space-y-4">
        <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-2">
          <Palette className="w-4 h-4 text-brand-red" />
          <span>Public Branding &amp; Legal Entity</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Primary Brand Accent Hex
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={formData.primaryBrandColor}
                onChange={(e) => handleFieldChange('primaryBrandColor', e.target.value)}
                className="w-10 h-10 rounded-lg border border-gray-300 cursor-pointer p-0.5"
              />
              <input
                type="text"
                value={formData.primaryBrandColor}
                onChange={(e) => handleFieldChange('primaryBrandColor', e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm font-mono font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Legal Entity Name
            </label>
            <input
              type="text"
              value={formData.legalEntityName}
              onChange={(e) => handleFieldChange('legalEntityName', e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm font-semibold"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              General Support Email
            </label>
            <input
              type="email"
              value={formData.supportEmail}
              onChange={(e) => handleFieldChange('supportEmail', e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Footer Copyright Text
            </label>
            <input
              type="text"
              value={formData.copyrightText}
              onChange={(e) => handleFieldChange('copyrightText', e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* 3. Verified Social Media Links */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/90 shadow-2xs space-y-4">
        <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-2">
          <Share2 className="w-4 h-4 text-brand-red" />
          <span>Social Channels &amp; Review Platforms</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              LinkedIn Company URL
            </label>
            <input
              type="text"
              value={formData.socialLinks.linkedin}
              onChange={(e) => handleSocialChange('linkedin', e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Twitter / X URL
            </label>
            <input
              type="text"
              value={formData.socialLinks.twitter}
              onChange={(e) => handleSocialChange('twitter', e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Instagram Profile URL
            </label>
            <input
              type="text"
              value={formData.socialLinks.instagram}
              onChange={(e) => handleSocialChange('instagram', e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Trustpilot Review URL
            </label>
            <input
              type="text"
              value={formData.socialLinks.trustpilot}
              onChange={(e) => handleSocialChange('trustpilot', e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-mono"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
