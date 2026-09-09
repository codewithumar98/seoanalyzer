import React, { useState } from 'react';
import CopyButton from '../common/CopyButton';
import StatusBadge from '../common/StatusBadge';
import EmptyState from '../common/EmptyState';
import { countWords } from '../../lib/utils/formatters';

/**
 * Description section with word/char counters, expandable toggle, and link detection.
 */
export default function DescriptionSection({ description }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const charCount = description?.length || 0;
  const wordCount = countWords(description);

  if (!description) {
    return (
      <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
        <EmptyState
          title="No description found"
          description="The creator did not provide a description for this video, or it could not be retrieved."
        />
      </div>
    );
  }

  // Detect lines
  const lines = description.split('\n');
  const isLong = lines.length > 12 || charCount > 600;

  return (
    <div className="space-y-6">
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 dark:border-neutral-800 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Video Description
            </span>
            <StatusBadge
              variant={charCount > 300 ? 'success' : charCount > 100 ? 'warning' : 'neutral'}
              text={charCount > 300 ? 'Comprehensive' : 'Brief'}
            />
          </div>

          <div className="flex items-center gap-2">
            <CopyButton
              text={description}
              label="Copy Description"
            />
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400 pb-2">
          <div className="flex items-center gap-1.5">
            <strong className="text-neutral-900 dark:text-white font-bold">{charCount}</strong> characters
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <strong className="text-neutral-900 dark:text-white font-bold">{wordCount}</strong> words
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <strong className="text-neutral-900 dark:text-white font-bold">{lines.length}</strong> lines
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            Limit: 5,000 max
          </div>
        </div>

        {/* Description Body */}
        <div className="relative">
          <div
            className={`p-4 sm:p-5 rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200/80 dark:border-neutral-800 font-sans text-sm sm:text-base text-neutral-800 dark:text-neutral-200 leading-relaxed whitespace-pre-wrap break-words transition-all ${
              !isExpanded && isLong ? 'max-h-80 overflow-hidden' : 'max-h-none'
            }`}
          >
            {description}
          </div>

          {/* Fade mask when collapsed */}
          {!isExpanded && isLong && (
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-neutral-50 dark:from-neutral-950/90 to-transparent pointer-events-none rounded-b-xl" />
          )}
        </div>

        {/* Show More / Show Less Toggle */}
        {isLong && (
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:text-red-600 dark:hover:text-red-400 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/50"
            >
              <span>{isExpanded ? 'Show Less' : 'Show Full Description'}</span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
