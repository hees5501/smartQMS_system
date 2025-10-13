import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Smart QMS',
  description: 'Smart Quality Management System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="bg-gray-50">
        {children}
      </body>
    </html>
  )
}
