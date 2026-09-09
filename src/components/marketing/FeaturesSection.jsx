import React from 'react';

/**
 * Key Features presentation highlighting the core analytical tools.
 */
export default function FeaturesSection() {
  const features = [
    {
      title: 'SEO Health & Signal Breakdown',
      description: 'Review title lengths, description depths, keyword tag density, and chapter structure against YouTube discoverability guidelines.',
      icon: (
        <svg className="w-6 h-6 text-red-600 dark:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      title: 'Keyword & Tag Extraction',
      description: 'Instantly view hidden video tags, copy all tags as a comma-separated list, or copy individual tags with a single click.',
      icon: (
        <svg className="w-6 h-6 text-red-600 dark:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
    },
    {
      title: 'Searchable Transcript Viewer',
      description: 'Search spoken keywords across timestamped captions, copy text segments, or download the entire transcript as a text file.',
      icon: (
        <svg className="w-6 h-6 text-red-600 dark:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      title: 'High-Res Thumbnail Inspector',
      description: 'Inspect full-resolution widescreen thumbnails, check dimension ratios, download directly, or view in an isolated tab.',
      icon: (
        <svg className="w-6 h-6 text-red-600 dark:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'Description & Link Analyzer',
      description: 'Examine complete description copy, count words and characters, and inspect external resource links and timestamps.',
      icon: (
        <svg className="w-6 h-6 text-red-600 dark:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      ),
    },
    {
      title: 'Technical Metadata & Export',
      description: 'Access canonical URLs, channel identifiers, embed codes, publish dates, and export full analysis as structured JSON.',
      icon: (
        <svg className="w-6 h-6 text-red-600 dark:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
  ];

  return (
    <section id="features" className="py-16 sm:py-20 border-t border-neutral-200/80 dark:border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-500">
            Comprehensive Capabilities
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Everything You Need to Audit YouTube Videos
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
            No bloated setups or paid API keys required. Inspect all available public metadata in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-900/50 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
