import { MemberRecord } from '../types/Team'
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
  creations: [
    {
      id: 1,
      assigment_to: [2],
      field: 'Routine Creation',
      field_name: 'Cardio Routine',
      date: '2024-07-01'
    },
    {
      id: 2,
      assigment_to: [3],
      field: 'Routine Creation',
      field_name: 'Strength Routine',
      date: '2024-07-05'
    }
  ],
  assignments: [
    {
      id: 3,
      assigment_to: [1, 2],
      field: 'Plumbing',
      field_name: 'Plumbing Service',
      date: '2024-09-29'
    },
    {
      id: 4,
      assigment_to: [1],
      field: 'Carpentry',
      field_name: 'Carpentry Service',
      date: '2024-10-15'
    },
    {
      id: 5,
      assigment_to: [2],
      field: 'Painting',
      field_name: 'Painting Service',
      date: '2024-11-11'
    },
    {
      id: 6,
      assigment_to: [1],
      field: 'Hair Drying',
      field_name: 'Hair Drying Service',
      date: '2024-04-13'
    },
    {
      id: 7,
      assigment_to: [3],
      field: 'Blueprint Structure',
      field_name: 'Blueprint Structure Service',
      date: '2024-02-24'
    }
  ],
  erased: [
    {
      id: 8,
      assigment_to: [2],
      field: 'Routine Erased',
      field_name: 'Yoga Routine',
      date: '2024-07-10'
    }
  ],
  updates: [
    {
      id: 9,
      assigment_to: [1],
      field: 'Routine Update',
      field_name: 'Updated Cardio Routine',
      date: '2024-07-15'
    }
  ]
}
