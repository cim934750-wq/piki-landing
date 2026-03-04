import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname.startsWith('/admin') &&
    !request.nextUrl.pathname.startsWith('/admin/login')
  ) {
    const isValid = await verifySession(request)
    if (!isValid) {
      // 쿠키 삭제 후 로그인으로 리다이렉트
      const response = NextResponse.redirect(new URL('/admin/login', request.url))
      response.cookies.delete('piki_admin_session')
      return response
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}
