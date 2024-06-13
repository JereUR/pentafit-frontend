'use client'

import { createContext, ReactNode, useState } from 'react'
import axios from 'axios'

import { ExportPlan, Plan, PropsAddPlan } from '../types/Plan'
import { useToast } from '../ui/use-toast'
import useUser from '../hooks/useUser'

type PlansContextType = {
  plans: ExportPlan[] | []
  loadingPlan: boolean
  count: number
  getAllPlans: (business_id: number) => Promise<ExportPlan[] | []>
  getPlans: ({
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
  getPlanById: ({
    id,
    business_id
  }: {
    id: string
    business_id: number
  }) => Promise<Plan | null>
  addPlan: ({
    dataPlan,
    company_id
  }: {
    dataPlan: PropsAddPlan
    company_id: number
  }) => Promise<boolean>
  updatePlan: ({
    dataPlan,
    company_id
  }: {
    dataPlan: PropsAddPlan
    company_id: number
  }) => Promise<boolean>
  deletePlansById: (plans: number[]) => Promise<boolean>
  addPlansToBusinesses: ({
    plans,
    businesses
  }: {
    plans: number[]
    businesses: number[]
  }) => Promise<boolean>
}

export const PlansContext = createContext<PlansContextType | null>(null)

const initialPlans = [
  {
    id: 1,
    company_id: [1, 2],
    name: 'Plan 1',
    description: 'test',
    price: 200,
    start_date: '2024-4-20',
    end_date: '2024-5-20',
    expiration_period: 30,
    generate_invoice: false,
    payment_type: ['Efectivo', 'Transferencia', 'Debito automático'],
    plan_type: 'Mensual',
    free_test: false,
    current: false,
    activities: []
  },
  {
    id: 2,
    company_id: [1],
    name: 'Plan 2',
    description: 'test',
    price: 200,
    start_date: '2024-4-20',
    end_date: '2024-5-20',
    expiration_period: 30,
    generate_invoice: false,
    payment_type: ['Efectivo', 'Debito automático'],
    plan_type: 'Mensual',
    free_test: false,
    current: false,
    activities: []
  }
]

export default function PlansContextProvider({
  children
}: {
  children: ReactNode
}) {
  const [plans, setPlans] = useState<ExportPlan[] | []>([])
  const [loadingPlan, setLoadingPlan] = useState<boolean>(true)
  const [count, setCount] = useState(0)
  const { toast } = useToast()
  const { token } = useUser()
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL

  async function getAllPlans(business_id: number): Promise<ExportPlan[] | []> {
    setLoadingPlan(true)
    const url = `${BASE_URL}api/v1/all_plans?company_id=${business_id}`

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
      setLoadingPlan(false)
    }
  }

  async function getPlans({
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
    setLoadingPlan(true)
    const params = new URLSearchParams()
    params.append('regex', q)
    params.append('page', page)
    params.append('items_per_page', ITEMS_PER_PAGE.toString())
    params.append('company_id', business_id.toString())
    const url = `${BASE_URL}api/v1/plans?${params.toString()}`

    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      })

      if (response.status === 200 || response.status === 204) {
        setPlans(response.data.plans)
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
      setLoadingPlan(false)
    }
  }

  async function getPlanById({
    id,
    business_id
  }: {
    id: string
    business_id: number
  }): Promise<Plan | null> {
    setLoadingPlan(true)
    const params = new URLSearchParams()
    params.append('id', id)
    params.append('company_id', business_id.toString())
    const url = `${BASE_URL}api/v1/plan?${params.toString()}`
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
      setLoadingPlan(false)
    }
  }

  async function addPlan({
    dataPlan,
    company_id
  }: {
    dataPlan: PropsAddPlan
    company_id: number
  }): Promise<boolean> {
    setLoadingPlan(true)
    const freeTestValue = dataPlan.free_test === 'true' ? true : false

    const generateInvoiceValue =
      dataPlan.generate_invoice === 'true' ? true : false

    const currentValue = dataPlan.current === 'true' ? true : false

    const newPlan = {
      company_id,
      name: dataPlan.name,
      description: dataPlan.description,
      price: dataPlan.price,
      free_test: freeTestValue,
      start_date: dataPlan.start_date,
      end_date: dataPlan.end_date,
      generate_invoice: generateInvoiceValue,
      payment_type: dataPlan.payment_type,
      plan_type: dataPlan.plan_type,
      current: currentValue,
      expiration_period: dataPlan.expiration_period
    }

    let url = `${BASE_URL}api/v1/plan`
    try {
      const response = await axios.post(
        url,
        {
          plan: newPlan
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          }
        }
      )

      if (response.status === 201) {
        const id = response.data.id
        url = `${BASE_URL}api/v1/plan_activities`
        try {
          const response = await axios.post(
            url,
            {
              plan_activity: {
                plan_id: id,
                activity_ids: dataPlan.activities
              }
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
        }
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
      setLoadingPlan(false)
    }
  }

  async function updatePlan({
    dataPlan,
    company_id
  }: {
    dataPlan: PropsAddPlan
    company_id: number
  }): Promise<boolean> {
    setLoadingPlan(true)
    const freeTestValue = dataPlan.free_test === 'true' ? true : false

    const generateInvoiceValue =
      dataPlan.generate_invoice === 'true' ? true : false

    const currentValue = dataPlan.current === 'true' ? true : false

    const newPlan = {
      id: dataPlan.id,
      company_id,
      name: dataPlan.name,
      description: dataPlan.description,
      price: dataPlan.price,
      free_test: freeTestValue,
      start_date: dataPlan.start_date,
      end_date: dataPlan.end_date,
      generate_invoice: generateInvoiceValue,
      payment_type: dataPlan.payment_type,
      plan_type: dataPlan.plan_type,
      current: currentValue,
      activities: dataPlan.activities
    }

    let url = `${BASE_URL}api/v1/plan`
    try {
      const response = await axios.put(
        url,
        {
          plan: newPlan
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          }
        }
      )
      if (dataPlan.activities.length > 0) {
        if (response.status === 200) {
          url = `${BASE_URL}api/v1/plan_activities`
          try {
            const response = await axios.post(
              url,
              {
                plan_activity: {
                  plan_id: dataPlan.id,
                  activity_ids: dataPlan.activities
                }
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
          }
        } else {
          toast({
            title: 'Oh no! Algo salió mal.',
            description: response.statusText
          })
          return false
        }
      } else {
        return true
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Oh no! Algo salió mal.',
        description: error.message
      })
      return false
    } finally {
      setLoadingPlan(false)
    }
  }

  async function deletePlansById(plans: number[]): Promise<boolean> {
    setLoadingPlan(true)
    const url = `${BASE_URL}api/v1/plan`
    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: token
        },
        data: {
          ids: plans
        }
      })

      if (response.status === 200 || response.status === 204) {
        toast({
          title: `Planes con id:'${plans.map((plan) => plan)}' eliminado.`,
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
      setLoadingPlan(false)
    }
  }

  async function addPlansToBusinesses({
    plans,
    businesses
  }: {
    plans: number[]
    businesses: number[]
  }): Promise<boolean> {
    setLoadingPlan(true)
    const url = `${BASE_URL}api/v1/duplicate_plan`
    try {
      const response = await axios.post(
        url,
        {
          ids: plans,
          company_ids: businesses
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          }
        }
      )

      if (response.status === 200) {
        toast({
          title: `Planes agregados con éxito.`,
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
      setLoadingPlan(false)
    }
  }

  return (
    <PlansContext.Provider
      value={{
        plans,
        loadingPlan,
        count,
        getAllPlans,
        getPlans,
        getPlanById,
        addPlan,
        updatePlan,
        deletePlansById,
        addPlansToBusinesses
      }}
    >
      {children}
    </PlansContext.Provider>
  )
}
