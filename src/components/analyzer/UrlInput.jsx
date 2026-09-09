import React, { useState, useRef } from 'react';
import { validateAndParseYoutubeUrl } from '../../lib/utils/urlValidator';

/**
 * Hero URL Input component for submitting YouTube links.
 */
export default function UrlInput({
  url,
  onChangeUrl,
  onSubmit,
  onLoadSample,
  loading,
  error,
}) {
  const [localError, setLocalError] = useState(null);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (loading) return;

    const trimmed = (url || '').trim();
    if (!trimmed) {
      setLocalError('Please paste a YouTube URL to begin.');
      inputRef.current?.focus();
      return;
    }

    const validation = validateAndParseYoutubeUrl(trimmed);
    if (!validation.isValid) {
      setLocalError(validation.error);
      return;
    }

    setLocalError(null);
    onSubmit(trimmed);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const handlePasteClipboard = async () => {
    try {
      if (navigator.clipboard?.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          onChangeUrl(text.trim());
          setLocalError(null);
          inputRef.current?.focus();
        }
      }
    } catch {
      // Permission denied or not supported, user can paste with Ctrl+V
    }
  };

  const handleClear = () => {
    onChangeUrl('');
    setLocalError(null);
    inputRef.current?.focus();
  };

  const displayError = localError || error;

  return (
    <section id="analyzer" className="pt-10 pb-12 sm:pt-14 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/60 mb-5 shadow-xs">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        Professional Video SEO Inspection
      </div>

      {/* Main Hero Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-tight max-w-3xl mx-auto">
        YouTube Video <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-amber-600">SEO Analyzer</span>
      </h1>

      {/* Supporting Text */}
      <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed">
        Extract video metadata, inspect SEO signals, view tags, analyze descriptions, and get a clear overview of your YouTube video.
      </p>

      {/* Input Card Container */}
      <div className="mt-8 sm:mt-10 max-w-3xl mx-auto">
        <div className="p-2 sm:p-2.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl shadow-neutral-950/5 dark:shadow-black/40 transition-all focus-within:ring-2 focus-within:ring-red-500/30 focus-within:border-red-500/50">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-2">
            {/* Input Wrapper */}
            <div className="relative flex-1 flex items-center">
              <div className="absolute left-3.5 text-neutral-400 dark:text-neutral-500 pointer-events-none">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>

              <input
                ref={inputRef}
                type="text"
                value={url}
                onChange={(e) => {
                  onChangeUrl(e.target.value);
                  if (displayError) setLocalError(null);
                }}
                onKeyDown={handleKeyDown}
                disabled={loading}
                placeholder="https://www.youtube.com/watch?v=..."
                aria-label="YouTube Video URL"
                className="w-full pl-11 pr-20 py-3 sm:py-3.5 text-sm sm:text-base bg-transparent text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none disabled:opacity-50"
              />

              {/* Action buttons inside input */}
              <div className="absolute right-2 flex items-center gap-1">
                {url ? (
                  <button
                    type="button"
                    onClick={handleClear}
                    title="Clear input"
                    className="p-1.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handlePasteClipboard}
                    title="Paste from clipboard"
                    className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 rounded bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                  >
                    Paste
                  </button>
                )}
              </div>
            </div>

            {/* Analyze Button */}
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center px-6 py-3.5 text-sm sm:text-base font-semibold rounded-xl text-white bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:bg-red-600/70 disabled:cursor-not-allowed shadow-md shadow-red-600/20 transition-all focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 shrink-0 min-w-[140px]"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2.5 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Analyzing...</span>
                </>
              ) : (
                <span>Analyze Video</span>
              )}
            </button>
          </form>
        </div>

        {/* Error message presentation */}
        {displayError && (
          <div className="mt-3 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-left flex items-start gap-2.5 animate-in fade-in duration-200">
            <svg className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div className="flex-1">
              <p className="text-sm font-medium text-rose-800 dark:text-rose-200">
                {displayError}
              </p>
              <p className="text-xs text-rose-600 dark:text-rose-400 mt-0.5">
                Please verify the link format or choose a sample preview to evaluate the analyzer.
              </p>
            </div>
          </div>
        )}

        {/* Quick Sample Selector & Supported formats */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-1.5">
            <span>Supports:</span>
            <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-mono text-[11px]">
              watch?v=
            </code>
            <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-mono text-[11px]">
              youtu.be/
            </code>
            <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-mono text-[11px]">
              shorts/
            </code>
          </div>

          {/* Quick Demo Previews */}
          <div className="flex items-center gap-2">
            <span className="text-neutral-400 dark:text-neutral-500">Preview UI:</span>
            <button
              type="button"
              onClick={() => onLoadSample('full')}
              disabled={loading}
              className="px-2 py-1 rounded-md bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-red-500"
            >
              Sample Video
            </button>
            <button
              type="button"
              onClick={() => onLoadSample('partial')}
              disabled={loading}
              className="px-2 py-1 rounded-md bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-red-500"
            >
              Partial Data
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
