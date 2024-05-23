export type Metadata = {
  title?: string
  primary_color?: string
  secondary_color?: string
  third_color?: string
  slogan?: string
}

export type Business = {
  id: number
  name: string
  description?: string
  email?: string
  address?: string
  phone?: string
  instagram?: string
  facebook?: string
  isActive: boolean
  isWorking: boolean
  logo?: string | null
  metadata?: Metadata
}

export interface PropsAddBusiness {
  name: string
  description?: string
  email?: string
  address?: string
  phone?: string
  instagram?: string
  facebook?: string
  logo?: File | string | null
  title: string
  primary_color: string
  secondary_color: string
  third_color: string
  slogan?: string
}

export const initialData = {
  name: '',
  description: '',
  email: '',
  address: '',
  phone: '',
  instagram: '',
  facebook: '',
  logo: null as unknown as File,
  title: '',
  primary_color: '#ec6409',
  secondary_color: '#FFFFFF',
  third_color: '#000000',
  slogan: ''
}
