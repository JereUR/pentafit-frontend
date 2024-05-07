'use client'

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState
} from 'react'
import { User } from '../types/User'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { Activity } from '../types/Activity'

type ActivitiesContextType = {
  activities: Activity[] | []
  getActivities: (q: string, page: string) => Promise<Activity[] | [] | Error>
}

export const ActivitiesContext = createContext<ActivitiesContextType | null>(
  null
)

export default function ActivitiesContextProvider({
  children
}: {
  children: ReactNode
}) {
  const [activities, setActivities] = useState<Activity[] | []>([
    {
      id: 'm5gr84i9',
      description: 'Actividad 1',
      amount: 200,
      isPublic: false,
      quotaGeneration: true,
      sessionMax: 5,
      mpAvailable: false,
      dateFrom: new Date(2024, 4, 20),
      dateUntil: new Date(2024, 5, 20),
      paymentType: 'Mensual'
    },
    {
      id: '3u1reuv4',
      description: 'Actividad 2',
      amount: 300,
      isPublic: true,
      quotaGeneration: true,
      sessionMax: 15,
      mpAvailable: true,
      dateFrom: new Date(2024, 4, 20),
      dateUntil: new Date(2024, 5, 20),
      paymentType: 'Mensual'
    },
    {
      id: 'derv1ws0',
      description: 'Actividad 3',
      amount: 400,
      isPublic: true,
      quotaGeneration: true,
      sessionMax: 10,
      mpAvailable: true,
      dateFrom: new Date(2024, 4, 20),
      dateUntil: new Date(2024, 5, 20),
      paymentType: 'Sesion'
    },
    {
      id: '5kma53ae',
      description: 'Actividad 4',
      amount: 200,
      isPublic: false,
      quotaGeneration: true,
      sessionMax: 30,
      mpAvailable: false,
      dateFrom: new Date(2024, 4, 20),
      dateUntil: new Date(2024, 5, 20),
      paymentType: 'Diario'
    },
    {
      id: 'bhqecj4p',
      description: 'Actividad 5',
      amount: 500,
      isPublic: true,
      quotaGeneration: true,
      sessionMax: 7,
      mpAvailable: true,
      dateFrom: new Date(2024, 4, 20),
      dateUntil: new Date(2024, 5, 20),
      paymentType: 'Semanal'
    }
  ])

  async function getActivities(
    q: string,
    page: string
  ): Promise<Activity[] | [] | Error> {
    const regex = new RegExp(q, 'i')
    const ITEM_PER_PAGE = 4
    const index = ITEM_PER_PAGE * (parseInt(page) - 1)
    try {
      const response = await fetch('http://localhost:3000/activities', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ parameters: { regex, index, ITEM_PER_PAGE } })
      })

      if (!response.ok) {
        throw new Error('Login failed') // Handle non-2xx status codes
      }

      const data = await response.json()

      if (data?.success) {
        return data.activities
      } else {
        throw new Error('Login failed: ' + data?.message) // Handle failed login with error message (if provided)
      }
    } catch (error) {
      throw new Error('Failed to fecth users!')
    }
  }

  return (
    <ActivitiesContext.Provider
      value={{
        activities,
        getActivities
      }}
    >
      {children}
    </ActivitiesContext.Provider>
  )
}
