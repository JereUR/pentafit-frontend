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
  is_active: boolean
  is_working: boolean
  logo?: string | null
  metadata?: Metadata
}

export interface PropsAddBusiness {
  id: number
  name: string
  description?: string
  email?: string
  address?: string
  phone?: string
  instagram?: string
  facebook?: string
  logo?: File | null
  logoUrl?: string | null
  title: string
  primary_color: string
  secondary_color: string
  third_color: string
  slogan?: string
}

export const initialData = {
  id: 1,
  name: '',
  description: '',
  email: '',
  address: '',
  phone: '',
  instagram: '',
  facebook: '',
  logoUrl: '',
  logo: null,
  title: '',
  primary_color: '#ec6409',
  secondary_color: '#FFFFFF',
  third_color: '#000000',
  slogan: ''
}
