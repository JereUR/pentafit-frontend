'use client'

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState
} from 'react'

import { Activity } from '../types/Activity'
import axios from 'axios'
import { useToast } from '../ui/use-toast'

type ActivitiesContextType = {
  activities: Activity[] | []
  getActivities: (q: string, page: string) => Promise<Activity[] | [] | void>
  addActivity: (formData: FormData) => Promise<void | Error>
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
      activity: 'Actividad 1',
      cost: 200,
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
      activity: 'Actividad 2',
      cost: 300,
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
      activity: 'Actividad 3',
      cost: 400,
      isPublic: true,
      quotaGeneration: true,
      sessionMax: 10,
      mpAvailable: true,
      dateFrom: new Date(2024, 4, 20),
      dateUntil: new Date(2024, 5, 20),
      paymentType: 'Por período'
    },
    {
      id: '5kma53ae',
      activity: 'Actividad 4',
      cost: 200,
      isPublic: false,
      quotaGeneration: true,
      sessionMax: 30,
      mpAvailable: false,
      dateFrom: new Date(2024, 4, 20),
      dateUntil: new Date(2024, 5, 20),
      paymentType: 'Por sesion'
    },
    {
      id: 'bhqecj4p',
      activity: 'Actividad 5',
      cost: 500,
      isPublic: true,
      quotaGeneration: true,
      sessionMax: 7,
      mpAvailable: true,
      dateFrom: new Date(2024, 4, 20),
      dateUntil: new Date(2024, 5, 20),
      paymentType: 'Mensual con sesiones'
    }
  ])

  async function getActivities(
    q: string,
    page: string
  ): Promise<Activity[] | [] | void> {
    const regex = new RegExp(q, 'i')
    const ITEM_PER_PAGE = 4
    /* const index = ITEM_PER_PAGE * (parseInt(page) - 1) */
    const params = new URLSearchParams()
    params.append('regex', regex.toString())
    params.append('page', page)
    params.append('ITEMS_PER_PAGE', ITEM_PER_PAGE.toString())
    const { toast } = useToast()
    const url = `${
      process.env.BASE_BACKEND_URL
    }get-activities?${params.toString()}`

    try {
      const response = await axios.get(url)

      if (response.status === 200 || response.status === 204) {
        setActivities(response.data?.activities)
        return response.data?.activities
      } else {
        toast({
          title: 'Oh no! Algo salió mal.',
          description: response.statusText
        })
      }
    } catch (error: any) {
      if (error.response && error.response.status >= 400) {
        toast({
          variant: 'destructive',
          title: 'Oh no! Algo salió mal.',
          description: error.response.data.message
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'Oh no! Algo salió mal.',
          description: error.message
        })
      }
    }
  }

  async function addActivity(formData: FormData): Promise<void | Error> {
    const {
      activity,
      cost,
      isPublic,
      quotaGeneration,
      sessionMax,
      mpAvailable,
      publicName,
      dateFrom,
      dateUntil,
      paymentType
    } = Object.fromEntries(formData)

    let isPublicValue, quotaGenerationValue, mpAvailableValue

    if (isPublic === undefined) {
      isPublicValue = false
    } else {
      if (isPublic === 'true') {
        isPublicValue = true
      } else {
        isPublicValue = false
      }
    }

    if (quotaGeneration === undefined) {
      quotaGenerationValue = false
    } else {
      if (quotaGeneration === 'true') {
        quotaGenerationValue = true
      } else {
        quotaGenerationValue = false
      }
    }

    if (mpAvailable === undefined) {
      mpAvailableValue = false
    } else {
      if (mpAvailable === 'true') {
        mpAvailableValue = true
      } else {
        mpAvailableValue = false
      }
    }

    const newActivity = {
      activity,
      cost,
      isPublic: isPublicValue,
      quotaGeneration: quotaGenerationValue,
      sessionMax,
      mpAvailable: mpAvailableValue,
      publicName,
      dateFrom,
      dateUntil,
      paymentType
    }

    console.log(newActivity)
  }

  return (
    <ActivitiesContext.Provider
      value={{
        activities,
        getActivities,
        addActivity
      }}
    >
      {children}
    </ActivitiesContext.Provider>
  )
}
