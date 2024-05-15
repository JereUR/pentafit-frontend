import { NextRequest } from 'next/server'
import { cookies } from 'next/headers'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL

console.log(BASE_URL)

export default async function getSession(req: NextRequest) {
  const sessionToken = cookies().get('session')?.value
  let session: any = null

  /* if (!sessionToken) {
    return null
  } */

  session = {
    id: 2,
    first_name: 'Jeremias',
    last_name: 'DV',
    email: 'jeremias.jdv@gmail.com',
    photo_url: null,
    token: sessionToken
  }

  return {
    session
  }

  /* const headers = {
    'X-Requested-With': 'XMLHttpRequest',
    Authorization: sessionToken
  }

  try {
    await fetch(`${BASE_URL}api/v1/currentuser`, {
      credentials: 'include',
      headers: headers
    })
      .then((res) => res.json())
      .then((data) => {
        session = data
      })
      .catch((error) => {
        console.error('Error validating session:', error)
        return null
      })
      .finally(() => {
        return session
      })
  } catch (error) {
    console.error('Error validating session:', error)
    return null
  }

  return session */
}
