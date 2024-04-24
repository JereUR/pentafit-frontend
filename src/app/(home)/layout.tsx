import Logo from '@/components/Logo'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import { Button } from '@/components/ui/button'
import React, { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
      <nav className="flex justify-between items-center border-b border-border h-[80px] px-4 py-2">
        <Logo />
        <div className="flex gap-4 items-center">
          <ThemeSwitcher />
          <Button className="bg-btnPrimary hover:bg-btnPrimaryHover">
            Iniciar Sesión
          </Button>
        </div>
      </nav>
      <main className="flex w-full justify-center">{children}</main>
    </div>
  )
}
