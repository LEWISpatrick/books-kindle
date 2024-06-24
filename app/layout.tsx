import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ui/theme-provider'
import { Navbar } from '@/components/navbar'
import { ToastProvider } from '@/components/providers/toaster-provider'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import { AlertDemo } from '@/components/alert'
import { Footer } from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'bookskindle',
  description: 'The best Place to get your Kindle Books'
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ToastProvider />
            <AlertDemo />
            <Navbar />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  )
}
