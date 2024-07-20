'use client'

import { createContext, ReactNode, useState } from 'react'
import axios from 'axios'

import { Activity, PropsAddActivity } from '../types/Activity'
import { useToast } from '../ui/use-toast'
import useUser from '../hooks/useUser'
import { initialActivities } from '../db/ActivityData'

type ActivitiesContextType = {
  activities: Activity[] | []
  loadingActivity: boolean
  loadingActivityForm: boolean
  count: number
  getAllActivities: (business_id: number) => Promise<Activity[] | []>
  getActivities: ({
    q,
    page,
    business_id,
    ITEMS_PER_PAGE
  }: {
    q: string
    page: string
    business_id: number
    ITEMS_PER_PAGE: number
  }) => Promise<void>
  getActivityById: ({
    id,
    business_id
  }: {
    id: string
    business_id: number
  }) => Promise<Activity | null>
  addActivity: ({
    dataActivity,
    company_id
  }: {
    dataActivity: PropsAddActivity
    company_id: number
  }) => Promise<boolean>
  updateActivity: ({
    dataActivity,
    company_id
  }: {
    dataActivity: PropsAddActivity
    company_id: number
  }) => Promise<boolean>
  deleteActivitiesById: (activities: number[]) => Promise<boolean>
  addActivitiesToBusinesses: ({
    activities,
    businesses
  }: {
    activities: number[]
    businesses: number[]
  }) => Promise<boolean>
}

export const ActivitiesContext = createContext<ActivitiesContextType | null>(
  null
)

