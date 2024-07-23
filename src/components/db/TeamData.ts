import { User } from '../types/User'

export const initialMembers: User[] = [
  {
    birthdate: '1990-01-01',
    created_at: '2022-01-01',
    email: 'john.doe@example.com',
    first_name: 'John',
    gender: 'Masculino',
    id: 1,
    businesses: [
      { id: 1, name: 'Lo de Toscano' },
      { id: 2, name: 'Business 2' }
    ],
    last_name: 'Doe',
    phone: 1234567890,
    photo: null,
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
