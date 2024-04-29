'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs'
import { DesktopIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { usePathname } from 'next/navigation'

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null //avoid rehydration errors

  let classname = ''

  if (theme === 'dark' || theme === 'system') {
    classname = 'text-primary-orange-500'
  } else {
    if (pathname != '/') {
      classname = 'text-white'
    } else {
      classname = 'text-foreground'
    }
  }

  return (
    <Tabs defaultValue={theme} className="bg-transparent">
      <TabsList className="bg-transparent">
        <TabsTrigger value="light" onClick={() => setTheme('light')}>
          <SunIcon
            className={`h-[1.2rem] w-[1.2rem] text-primary-orange-500 ${
              pathname != '/' ? 'dark:text-muted' : 'dark:text-white '
            } `}
          />
        </TabsTrigger>
        <TabsTrigger
          value="dark"
          onClick={() => setTheme('dark')}
          className="bg-transparent"
        >
          <MoonIcon
            className={`h-[1.2rem] w-[1.2rem] rotate-90 transition-all dark:rotate-0 ${classname}`}
          />
        </TabsTrigger>
        {/* <TabsTrigger value="system" onClick={() => setTheme('system')}>
          <DesktopIcon
            className={`h-[1.2rem] w-[1.2rem] text-white ${
              theme === 'light' && 'text-foreground'
            } ${theme === 'system' && 'text-primary-orange-500'}`}
          />
        </TabsTrigger> */}
      </TabsList>
    </Tabs>
  )
}
