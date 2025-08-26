'use client';

import { useTheme } from '../contexts/ThemeContext';

interface ThemeToggleProps {
  hideNavToggle: boolean;
}

export default function ThemeToggle({ hideNavToggle }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`fixed top-24 right-4 z-40 p-2 bg-white border-2 border-gray-200 hover:bg-gray-50 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white rounded-lg dark:border-gray-700 shadow-lg transition-all duration-200 ${hideNavToggle ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
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