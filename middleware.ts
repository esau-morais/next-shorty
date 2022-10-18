import { NextRequest, NextResponse } from 'next/server'
import { getUrl } from './lib/redis'

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname.split('/')[1]

  if (['', 'api', 'favicon.ico'].includes(path)) {
    return
  }

  const url = await getUrl(path)
  if (url) {
    return NextResponse.redirect(url)
  }
}
