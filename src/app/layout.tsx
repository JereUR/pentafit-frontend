'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import AuthContextProvider from '@/components/context/AuthContext'
import NavBar from '@/components/NavBar'
import { usePathname } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const shouldRenderLayout = !['/reestablecer'].includes(pathname)

  return (
    <html lang="en">
      <body className={inter.className}>
        {shouldRenderLayout ? (
          <AuthContextProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <NavBar />
              {children}
            </ThemeProvider>
          </AuthContextProvider>
        ) : (
          <>{children}</>
        )}
      </body>
    </html>
  )
}
