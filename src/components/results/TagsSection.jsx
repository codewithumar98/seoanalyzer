import React, { useState } from 'react';
import CopyButton from '../common/CopyButton';
import EmptyState from '../common/EmptyState';
import { copyToClipboard } from '../../lib/utils/clipboard';

/**
 * Tags section displaying keywords as interactive chips with individual and bulk copy.
 */
export default function TagsSection({ tags }) {
  const [copiedTag, setCopiedTag] = useState(null);

  const tagList = Array.isArray(tags) ? tags : [];
  const tagCount = tagList.length;

  const handleCopyTag = async (tag) => {
    const ok = await copyToClipboard(tag);
    if (ok) {
      setCopiedTag(tag);
      setTimeout(() => setCopiedTag(null), 1500);
    }
  };

  const commaSeparatedTags = tagList.join(', ');

  return (
    <div className="space-y-6">
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 dark:border-neutral-800 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Video Tags &amp; Keywords
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
              {tagCount} {tagCount === 1 ? 'tag' : 'tags'}
            </span>
          </div>

          {tagCount > 0 && (
            <div className="flex items-center gap-2">
              <CopyButton
                text={commaSeparatedTags}
                label="Copy All Tags"
                title="Copy all tags as comma-separated list"
              />
            </div>
          )}
        </div>

        {/* Tags Content */}
        {tagCount > 0 ? (
          <div className="space-y-4">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Click any tag to copy it individually.
            </p>

            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              {tagList.map((tag, idx) => {
                const isCopied = copiedTag === tag;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleCopyTag(tag)}
                    title={`Click to copy "${tag}"`}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium border transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500/50 ${
                      isCopied
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-700 scale-105 shadow-xs'
                        : 'bg-neutral-50 dark:bg-neutral-950/60 text-neutral-800 dark:text-neutral-200 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-900'
                    }`}
                  >
                    <span className="text-neutral-400 dark:text-neutral-500 select-none">#</span>
                    <span>{tag}</span>
                    {isCopied && (
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 ml-1 animate-in fade-in">
                        Copied!
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <EmptyState
            title="No tags were found for this video."
            description="YouTube video tags are optional metadata. Many creators rely purely on clear titles and rich descriptions for discoverability."
          />
        )}
      </div>
    </div>
  );
}
