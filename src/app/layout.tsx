'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import AuthContextProvider from '@/components/context/AuthContext'
import NavBar from '@/components/NavBar'
import { usePathname } from 'next/navigation'
import SideBar from '@/components/dashboard/navbar/SideBar'
import TopBar from '@/components/dashboard/navbar/TopBar'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const shouldRenderLayout = !pathname.startsWith('/panel-de-control')

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
              <div className="flex min-h-screen">
                <div className="w-1/4 lg:w-1/6 bg-black py-5">
                  <SideBar />
                </div>
                <div className="w-3/4 lg:w-5/6">
                  <TopBar />
                  {children}
                </div>
              </div>
            </ThemeProvider>
          </AuthContextProvider>
        )}
      </body>
    </html>
  )
}
