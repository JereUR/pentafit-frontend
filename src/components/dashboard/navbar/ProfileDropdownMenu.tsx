'use client'

import Image from 'next/image'
import { CgProfile } from 'react-icons/cg'
import { IoSettings } from 'react-icons/io5'
import { MdLogout } from 'react-icons/md'
import { ReactNode } from 'react'
import Link from 'next/link'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
/* import profilePhoto from '../../../../public/assets/profile-photo.png' */
import profilePhoto from '../../../../public/assets/noavatar.png'
import useUser from '@/components/hooks/useUser'

interface DropdownProp {
  title: string
  path: string
  icon: ReactNode
}

const dropdownMenuItems = [
  {
    title: 'Mi Perfil',
    path: '/panel-de-control/mi-perfil',
    icon: <CgProfile />
  },
  {
    title: 'Configuración',
    path: '/panel-de-control/mi-perfil/configuracion',
    icon: <IoSettings />
  }
]

export default function ProfileDropdownMenu() {
  const { logout, user } = useUser()

  return (
    <div className="flex items-center justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger className="relative">
          <div className="cursor-pointer">
            <Image
              className="rounded-full object-cover p-[2px] ring-2 ring-primary-orange-600"
              src={user?.photo_url ? user.photo_url : profilePhoto}
              alt="Avatar photo"
              width={30}
              height={30}
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="mt-1 p-2">
          <DropdownMenuLabel className="flex flex-col justify-center items-center">
            <div className="relative h-32">
              <Image
                src={user?.photo_url ? user.photo_url : profilePhoto}
                width={128}
                height={128}
                alt="Tu imagen"
                className="w-full h-full object-cover rounded-sm"
              />
              <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
              <div className="absolute bottom-0 text-center p-1 w-full bg-background opacity-60 text-foreground text-xs z-20">
                {user?.first_name}
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="my-2" />
          {dropdownMenuItems.map((item: DropdownProp, key: number) => (
            <DropdownMenuItem
              key={key}
              className="p-1 px-4 cursor-pointer rounded-r-full ml-[-10px]  transition flex items-start hover:bg-primary-orange-500"
            >
              <Link href={item.path}>
                <span className="flex items-center gap-2 my-1">
                  {item.icon}
                  {item.title}
                </span>
              </Link>
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem className="p-1 px-4 my-1 cursor-pointer rounded-r-full ml-[-10px] transition flex items-start gap-2 hover:bg-primary-orange-500">
            <span className="flex items-center gap-2 " onClick={logout}>
              <MdLogout />
              Cerrar Sesión
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
