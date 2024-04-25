'use client'

import Logo from '@/components/Logo'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import { Button } from '@/components/ui/button'
import React, { ReactNode, useState, useEffect } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0) // Update isSticky based on scroll position
    }

    window.addEventListener('scroll', handleScroll) // Add event listener

    return () => window.removeEventListener('scroll', handleScroll) // Cleanup
  }, [])

  return (
    <div className="flex flex-col min-w-full">
      <nav
        className={`flex justify-between items-center py-4 fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
          isSticky ? 'bg-background shadow-md' : 'bg-transparent'
        }`}
      >
        <Logo />
        <div className="flex gap-4 items-center py-4 mx-4">
          <ThemeSwitcher />
          <Button className="bg-btnPrimary hover:bg-btnPrimaryHover">
            Iniciar Sesión
          </Button>
        </div>
      </nav>
      <main className="flex w-full justify-center pt-20">{children}</main>
    </div>
  )
}
