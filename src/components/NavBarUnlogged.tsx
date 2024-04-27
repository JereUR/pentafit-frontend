'use client'

import { useEffect, useState } from 'react'
import Logo from './Logo'
import ThemeSwitcher from './ThemeSwitcher'
import { Button } from './ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavBarUnlogged() {
  const [isSticky, setIsSticky] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0) // Update isSticky based on scroll position
    }

    window.addEventListener('scroll', handleScroll) // Add event listener

    return () => window.removeEventListener('scroll', handleScroll) // Cleanup
  }, [])
  return (
    <nav
      className={`flex justify-between items-center py-4 fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        isSticky ? 'bg-background shadow-md' : 'bg-transparent'
      }`}
    >
      <Logo isSticky={isSticky} />
      <div
        className={`flex gap-4 items-center rounded-md p-4 mx-4 bg-background ${
          !isSticky && 'shadow-md'
        }`}
      >
        <ThemeSwitcher />
        <Button
          className={`bg-primary-orange-600 hover:bg-primary-orange-700 ${
            pathname != '/' && 'hidden'
          }`}
        >
          <Link href={'/iniciar-sesion'}>Iniciar Sesión</Link>
        </Button>
      </div>
    </nav>
  )
}
