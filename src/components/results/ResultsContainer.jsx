import React, { useState } from 'react';
import OverviewSection from './OverviewSection';
import SeoSection from './SeoSection';
import TitleSection from './TitleSection';
import DescriptionSection from './DescriptionSection';
import TagsSection from './TagsSection';
import TranscriptSection from './TranscriptSection';
import ThumbnailSection from './ThumbnailSection';
import MetadataSection from './MetadataSection';
import CopyButton from '../common/CopyButton';
import StatusBadge from '../common/StatusBadge';
import { downloadTextFile } from '../../lib/utils/download';

/**
 * Top-level results dashboard housing top overview banner, responsive tab navigation, and section views.
 */
export default function ResultsContainer({ data }) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!data) return null;

  const { video, thumbnail, tags, transcript, seo, description, metadata } = data;
  const tagCount = tags?.length || 0;
  const hasTranscript = Boolean(transcript && transcript.length > 0);

  // Tabs configuration with badges
  const tabs = [
    { id: 'overview', label: 'Overview', badge: null },
    {
      id: 'seo',
      label: 'SEO Health',
      badge: seo.score !== null ? `${seo.score}/100` : null,
      badgeVariant: seo.score >= 80 ? 'success' : seo.score >= 50 ? 'warning' : 'danger',
    },
    { id: 'title', label: 'Title', badge: `${video.title?.length || 0}c` },
    { id: 'description', label: 'Description', badge: `${description?.length || 0}c` },
    { id: 'tags', label: 'Tags', badge: tagCount > 0 ? String(tagCount) : '0' },
    {
      id: 'transcript',
      label: 'Transcript',
      badge: hasTranscript ? 'Available' : 'None',
      badgeVariant: hasTranscript ? 'success' : 'neutral',
    },
    { id: 'thumbnail', label: 'Thumbnail', badge: '16:9' },
    { id: 'metadata', label: 'Metadata', badge: null },
  ];

  // Full summary text for "Copy All"
  const fullSummaryReport = [
    `TITLE: ${video.title}`,
    `URL: ${video.url}`,
    `CHANNEL: ${video.channel} (${video.channelId || 'N/A'})`,
    `PUBLISHED: ${video.publishedAt}`,
    `DURATION: ${video.duration}`,
    `CATEGORY: ${video.category}`,
    `SEO HEALTH SCORE: ${seo.score}/100 (${seo.label})`,
    `TAGS (${tagCount}): ${tags.join(', ')}`,
    `\nDESCRIPTION:\n${description}`,
    hasTranscript ? `\nTRANSCRIPT:\n${transcript.map(t => `[${t.start}s] ${t.text}`).join('\n')}` : '\nTRANSCRIPT: Unavailable',
  ].join('\n\n');

  const handleDownloadReport = () => {
    const cleanId = video.id || 'video';
    const jsonStr = JSON.stringify(data, null, 2);
    downloadTextFile(jsonStr, `seo_analysis_${cleanId}.json`, 'application/json;charset=utf-8');
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Banner Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          {/* Left Thumbnail + Basic Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1 min-w-0">
            {/* Small Thumbnail Preview */}
            <div className="relative w-full sm:w-44 aspect-video rounded-xl overflow-hidden bg-neutral-900 shrink-0 border border-neutral-200 dark:border-neutral-800 shadow-xs">
              <img
                src={thumbnail.url}
                alt={video.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-mono text-white font-semibold">
                {video.duration ? String(video.duration).replace('PT', '').toLowerCase() : 'HD'}
              </span>
            </div>

            {/* Title & Metadata */}
            <div className="space-y-1.5 min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-red-600 dark:text-red-500 uppercase tracking-wider">
                  {video.category || 'YouTube Video'}
                </span>
                <span className="text-neutral-300 dark:text-neutral-700">•</span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                  ID: {video.id}
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white leading-tight line-clamp-2">
                {video.title}
              </h2>

              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5 truncate">
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">{video.channel}</span>
                <span>•</span>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-600 dark:hover:text-red-400 hover:underline inline-flex items-center gap-1"
                >
                  <span>Watch on YouTube</span>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </p>
            </div>
          </div>

          {/* Right: SEO Health Score Pill & Export Actions */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-neutral-100 dark:border-neutral-800 justify-between md:justify-end">
            {/* Score Pill */}
            <div
              onClick={() => setActiveTab('seo')}
              className="flex items-center gap-3 px-4 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 cursor-pointer hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors"
            >
              <div className="text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block">
                  SEO Health
                </span>
                <span className="text-xl font-black text-neutral-900 dark:text-white">
                  {seo.score !== null ? `${seo.score}/100` : '—'}
                </span>
              </div>
              <StatusBadge
                variant={seo.score >= 80 ? 'success' : seo.score >= 50 ? 'warning' : 'danger'}
                text={seo.label || 'Estimated'}
              />
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <CopyButton
                text={fullSummaryReport}
                label="Copy All"
                title="Copy complete structured report to clipboard"
              />

              <button
                type="button"
                onClick={handleDownloadReport}
                title="Export complete analysis data as JSON"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg text-neutral-700 bg-white hover:bg-neutral-100 border border-neutral-300 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700 shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/50"
              >
                <svg className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Export JSON</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation (Horizontally Scrollable on Mobile) */}
      <div className="border-b border-neutral-200 dark:border-neutral-800">
        <nav
          className="flex space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar pb-px"
          aria-label="Result Sections"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold rounded-t-xl transition-all whitespace-nowrap flex items-center gap-2 border-b-2 focus:outline-none ${
                  isActive
                    ? 'border-red-600 text-red-600 dark:text-red-500 bg-red-50/50 dark:bg-red-950/20'
                    : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-300 dark:hover:border-neutral-700'
                }`}
              >
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive
                        ? 'bg-red-600 text-white dark:bg-red-500'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Panels */}
      <div className="pt-2 animate-in fade-in duration-150">
        {activeTab === 'overview' && (
          <OverviewSection data={data} onSelectTab={setActiveTab} />
        )}
        {activeTab === 'seo' && (
          <SeoSection
            seo={seo}
            video={video}
            tags={tags}
            description={description}
            transcript={transcript}
          />
        )}
        {activeTab === 'title' && (
          <TitleSection title={data.title} video={video} seo={seo} />
        )}
        {activeTab === 'description' && (
          <DescriptionSection description={description} video={video} />
        )}
        {activeTab === 'tags' && (
          <TagsSection tags={tags} />
        )}
        {activeTab === 'transcript' && (
          <TranscriptSection transcript={transcript} video={video} />
        )}
        {activeTab === 'thumbnail' && (
          <ThumbnailSection thumbnail={thumbnail} video={video} />
        )}
        {activeTab === 'metadata' && (
          <MetadataSection metadata={metadata} video={video} />
        )}
      </div>
    </section>
  );
}
