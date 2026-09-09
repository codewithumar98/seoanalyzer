import React from 'react';

/**
 * Professional, calm empty state for missing or partial fields.
 */
export default function EmptyState({
  title = 'No data available',
  description = 'This information was not provided or could not be found for this video.',
  icon,
  action,
  className = '',
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30 ${className}`}
    >
      <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400 dark:text-neutral-500 mb-3.5">
        {icon || (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </div>
      <h3 className="text-base font-semibold text-neutral-800 dark:text-neutral-200">
        {title}
      </h3>
      {description && (
        <p className="mt-1.5 max-w-md text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
          {description}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
