import './globals.css'
import type { Metadata } from 'next'

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
      <body className="antialiased bg-gradient-to-br from-gray-900 via-slate-900 to-black min-h-screen">
        {children}
      </body>
    </html>
  )
}
