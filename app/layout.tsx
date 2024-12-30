"use client"; // This makes the component a Client Component

import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}

// Move metadata to a separate file or define it in a Server Component 