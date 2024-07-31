import { Company } from './User'

export interface ItemCreate {
  id: number
  field: string
  field_name: string
  date: string
}

export interface ItemAssignment {
  id: number
  assigment_to?: number[]
  field: string
  field_name: string[]
  date: string
}

export interface ItemErased {
  id: number
  field: string
  field_name: string
  date: string
}

export interface ItemUpdate {
  id: number
  field: string
  field_name: string
  date: string
  updates?: string[]
}

export interface LastRecords {
  id: number
  field: string
  date: string
  type: string
}

export type MemberRecord = {
  id: number
  member_id: number
  creations: number
  assignments: number
  erased: number
  updates: number
  last_records: LastRecords[]
}

export interface PropsAddMember {
  id?: number | null
  first_name: string
  last_name: string
  businesses: Company[]
  email: string
  phone?: number
  gender?: string
  birthdate?: Date
  role: string | null
  password?: string
  password_confirmation?: string
  [key: string]: string | undefined | number | null | Date | Company[]
}

export const initialDataAddMember: PropsAddMember = {
  id: null,
  first_name: '',
  last_name: '',
  businesses: [],
  email: '',
  phone: undefined,
  gender: '',
  birthdate: new Date(),
  role: '',
  password: '',
  password_confirmation: ''
}

export interface FormErrorsAddMember {
  first_name?: string
  last_name?: string
  businesses?: string
  email?: string
  phone?: string
  gender?: string
  birthdate?: string
  role?: string
  password?: string
  password_confirmation?: string
  [key: string]: string | undefined
}

export const initialErrorsAddMember: FormErrorsAddMember = {
  first_name: '',
  last_name: '',
  businesses: '',
  email: '',
  phone: '',
  gender: '',
  birthdate: '',
  role: '',
  password: '',
  password_confirmation: ''
}

export interface Columns {
  first_name: boolean
  last_name: boolean
  email: boolean
  role: boolean
  businesses: boolean
  phone: boolean
  birthdate: boolean
  gender: boolean
  address: boolean
  created_at: boolean
}

export const initialColumns: Columns = {
  first_name: true,
  last_name: true,
  email: true,
  role: true,
  businesses: true,
  phone: true,
  birthdate: true,
  gender: true,
  address: true,
  created_at: true
}

export const posibleRoles = ['Admin', 'Staff']

export const posibleGenders = ['Masculino', 'Femenino', 'Otros']
