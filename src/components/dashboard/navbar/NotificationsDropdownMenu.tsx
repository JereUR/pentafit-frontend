'use client'

import { BellIcon } from '@radix-ui/react-icons'
import { useState } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

export default function NotificationsDropdownMenu() {
  const [notifications, setNotifications] = useState<any>([
    {
      text: 'This is a notification',
      date: '02-01-2020',
      read: true
    },
    {
      text: 'This is another notification',
      date: '02-01-2020',
      read: false
    }
  ])

  return (
    <div className="flex items-center justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger className="relative">
          <div className="p-3 border border-muted rounded-lg">
            <div
              className={`absolute top-0 right-1 h-[6px] w-[6px] rounded-full my-1 ${
                notifications.find((x: any) => x.read)
                  ? 'bg-green-500'
                  : 'bg-neutral-200'
              }`}
            />
            <BellIcon className="h-4 w-4" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {notifications.map((item: any, key: number) => (
            <DropdownMenuItem
              key={key}
              className="p-1 cursor-pointer hover:bg-primary-orange-600 transition flex items-start gap-2"
            >
              <div
                className={`h-3 w-3 rounded-full my-1 ${
                  !item.read ? 'bg-green-500' : 'bg-neutral-200'
                }`}
              />
              <div>
                <p>{item.text}</p>
                <p className="text-xs text-neutral-500">{item.date}</p>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
