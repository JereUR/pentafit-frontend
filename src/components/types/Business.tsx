export type Business = {
  id: number
  name: string
  description?: string
  isActive: boolean
  isWorking: boolean
  logo?: string
  metadata?: string
}

export interface PropsAddBusiness {
  name: string
  description?: string
  logo?: string
  metadata?: string
}

export const initialData = {
  name: '',
  description: '',
  logo: '',
  metadata: ''
}
