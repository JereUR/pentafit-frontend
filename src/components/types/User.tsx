import { Business } from './Business'

export type User = {
  birthdate: string
  created_at: string
  email: string
  first_name: string
  gender: string
  id: number
  business?: Business[] | []
  last_name: string
  photo?: string | null
  role: string | null
}

export type Session = {
  id: number
  first_name: string
  last_name: string
  email: string
  photo_url: string | null
  token: string
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
