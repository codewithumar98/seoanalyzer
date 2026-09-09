import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import UrlInput from './components/analyzer/UrlInput';
import LoadingSkeleton from './components/analyzer/LoadingSkeleton';
import ResultsContainer from './components/results/ResultsContainer';
import FeaturesSection from './components/marketing/FeaturesSection';
import HowItWorksSection from './components/marketing/HowItWorksSection';
import FaqSection from './components/marketing/FaqSection';
import { analyzeYoutubeUrl, loadSampleAnalysis } from './lib/api/youtubeAnalyzer';

export default function App() {
  // Theme state
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  // Analyzer states
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const resultsRef = useRef(null);

  // Sync theme with DOM and localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleAnalyze = async (urlToAnalyze) => {
    setLoading(true);
    setError(null);

    const res = await analyzeYoutubeUrl(urlToAnalyze);

    setLoading(false);
    if (res.success && res.data) {
      setResult(res.data);
      setError(null);
      // Smooth scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      setError(res.error || 'Failed to analyze video. Please verify the URL.');
    }
  };

  const handleLoadSample = (type = 'full') => {
    setLoading(true);
    setError(null);

    // Simulate short natural loading state for UX
    setTimeout(() => {
      const sample = loadSampleAnalysis(type);
      setUrl(sample.video.url);
      setResult(sample);
      setLoading(false);

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }, 450);
  };

  const handleFocusInput = () => {
    const el = document.getElementById('analyzer');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      const input = el.querySelector('input');
      input?.focus();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors selection:bg-red-500 selection:text-white">
      {/* Skip to Content for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 z-50 px-4 py-2 bg-red-600 text-white rounded-lg font-medium shadow-md"
      >
        Skip to main content
      </a>

      {/* Header */}
      <Navbar
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onFocusInput={handleFocusInput}
      />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1">
        {/* Hero & Analyzer Input */}
        <UrlInput
          url={url}
          onChangeUrl={setUrl}
          onSubmit={handleAnalyze}
          onLoadSample={handleLoadSample}
          loading={loading}
          error={error}
        />

        {/* Loading Skeleton */}
        {loading && <LoadingSkeleton />}

        {/* Results Dashboard */}
        {!loading && result && (
          <div ref={resultsRef} id="results" className="scroll-mt-20">
            <ResultsContainer data={result} />
          </div>
        )}

        {/* Marketing / Explanatory Sections */}
        <FeaturesSection />
        <HowItWorksSection />
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
