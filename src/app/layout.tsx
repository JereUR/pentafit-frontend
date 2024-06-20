'use client'

import './globals.css'
import 'react-image-crop/dist/ReactCrop.css'

import { Inter } from 'next/font/google'
import { usePathname } from 'next/navigation'

import { ThemeProvider } from '@/components/providers/ThemeProvider'
import AuthContextProvider from '@/components/context/AuthContext'
import NavBar from '@/components/NavBar'
import SideBar from '@/components/dashboard/navbar/SideBar'
import TopBar from '@/components/dashboard/navbar/TopBar'
import ActivitiesContextProvider from '@/components/context/ActivitiesContext'
import Logo from '@/components/Logo'
import { Toaster } from '@/components/ui/toaster'
import PlansContextProvider from '@/components/context/PlansContext'
import DiariesContextProvider from '@/components/context/DiariesContext'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const shouldRenderLayout = !pathname.startsWith('/panel-de-control')
  const recoverLayout =
    pathname.startsWith('/recover') || pathname.startsWith('/confirmation')

  if (recoverLayout) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <AuthContextProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <>
                <div className="p-4">
                  <Logo isSticky={false} />
                </div>
                {children}
                <Toaster />
              </>
            </ThemeProvider>
          </AuthContextProvider>
        </body>
      </html>
    )
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <PlansContextProvider>
              <DiariesContextProvider>
                <ActivitiesContextProvider>
                  {shouldRenderLayout ? (
                    <>
                      <NavBar />
                      {children}
                      <Toaster />
                    </>
                  ) : (
                    <div className="flex min-h-screen">
                      <div className="w-1/4 xl:w-1/6 bg-black py-5">
                        <SideBar />
                      </div>
                      <div className="w-3/4 xl:w-5/6">
                        <TopBar />
                        {children}
                      </div>
                      <Toaster />
                    </div>
                  )}
                </ActivitiesContextProvider>
              </DiariesContextProvider>
            </PlansContextProvider>
          </ThemeProvider>
        </AuthContextProvider>
      </body>
    </html>
  )
}
