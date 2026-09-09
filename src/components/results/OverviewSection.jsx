import React from 'react';
import StatCard from '../common/StatCard';
import StatusBadge from '../common/StatusBadge';
import CopyButton from '../common/CopyButton';
import { formatDate, formatDuration, formatCompactNumber, countWords } from '../../lib/utils/formatters';

/**
 * Overview section showing high-level stats, signal checklist, and at-a-glance health.
 */
export default function OverviewSection({ data, onSelectTab }) {
  const { video, thumbnail, tags, transcript, seo, description } = data;

  const descWordCount = countWords(description);
  const descCharCount = description?.length || 0;
  const tagCount = tags?.length || 0;
  const hasTranscript = Boolean(transcript && transcript.length > 0);

  // Quick summary signals
  const summarySignals = [
    {
      label: 'SEO Health',
      status: seo.score >= 80 ? 'Good' : seo.score >= 50 ? 'Needs Attention' : 'Needs Optimization',
      variant: seo.score >= 80 ? 'success' : seo.score >= 50 ? 'warning' : 'danger',
      tab: 'seo',
    },
    {
      label: 'Title Optimization',
      status: video.title?.length >= 40 && video.title?.length <= 70 ? 'Optimal (40-70 chars)' : `${video.title?.length || 0} characters`,
      variant: video.title?.length >= 30 ? 'success' : 'warning',
      tab: 'title',
    },
    {
      label: 'Description Depth',
      status: descCharCount > 250 ? `${descWordCount} words` : descCharCount > 0 ? 'Brief (< 250 chars)' : 'Missing',
      variant: descCharCount > 250 ? 'success' : descCharCount > 0 ? 'warning' : 'danger',
      tab: 'description',
    },
    {
      label: 'Tags / Keywords',
      status: tagCount > 0 ? `${tagCount} tags found` : 'No tags found',
      variant: tagCount >= 5 ? 'success' : tagCount > 0 ? 'warning' : 'danger',
      tab: 'tags',
    },
    {
      label: 'Captions / Transcript',
      status: hasTranscript ? `${transcript.length} lines available` : 'Unavailable',
      variant: hasTranscript ? 'success' : 'neutral',
      tab: 'transcript',
    },
    {
      label: 'High-Res Thumbnail',
      status: thumbnail?.url ? 'Available (16:9)' : 'Unavailable',
      variant: thumbnail?.url ? 'success' : 'danger',
      tab: 'thumbnail',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Stat Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <StatCard
          title="SEO Health"
          value={seo.score !== null ? `${seo.score}/100` : 'N/A'}
          subtext={seo.label || 'Estimated score'}
          badge={
            <StatusBadge
              variant={seo.score >= 80 ? 'success' : seo.score >= 50 ? 'warning' : 'danger'}
              text={seo.score >= 80 ? 'Good' : 'Needs Work'}
            />
          }
        />

        <StatCard
          title="Duration"
          value={formatDuration(video.duration)}
          subtext={video.category || 'Video category'}
        />

        <StatCard
          title="Tags Found"
          value={tagCount}
          subtext={tagCount > 0 ? 'Keywords extracted' : 'No tags'}
          badge={
            <StatusBadge
              variant={tagCount > 0 ? 'success' : 'warning'}
              text={tagCount > 0 ? 'Detected' : 'None'}
            />
          }
        />

        <StatCard
          title="Description"
          value={`${descWordCount} w`}
          subtext={`${descCharCount} characters`}
        />

        <StatCard
          title="Transcript"
          value={hasTranscript ? 'Available' : 'None'}
          subtext={hasTranscript ? `${transcript.length} segments` : 'No captions'}
          badge={
            <StatusBadge
              variant={hasTranscript ? 'success' : 'neutral'}
              text={hasTranscript ? 'Found' : 'Unavailable'}
            />
          }
        />

        <StatCard
          title="Views"
          value={video.viewCount ? formatCompactNumber(video.viewCount) : '—'}
          subtext={video.likeCount ? `${formatCompactNumber(video.likeCount)} likes` : 'Metadata'}
        />
      </div>

      {/* Main Overview Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Video Quick Card */}
        <div className="lg:col-span-7 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between gap-3 border-b border-neutral-100 dark:border-neutral-800 pb-3">
            <h3 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
              Video Summary
            </h3>
            <CopyButton
              text={video.title}
              label="Copy Title"
              size="sm"
            />
          </div>

          <div>
            <h4 className="text-lg font-bold text-neutral-900 dark:text-white leading-snug break-words">
              {video.title}
            </h4>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-neutral-500 dark:text-neutral-400">
              <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                Channel: {video.channel}
              </span>
              <span>•</span>
              <span>Published: {formatDate(video.publishedAt)}</span>
              <span>•</span>
              <span>Category: {video.category}</span>
            </div>
          </div>

          {/* Description Preview Snippet */}
          <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
              <span>Description Excerpt</span>
              <button
                type="button"
                onClick={() => onSelectTab('description')}
                className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium normal-case"
              >
                View full description →
              </button>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 line-clamp-3 leading-relaxed whitespace-pre-line">
              {description || 'No description provided for this video.'}
            </p>
          </div>

          {/* Top Tags Snippet */}
          {tagCount > 0 && (
            <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
                <span>Top Tags ({tagCount})</span>
                <button
                  type="button"
                  onClick={() => onSelectTab('tags')}
                  className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium normal-case"
                >
                  View all tags →
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {tags.slice(0, 8).map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                  >
                    #{tag}
                  </span>
                ))}
                {tagCount > 8 && (
                  <span className="px-2 py-1 text-xs text-neutral-500 dark:text-neutral-400">
                    +{tagCount - 8} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right: Quick Signal Checklist */}
        <div className="lg:col-span-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-3 border-b border-neutral-100 dark:border-neutral-800 pb-3 mb-4">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-neutral-600 dark:text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                SEO Signals Checklist
              </h3>
              <button
                type="button"
                onClick={() => onSelectTab('seo')}
                className="text-xs font-semibold text-red-600 dark:text-red-400 hover:underline"
              >
                Deep SEO Analysis →
              </button>
            </div>

            <div className="space-y-3">
              {summarySignals.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => onSelectTab(item.tab)}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800/60 transition-colors cursor-pointer group"
                >
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                    {item.label}
                  </span>
                  <StatusBadge
                    variant={item.variant}
                    text={item.status}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-500 dark:text-neutral-400">
            Note: Signals are evaluated from publicly accessible video metadata.
          </div>
        </div>
      </div>
    </div>
  );
}
