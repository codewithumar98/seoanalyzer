import React from 'react';

/**
 * Lightweight, non-blocking skeleton loader displayed during video analysis.
 */
export default function LoadingSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse space-y-6">
      {/* Loading message */}
      <div className="flex items-center justify-center gap-3 p-4 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300">
        <svg className="w-5 h-5 animate-spin text-red-600 dark:text-red-500" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <span className="text-sm font-semibold">
          Analyzing YouTube video metadata, SEO signals, tags &amp; transcript...
        </span>
      </div>

      {/* Hero Overview Skeleton */}
      <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Thumbnail placeholder */}
        <div className="md:col-span-4 aspect-video rounded-xl bg-neutral-200 dark:bg-neutral-800" />
        {/* Info placeholders */}
        <div className="md:col-span-8 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="h-6 w-3/4 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
            <div className="h-4 w-1/2 rounded bg-neutral-200 dark:bg-neutral-800" />
            <div className="h-3.5 w-1/3 rounded bg-neutral-200 dark:bg-neutral-800" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-800">
            <div className="h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800" />
            <div className="h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800" />
            <div className="h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800" />
            <div className="h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800" />
          </div>
        </div>
      </div>

      {/* Tabs placeholder */}
      <div className="flex gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-2">
        <div className="h-9 w-24 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-9 w-24 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-9 w-20 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-9 w-24 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-9 w-20 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
      </div>

      {/* Body placeholders (Score + Issues + Tags + Transcript) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 h-64 space-y-4">
          <div className="h-5 w-1/2 rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-24 w-24 mx-auto rounded-full bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-4 w-3/4 mx-auto rounded bg-neutral-200 dark:bg-neutral-800" />
        </div>
        <div className="md:col-span-2 p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3">
          <div className="h-5 w-1/3 rounded bg-neutral-200 dark:bg-neutral-800 mb-4" />
          <div className="h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800" />
          <div className="h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800" />
          <div className="h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800" />
        </div>
      </div>
    </div>
  );
}
