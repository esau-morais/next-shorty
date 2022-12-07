import { NextRequest, NextResponse } from 'next/server'
import { getUrl } from './lib/redis'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (['', 'api', 'favicon.ico'].includes(pathname)) return

  const url = await getUrl(pathname)
  if (url) return NextResponse.redirect(url)
}
