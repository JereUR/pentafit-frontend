'use client'

import { createContext, ReactNode, useState } from 'react'
import axios from 'axios'

import { useToast } from '../ui/use-toast'
import useUser from '../hooks/useUser'
import { Diary, PropsAddDiary } from '../types/Diary'
import { initialDiaries } from '../db/DiaryData'

type DiariesContextType = {
  diaries: Diary[] | []
  loadingDiary: boolean
  count: number
  getAllDiaries: (business_id: number) => Promise<Diary[] | []>
  getDiaries: ({
    q,
    business_id
  }: {
    q: string
    business_id: number
  }) => Promise<void>
  getDiaryById: ({
    id,
    business_id
  }: {
    id: string
    business_id: number
  }) => Promise<Diary | null>
  addDiary: ({
    dataDiary,
    company_id
  }: {
    dataDiary: PropsAddDiary
    company_id: number
  }) => Promise<boolean>
  updateDiary: ({
    dataDiary,
    company_id
  }: {
    dataDiary: PropsAddDiary
    company_id: number
  }) => Promise<boolean>
  deleteDiaryById: (diary: number) => Promise<boolean>
  addDiariesToBusinesses: ({
    diaries,
    businesses
  }: {
    diaries: number[]
    businesses: number[]
  }) => Promise<boolean>
}

export const DiariesContext = createContext<DiariesContextType | null>(null)

export default function DiariesContextProvider({
  children
}: {
  children: ReactNode
}) {
  const [diaries, setDiaries] = useState<Diary[] | []>([])
  const [loadingDiary, setLoadingDiary] = useState<boolean>(true)
  const [count, setCount] = useState(0)
  const { toast } = useToast()
  const { token } = useUser()
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL

  async function getAllDiaries(business_id: number): Promise<Diary[] | []> {
    setLoadingDiary(true)
    const url = `${BASE_URL}api/v1/all_diaries?company_id=${business_id}`

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
      setLoadingDiary(false)
      return initialDiaries
    }
  }

  async function getDiaries({
    q,
    business_id
  }: {
    q: string
    business_id: number
  }): Promise<void> {
    setLoadingDiary(true)
    const params = new URLSearchParams()
    params.append('regex', q)
    params.append('company_id', business_id.toString())
    const url = `${BASE_URL}api/v1/diaries?${params.toString()}`

    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      })

      if (response.status === 200 || response.status === 204) {
        setDiaries(response.data.Diaries)
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
      setLoadingDiary(false)
      setDiaries(initialDiaries)
    }
  }

  async function getDiaryById({
    id,
    business_id
  }: {
    id: string
    business_id: number
  }): Promise<Diary | null> {
    return initialDiaries[0]
    setLoadingDiary(true)
    const params = new URLSearchParams()
    params.append('id', id)
    params.append('company_id', business_id.toString())
    const url = `${BASE_URL}api/v1/diary?${params.toString()}`
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
      setLoadingDiary(false)
    }
  }

  async function addDiary({
    dataDiary,
    company_id
  }: {
    dataDiary: PropsAddDiary
    company_id: number
  }): Promise<boolean> {
    setLoadingDiary(true)
    const isActiveValue = dataDiary.is_active === 'true' ? true : false

    const worksHolidaysValue =
      dataDiary.works_holidays === 'true' ? true : false

    const newDiary = {
      company_id,
      activity: { id: dataDiary.activity.id, name: dataDiary.activity.name },
      type_schedule: dataDiary.type_schedule,
      date_from: dataDiary.date_from,
      date_until: dataDiary.date_until,
      days_available: dataDiary.days_available,
      repeat_for: dataDiary.repeat_for,
      offer_days: dataDiary.offer_days,
      term_duration: dataDiary.term_duration,
      amount_of_people: dataDiary.amount_of_people,
      is_active: isActiveValue,
      genre_exclusive: dataDiary.genre_exclusive,
      works_holidays: worksHolidaysValue,
      observations: dataDiary.observations
    }

    const url = `${BASE_URL}api/v1/diary`
    try {
      const response = await axios.post(
        url,
        {
          diary: newDiary
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
      setLoadingDiary(false)
    }
  }

  async function updateDiary({
    dataDiary,
    company_id
  }: {
    dataDiary: PropsAddDiary
    company_id: number
  }): Promise<boolean> {
    setLoadingDiary(true)
    const isActiveValue = dataDiary.is_active === 'true' ? true : false

    const worksHolidaysValue =
      dataDiary.works_holidays === 'true' ? true : false

    const newDiary = {
      company_id,
      id: dataDiary.id,
      activity: { id: dataDiary.activity.id, name: dataDiary.activity.name },
      type_schedule: dataDiary.type_schedule,
      date_from: dataDiary.date_from,
      date_until: dataDiary.date_until,
      days_available: dataDiary.days_available,
      repeat_for: dataDiary.repeat_for,
      offer_days: dataDiary.offer_days,
      term_duration: dataDiary.term_duration,
      amount_of_people: dataDiary.amount_of_people,
      is_active: isActiveValue,
      genre_exclusive: dataDiary.genre_exclusive,
      works_holidays: worksHolidaysValue,
      observations: dataDiary.observations
    }

    const url = `${BASE_URL}api/v1/diary`
    try {
      const response = await axios.put(
        url,
        {
          diary: newDiary
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
      setLoadingDiary(false)
    }
  }

  async function deleteDiaryById(diary: number): Promise<boolean> {
    setLoadingDiary(true)
    const url = `${BASE_URL}api/v1/Diary`
    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: token
        },
        data: {
          ids: diaries
        }
      })

      if (response.status === 200 || response.status === 204) {
        toast({
          title: `Actividades con id:'${diary}' eliminado.`,
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
      setLoadingDiary(false)
    }
  }

  async function addDiariesToBusinesses({
    diaries,
    businesses
  }: {
    diaries: number[]
    businesses: number[]
  }): Promise<boolean> {
    setLoadingDiary(true)
    const url = `${BASE_URL}api/v1/duplicate_diaries`
    try {
      const response = await axios.post(
        url,
        {
          ids: diaries,
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
      setLoadingDiary(false)
    }
  }

  return (
    <DiariesContext.Provider
      value={{
        diaries,
        loadingDiary,
        count,
        getAllDiaries,
        getDiaries,
        getDiaryById,
        addDiary,
        updateDiary,
        deleteDiaryById,
        addDiariesToBusinesses
      }}
    >
      {children}
    </DiariesContext.Provider>
  )
}