export default function ActivitiesContextProvider({
  children
}: {
  children: ReactNode
}) {
  const [activities, setActivities] = useState<Activity[] | []>([])
  const [loadingActivity, setLoadingActivity] = useState<boolean>(true)
  const [loadingActivityForm, setLoadingActivityForm] = useState<boolean>(true)
  const [count, setCount] = useState(0)
  const { toast } = useToast()
  const { token } = useUser()
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL

  async function getAllActivities(
    business_id: number
  ): Promise<Activity[] | []> {
    setLoadingActivity(true)
    const url = `${BASE_URL}api/v1/all_activities?company_id=${business_id}`

    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      })

      if (response.status === 200 || response.status === 204) {
        return response.data
      } else {
        toast({
          title: 'Oh no! Algo salió mal.',
          description: response.statusText
        })
        return []
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Oh no! Algo salió mal.',
        description: error.message
      })
      return []
    } finally {
      setLoadingActivity(false)
    }
  }

  async function getActivities({
    q,
    page,
    business_id,
    ITEMS_PER_PAGE
  }: {
    q: string
    page: string
    business_id: number
    ITEMS_PER_PAGE: number
  }): Promise<void> {
    setLoadingActivity(true)
    const params = new URLSearchParams()
    params.append('regex', q)
    params.append('page', page)
    params.append('items_per_page', ITEMS_PER_PAGE.toString())
    params.append('company_id', business_id.toString())
    const url = `${BASE_URL}api/v1/activities?${params.toString()}`

    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      })

      if (response.status === 200 || response.status === 204) {
        setActivities(response.data.activities)
        setCount(response.data.count)
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
    } finally {
      setLoadingActivity(false)
      setActivities(initialActivities)
    }
  }

  async function getActivityById({
    id,
    business_id
  }: {
    id: string
    business_id: number
  }): Promise<Activity | null> {
    return initialActivities[0]
    setLoadingActivity(true)
    const params = new URLSearchParams()
    params.append('id', id)
    params.append('company_id', business_id.toString())
    const url = `${BASE_URL}api/v1/activity?${params.toString()}`
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      })

      if (response.status === 200 || response.status === 204) {
        return response.data
      } else {
        toast({
          title: 'Oh no! Algo salió mal.',
          description: response.statusText
        })
        return null
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Oh no! Algo salió mal.',
        description: error.message
      })
      return null
    } finally {
      setLoadingActivity(false)
    }
  }

  async function addActivity({
    dataActivity,
    company_id
  }: {
    dataActivity: PropsAddActivity
    company_id: number
  }): Promise<boolean> {
    setLoadingActivityForm(true)
    const isPublicValue = dataActivity.is_public === 'true' ? true : false

    const generateInvoiceValue =
      dataActivity.generate_invoice === 'true' ? true : false

    const mpAvailableValue = dataActivity.mp_available === 'true' ? true : false

    const newActivity = {
      company_id,
      name: dataActivity.name,
      price: dataActivity.price,
      description: dataActivity.description,
      is_public: isPublicValue,
      generate_invoice: generateInvoiceValue,
      max_sessions: dataActivity.max_sessions,
      mp_available: mpAvailableValue,
      public_name: dataActivity.public_name,
      start_date: dataActivity.start_date,
      end_date: dataActivity.end_date,
      payment_type: dataActivity.payment_type,
      activity_type: dataActivity.activity_type
    }

    const url = `${BASE_URL}api/v1/activity`
    try {
      const response = await axios.post(
        url,
        {
          activity: newActivity
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
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
      setLoadingActivityForm(false)
    }
  }

  async function updateActivity({
    dataActivity,
    company_id
  }: {
    dataActivity: PropsAddActivity
    company_id: number
  }): Promise<boolean> {
    setLoadingActivityForm(true)
    const isPublicValue = dataActivity.is_public === 'true' ? true : false

    const generateInvoiceValue =
      dataActivity.generate_invoice === 'true' ? true : false

    const mpAvailableValue = dataActivity.mp_available === 'true' ? true : false

    const newActivity = {
      company_id,
      id: dataActivity.id,
      name: dataActivity.name,
      description: dataActivity.description,
      price: dataActivity.price,
      is_public: isPublicValue,
      generate_invoice: generateInvoiceValue,
      max_sessions: dataActivity.max_sessions,
      mp_available: mpAvailableValue,
      public_name: dataActivity.public_name,
      start_date: dataActivity.start_date,
      end_date: dataActivity.end_date,
      payment_type: dataActivity.payment_type,
      activity_type: dataActivity.activity_type
    }

    const url = `${BASE_URL}api/v1/activity`
    try {
      const response = await axios.put(
        url,
        {
          activity: newActivity
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          }
        }
      )

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
      setLoadingActivityForm(false)
    }
  }

  async function deleteActivitiesById(activities: number[]): Promise<boolean> {
    setLoadingActivity(true)
    const url = `${BASE_URL}api/v1/activity`
    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: token
        },
        data: {
          ids: activities
        }
      })

      if (response.status === 200 || response.status === 204) {
        toast({
          title: `Actividades con id:'${activities.map(
            (activity) => activity
          )}' eliminado.`,
          className: 'bg-green-600'
        })
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
      setLoadingActivity(false)
    }
  }

  async function addActivitiesToBusinesses({
    activities,
    businesses
  }: {
    activities: number[]
    businesses: number[]
  }): Promise<boolean> {
    setLoadingActivity(true)
    const url = `${BASE_URL}api/v1/duplicate_activities`
    try {
      const response = await axios.post(
        url,
        {
          ids: activities,
          company_ids: businesses
        },
        {
          headers: {
            Authorization: token
          }
        }
      )

      if (response.status === 200) {
        toast({
          title: `Actividades agregadas con éxito.`,
          className: 'bg-green-600'
        })
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
      setLoadingActivity(false)
    }
  }

  return (
    <ActivitiesContext.Provider
      value={{
        activities,
        loadingActivity,
        loadingActivityForm,
        count,
        getAllActivities,
        getActivities,
        getActivityById,
        addActivity,
        updateActivity,
        deleteActivitiesById,
        addActivitiesToBusinesses
      }}
    >
      {children}
    </ActivitiesContext.Provider>
  )
}
