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
  id?: number
  first_name: string
  last_name: string
  gender: string
  birthdate: Date
  phone?: number
  address?: string
  [key: string]: string | undefined | number | Date
}

export const initialDataUpdateProfile: PropsUpdateProfile = {
  id: undefined,
  first_name: '',
  last_name: '',
  gender: '',
  birthdate: new Date(),
  phone: undefined,
  address: undefined
}

export interface FormErrorsUpdateProfile {
  first_name?: string
  last_name?: string
  gender?: string
  birthdate?: string
  phone?: string
  address?: string
  [key: string]: string | undefined
}

export const initialErrorsUpdateProfile: FormErrorsUpdateProfile = {
  first_name: '',
  last_name: '',
  gender: '',
  birthdate: '',
  phone: undefined,
  address: undefined
}

export interface PropsUpdatePassword {
  id?: number
  actual_password?: string
  new_password?: string
  confirm_new_password?: string
  [key: string]: string | undefined | number
}

export const initialDataUpdatePassword: PropsUpdatePassword = {
  id: undefined,
  actual_password: '',
  new_password: '',
  confirm_new_password: ''
}

export interface FormErrorsUpdatePassword {
  actual_password?: string
  new_password?: string
  confirm_new_password?: string
  [key: string]: string | undefined
}

export const initialErrorsUpdatePassword: FormErrorsUpdatePassword = {
  actual_password: '',
  new_password: '',
  confirm_new_password: ''
}
