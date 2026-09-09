import React, { useState } from 'react';
import StatusBadge from '../common/StatusBadge';
import EmptyState from '../common/EmptyState';

/**
 * Visual SEO Health Card, category score breakdowns, and actionable SEO issues.
 */
export default function SeoSection({ seo, video, tags, description, transcript }) {
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'passed' | 'attention' | 'problem'

  const score = seo?.score ?? null;
  const issues = Array.isArray(seo?.issues) ? seo.issues : [];

  const passedCount = issues.filter(i => i.severity === 'success' || i.status === 'passed').length;
  const attentionCount = issues.filter(i => i.severity === 'warning' || i.status === 'attention').length;
  const problemCount = issues.filter(i => i.severity === 'danger' || i.status === 'problem').length;

  const filteredIssues = issues.filter(issue => {
    if (activeFilter === 'passed') return issue.severity === 'success' || issue.status === 'passed';
    if (activeFilter === 'attention') return issue.severity === 'warning' || issue.status === 'attention';
    if (activeFilter === 'problem') return issue.severity === 'danger' || issue.status === 'problem';
    return true;
  });

  // Calculate circular stroke offset
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = score !== null
    ? circumference - (score / 100) * circumference
    : circumference;

  const getScoreColorClass = (s) => {
    if (s === null) return 'text-neutral-500 stroke-neutral-300 dark:stroke-neutral-700';
    if (s >= 80) return 'text-emerald-600 dark:text-emerald-400 stroke-emerald-500';
    if (s >= 50) return 'text-amber-600 dark:text-amber-400 stroke-amber-500';
    return 'text-rose-600 dark:text-rose-400 stroke-rose-500';
  };

  return (
    <div className="space-y-8">
      {/* Top Header & Disclaimer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-neutral-100/80 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-neutral-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>
            <strong>SEO Health Score:</strong> Estimated based on publicly available metadata and metadata optimization guidelines.
          </span>
        </div>
        <span className="shrink-0 text-neutral-500 font-medium">
          Not an official YouTube metric
        </span>
      </div>

      {/* Main Score & Category Breakdown Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left: Circular Score Gauge */}
        <div className="md:col-span-4 flex flex-col items-center justify-center text-center">
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
              {/* Background circle */}
              <circle
                cx="70"
                cy="70"
                r={radius}
                className="stroke-neutral-200 dark:stroke-neutral-800 fill-none"
                strokeWidth="10"
              />
              {/* Progress circle */}
              <circle
                cx="70"
                cy="70"
                r={radius}
                className={`fill-none transition-all duration-1000 ease-out ${getScoreColorClass(score)}`}
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white tracking-tight">
                {score !== null ? score : '—'}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                out of 100
              </span>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">
              SEO Health Score
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              {seo?.label || (score >= 80 ? 'Well Optimized' : score >= 50 ? 'Needs Attention' : 'Needs Work')}
            </p>
          </div>
        </div>

        {/* Right: Category Breakdown Bars */}
        <div className="md:col-span-8 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
            Category Optimization Breakdown
          </h4>

          {seo?.categories ? (
            <div className="space-y-3">
              {Object.entries(seo.categories).map(([key, item]) => {
                const catScore = typeof item === 'object' ? item.score : item;
                const catMax = typeof item === 'object' ? (item.max || 100) : 100;
                const pct = Math.min(100, Math.round((catScore / catMax) * 100));
                const catLabel = typeof item === 'object' ? item.label : null;

                return (
                  <div key={key} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="capitalize text-neutral-800 dark:text-neutral-200">
                        {key}
                      </span>
                      <span className="text-neutral-600 dark:text-neutral-400">
                        {catLabel ? `${catLabel} • ` : ''}{catScore}/{catMax}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          pct >= 80 ? 'bg-emerald-500' : pct >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 text-xs text-neutral-600 dark:text-neutral-400">
              <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/60">
                <span className="font-semibold block text-neutral-900 dark:text-white">Title Assessment</span>
                <span>{video.title?.length || 0} characters</span>
              </div>
              <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/60">
                <span className="font-semibold block text-neutral-900 dark:text-white">Description Depth</span>
                <span>{description?.length || 0} characters</span>
              </div>
              <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/60">
                <span className="font-semibold block text-neutral-900 dark:text-white">Tags Count</span>
                <span>{tags?.length || 0} tags extracted</span>
              </div>
              <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/60">
                <span className="font-semibold block text-neutral-900 dark:text-white">Captions / Transcript</span>
                <span>{transcript && transcript.length > 0 ? 'Available' : 'Unavailable'}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SEO Issues / Findings List */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">
              Actionable SEO Signals &amp; Findings
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Review specific signals detected from this video's metadata
            </p>
          </div>

          {/* Issue Filters */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800 self-start sm:self-auto text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                activeFilter === 'all'
                  ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              All ({issues.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('passed')}
              className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 ${
                activeFilter === 'passed'
                  ? 'bg-white dark:bg-neutral-900 text-emerald-700 dark:text-emerald-400 shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Passed ({passedCount})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('attention')}
              className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 ${
                activeFilter === 'attention'
                  ? 'bg-white dark:bg-neutral-900 text-amber-700 dark:text-amber-400 shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Attention ({attentionCount})
            </button>
            {problemCount > 0 && (
              <button
                type="button"
                onClick={() => setActiveFilter('problem')}
                className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 ${
                  activeFilter === 'problem'
                    ? 'bg-white dark:bg-neutral-900 text-rose-700 dark:text-rose-400 shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                Problem ({problemCount})
              </button>
            )}
          </div>
        </div>

        {/* Issue Cards */}
        {filteredIssues.length > 0 ? (
          <div className="space-y-3">
            {filteredIssues.map((issue) => {
              const isSuccess = issue.severity === 'success' || issue.status === 'passed';
              const isWarning = issue.severity === 'warning' || issue.status === 'attention';
              const isDanger = issue.severity === 'danger' || issue.status === 'problem';

              return (
                <div
                  key={issue.id}
                  className={`p-4 rounded-xl border transition-all flex items-start gap-3.5 ${
                    isSuccess
                      ? 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800'
                      : isWarning
                      ? 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-200/80 dark:border-amber-900/50'
                      : 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-200/80 dark:border-rose-900/50'
                  }`}
                >
                  <div className="shrink-0 mt-0.5">
                    {isSuccess && (
                      <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                    {isWarning && (
                      <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-amber-600 dark:text-amber-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                    )}
                    {isDanger && (
                      <div className="w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-950 flex items-center justify-center text-rose-600 dark:text-rose-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
                        {issue.title}
                      </h4>
                      <StatusBadge
                        variant={isSuccess ? 'success' : isWarning ? 'warning' : 'danger'}
                        text={isSuccess ? 'Passed' : isWarning ? 'Needs Attention' : 'Issue'}
                      />
                    </div>
                    {issue.description && (
                      <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {issue.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState
            title="No issues in this filter"
            description="Select another filter above to view passed or attention items."
          />
        )}
      </div>
    </div>
  );
}
