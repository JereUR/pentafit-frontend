'use server'

import axios from 'axios'
import { cookies } from 'next/headers'

export async function signUpServer(formData: FormData) {
  const { first_name, last_name, email, gender, date, password } =
    Object.fromEntries(formData)

  const user = {
    first_name,
    last_name,
    email,
    gender,
    date,
    password
  }

  try {
    const response = await axios.post(
      'https://7beb-190-191-171-9.ngrok-free.app/users',
      {
        user
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    if (response.status === 200 || response.status === 204) {
      const authToken = response.data.token

      cookies().set('session', authToken)
      cookies().set('user', JSON.stringify(response.data))
      return response
    }
    return new Error('Sign up failed')
  } catch (error: any) {
    if (error.response && error.response.status >= 400) {
      return new Error(
        `Sign up failed: ${error.response.data.message || 'Server error'}`
      )
    } else {
      return new Error('An unexpected error occurred during sign up.')
    }
  }
}
