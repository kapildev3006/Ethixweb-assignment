'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ExternalLink,
  Save,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Eye,
  Database,
  Clock,
  Loader2,
} from 'lucide-react';

export type CmsSaveStatus =
  | 'saved'
  | 'unsaved'
  | 'draft'
  | 'published'
  | 'saving'
  | 'publishing'
  | 'error';

export interface CmsPageHeaderProps {
  title: string;
  description: string;
  breadcrumbs: { label: string; href?: string }[];
  isDirty?: boolean;
  saveStatus?: CmsSaveStatus;
  lastPublishedAt?: string | Date | null;
  onSaveDraft?: () => void;
  onPublish?: () => void;
  onPublishPreview?: () => void; // backwards-compatible alias for onPublish
  onReset?: () => void;
  publicPreviewUrl?: string;
  isSaving?: boolean;
  statusMessage?: string | null;
  errorMessage?: string | null;
}

export default function CmsPageHeader({
  title,
  description,
  breadcrumbs,
  isDirty = false,
  saveStatus,
  lastPublishedAt,
  onSaveDraft,
  onPublish,
  onPublishPreview,
  onReset,
  publicPreviewUrl = '/',
  isSaving = false,
  statusMessage,
  errorMessage,
}: CmsPageHeaderProps) {
  const handlePublishClick = () => {
    if (onPublish) {
      onPublish();
    } else if (onPublishPreview) {
      onPublishPreview();
    }
  };

  // Determine current badge state
  const isPublishingNow = isSaving || saveStatus === 'publishing';
  const isSavingDraftNow = saveStatus === 'saving';

  return (
    <div className="space-y-4 pb-4 border-b border-gray-200">
      {/* Top Breadcrumb & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={crumb.label}>
              {idx > 0 && <span>/</span>}
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-gray-900 transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-gray-900 font-bold">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Real MongoDB Sync Status Badge */}
        <div className="flex items-center gap-2">
          {isPublishingNow ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-red/10 text-brand-red border border-brand-red/20">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Publishing to MongoDB Atlas...</span>
            </span>
          ) : isSavingDraftNow ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-800 border border-purple-200">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-600" />
              <span>Saving Draft to Database...</span>
            </span>
          ) : isDirty ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>Unsaved Changes in Editor</span>
            </span>
          ) : saveStatus === 'draft' ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-800 border border-purple-200">
              <Clock className="w-3.5 h-3.5 text-purple-600" />
              <span>Draft Saved (Unpublished)</span>
            </span>
          ) : saveStatus === 'error' ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-800 border border-red-200">
              <AlertCircle className="w-3.5 h-3.5 text-red-600" />
              <span>Save Error</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Synchronized with MongoDB Atlas</span>
            </span>
          )}

          {/* MongoDB Atlas live pill */}
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full border border-gray-200">
            <Database className="w-3 h-3 text-emerald-600" />
            <span>Atlas Live</span>
          </span>
        </div>
      </div>

      {/* Main Title Row & Action Buttons */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-gray-900 tracking-tight">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-2xl">{description}</p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {/* Discard / Reset button */}
          {onReset && (
            <button
              type="button"
              onClick={onReset}
              disabled={isSaving || isPublishingNow || isSavingDraftNow}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors shadow-2xs focus-visible:ring-2 focus-visible:ring-brand-red disabled:opacity-50"
              title="Reset form to last saved database content"
            >
              <RotateCcw className="w-3.5 h-3.5 text-gray-500" />
              <span>Reset</span>
            </button>
          )}

          {/* View on Public Site */}
          <Link
            href={publicPreviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors shadow-2xs focus-visible:ring-2 focus-visible:ring-brand-red"
            title="Inspect corresponding live public page"
          >
            <Eye className="w-3.5 h-3.5 text-gray-500" />
            <span>Preview Public Page</span>
            <ExternalLink className="w-3 h-3 text-gray-400" />
          </Link>

          {/* Save Draft Action */}
          {onSaveDraft && (
            <button
              type="button"
              onClick={onSaveDraft}
              disabled={isSaving || isPublishingNow || isSavingDraftNow}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-800 bg-gray-100 hover:bg-gray-200 transition-colors focus-visible:ring-2 focus-visible:ring-brand-red disabled:opacity-50 cursor-pointer"
              title="Save changes to database as an unpublished draft"
            >
              <Save className="w-3.5 h-3.5 text-gray-600" />
              <span>{isSavingDraftNow ? 'Saving Draft...' : 'Save Draft'}</span>
            </button>
          )}

          {/* Publish Action */}
          <button
            type="button"
            onClick={handlePublishClick}
            disabled={isSaving || isPublishingNow || isSavingDraftNow}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-brand-red hover:bg-brand-red-dark transition-colors shadow-xs focus-visible:ring-2 focus-visible:ring-brand-red disabled:opacity-50 cursor-pointer"
            title="Publish changes to MongoDB Atlas and update the live public website"
          >
            {isPublishingNow ? (
              <Loader2 className="w-4 h-4 animate-spin text-white" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            <span>{isPublishingNow ? 'Publishing...' : 'Publish Changes'}</span>
          </button>
        </div>
      </div>

      {/* Success / Status Message Notification */}
      {statusMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span className="font-medium">{statusMessage}</span>
          </div>
        </div>
      )}

      {/* Error Message Notification */}
      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs flex items-center gap-2 animate-fadeIn">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
          <span className="font-medium">{errorMessage}</span>
        </div>
      )}
    </div>
  );
}

