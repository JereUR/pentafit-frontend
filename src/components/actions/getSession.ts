import axios from 'axios'
import { NextRequest } from 'next/server'
import { User } from '../types/User'
import { cookies } from 'next/headers'

/* export default async function getSession() {
  let session = null
  await fetch('https://jsonplaceholder.typicode.com/users/1')
    .then((response) => response.json())
    .then((json) => {
      session = json
    })
  return { session }
} */

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

  const headers = {
    Origin: 'http://localhost:3001/',
    'X-Requested-With': 'XMLHttpRequest',
    Authorization: sessionToken
  }

  try {
    await fetch(`${process.env.BASE_BACKEND_URL}currentuser`, {
      credentials: 'include'
      /* headers: headers */
    })
      .then((res) => res.json())
      .then((data) => {
        session = data
      })
      .catch((error) => {
        return new Error(error)
      })
      .finally(() => {
        return session
      })
  } catch (error) {
    console.error('Error validating session:', error)
    return null
  }

  return session
}
