import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Middleware function
export function middleware(request: NextRequest) {
  // Ví dụ: kiểm tra user đăng nhập hoặc chuyển hướng
  // return NextResponse.redirect(new URL('/login', request.url))
  return NextResponse.next()
}

// Config để áp dụng middleware cho một số route cụ thể
export const config = {
  matcher: ["/dashboard/:path*", "/editor/:path*", "/login", "/register"],
}
