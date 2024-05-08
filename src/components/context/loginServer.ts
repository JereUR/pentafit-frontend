'use server'

import axios from 'axios'
import { redirect } from 'next/dist/server/api-utils'
import { cookies } from 'next/headers'
import useUser from '../hooks/useUser'

export async function loginServer(formData: FormData) {
  const { email, password } = Object.fromEntries(formData)

  try {
    const response = await axios.post(
      'https://7beb-190-191-171-9.ngrok-free.app/login',
      {
        user: {
          email,
          password
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    if (!response.data.jwt) {
      return new Error('Login failed')
    }

    const authToken = response.data.jwt

    cookies().set('session', authToken)
    cookies().set('user', JSON.stringify(response.data))
    return response
  } catch (error: any) {
    if (error.response && error.response.status >= 400) {
      return new Error(
        `Login failed: ${error.response.data.message || 'Server error'}`
      )
    } else {
      return new Error('An unexpected error occurred during login.')
    }
  }
}
