'use server'

import axios from 'axios'
import { cookies } from 'next/headers'

export async function signOutServer() {
  const token = cookies().get('session')?.value

  try {
    const response = await axios.delete(
      'https://7beb-190-191-171-9.ngrok-free.app/users/sign_out',
      {
        headers: {
          Authorization: token
        }
      }
    )

    if (response.status === 200 || response.status === 204) {
      cookies().delete('session')
      cookies().delete('user')
      return response
    }
    return new Error('Sign out failed')
  } catch (error: any) {
    if (error.response && error.response.status >= 400) {
      return new Error(
        `Sign out failed: ${error.response.data.message || 'Server error'}`
      )
    } else {
      return new Error('An unexpected error occurred during sign out.')
    }
  }
}
