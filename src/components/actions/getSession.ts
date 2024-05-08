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

export default async function getSession(
  req: NextRequest
): Promise<User | null> {
  const sessionToken = cookies().get('session')
  console.log(sessionToken)

  if (!sessionToken) {
    return null
  }

  return {
    id: 2,
    first_name: 'Jeremias',
    last_name: 'DV',
    email: 'jeremias.jdv@gmail.com',
    photo_url: null,
    token: sessionToken.toString()
  }

  try {
    const response = await axios.post<User>(
      '/api/validate-session',
      { sessionToken },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data
  } catch (error) {
    console.error('Error validating session:', error)
    return null
  }
}
