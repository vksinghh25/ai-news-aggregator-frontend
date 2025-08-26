import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from './contexts/ThemeContext'

export const metadata: Metadata = {
  title: 'AI News Digest | Daily AI News Analysis',
  description: 'Cut through the AI noise. Get the stories that actually matter, analyzed and ranked by AI.',
  keywords: 'AI news, artificial intelligence, tech news, AI analysis, daily digest',
  authors: [{ name: 'AI News Digest' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 dark:from-gray-900 dark:via-slate-900 dark:to-black min-h-screen transition-colors duration-300">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
