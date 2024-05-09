'use server'

import { cookies } from 'next/headers'

export async function signInServer(token: string) {
  cookies().set('session', token)
}
