import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import getSession from './components/actions/getSession'

export async function middleware(request: NextRequest) {
  const { session } = await getSession()

  if (request.nextUrl.pathname.startsWith('/panel-de-control') && !session) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}
