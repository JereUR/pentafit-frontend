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
  publicName: string
  sessionMax: string
  dateFrom: string | undefined
  dateUntil: string | undefined
  paymentType: string
}
