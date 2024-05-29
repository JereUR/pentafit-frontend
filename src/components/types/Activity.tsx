import { Business } from './Business'

export type Activity = {
  id: number
  company_id: number
  name: string
  price: number
  is_public: boolean
  public_name?: string
  generate_invoice: boolean
  max_sessions: number
  mp_available: boolean
  start_date: Date
  end_date: Date
  payment_type: string
}

export interface PropsAddActivity {
  business: Business | null
  name: string
  price: string
  is_public: string
  generate_invoice: string
  mp_available: string
  public_name: string | undefined
  max_sessions: string
  start_date: Date
  end_date: Date
  payment_type: string
}

export interface FormErrors {
  business?: string
  name?: string
  price?: string
  is_public?: string
  generate_invoice?: string
  max_sessions?: string
  mp_available?: string
  start_date?: string
  end_date?: string
  payment_type?: string
  public_name?: string
  [key: string]: string | undefined
}

export const initialData = {
  business: null,
  name: '',
  price: '',
  is_public: 'false',
  generate_invoice: 'false',
  mp_available: 'false',
  public_name: '',
  max_sessions: '',
  start_date: new Date(),
  end_date: new Date(),
  payment_type: 'Por sesión'
}
