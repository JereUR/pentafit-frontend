import Logo from '@/components/Logo'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import { Button } from '@/components/ui/button'
import React, { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-w-full">
      <nav className="flex justify-between items-center py-4 mx-4">
        <Logo />
        <div className="flex gap-4 items-center py-4 mx-4">
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
