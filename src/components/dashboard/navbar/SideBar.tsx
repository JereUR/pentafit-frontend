'use client'

import { FaArrowLeft, FaArrowRight, FaHome, FaUser } from 'react-icons/fa'
import { FaMoneyBillTransfer, FaRegCalendarDays } from 'react-icons/fa6'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'
import { TiThListOutline } from 'react-icons/ti'
import { IoIosFitness, IoMdBusiness } from 'react-icons/io'
import { IoFootstepsSharp } from 'react-icons/io5'
import { GrAnnounce } from 'react-icons/gr'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import ThemeSwitcher from 'components/ThemeSwitcher'

const menuItems = [
  {
    title: 'Inicio',
    path: '/panel-de-control',
    icon: <FaHome className="h-5 w-5" />,
    list: null
  },
  {
    title: 'Negocios',
    path: '/panel-de-control/negocios',
    icon: <IoMdBusiness className="h-5 w-5" />,
    list: null
  },
  {
    title: 'Socios',
    path: '/panel-de-control/socios',
    icon: <FaUser className="h-4 w-4" />,
    list: null
  },
  {
    title: 'Agenda',
    path: '/panel-de-control/agenda',
    icon: <FaRegCalendarDays className="h-6 w-6" />,
    list: null
  },
  {
    title: 'Actividades',
    path: '/panel-de-control/actividades',
    icon: <TiThListOutline className="h-6 w-6" />,
    list: null
  },
  {
    title: 'Facturación',
    path: null,
    icon: <FaMoneyBillTransfer className="h-5 w-5" />,
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
  },
  {
    title: 'Comunicación',
    path: null,
    icon: <GrAnnounce className="h-5 w-5" />,
    list: [
      {
        title: 'Mensajería',
        path: '/panel-de-control/comunicacion/mensajeria'
      },
      {
        title: 'Anuncios',
        path: '/panel-de-control/comunicacion/anuncios'
      }
    ]
  }
]

export default function SideBar() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true)
  const [activeParent, setActiveParent] = useState<string | null>(null)

  useEffect(() => {
    menuItems.forEach((item) => {
      if (item.list) {
        item.list.forEach((listItem) => {
          if (pathname.startsWith(listItem.path)) {
            const parentTitle = item.title
            const isParentExpanded = expandedItems.includes(parentTitle)
            setActiveParent(parentTitle)
            setExpandedItems(isParentExpanded ? expandedItems : [parentTitle])
          }
        })
      } else {
        if (pathname.startsWith(item.path)) {
          setExpandedItems([])
          setActiveParent(null)
        }
      }
    })
  }, [pathname])

  useEffect(() => {
    if (isCollapsed) {
      setExpandedItems([])
    } else {
      menuItems.forEach((item) => {
        if (item.list) {
          item.list.forEach((listItem) => {
            if (pathname.startsWith(listItem.path)) {
              setExpandedItems([item.title])
            }
          })
        }
      })
    }
  }, [isCollapsed, pathname])

  const handleClick = (title: string) => {
    const isItemExpanded = expandedItems.includes(title)
    setIsCollapsed(false)
    setExpandedItems(
      isItemExpanded
        ? expandedItems.filter((item) => item !== title)
        : [...expandedItems, title]
    )
  }

  return (
    <div
      className={`fixed flex flex-col top-0 z-50 overflow-y-auto overflow-x-hidden text-white h-full transition-all duration-300 scrollbar-thin scrollbar-thumb-rounded scrollbar-track-rounded scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-700 ${
        isCollapsed ? 'w-[6vw] bg-black' : 'w-64 bg-black'
      }`}
    >
      <div className="flex justify-center gap-2 items-center my-10">
        <Link href="/" className="text-4xl font-bold flex-1 text-center">
          {isCollapsed ? 'P' : 'Penta'}
        </Link>
        <div
          className="cursor-pointer flex-none mr-4 mt-2 transition duration-300 ease-in-out hover:scale-[1.1] hover:text-primary-orange-600"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <FaArrowRight className="h-6 w-6" />
          ) : (
            <FaArrowLeft className="h-6 w-6" />
          )}
        </div>
      </div>
      <div className="flex-1">
        {menuItems.map((item) => (
          <div key={item.title} className="my-4">
            {item.path ? (
              <Link
                href={item.path}
                className={`link-progress p-3 mr-4 ml-2 flex items-center gap-4 my-1 rounded-r-full transition duration-300 ease-in-out ${
                  pathname === item.path ? 'bg-primary-orange-600' : ''
                }`}
                onClick={() => setIsCollapsed(true)}
              >
                <span className="flex gap-2 items-center ml-2">
                  {item.icon}
                </span>
                {!isCollapsed && <span>{item.title}</span>}
              </Link>
            ) : (
              <div
                className="items-center cursor-pointer"
                onClick={() => handleClick(item.title)}
              >
                <div
                  className={`link-progress flex items-center p-3 ml-2 mr-4 rounded-r-full ${
                    isCollapsed &&
                    activeParent === item.title &&
                    'bg-primary-orange-600'
                  }`}
                >
                  <span className="flex gap-2 items-center ml-2">
                    {item.icon} {!isCollapsed && item.title}
                    {expandedItems.includes(item.title) ? (
                      <MdExpandLess className="ml-auto h-5 w-5" />
                    ) : (
                      <MdExpandMore className="ml-auto h-5 w-5" />
                    )}
                  </span>
                </div>
                {expandedItems.includes(item.title) && item.list && (
                  <div className="flex flex-col pl-6 mt-4 gap-2">
                    {item.list.map((subItem) => (
                      <Link
                        key={subItem.title}
                        href={subItem.path}
                        className={`link-progress p-3 mr-4 flex items-center rounded-r-full transition duration-300 ease-in-out text-sm ${
                          pathname.startsWith(subItem.path) &&
                          'bg-primary-orange-600'
                        }`}
                        onClick={() => setIsCollapsed(true)}
                      >
                        <li
                          className="list-disc"
                          onClick={() => setIsCollapsed(true)}
                        >
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
      <div
        className={`flex justify-center items-center p-5 border-t border-gray-700 bg-black w-full`}
      >
        <ThemeSwitcher />
      </div>
    </div>
  )
}
