import { Plan } from '../types/Plan'

export const initialPlans: Plan[] = [
  {
    id: 1,
    company_id: [1, 2],
    name: 'Plan 1',
    description: 'test',
    price: 200,
    start_date: '2024-4-20',
    end_date: '2024-5-20',
    expiration_period: 30,
    generate_invoice: false,
    payment_type: ['Efectivo', 'Transferencia', 'Debito automático'],
    plan_type: 'Mensual',
    free_test: false,
    current: false,
    diaries: [
      {
        id: 1,
        name: 'Agenda 1',
        activity: 'Actividad 1',
        days_of_week: [false, true, true, true, true, true, false],
        sessions_per_week: 5
      },
      {
        id: 2,
        name: 'Agenda 2',
        activity: 'Actividad 2',
        days_of_week: [true, true, true, true, true, true, true],
        sessions_per_week: 5
      },
      {
        id: 3,
        name: 'Agenda 3',
        activity: 'Actividad 1',
        days_of_week: [true, false, false, false, false, false, false],
        sessions_per_week: 5
      }
    ],
    diaries_count: 3
  },
  {
    id: 2,
    company_id: [1],
    name: 'Plan 2',
    description: 'test',
    price: 200,
    start_date: '2024-4-20',
    end_date: '2024-5-20',
    expiration_period: 30,
    generate_invoice: false,
    payment_type: ['Efectivo', 'Debito automático'],
    plan_type: 'Mensual',
    free_test: false,
    current: false,
    diaries: [],
    diaries_count: 3
  }
]
