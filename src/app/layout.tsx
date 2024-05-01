'use client'

import { Inter } from 'next/font/google'
import './globals.css'

import { ThemeProvider } from '@/components/providers/ThemeProvider'
import AuthContextProvider from '@/components/context/AuthContext'
import NavBar from '@/components/NavBar'
import SideBar from '@/components/dashboard/sidebar/SideBar'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const isServerSide = typeof window === 'undefined'

  const shouldRenderLayout =
    !isServerSide &&
    ![...[...document.location.pathname.split('/')].slice(1)].some((path) =>
      path.startsWith('panel-de-control')
    )

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
          <AuthContextProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="flex">
                <div className="w-1/5 bg-black py-5 min-h-screen">
                  <SideBar />
                </div>
                <div className="w-4/5 p-5">{children}</div>
              </div>
            </ThemeProvider>
          </AuthContextProvider>
        )}
      </body>
    </html>
  )
}
