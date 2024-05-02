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
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import noAvatarPhoto from '../../../../public/assets/noavatar.png'
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
  const { logout } = useUser()

  return (
    <div className="flex items-center justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger className="relative">
          <div className="cursor-pointer">
            <Image
              className="rounded-full object-cover p-[2px] ring-2 ring-primary-orange-600"
              src={noAvatarPhoto}
              alt="Avatar photo"
              width={30}
              height={30}
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="mt-1 p-2">
          {dropdownMenuItems.map((item: DropdownProp, key: number) => (
            <DropdownMenuItem
              key={key}
              className="p-1 px-4 cursor-pointer rounded-r-full ml-[-10px]  transition flex items-start gap-2 hover:bg-primary-orange-500"
            >
              <Link href={item.path}>
                <span className="flex items-center gap-2">
                  {item.icon}
                  {item.title}
                </span>
              </Link>
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem className="p-1 px-4 cursor-pointer rounded-r-full ml-[-10px] transition flex items-start gap-2 hover:bg-primary-orange-500">
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
