import Logo from '@/components/Logo'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import { Button } from '@/components/ui/button'
import React, { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-w-full bg-background">
      <nav className="flex justify-between items-center border-b border-border h-[100px] px-4 mb-[-5vh]">
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
