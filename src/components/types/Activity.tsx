import { Business } from './Business'

export type Activity = {
  id: string
  id_business: number
  activity: string
  cost: number
  isPublic: boolean
  publicName?: string
  quotaGeneration: boolean
  sessionMax: number
  mpAvailable: boolean
  dateFrom: Date
  dateUntil: Date
  paymentType: string
}

export interface PropsAddActivity {
  business: Business | null
  activity: string
  cost: string
  isPublic: string
  quotaGeneration: string
  mpAvailable: string
  publicName: string | undefined
  sessionMax: string
  dateFrom: string | undefined
  dateUntil: string | undefined
  paymentType: string
}

export interface FormErrors {
  business?: string
  activity?: string
  cost?: string
  isPublic?: string
  quotaGeneration?: string
  sessionMax?: string
  mpAvailable?: string
  dateFrom?: string
  dateUntil?: string
  paymentType?: string
  publicName?: string
  [key: string]: string | undefined
}

export const initialData = {
  business: null,
  activity: '',
  cost: '',
  isPublic: 'false',
  quotaGeneration: 'false',
  mpAvailable: 'false',
  publicName: '',
  sessionMax: '',
  dateFrom: '',
  dateUntil: '',
  paymentType: 'Por sesión'
}
