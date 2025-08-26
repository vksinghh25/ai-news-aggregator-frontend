'use client';

import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 p-3 bg-white/10 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-white/20 dark:border-gray-700 hover:bg-white/20 dark:hover:bg-gray-700 transition-all duration-200 shadow-lg"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        // Sun icon for light mode
        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} stroke="currentColor" fill="none" />
        </svg>
      ) : (
        // Moon icon for dark mode  
        <svg className="w-5 h-5 text-slate-700 dark:text-slate-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  );
}