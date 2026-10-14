'use client';

import React from 'react';
import { SearchX, RotateCcw, Inbox, RefreshCw } from 'lucide-react';

interface DashboardEmptyStateProps {
  onReset: () => void;
  searchQuery: string;
  isTotalEmpty?: boolean;
}

export default function DashboardEmptyState({ onReset, searchQuery, isTotalEmpty = false }: DashboardEmptyStateProps) {
  if (isTotalEmpty) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200/90 p-12 text-center space-y-4 my-4 shadow-2xs">
        <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-200 text-gray-400 mx-auto flex items-center justify-center">
          <Inbox className="w-7 h-7" />
        </div>
        <div className="space-y-1.5 max-w-sm mx-auto">
          <h3 className="text-lg font-bold font-display text-gray-900">
            No customer enquiries yet
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            Submissions from your public website contact form will automatically appear here in real time with customer contact details, requested capabilities, and timelines.
          </p>
        </div>
        <div className="pt-2">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 text-white text-xs font-bold hover:bg-black transition-colors cursor-pointer shadow-2xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh Live Database</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200/90 p-12 text-center space-y-4 my-4 shadow-2xs">
      <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-200 text-gray-400 mx-auto flex items-center justify-center">
        <SearchX className="w-7 h-7" />
      </div>
      <div className="space-y-1.5 max-w-sm mx-auto">
        <h3 className="text-lg font-bold font-display text-gray-900">
          No matching leads found
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
          {searchQuery ? (
            <>
              No client enquiries match the keyword &ldquo;<strong>{searchQuery}</strong>&rdquo; or current filter criteria.
            </>
          ) : (
            'No enquiries match the selected status and service filters.'
          )}
        </p>
      </div>
      <div className="pt-2">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 text-white text-xs font-bold hover:bg-black transition-colors cursor-pointer shadow-2xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Filters</span>
        </button>
      </div>
    </div>
  );
}

