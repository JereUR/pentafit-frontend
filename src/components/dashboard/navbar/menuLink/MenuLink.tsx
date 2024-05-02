'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface Item {
  title: string
  path: string
}

const MenuLink = ({ item }: { item: Item }) => {
  const pathname = usePathname()

  return (
    <Link
      className={`p-4 flex items-center gap-2 my-1 mx-0 rounded-lg hover:bg-gray-700 ${
        pathname === item.path && 'bg-gray-700'
      }`}
      href={item.path}
    >
      {item.title}
    </Link>
  )
}

export default MenuLink
