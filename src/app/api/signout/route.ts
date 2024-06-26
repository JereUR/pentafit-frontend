import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL

export async function DELETE(request: Request) {
  const token = await request.json()
  console.log(token)
  try {
    const response = await axios.delete(`${BASE_URL}logout`, {
      headers: {
        Authorization: token
      }
    })

    if (response.status === 200 || response.status === 204) {
      cookies().delete('session')
      return NextResponse.json(true)
    } else {
      return NextResponse.json(false)
    }
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      return NextResponse.json(false)
    } else {
      return NextResponse.json(false)
    }
  }
}
