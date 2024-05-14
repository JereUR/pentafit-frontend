export type Activity = {
  id: string
  activity: string
  cost: number
  isPublic: boolean
  publicName?: string
  quotaGeneration: boolean
  sessionMax: number
  mpAvailable: boolean
  dateFrom: Date
  dateUntil: Date
  paymentType: 'Por sesion' | 'Por período' | 'Mensual' | 'Mensual con sesiones'
}

export interface PropsAdd {
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

export const initialData = {
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
