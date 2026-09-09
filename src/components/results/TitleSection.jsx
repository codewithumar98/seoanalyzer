import React from 'react';
import CopyButton from '../common/CopyButton';
import StatusBadge from '../common/StatusBadge';

/**
 * Detailed title section with character count, wrap-safe typography, and length recommendations.
 */
export default function TitleSection({ title, video }) {
  const charCount = title?.length || 0;

  // Standard YouTube title best practices: 40-70 characters display well before clipping on mobile/desktop search
  const isOptimal = charCount >= 40 && charCount <= 70;
  const isTooShort = charCount > 0 && charCount < 30;
  const isTooLong = charCount > 85;

  return (
    <div className="space-y-6">
      {/* Title Detail Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 dark:border-neutral-800 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Video Title
            </span>
            <StatusBadge
              variant={title ? 'success' : 'danger'}
              text={title ? 'Extracted' : 'Missing'}
            />
          </div>
          <div className="flex items-center gap-2">
            <CopyButton
              text={title}
              label="Copy Title"
            />
          </div>
        </div>

        {/* Full Title Display */}
        <div className="p-4 sm:p-5 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200/80 dark:border-neutral-800">
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-neutral-900 dark:text-white leading-relaxed break-words">
            {title || 'No title available'}
          </p>
        </div>

        {/* Title Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {/* Character Count */}
          <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Length
            </span>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-2xl font-extrabold text-neutral-900 dark:text-white">
                {charCount}
              </span>
              <span className="text-xs text-neutral-500">/ 100 max</span>
            </div>
            <p className="mt-1 text-xs text-neutral-500">
              YouTube allows up to 100 characters in titles.
            </p>
          </div>

          {/* Snippet Optimization */}
          <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Search Snippet Fit
            </span>
            <div className="mt-1">
              <StatusBadge
                variant={isOptimal ? 'success' : isTooShort || isTooLong ? 'warning' : 'neutral'}
                text={
                  isOptimal
                    ? 'Optimal Fit (40-70)'
                    : isTooShort
                    ? 'Short (< 30 chars)'
                    : isTooLong
                    ? 'May Truncate (> 85 chars)'
                    : 'Good Fit'
                }
              />
            </div>
            <p className="mt-2 text-xs text-neutral-500">
              Titles between 40-70 characters prevent truncation in mobile search.
            </p>
          </div>

          {/* Source Information */}
          <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Source &amp; Channel
            </span>
            <p className="mt-1 text-sm font-bold text-neutral-900 dark:text-white truncate">
              {video?.channel || 'YouTube Data'}
            </p>
            <p className="mt-1 text-xs text-neutral-500 truncate">
              ID: {video?.id || 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
