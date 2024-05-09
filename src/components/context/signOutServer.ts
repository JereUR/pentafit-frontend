'use server'

import axios from 'axios'
import { cookies } from 'next/headers'

export async function signOutServer() {
  cookies().delete('session')
}
