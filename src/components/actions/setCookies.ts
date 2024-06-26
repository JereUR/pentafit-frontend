'use server'

import { cookies } from 'next/headers'

export async function setCookies(token: string) {
  cookies().set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/'
  })
}
