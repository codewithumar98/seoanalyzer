import React from 'react';

/**
 * 3-step walkthrough explaining the analyzer process.
 */
export default function HowItWorksSection() {
  const steps = [
    {
      step: '01',
      title: 'Paste Any YouTube URL',
      description: 'Copy a link from standard YouTube videos, mobile shorts, or embedded players and submit with one click.',
    },
    {
      step: '02',
      title: 'Deep Metadata Extraction',
      description: 'The analyzer inspects available title parameters, description copy, hidden keyword tags, high-resolution thumbnail assets, and closed captions.',
    },
    {
      step: '03',
      title: 'Actionable SEO Signals & Export',
      description: 'Review the SEO Health Score, inspect passed or attention-flagged signals, copy tags, search transcripts, or export the report.',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-20 border-t border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-500">
            Simple Process
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            How It Works in 3 Quick Steps
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
            Instant insights without browser extensions or software downloads.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="relative p-6 sm:p-7 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-3"
            >
              <span className="text-3xl sm:text-4xl font-black text-red-600/30 dark:text-red-500/30 select-none block font-mono">
                {item.step}
              </span>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
