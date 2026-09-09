import React, { useState, useMemo } from 'react';
import CopyButton from '../common/CopyButton';
import StatusBadge from '../common/StatusBadge';
import EmptyState from '../common/EmptyState';
import { formatTimestamp } from '../../lib/utils/formatters';
import { downloadTextFile } from '../../lib/utils/download';

/**
 * Interactive transcript reader with keyword search, match highlighting, and text download.
 */
export default function TranscriptSection({ transcript, video }) {
  const [searchQuery, setSearchQuery] = useState('');

  const hasTranscript = Boolean(transcript && Array.isArray(transcript) && transcript.length > 0);

  // Full raw transcript string for copy and download
  const fullTranscriptText = useMemo(() => {
    if (!hasTranscript) return '';
    return transcript
      .map(item => {
        const time = item.start !== undefined ? `[${formatTimestamp(item.start)}] ` : '';
        return `${time}${item.text}`;
      })
      .join('\n');
  }, [transcript, hasTranscript]);

  // Filtered segments based on search
  const filteredSegments = useMemo(() => {
    if (!hasTranscript) return [];
    const query = searchQuery.trim().toLowerCase();
    if (!query) return transcript;

    return transcript.filter(item => item.text.toLowerCase().includes(query));
  }, [transcript, searchQuery, hasTranscript]);

  const handleDownloadTranscript = () => {
    if (!fullTranscriptText) return;
    const cleanTitle = (video?.title || 'youtube-transcript')
      .replace(/[^a-z0-9_-]/gi, '_')
      .slice(0, 40);
    downloadTextFile(fullTranscriptText, `${cleanTitle}_transcript.txt`);
  };

  if (!hasTranscript) {
    return (
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs">
        <EmptyState
          title="Transcript unavailable for this video."
          description="Transcript availability depends on accessible caption data provided by YouTube. The creator may have captions disabled, or automatic captions have not yet been processed for this video."
        />
      </div>
    );
  }

  // Highlight matches helper
  const renderHighlightedText = (text, query) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark
              key={i}
              className="bg-amber-200 dark:bg-amber-900/80 text-neutral-900 dark:text-amber-100 rounded px-1 py-0.5"
            >
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 dark:border-neutral-800 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Video Transcript
            </span>
            <StatusBadge
              variant="success"
              text={`${transcript.length} Segments`}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <CopyButton
              text={fullTranscriptText}
              label="Copy Transcript"
              title="Copy entire transcript with timestamps"
            />

            <button
              type="button"
              onClick={handleDownloadTranscript}
              title="Download transcript as .txt file"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg text-neutral-700 bg-white hover:bg-neutral-100 border border-neutral-300 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700 shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/50"
            >
              <svg className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download (.txt)</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 pointer-events-none">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search words or topics in transcript..."
              className="w-full pl-10 pr-10 py-2 text-sm rounded-xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-red-500/50"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          <span className="text-xs text-neutral-500 dark:text-neutral-400 shrink-0">
            {searchQuery.trim() ? (
              <span>Showing {filteredSegments.length} of {transcript.length} lines</span>
            ) : (
              <span>{transcript.length} lines indexed</span>
            )}
          </span>
        </div>

        {/* Scrollable Transcript List */}
        <div className="max-h-96 overflow-y-auto rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/40 p-3 sm:p-4 divide-y divide-neutral-200/50 dark:divide-neutral-800/60 space-y-0.5">
          {filteredSegments.length > 0 ? (
            filteredSegments.map((seg, idx) => (
              <div
                key={idx}
                className="py-2 px-2 rounded-lg hover:bg-white dark:hover:bg-neutral-900/60 transition-colors flex items-start gap-3 text-sm"
              >
                {seg.start !== undefined && (
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 shrink-0 select-none">
                    {formatTimestamp(seg.start)}
                  </span>
                )}
                <p className="text-neutral-800 dark:text-neutral-200 leading-relaxed break-words flex-1">
                  {renderHighlightedText(seg.text, searchQuery)}
                </p>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-sm text-neutral-500 dark:text-neutral-400">
              No transcript lines match "{searchQuery}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
