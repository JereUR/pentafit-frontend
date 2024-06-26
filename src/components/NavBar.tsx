'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import Logo from './Logo'
import ThemeSwitcher from './ThemeSwitcher'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'
import useUser from './hooks/useUser'
import Loader from './Loader'
import { useToast } from './ui/use-toast'

export default function NavBar() {
  const [isSticky, setIsSticky] = useState(false)
  const pathname = usePathname()
  const { user, userSignOut, token, loadingUser, setLoadingUser } = useUser()
  const { toast } = useToast()

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0) // Update isSticky based on scroll position
    }

    window.addEventListener('scroll', handleScroll) // Add event listener

    return () => window.removeEventListener('scroll', handleScroll) // Cleanup
  }, [])

  useEffect(() => {
    const isLoggedOut = localStorage.getItem('isLoggedOut') === 'true'

    if (isLoggedOut) {
      window.location.reload()
      localStorage.removeItem('isLoggedOut')
    }
  }, [pathname, user])

  async function handleSignOut() {
    if (token) {
      setLoadingUser(true)
      try {
        const response = await fetch('/api/signout', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(token)
        })

        const result = await response.json()
        console.log(result)
        if (result) {
          userSignOut()
        }
      } catch (error: any) {
        console.error('Error during sign out:', error)
        toast({
          variant: 'destructive',
          title: 'Oh no! Algo salió mal.',
          description: error
        })
        return false
      } finally {
        setLoadingUser(false)
      }
    }
  }

  if (user) {
    return (
      <nav
        className={`flex justify-between items-center py-4 fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
          isSticky ? 'bg-background shadow-md' : 'bg-transparent'
        }`}
      >
        <Logo isSticky={isSticky} />
        <div
          className={`flex gap-4 items-center rounded-lg p-4 mx-4 bg-background ${
            !isSticky && 'shadow-md'
          } ${pathname != '/' && 'bg-foreground dark:bg-white'}`}
        >
          <ThemeSwitcher />
          {pathname === '/' ? (
            <div className="flex gap-2">
              <Button className="bg-primary-orange-600 hover:bg-primary-orange-700">
                <Link href="/panel-de-control">Panel de Control</Link>
              </Button>
              <Button
                className="bg-primary-orange-600 hover:bg-primary-orange-700"
                onClick={handleSignOut}
              >
                {!loadingUser ? (
                  'Cerrar Sesión'
                ) : (
                  <Loader className="mt-[1.8vh]" />
                )}
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button className="bg-primary-orange-600 hover:bg-primary-orange-700">
                <Link href="/perfil">Mi Perfil</Link>
              </Button>
              <Button
                className="bg-primary-orange-600 hover:bg-primary-orange-700"
                onClick={handleSignOut}
              >
                {!loadingUser ? (
                  'Cerrar Sesión'
                ) : (
                  <Loader className="mt-[1.8vh]" />
                )}
              </Button>
            </div>
          )}
        </div>
      </nav>
    )
  } else {
    return (
      <nav
        className={`flex justify-between items-center py-4 fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
          isSticky ? 'bg-background shadow-md' : 'bg-transparent'
        }`}
      >
        <Logo isSticky={isSticky} />
        <div
          className={`flex gap-4 items-center rounded-lg p-4 mx-4 bg-background ${
            !isSticky && 'shadow-md'
          } ${pathname != '/' && 'bg-foreground dark:bg-white'}`}
        >
          <ThemeSwitcher />
          <Button className="bg-primary-orange-600 hover:bg-primary-orange-700">
            <Link href="/iniciar-sesion">Iniciar Sesión</Link>
          </Button>
        </div>
      </nav>
    )
  }
}
