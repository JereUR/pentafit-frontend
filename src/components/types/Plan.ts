export interface DiaryPlan {
  id: number
  name: string
  activity: string
  days_of_week: boolean[]
  sessions_per_week: number
}

export type Plan = {
  id: number
  company_id: number[]
  diaries: DiaryPlan[]
  diaries_count:number
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
  
}

export interface PropsAddPlan {
  id?: number | null
  diaries: DiaryPlan[]
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
  [key: string]:
    | string
    | undefined
    | Date
    | String[]
    | null
    | number
    | DiaryPlan[]
}

export const initialData: PropsAddPlan = {
  diaries: [],
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
  current: 'false'
}

export const plansType = ['Mensual', 'Clase única', 'Membresía']

export const paymentsType = ['Efectivo', 'Transferencia', 'Débito automático']

export interface FormErrors {
  business?: string
  diaries?: string
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

export const initialErrors: FormErrors = {
  diaries: '',
  name: '',
  description: '',
  price: '',
  start_date: '',
  end_date: '',
  expiration_period: '',
  payment_type: '',
  plan_type: ''
}

export interface FormErrorDiaries {
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
  diaries: boolean
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
  diaries: true
}
