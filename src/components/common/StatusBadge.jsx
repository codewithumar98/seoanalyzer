import React from 'react';

/**
 * Consistent semantic status badge for SEO signals and metrics.
 * @param {'success'|'warning'|'danger'|'neutral'} variant
 * @param {string} text - Label text
 * @param {React.ReactNode} icon - Optional custom icon
 */
export default function StatusBadge({
  variant = 'neutral',
  text,
  icon,
  className = '',
}) {
  const variants = {
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/80',
    warning: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/80',
    danger: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/80',
    neutral: 'bg-neutral-100 text-neutral-700 border-neutral-200 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-800',
  };

  const defaultIcons = {
    success: (
      <svg className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
      </svg>
    ),
    warning: (
      <svg className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    danger: (
      <svg className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    neutral: null,
  };

  const appliedVariant = variants[variant] || variants.neutral;
  const currentIcon = icon !== undefined ? icon : defaultIcons[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${appliedVariant} ${className}`}
    >
      {currentIcon}
      <span>{text}</span>
    </span>
  );
}
