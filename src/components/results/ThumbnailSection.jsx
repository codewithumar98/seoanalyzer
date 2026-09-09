import React, { useState } from 'react';
import CopyButton from '../common/CopyButton';
import StatusBadge from '../common/StatusBadge';
import EmptyState from '../common/EmptyState';
import { downloadImage } from '../../lib/utils/download';

/**
 * High-definition thumbnail inspector with aspect ratio preservation and download actions.
 */
export default function ThumbnailSection({ thumbnail, video }) {
  const [downloading, setDownloading] = useState(false);

  const thumbUrl = thumbnail?.url || '';

  const handleDownload = async () => {
    if (!thumbUrl) return;
    setDownloading(true);
    const cleanId = video?.id || 'thumbnail';
    await downloadImage(thumbUrl, `youtube_thumb_${cleanId}.jpg`);
    setDownloading(false);
  };

  if (!thumbUrl) {
    return (
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs">
        <EmptyState
          title="No thumbnail available."
          description="Could not locate or verify a public thumbnail asset for this video ID."
        />
      </div>
    );
  }

  const dimensions = thumbnail.width && thumbnail.height
    ? `${thumbnail.width} × ${thumbnail.height}`
    : '1280 × 720 (Standard HD)';

  return (
    <div className="space-y-6">
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 dark:border-neutral-800 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Video Thumbnail Asset
            </span>
            <StatusBadge
              variant="success"
              text={dimensions}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <CopyButton
              text={thumbUrl}
              label="Copy Image URL"
            />

            <a
              href={thumbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg text-neutral-700 bg-white hover:bg-neutral-100 border border-neutral-300 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700 shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/50"
            >
              <svg className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span>Open in New Tab</span>
            </a>

            <button
              type="button"
              onClick={handleDownload}
              disabled={downloading}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg text-white bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:opacity-50 transition-colors shadow-xs focus:outline-none focus:ring-2 focus:ring-red-500/50"
            >
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>{downloading ? 'Downloading...' : 'Download Image'}</span>
            </button>
          </div>
        </div>

        {/* Thumbnail Preview Card (Aspect-ratio 16:9 safe) */}
        <div className="relative rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-200 dark:border-neutral-800 aspect-video max-w-4xl mx-auto flex items-center justify-center shadow-md">
          <img
            src={thumbUrl}
            alt={`YouTube thumbnail for ${video?.title || 'video'}`}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>

        {/* Available Qualities or Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Aspect Ratio
            </span>
            <p className="mt-1 text-sm font-bold text-neutral-900 dark:text-white">
              16:9 (Standard Widescreen)
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Resolution
            </span>
            <p className="mt-1 text-sm font-bold text-neutral-900 dark:text-white">
              {dimensions}
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Quality Level
            </span>
            <p className="mt-1 text-sm font-bold text-neutral-900 dark:text-white">
              {thumbnail.quality || 'Max Resolution'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
