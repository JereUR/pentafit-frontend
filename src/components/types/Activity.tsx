export type Activity = {
  id: string
  description: string
  amount: number
  isPublic: boolean
  quotaGeneration: boolean
  sessionMax: number
  mpAvailable: boolean
  dateFrom: Date
  dateUntil: Date
  paymentType: 'Sesion' | 'Diario' | 'Semanal' | 'Mensual'
}
