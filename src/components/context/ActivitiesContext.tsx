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
    company_id: 1,
    name: 'Actividad 1',
    price: 200,
    is_public: false,
    generate_invoice: true,
    max_sessions: 5,
    mp_available: false,
    start_date: new Date(2024, 4, 20),
    end_date: new Date(2024, 5, 20),
    payment_type: 'Mensual'
  },
  {
    id: 2,
    company_id: 1,
    name: 'Actividad 2',
    price: 300,
    is_public: true,
    generate_invoice: true,
    max_sessions: 15,
    mp_available: true,
    start_date: new Date(2024, 4, 20),
    end_date: new Date(2024, 5, 20),
    payment_type: 'Mensual'
  },
  {
    id: 3,
    company_id: 1,
    name: 'Actividad 3',
    price: 400,
    is_public: true,
    generate_invoice: true,
    max_sessions: 10,
    mp_available: true,
    start_date: new Date(2024, 4, 20),
    end_date: new Date(2024, 5, 20),
    payment_type: 'Por período'
  },
  {
    id: 4,
    company_id: 1,
    name: 'Actividad 4',
    price: 200,
    is_public: false,
    generate_invoice: true,
    max_sessions: 30,
    mp_available: false,
    start_date: new Date(2024, 4, 20),
    end_date: new Date(2024, 5, 20),
    payment_type: 'Por sesion'
  },
  {
    id: 5,
    company_id: 1,
    name: 'Actividad 5',
    price: 500,
    is_public: true,
    generate_invoice: true,
    max_sessions: 7,
    mp_available: true,
    start_date: new Date(2024, 4, 20),
    end_date: new Date(2024, 5, 20),
    payment_type: 'Mensual con sesiones'
  }
]

export default function ActivitiesContextProvider({
  children
}: {
  children: ReactNode
}) {
  const [activities, setActivities] = useState<Activity[] | []>(
    initialActivities
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
      company_id: 1,
      name: 'Actividad 1',
      price: 200,
      is_public: true,
      generate_invoice: true,
      max_sessions: 5,
      mp_available: false,
      start_date: new Date(2024, 4, 20),
      end_date: new Date(2024, 5, 20),
      payment_type: 'Mensual',
      public_name: 'Test'
    }
  }

  async function addActivity({
    dataActivity
  }: {
    dataActivity: PropsAddActivity
  }): Promise<boolean> {
    setLoading(true)
    const isPublicValue = dataActivity.is_public === 'true' ? true : false

    const generateInvoiceValue =
      dataActivity.generate_invoice === 'true' ? true : false

    const mpAvailableValue = dataActivity.mp_available === 'true' ? true : false

    const newActivity = {
      business_id: dataActivity.business?.id,
      name: dataActivity.name,
      price: dataActivity.price,
      is_public: isPublicValue,
      generate_invoice: generateInvoiceValue,
      max_sessions: dataActivity.max_sessions,
      mp_available: mpAvailableValue,
      public_name: dataActivity.public_name,
      start_date: dataActivity.start_date,
      end_date: dataActivity.end_date,
      payment_type: dataActivity.payment_type
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
    const isPublicValue = dataActivity.is_public === 'true' ? true : false

    const generateInvoiceValue =
      dataActivity.generate_invoice === 'true' ? true : false

    const mpAvailableValue = dataActivity.mp_available === 'true' ? true : false

    const newActivity = {
      company_id: dataActivity.business?.id,
      activity: dataActivity.name,
      price: dataActivity.price,
      is_public: isPublicValue,
      generate_invoice: generateInvoiceValue,
      max_sessions: dataActivity.max_sessions,
      mp_available: mpAvailableValue,
      public_name: dataActivity.public_name,
      start_date: dataActivity.start_date,
      end_date: dataActivity.end_date,
      payment_type: dataActivity.payment_type
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
