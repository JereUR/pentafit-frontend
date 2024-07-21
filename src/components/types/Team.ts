export interface PropsAddMember {
  id?: number | null
  first_name: string
  last_name: string
  email: string
  phone?: number
  gender?: string
  date?: Date
  role: string
  password?: string
  password_confirmation?: string
  [key: string]: string | undefined | number | null | Date
}

export const initialDataAddMember: PropsAddMember = {
  id: null,
  first_name: '',
  last_name: '',
  email: '',
  phone: undefined,
  gender: '',
  date: new Date(),
  role: '',
  password: '',
  password_confirmation: ''
}

export interface FormErrorsAddMember {
  first_name?: string
  last_name?: string
  email?: string
  phone?: string
  gender?: string
  date?: string
  role?: string
  password?: string
  password_confirmation?: string
  [key: string]: string | undefined
}

export const initialErrorsAddMember: FormErrorsAddMember = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  gender: '',
  date: '',
  role: '',
  password: '',
  password_confirmation: ''
}
