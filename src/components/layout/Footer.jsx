import React from 'react';

/**
 * Clean SaaS footer with disclaimer and quick links.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 transition-colors mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center text-white">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </div>
              <span className="font-bold text-neutral-900 dark:text-white">
                YouTube Video SEO Analyzer
              </span>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md leading-relaxed">
              Extract video metadata, inspect SEO signals, view tags, analyze descriptions, and inspect transcripts to evaluate video discoverability in one place.
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-500">
              Disclaimer: This utility provides analysis based on publicly available video metadata. It does not predict or guarantee views, click-through rates, or search ranking. Not affiliated with, sponsored by, or endorsed by YouTube or Google LLC.
            </p>
          </div>

          {/* Navigation links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-white mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
              <li>
                <a href="#analyzer" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">
                  Video Analyzer
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">
                  Key Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Inspection signals */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-white mb-3">
              Inspected Signals
            </h4>
            <ul className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
              <li>Title character count &amp; intent</li>
              <li>Description structure &amp; links</li>
              <li>Keyword tags &amp; density</li>
              <li>Transcript captions presence</li>
              <li>High-res thumbnail preview</li>
              <li>Canonical &amp; video metadata</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-500">
          <p>© {currentYear} YouTube Video SEO Analyzer. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Client-side Privacy: No video logs stored</span>
            <span>Fast &amp; Free</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
