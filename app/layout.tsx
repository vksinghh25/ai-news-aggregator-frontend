import './globals.css'

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
