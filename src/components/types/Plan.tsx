export type Plan = {
  id: number
  company_id: number[]
  name: string
  description: string
  price: number
  start_date: string
  end_date: string
  expiration_period: number
  generate_invoice: boolean
  payment_type: string[]
  plan_type: string
  free_test: boolean
  current: boolean
  activities:
    | { id: number; days_of_week: boolean[]; sessions_per_week: number }[]
}

export type ExportPlan = {
  id: number
  company_id: number[]
  name: string
  description: string
  price: number
  start_date: string
  end_date: string
  expiration_period: number
  generate_invoice: boolean
  payment_type: string[]
  plan_type: string
  free_test: boolean
  current: boolean
  activities: number
}

export interface PropsAddPlan {
  id: number | null
  name: string
  description: string
  price: string
  start_date: Date
  end_date: Date
  expiration_period: string
  generate_invoice: string
  payment_type: string[]
  plan_type: string
  free_test: string
  current: string
  activities: {
    id: number
    days_of_week: boolean[]
    sessions_per_week: string
  }[]
  [key: string]:
    | string
    | undefined
    | Date
    | String[]
    | null
    | number
    | number[]
    | { id: number; days_of_week: boolean[]; sessions_per_week: string }[]
}

export const initialData: PropsAddPlan = {
  id: null,
  name: '',
  description: '',
  price: '',
  start_date: new Date(),
  end_date: new Date(),
  expiration_period: '',
  generate_invoice: 'false',
  payment_type: [],
  plan_type: '',
  free_test: 'false',
  current: 'false',
  activities: []
}

export const plansType = ['Mensual', 'Clase única', 'Membresía']

export const paymentsType = ['Efectivo', 'Transferencia', 'Débito automático']

export interface FormErrors {
  business?: string
  name?: string
  description?: string
  price?: string
  start_date?: string
  end_date?: string
  expiration_period?: string
  generate_invoice?: string
  payment_type?: string
  plan_type?: string
  free_test?: string
  current?: string
  [key: string]: string | undefined
}

export interface FormErrorActivities {
  id: number
  error: string
}

export interface Columns {
  name: boolean
  description: boolean
  price: boolean
  start_date: boolean
  end_date: boolean
  expiration_period: boolean
  generate_invoice: boolean
  payment_type: boolean
  plan_type: boolean
  free_test: boolean
  current: boolean
  activities: boolean
}

export const initialColumns: Columns = {
  name: true,
  description: true,
  price: true,
  start_date: true,
  end_date: true,
  expiration_period: true,
  generate_invoice: true,
  payment_type: true,
  plan_type: true,
  free_test: true,
  current: true,
  activities: true
}
