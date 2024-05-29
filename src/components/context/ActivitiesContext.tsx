'use client'

import { createContext, ReactNode, useState } from 'react'

import { Activity, PropsAddActivity } from '../types/Activity'
import axios from 'axios'
import { useToast } from '../ui/use-toast'

type ActivitiesContextType = {
  activities: Activity[] | []
  loading: boolean
  getActivities: (q: string, page: string) => Promise<Activity[] | [] | void>
  getActivityById: (id: string) => Promise<Activity | null>
  addActivity: ({
    dataActivity
  }: {
    dataActivity: PropsAddActivity
  }) => Promise<boolean>
  updateActivity: ({
    dataActivity
  }: {
    dataActivity: PropsAddActivity
  }) => Promise<boolean>
}

export const ActivitiesContext = createContext<ActivitiesContextType | null>(
  null
)

const initialActivities = [
  {
    id: 1,
    id_business: 1,
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
    id: 2,
    id_business: 1,
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
    id: 3,
    id_business: 1,
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
    id: 4,
    id_business: 1,
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
    id: 5,
    id_business: 1,
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
]

export default function ActivitiesContextProvider({
  children
}: {
  children: ReactNode
}) {
  const [activities, setActivities] = useState<Activity[] | []>(
    []
  )
  const [loading, setLoading] = useState<boolean>(false)
  const { toast } = useToast()
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL

  async function getActivities(
    q: string,
    page: string
  ): Promise<Activity[] | [] | void> {
    const regex = new RegExp(q, 'i')
    const ITEM_PER_PAGE = 4
    const params = new URLSearchParams()
    params.append('regex', regex.toString())
    params.append('page', page)
    params.append('ITEMS_PER_PAGE', ITEM_PER_PAGE.toString())
    const url = `${BASE_URL}get-activities?${params.toString()}`

    /* try {
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
      toast({
        variant: 'destructive',
        title: 'Oh no! Algo salió mal.',
        description: error.message
      })
    } */
  }

  async function getActivityById(id: string) {
    const url = `${BASE_URL}get-activity?id=${id}`
    /* try {
      const response = await axios.get(url)

      if (response.status === 200 || response.status === 204) {
        return response.data?.activity
      } else {
        toast({
          title: 'Oh no! Algo salió mal.',
          description: response.statusText
        })
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Oh no! Algo salió mal.',
        description: error.message
      })
    } */

    return {
      id: 1,
      id_business: 1,
      activity: 'Actividad 1',
      cost: 200,
      isPublic: true,
      quotaGeneration: true,
      sessionMax: 5,
      mpAvailable: false,
      dateFrom: new Date(2024, 4, 20),
      dateUntil: new Date(2024, 5, 20),
      paymentType: 'Mensual',
      publicName: 'Test'
    }
  }

  async function addActivity({
    dataActivity
  }: {
    dataActivity: PropsAddActivity
  }): Promise<boolean> {
    setLoading(true)
    const isPublicValue = dataActivity.isPublic === 'true' ? true : false

    const quotaGenerationValue =
      dataActivity.quotaGeneration === 'true' ? true : false

    const mpAvailableValue = dataActivity.mpAvailable === 'true' ? true : false

    const newActivity = {
      business_id: dataActivity.business?.id,
      name: dataActivity.activity,
      cost: dataActivity.cost,
      isPublic: isPublicValue,
      quotaGeneration: quotaGenerationValue,
      sessionMax: dataActivity.sessionMax,
      mpAvailable: mpAvailableValue,
      publicName: dataActivity.publicName,
      dateFrom: dataActivity.dateFrom,
      dateUntil: dataActivity.dateUntil,
      paymentType: dataActivity.paymentType
    }

    const url = `${BASE_URL}add-activity`
    try {
      const response = await axios.post(
        url,
        {
          /* data */
        },
        {
          headers: {
            'Content-Type': 'application/json'
            /* Authorization: token */
          }
        }
      )

      if (response.status === 201) {
        return true
      } else {
        toast({
          title: 'Oh no! Algo salió mal.',
          description: response.statusText
        })
        return false
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Oh no! Algo salió mal.',
        description: error.message
      })
      return false
    } finally {
      setLoading(false)
    }
  }

  async function updateActivity({
    dataActivity
  }: {
    dataActivity: PropsAddActivity
  }): Promise<boolean> {
    setLoading(true)
    const isPublicValue = dataActivity.isPublic === 'true' ? true : false

    const quotaGenerationValue =
      dataActivity.quotaGeneration === 'true' ? true : false

    const mpAvailableValue = dataActivity.mpAvailable === 'true' ? true : false

    const newActivity = {
      id_business: dataActivity.business?.id,
      activity: dataActivity.activity,
      cost: dataActivity.cost,
      isPublic: isPublicValue,
      quotaGeneration: quotaGenerationValue,
      sessionMax: dataActivity.sessionMax,
      mpAvailable: mpAvailableValue,
      publicName: dataActivity.publicName,
      dateFrom: dataActivity.dateFrom,
      dateUntil: dataActivity.dateUntil,
      paymentType: dataActivity.paymentType
    }

    console.log(newActivity)

    const url = `${BASE_URL}update-activity`
    try {
      const response = await axios.put(url)

      if (response.status === 200 || response.status === 204) {
        return true
      } else {
        toast({
          title: 'Oh no! Algo salió mal.',
          description: response.statusText
        })
        return false
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Oh no! Algo salió mal.',
        description: error.message
      })
      return false
    } finally {
      setLoading(false)
    }
  }

  return (
    <ActivitiesContext.Provider
      value={{
        activities,
        loading,
        getActivities,
        getActivityById,
        addActivity,
        updateActivity
      }}
    >
      {children}
    </ActivitiesContext.Provider>
  )
}
