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
