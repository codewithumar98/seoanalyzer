import React, { useState } from 'react';

/**
 * Main application header with brand, navigation links, theme toggle, and mobile menu.
 */
export default function Navbar({ theme, onToggleTheme, onFocusInput }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (anchorId) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(anchorId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCtaClick = () => {
    setMobileMenuOpen(false);
    if (onFocusInput) {
      onFocusInput();
    } else {
      handleNavClick('analyzer');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200/80 dark:border-neutral-800/80 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <a
              href="#analyzer"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('analyzer');
              }}
              className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-red-500/50 rounded-lg p-1"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center text-white shadow-sm shadow-red-500/20 group-hover:scale-105 transition-transform">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-base font-bold tracking-tight text-neutral-900 dark:text-white leading-none">
                  SEO<span className="text-red-600 dark:text-red-500">Analyzer</span>
                </span>
                <span className="text-[10px] font-medium tracking-wider text-neutral-500 dark:text-neutral-400 uppercase mt-0.5">
                  YouTube Inspector
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600 dark:text-neutral-300">
            <button
              type="button"
              onClick={() => handleNavClick('analyzer')}
              className="hover:text-red-600 dark:hover:text-red-400 transition-colors focus:outline-none focus:underline"
            >
              Analyzer
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('features')}
              className="hover:text-red-600 dark:hover:text-red-400 transition-colors focus:outline-none focus:underline"
            >
              Features
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('how-it-works')}
              className="hover:text-red-600 dark:hover:text-red-400 transition-colors focus:outline-none focus:underline"
            >
              How It Works
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('faq')}
              className="hover:text-red-600 dark:hover:text-red-400 transition-colors focus:outline-none focus:underline"
            >
              FAQ
            </button>
          </nav>

          {/* Right Actions: Theme Toggle & CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={onToggleTheme}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2 rounded-xl text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/50"
            >
              {theme === 'dark' ? (
                // Sun Icon
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                // Moon Icon
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <button
              type="button"
              onClick={handleCtaClick}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-xl text-white bg-red-600 hover:bg-red-700 active:bg-red-800 shadow-xs shadow-red-600/20 transition-all focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-950"
            >
              Analyze Video
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-1.5">
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
              className="p-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-red-500/50"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-200 dark:border-neutral-800 bg-white/98 dark:bg-neutral-950/98 px-4 pt-3 pb-5 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
          <button
            type="button"
            onClick={() => handleNavClick('analyzer')}
            className="w-full text-left py-2 px-3 rounded-lg text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900"
          >
            Analyzer
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('features')}
            className="w-full text-left py-2 px-3 rounded-lg text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900"
          >
            Features
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('how-it-works')}
            className="w-full text-left py-2 px-3 rounded-lg text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900"
          >
            How It Works
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('faq')}
            className="w-full text-left py-2 px-3 rounded-lg text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900"
          >
            FAQ
          </button>
          <div className="pt-2">
            <button
              type="button"
              onClick={handleCtaClick}
              className="w-full py-2.5 text-center text-sm font-semibold rounded-xl text-white bg-red-600 hover:bg-red-700 active:bg-red-800"
            >
              Analyze Video
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
