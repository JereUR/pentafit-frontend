export type Diary = {
  id: number
  company_id: number
  type_schedule: string
  date_from: string
  date_until: string
  time_from: string
  time_until: string
  days_available: boolean[]
  repeat_for?: number
  offer_days?: boolean[]
  term_duration: number
  amount_of_people: number
  is_active: boolean
  genre_exclusive: boolean
  works_holidays: boolean
  observations?: string
}

export const scheduleTypes = ['Por turnos', 'Libre']

export interface PropsAddDiary {
  id: number | null
  type_schedule: string
  date_from: Date
  date_until: Date
  time_from: string
  time_until: string
  days_available: boolean[]
  repeat_for: number
  offer_days: boolean[]
  term_duration: number
  amount_of_people: number
  is_active: boolean
  genre_exclusive: boolean
  works_holidays: boolean
  observations: string
  [key: string]: string | undefined | boolean | Date | number | null | boolean[]
}

export const initialData: PropsAddDiary = {
  id: null,
  type_schedule: '',
  date_from: new Date(),
  date_until: new Date(),
  time_from: '',
  time_until: '',
  days_available: Array(7).fill(false),
  repeat_for: 0,
  offer_days: Array(7).fill(false),
  term_duration: 0,
  amount_of_people: 0,
  is_active: false,
  genre_exclusive: false,
  works_holidays: false,
  observations: ''
}

export interface Columns {
  type_schedule: boolean
  date_from: boolean
  date_until: boolean
  time_from: boolean
  time_until: boolean
  days_available: boolean
  repeat_for?: boolean
  offer_days?: boolean
  term_duration: boolean
  amount_of_people: boolean
  is_active: boolean
  genre_exclusive: boolean
  works_holidays: boolean
  observations?: boolean
}

export const initialColumns: Columns = {
  type_schedule: true,
  date_from: true,
  date_until: true,
  time_from: true,
  time_until: true,
  days_available: true,
  repeat_for: true,
  offer_days: true,
  term_duration: true,
  amount_of_people: true,
  is_active: true,
  genre_exclusive: true,
  works_holidays: true,
  observations: true
}
