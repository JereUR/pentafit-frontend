export interface DaysAvailable {
  active: boolean
  time_start: string
  time_end: string
  [key: string]: boolean | string
}

export type Diary = {
  id: number
  company_id: number
  activity: { id: number; name: string }
  name: string
  type_schedule: string
  date_from: string
  date_until: string
  days_available: DaysAvailable[]
  repeat_for?: number
  offer_days?: boolean[]
  term_duration: number
  amount_of_people: number
  is_active: boolean
  genre_exclusive: string
  works_holidays: boolean
  observations?: string
}

export type DiaryGroup = GroupedData[]

export type GroupedData = {
  id: number
  company_id: number
  name: string
  activity: { id: number; name: string }
  is_active: boolean
  time_start: string
  time_end: string
}

export const scheduleTypes = ['Por turnos', 'Libre']

export const genreTypes = ['No', 'Masculino', 'Femenino']

export interface PropsAddDiary {
  id?: number | null
  activity: { id: number; name: string }
  name: string
  type_schedule: string
  date_from: Date
  date_until: Date
  time_from: string
  time_until: string
  days_available: DaysAvailable[]
  repeat_for: number
  offer_days: boolean[]
  term_duration: number
  amount_of_people: number
  is_active: string
  genre_exclusive: string
  works_holidays: string
  observations: string
  [key: string]:
    | string
    | undefined
    | boolean
    | Date
    | number
    | null
    | boolean[]
    | DaysAvailable[]
    | { id: number; name: string }
}

export const initialData: PropsAddDiary = {
  activity: { id: 0, name: '' },
  name: '',
  type_schedule: '',
  date_from: new Date(),
  date_until: new Date(),
  time_from: '',
  time_until: '',
  days_available: Array(7).fill({
    active: false,
    time_start: '',
    time_end: ''
  }),
  repeat_for: 0,
  offer_days: Array(7).fill(false),
  term_duration: 0,
  amount_of_people: 0,
  is_active: 'false',
  genre_exclusive: 'No',
  works_holidays: 'false',
  observations: ''
}

export interface Days {
  0: boolean
  1: boolean
  2: boolean
  3: boolean
  4: boolean
  5: boolean
  6: boolean
  7: boolean
  [key: number]: boolean
}

export const initialDays: Days = {
  0: true,
  1: true,
  2: true,
  3: true,
  4: true,
  5: true,
  6: true,
  7: true
}

export interface ExcelData {
  ID?: number
  Tipo?: string
  Actividad?: string
  Fecha_inicio?: string
  Fecha_fin?: string
  Horario_desde?: string
  Horario_hasta?: string
  Dias_habilitados?: string
  Repetir_por?: number
  Días_de_ofertas?: string
  Duración?: number
  Cantidad_de_personas?: number
  Activa?: string
  Exclusividad_de_géneros?: string
  Trabaja_feriados?: string
  Observaciones?: string
}

export interface FormErrors {
  activity?: string
  name?: string
  type_schedule?: string
  date_from?: string
  date_until?: string
  days_available?: string
  time_start?: string
  time_end?: string
  repeat_for?: string
  offer_days?: string
  term_duration?: string
  amount_of_people?: string
  is_active?: string
  genre_exclusive?: string
  works_holidays?: string
  observations?: string
  [key: string]: string | undefined
}

export const initialErrors: FormErrors = {
  activity: '',
  name: '',
  type_schedule: '',
  date_from: '',
  date_until: '',
  days_available: '',
  time_start: '',
  time_end: '',
  repeat_for: '',
  offer_days: '',
  term_duration: '',
  amount_of_people: '',
  is_active: '',
  genre_exclusive: '',
  works_holidays: '',
  observations: ''
}

export const daysOfWeek = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo'
]

export const daysOfWeekCut = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

export const hoursOfDays = [
  '06:00',
  '06:30',
  '07:00',
  '07:30',
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
  '21:30',
  '22:00',
  '22:30',
  '23:00',
  '23:30',
  '00:00'
]
