import React from 'react';

/**
 * Compact StatCard for video overview metrics.
 */
export default function StatCard({
  title,
  value,
  subtext,
  icon,
  badge,
  className = '',
}) {
  return (
    <div
      className={`p-4 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900/70 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors ${className}`}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          {title}
        </span>
        {icon && (
          <span className="text-neutral-400 dark:text-neutral-500">
            {icon}
          </span>
        )}
      </div>
      <div className="flex items-baseline justify-between gap-2">
        <div className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white tracking-tight truncate">
          {value ?? '—'}
        </div>
        {badge && <div className="shrink-0">{badge}</div>}
      </div>
      {subtext && (
        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400 truncate">
          {subtext}
        </p>
      )}
    </div>
  );
}
