export type Metadata = {
  title?: string
  primary_color?: string
  secondary_color?: string
  third_color?: string
  slogan?: string
  logoWeb?: string | null
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
  id?: number | null
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
  logoWeb?: File | null
  logoWebUrl?: string | null
}

export const initialData = {
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
  slogan: '',
  logoWebUrl: '',
  logoWeb: null
}

export interface FormErrors {
  name?: string
  description?: string
  email?: string
  address?: string
  phone?: string
  instagram?: string
  facebook?: string
  logo?: string
  title?: string
  primary_color?: string
  secondary_color?: string
  third_color?: string
  slogan?: string
  [key: string]: string | undefined
}

export const initialErrors = {
  name: '',
  description: '',
  email: '',
  address: '',
  phone: '',
  instagram: '',
  facebook: '',
  logo: '',
  title: '',
  primary_color: '',
  secondary_color: '',
  third_color: '',
  slogan: ''
}
