import { User } from '../types/User'

export const initialBusiness = [
  {
    id: 1,
    name: 'Lo de Toscano',
    description: '11 puntos pibe, una cosa extraordinaria.',
    logo: 'https://www.elguardianmdp.com/img/notas/img_t-3717.jpg',
    is_active: true,
    is_working: true
  },
  {
    id: 2,
    name: 'Business 2',
    is_active: true,
    is_working: false
  },
  {
    id: 3,
    name: 'BOCA BOCA BOCA',
    logo: 'https://a.espncdn.com/i/teamlogos/soccer/500/5.png',
    is_active: true,
    is_working: false
  }
]

export const customUser: User = {
  birthdate: '1990-01-01',
  created_at: '2021-01-01',
  email: 'toski@example.com',
  first_name: 'Marcelo Ricardo',
  gender: 'Masculino',
  id: 1,
  businesses: initialBusiness,
  last_name: 'Toscano',
  phone: 1234567890,
  photo:
    'https://pbs.twimg.com/profile_images/767436825665343488/DKJM3xY1_400x400.jpg',
  address: '123 Main St',
  role: 'admin'
}
