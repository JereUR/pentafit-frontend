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

import useUser from '@/components/hooks/useUser'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const menuItems = [
  {
    title: 'Inicio',
    path: '/panel-de-control',
    icon: <FaHome />,
    list: []
  },
  {
    title: 'Socios',
    path: '/panel-de-control/socios',
    icon: <FaUser />,
    list: []
  },
  {
    title: 'Turnos',
    path: '/panel-de-control/turnos',
    icon: <MdForkLeft />,
    list: []
  },
  {
    title: 'Facturación',
    path: null,
    icon: <MdForkLeft />,
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
    icon: <BsArrowsAngleContract />,
    list: []
  },
  {
    title: 'Configuración Rutinas',
    path: null,
    icon: <IoIosFitness />,
    list: [
      {
        title: 'Planes',
        path: '/panel-de-control/configuracion-rutinas/planes'
      },
      {
        title: 'Rutinas',
        path: '/panel-de-control/configuracion-rutinas/rutinas'
      },
      {
        title: 'Ejercicios',
        path: '/panel-de-control/configuracion-rutinas/ejercicios'
      }
    ]
  }
]

export default function SideBar() {
  const { logout } = useUser()
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const handleClick = (title: string) => {
    const newExpandedItems = [...expandedItems] // Create a copy to avoid state mutation
    const itemIndex = newExpandedItems.indexOf(title)

    if (itemIndex !== -1) {
      // Remove item from expanded list (collapse)
      newExpandedItems.splice(itemIndex, 1)
    } else {
      // Add item to expanded list (expand)
      newExpandedItems.push(title)
    }

    setExpandedItems(newExpandedItems)
  }

  return (
    <div className="sticky top-10 h-screen">
      <div className="flex justify-center gap-5 mb-10">
        <p className=" text-4xl font-bold ">Penta</p>
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
                <span className="ml-2">{item.title}</span>
              </Link>
            ) : (
              // Handle items with sub-items
              <div
                className="items-center cursor-pointer p-3 rounded-r-ful"
                onClick={() => handleClick(item.title)}
              >
                <div className="flex items-center">
                  <span className="ml-2">{item.title}</span>
                  {expandedItems.includes(item.title) ? (
                    <MdExpandLess className="ml-auto" />
                  ) : (
                    <MdExpandMore className="ml-auto" />
                  )}
                </div>
                {expandedItems.includes(item.title) && item.list.length > 0 && (
                  <div className="pl-8">
                    {item.list.map((subItem) => (
                      <Link
                        key={subItem.title}
                        href={subItem.path}
                        className="p-2 flex items-center hover:bg-primary-orange-600 text-sm"
                      >
                        <span className="ml-2">{subItem.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        className="absolute bottom-10 p-3 ml-2 flex items-center gap-2 text-primary-orange-600 rounded-r-full transition duration-300 ease-in-out hover:text-primary-orange-600"
        onClick={logout}
      >
        <MdLogout />
        Cerrar Sesión
      </button>
    </div>
  )
}
