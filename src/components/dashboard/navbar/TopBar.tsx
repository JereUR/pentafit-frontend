'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import NotificationsDropdownMenu from './NotificationsDropdownMenu'
import ProfileDropdownMenu from './ProfileDropdownMenu'

export default function TopBar() {
  const [isSticky, setIsSticky] = useState(false)
  const pathname = usePathname()
  let title = 'Panel de Control'
  const pathnameParts = pathname.split('/')
  pathnameParts.shift()

  const pathnameArray: string[] = []

  if (pathnameParts.length > 1) {
    pathnameParts.forEach((part) => {
      if (part) {
        if (part != 'panel-de-control') {
          const capitalizedWord = part.charAt(0).toUpperCase() + part.slice(1)
          pathnameArray.push(capitalizedWord.replaceAll(/-/g, ' '))
        }
      }
    })

    title = pathnameArray.join(' - ')
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0) // Update isSticky based on scroll position
    }

    window.addEventListener('scroll', handleScroll) // Add event listener

    return () => window.removeEventListener('scroll', handleScroll) // Cleanup
  }, [])

  return (
    <div
      className={`flex justify-between items-center shadow-md p-4 top-0 left-1/6 w-full z-50 transition-all duration-300 ease-in-out ${
        isSticky ? 'bg-background' : 'bg-transparent'
      }`}
    >
      <div className="text-foreground font-bold capitalize">{title}</div>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-5">
          <ProfileDropdownMenu />
          <NotificationsDropdownMenu />
        </div>
      </div>
    </div>
  )
}
