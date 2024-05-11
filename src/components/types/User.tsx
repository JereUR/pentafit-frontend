export type User = {
  birthdate: string
  created_at: string
  email: string
  first_name: string
  gender: string
  id: number
  last_name: string
  photo: string | null
  role: string | null
}

export interface PropsRegister {
  first_name: string
  last_name: string
  email: string
  gender: string | undefined
  date: string | undefined
  password: string
  confirm_password: string
}