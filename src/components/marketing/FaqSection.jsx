import React, { useState } from 'react';

/**
 * Accessible FAQ accordion addressing creator questions and realistic SEO expectations.
 */
export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'How is the SEO Health Score calculated?',
      a: 'The SEO Health Score is an analytical estimate computed from key public signals: title length and clarity, description depth and chapter structure, keyword tag presence, caption availability, and metadata completeness. It is an educational tool and not an official YouTube or Google metric.',
    },
    {
      q: 'Do tags guarantee video ranking or viral views?',
      a: 'No. YouTube has stated that tags play a secondary role compared to title clarity, thumbnail click-through rate (CTR), audience retention, and watch time. However, well-chosen tags help the algorithm categorize content and catch common spelling variations.',
    },
    {
      q: 'Why is the transcript sometimes unavailable for a video?',
      a: 'Transcripts rely on accessible closed-caption tracks provided by YouTube. If a creator explicitly disabled closed captions, if the video was recently published and automated speech-to-text is still processing, or if captions are restricted by region/language, the transcript will show as unavailable.',
    },
    {
      q: 'What makes an optimal YouTube video title?',
      a: 'Titles between 40 to 70 characters are typically ideal because they avoid truncation across mobile devices and search result cards. Great titles front-load core keywords while sparking viewer curiosity without resorting to misleading clickbait.',
    },
    {
      q: 'Is my data or video search query stored?',
      a: 'No. All video analyses are performed per-request and no user query logs, browsing histories, or personal data are stored or shared.',
    },
    {
      q: 'Does this tool support YouTube Shorts and embedded links?',
      a: 'Yes. The analyzer parses standard watch URLs (youtube.com/watch?v=...), shortened share links (youtu.be/...), Shorts URLs (youtube.com/shorts/...), and embed URLs.',
    },
  ];

  return (
    <section id="faq" className="py-16 sm:py-20 border-t border-neutral-200/80 dark:border-neutral-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-500">
            Common Questions
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
            Clear answers about YouTube metadata inspection, SEO signals, and transcripts.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  aria-expanded={isOpen}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                >
                  <span className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">
                    {faq.q}
                  </span>
                  <span className="p-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-500 shrink-0">
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed border-t border-neutral-100 dark:border-neutral-800/60 pt-3 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
