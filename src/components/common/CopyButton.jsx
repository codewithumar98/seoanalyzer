import React, { useState } from 'react';
import { copyToClipboard } from '../../lib/utils/clipboard';

/**
 * Reusable CopyButton with feedback and accessibility.
 * @param {string} text - Content to copy
 * @param {string} label - Button text label (optional)
 * @param {string} title - Accessible tooltip title
 * @param {string} className - Additional CSS classes
 * @param {string} size - 'sm' | 'md'
 */
export default function CopyButton({
  text,
  label = 'Copy',
  title = 'Copy to clipboard',
  className = '',
  size = 'md',
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.stopPropagation();
    if (!text) return;
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isSmall = size === 'sm';

  return (
    <button
      type="button"
      onClick={handleCopy}
      disabled={!text}
      title={title}
      aria-label={copied ? 'Copied to clipboard' : title}
      className={`inline-flex items-center gap-1.5 font-medium rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-red-500/50 disabled:opacity-40 disabled:cursor-not-allowed ${
        copied
          ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800'
          : 'bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-300 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700 shadow-xs'
      } ${isSmall ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-xs sm:text-sm'} ${className}`}
    >
      {copied ? (
        <>
          <svg className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          <span>Copied!</span>
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          {label && <span>{label}</span>}
        </>
      )}
    </button>
  );
}
