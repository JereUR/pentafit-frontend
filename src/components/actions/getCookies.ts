'use server'

import { cookies } from 'next/headers'

export async function getCookies(cookie: string) {
  'use server'
  return cookies().get(cookie)
}
