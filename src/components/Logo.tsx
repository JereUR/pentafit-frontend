'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function Logo({ isSticky }: { isSticky: boolean }) {
  const pathname = usePathname()

  let classname = ''

  if (pathname != '/' && isSticky) {
    classname = 'dark:text-muted'
  } else {
    classname = 'dark:text-white'
  }

  if (pathname === '/' && isSticky) {
    classname = 'dark:text-white'
  } else {
    if (pathname === '/') classname = 'dark:text-muted'
  }

  return (
    <Link
      href={'/'}
      className={`font-bold text-4xl hover:cursor-pointer mx-8 ${classname}`}
    >
      PentaFit
    </Link>
  )
}
