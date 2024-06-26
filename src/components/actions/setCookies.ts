'use server'

import { cookies } from 'next/headers'

export async function setCookies(token: string) {
  'use server'
  cookies().set('session', token)
}
