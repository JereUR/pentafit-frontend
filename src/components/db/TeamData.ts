import {
  ItemAssignment,
  ItemCreate,
  ItemErased,
  ItemUpdate,
  MemberRecord
} from '../types/Team'
import { User } from '../types/User'

export const initialMembers: User[] = [
  {
    birthdate: '1990-01-01',
    created_at: '2022-01-01',
    email: 'tony.soprano@example.com',
    first_name: 'Tony',
    gender: 'Masculino',
    id: 1,
    businesses: [
      { id: 1, name: 'Lo de Toscano' },
      { id: 2, name: 'Business 2' }
    ],
    last_name: 'Soprano',
    phone: 1234567890,
    photo:
      'https://cdn.zendalibros.com/wp-content/uploads/tony-soprano-serie.jpg',
    role: 'Admin'
  },
  {
    birthdate: '1995-02-15',
    created_at: '2022-02-15',
    email: 'jane.doe@example.com',
    first_name: 'Jane',
    gender: 'Femenino',
    id: 2,
    businesses: [{ id: 1, name: 'Lo de Toscano' }],
    last_name: 'Doe',
    phone: 9876543210,
    photo: null,
    role: 'Staff'
  },
  {
    birthdate: '2000-03-10',
    created_at: '2022-03-10',
    email: 'bob.smith@example.com',
    first_name: 'Bob',
    gender: 'Masculino',
    id: 3,
    businesses: [{ id: 3, name: 'BOCA BOCA BOCA' }],
    last_name: 'Smith',
    phone: 1234567890,
    photo: null,
    role: 'Member'
  }
]

export const exampleMemberRecord: MemberRecord = {
  id: 1,
  member_id: 1,
  creations: 2,
  assignments: 3,
  erased: 1,
  updates: 1,
  last_records: [
    {
      id: 1,
      field: 'Rutina',
      date: '2024-07-01',
      type: 'Creación'
    },
    {
      id: 2,
      field: 'Rutina',
      date: '2024-07-05',
      type: 'Actualización'
    },
    {
      id: 3,
      field: 'Plan nutricional',
      date: '2024-07-15',
      type: 'Borrado'
    },
    {
      id: 4,
      field: 'Rutina',
      date: '2024-07-25',
      type: 'Asignación'
    },
    {
      id: 5,
      field: 'Plan nutricional',
      date: '2024-07-30',
      type: 'Asignación'
    }
  ]
}

export const exampleCreations: ItemCreate[] = [
  {
    id: 1,
    field: 'Rutina',
    field_name: 'Cardio Rutina',
    date: '2024-07-01'
  },
  {
    id: 2,
    field: 'Rutina',
    field_name: 'Strength Rutina',
    date: '2024-07-05'
  }
]

export const exampleAssignments: ItemAssignment[] = [
  {
    id: 3,
    assigment_to: [1, 2],
    field: 'Rutina',
    field_name: ['Cardio', 'Explosión'],
    date: '2024-09-29'
  },
  {
    id: 4,
    assigment_to: [1],
    field: 'Plan nutricional',
    field_name: ['Dieta cetogenica'],
    date: '2024-10-15'
  },
  {
    id: 5,
    assigment_to: [3],
    field: 'Rutina',
    field_name: ['Crossfit '],
    date: '2024-11-11'
  },
  {
    id: 3,
    assigment_to: [1, 2],
    field: 'Rutina',
    field_name: ['Cardio', 'Explosión'],
    date: '2024-09-29'
  },
  {
    id: 4,
    assigment_to: [1],
    field: 'Plan nutricional',
    field_name: ['Dieta cetogenica'],
    date: '2024-10-15'
  },
  {
    id: 5,
    assigment_to: [3],
    field: 'Rutina',
    field_name: ['Crossfit '],
    date: '2024-11-11'
  },
  {
    id: 3,
    assigment_to: [1, 2],
    field: 'Rutina',
    field_name: ['Cardio', 'Explosión'],
    date: '2024-09-29'
  },
  {
    id: 4,
    assigment_to: [1],
    field: 'Plan nutricional',
    field_name: ['Dieta cetogenica'],
    date: '2024-10-15'
  },
  {
    id: 5,
    assigment_to: [3],
    field: 'Rutina',
    field_name: ['Crossfit '],
    date: '2024-11-11'
  }
]

export const exampleErased: ItemErased[] = [
  {
    id: 8,
    field: 'Rutina',
    field_name: 'Rutina Yoga',
    date: '2024-07-10'
  }
]

export const exampleUpdates: ItemUpdate[] = [
  {
    id: 9,
    field: 'Rutina',
    field_name: 'Rutina Cardio',
    date: '2024-07-15',
    updates: ['Nombre', 'Ejercicios']
  }
]
