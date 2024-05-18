export type Business = {
  id: number
  name: string
  description?: string
  isActive: boolean
  isWorking: boolean
  logo?: string
  metadata?: JSON
}

export interface PropsAddBusiness {
  name: string
  description?: string
  logo?: string
  title: string
  primary_color: string
  secondary_color: string
}

export const initialData = {
  name: '',
  description: '',
  logo: '',
  title: '',
  primary_color: '#FFFFFF',
  secondary_color: '#FFFFFF'
}
