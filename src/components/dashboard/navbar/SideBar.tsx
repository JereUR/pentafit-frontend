'use client'

import { FaHome, FaUser } from 'react-icons/fa'
import {
  MdLogout,
  MdForkLeft,
  MdExpandLess,
  MdExpandMore
} from 'react-icons/md'
import { BsArrowsAngleContract } from 'react-icons/bs'
import { IoIosFitness } from 'react-icons/io'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import useUser from '@/components/hooks/useUser'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import { IoFootstepsSharp } from 'react-icons/io5'

const menuItems = [
  {
    title: 'Inicio',
    path: '/panel-de-control',
    icon: <FaHome className="h-5 w-5" />,
    list: null
  },
  {
    title: 'Socios',
    path: '/panel-de-control/socios',
    icon: <FaUser className="h-4 w-4" />,
    list: null
  },
  {
    title: 'Turnos',
    path: '/panel-de-control/turnos',
    icon: <MdForkLeft className="h-6 w-6" />,
    list: null
  },
  {
    title: 'Facturación',
    path: null,
    icon: <MdForkLeft className="h-5 w-5" />,
    list: [
      { title: 'Planes', path: '/panel-de-control/facturacion/planes' },
      {
        title: 'Control Cuotas',
        path: '/panel-de-control/facturacion/control-cuotas'
      },
      {
        title: 'Ingresos y Gastos',
        path: '/panel-de-control/facturacion/ingresos-y-gastos'
      }
    ]
  },
  {
    title: 'Seguimiento',
    path: '/panel-de-control/seguimiento',
    icon: <IoFootstepsSharp className="h-5 w-5" />,
    list: null
  },
  {
    title: 'Entrenamiento',
    path: null,
    icon: <IoIosFitness className="h-5 w-5" />,
    list: [
      {
        title: 'Planes',
        path: '/panel-de-control/entrenamiento/planes'
      },
      {
        title: 'Rutinas',
        path: '/panel-de-control/entrenamiento/rutinas'
      },
      {
        title: 'Ejercicios',
        path: '/panel-de-control/entrenamiento/ejercicios'
      }
    ]
  }
]

export default function SideBar() {
  const { logout } = useUser()
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  useEffect(() => {
    menuItems.forEach((item) => {
      if (item.list) {
        item.list.forEach((listItem) => {
          if (pathname.startsWith(listItem.path)) {
            const parentTitle = item.title
            const isParentExpanded = expandedItems.includes(parentTitle)

            setExpandedItems(isParentExpanded ? expandedItems : [parentTitle])
          }
        })
      } else {
        if (pathname.startsWith(item.path)) setExpandedItems([])
      }
    })
  }, [pathname])

  const handleClick = (title: string) => {
    const isItemExpanded = expandedItems.includes(title)

    setExpandedItems(
      isItemExpanded
        ? expandedItems.filter((item) => item !== title)
        : [...expandedItems, title]
    )
  }

  return (
    <div className="flex flex-col top-10 text-white">
      <div className="flex justify-center gap-5 mb-10">
        <Link href="/" className=" text-4xl font-bold ">
          Penta
        </Link>
      </div>
      <div className="list-none">
        {menuItems.map((item) => (
          <div key={item.title}>
            {item.path ? (
              <Link
                href={item.path}
                className={`p-3 flex items-center gap-4 ml-0 my-1 mr-4 rounded-r-full transition duration-300 ease-in-out hover:bg-primary-orange-600 ${
                  pathname === item.path && 'bg-primary-orange-600'
                }`}
              >
                <span className="flex gap-2 items-center ml-2">
                  {item.icon}
                  {item.title}
                </span>
              </Link>
            ) : (
              // Handle items with sub-items
              <div
                className="items-center cursor-pointer p-3 rounded-r-ful"
                onClick={() => handleClick(item.title)}
              >
                <div className="flex items-center">
                  <span className="flex gap-2 items-center ml-2">
                    {item.icon}
                    {item.title}
                  </span>
                  {expandedItems.includes(item.title) ? (
                    <MdExpandLess className="ml-auto" />
                  ) : (
                    <MdExpandMore className="ml-auto" />
                  )}
                </div>
                {expandedItems.includes(item.title) && item.list && (
                  <div className="flex flex-col pl-6 mt-4 gap-2">
                    {item.list.map((subItem) => (
                      <Link
                        key={subItem.title}
                        href={subItem.path}
                        className={`p-3 flex items-center rounded-r-full transition duration-300 ease-in-out hover:bg-primary-orange-600 text-sm ${
                          pathname.startsWith(subItem.path) &&
                          'bg-primary-orange-600'
                        }`}
                      >
                        <li className="list-disc">
                          <span>{subItem.title}</span>
                        </li>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="absolute bottom-5 w-[300px] border-t text-center flex justify-center items-center bg-black pt-5 px-5">
        <ThemeSwitcher />
      </div>
    </div>
  )
}
