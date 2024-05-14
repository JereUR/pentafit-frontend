import { NextRequest } from 'next/server'
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

  if (!sessionToken) {
    return null
  }

  /* session = {
    id: 2,
    first_name: 'Jeremias',
    last_name: 'DV',
    email: 'jeremias.jdv@gmail.com',
    photo_url: null,
    token: sessionToken
  }

  return {
    session
  } */

  const headers = {
    'X-Requested-With': 'XMLHttpRequest',
    Authorization: sessionToken
  }

  try {
    await fetch(
      `https://38ad-190-191-171-9.ngrok-free.app/api/v1/currentuser`,
      {
        credentials: 'include',
        headers: headers
      }
    )
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

  return session
}
