import { NextRequest, NextResponse } from 'next/server'

const locales = ['sv', 'en']

export function middleware(request: NextRequest) {
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}