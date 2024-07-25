export interface Company {
  id: number
  name: string
}

export type User = {
  birthdate: string
  created_at: string
  email: string
  first_name: string
  gender: string
  id: number
  businesses: Company[]
  last_name: string
  phone: number
  photo?: string | null
  address?: string
  role: string | null
}

type UserSession = {
  id: number
  email: string
  first_name: string
  last_name: string
  gender: string
  birthdate: string
  role: string | null
  photo: string | null
  created_at: string
}

export type Session = {
  user: UserSession
}

export interface PropsRegister {
  first_name: string
  last_name: string
  email: string
  gender: string
  date: string
  password: string
  confirm_password: string
}

export interface PropsLogin {
  email: string
  password: string
}

export interface PropsUpdateProfile {
  first_name: string
  last_name: string
  gender: string
  birthdate: string
  phone?: number
  address?: string
  actual_password?: string
  new_password?: string
  confirm_new_password?: string
  [key: string]: string | undefined | number
}

export const initialDataUpdateProfile: PropsUpdateProfile = {
  first_name: '',
  last_name: '',
  gender: '',
  birthdate: '',
  photo: undefined,
  address: undefined,
  actual_password: '',
  new_password: '',
  confirm_new_password: ''
}

export interface FormErrorsUpdateProfile {
  first_name?: string
  last_name?: string
  gender?: string
  birthdate?: string
  photo?: string
  address?: string
  actual_password?: string
  new_password?: string
  confirm_new_password?: string
  [key: string]: string | undefined
}

export const initialErrorsUpdateProfile: FormErrorsUpdateProfile = {
  first_name: '',
  last_name: '',
  gender: '',
  birthdate: '',
  phone: undefined,
  address: undefined,
  actual_password: '',
  new_password: '',
  confirm_new_password: ''
}
