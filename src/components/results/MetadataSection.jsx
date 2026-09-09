import React from 'react';
import CopyButton from '../common/CopyButton';
import StatusBadge from '../common/StatusBadge';
import { formatDate, formatDuration, formatCompactNumber } from '../../lib/utils/formatters';

/**
 * Detailed metadata grid showing technical, channel, and platform fields.
 */
export default function MetadataSection({ metadata, video }) {
  const meta = { ...video, ...metadata };

  const fields = [
    { label: 'Video ID', value: meta.id || meta.videoId, copyable: true },
    { label: 'Video URL', value: meta.url || meta.videoUrl, copyable: true, isUrl: true },
    { label: 'Canonical URL', value: meta.canonicalUrl, copyable: true, isUrl: true },
    { label: 'Embed Player URL', value: meta.embedUrl, copyable: true, isUrl: true },
    { label: 'Channel Name', value: meta.channel || meta.channelName, copyable: true },
    { label: 'Channel ID', value: meta.channelId, copyable: true },
    { label: 'Published Date', value: formatDate(meta.publishedAt || meta.publishedDate), copyable: false },
    { label: 'Duration', value: formatDuration(meta.duration), copyable: false },
    { label: 'Category', value: meta.category, copyable: false },
    { label: 'Default Language', value: meta.defaultLanguage, copyable: false },
    { label: 'Captions / Transcript', value: meta.captionStatus || (meta.hasCaptions ? 'Available' : 'Unavailable'), copyable: false },
    {
      label: 'View Count',
      value: meta.viewCount ? `${formatCompactNumber(meta.viewCount)} (${Number(meta.viewCount).toLocaleString()} views)` : null,
      copyable: false,
    },
    {
      label: 'Like Count',
      value: meta.likeCount ? `${formatCompactNumber(meta.likeCount)} (${Number(meta.likeCount).toLocaleString()} likes)` : null,
      copyable: false,
    },
  ].filter(f => f.value !== null && f.value !== undefined && f.value !== '');

  return (
    <div className="space-y-6">
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 dark:border-neutral-800 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Technical Metadata
            </span>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white mt-0.5">
              Extracted Video Parameters
            </h3>
          </div>

          <StatusBadge
            variant="neutral"
            text={`${fields.length} Fields Verified`}
          />
        </div>

        {/* Metadata Table / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {fields.map((field, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/40 flex items-start justify-between gap-3"
            >
              <div className="min-w-0 flex-1">
                <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 block uppercase tracking-wider">
                  {field.label}
                </span>
                <div className="mt-1 text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
                  {field.isUrl ? (
                    <a
                      href={field.value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:underline truncate block"
                    >
                      {field.value}
                    </a>
                  ) : (
                    <span>{field.value}</span>
                  )}
                </div>
              </div>

              {field.copyable && (
                <div className="shrink-0 mt-1">
                  <CopyButton
                    text={field.value}
                    label=""
                    size="sm"
                    title={`Copy ${field.label}`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
