import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  const cookieHeader = request.headers.get('cookie') || '';
  const isAuth = cookieHeader.includes('isAuth=true');

  const { pathname } = request.nextUrl;
  const privateRoutes = ['/history', '/variables'];
  const isPrivate = privateRoutes.some((route) => pathname.includes(route));

  if (isPrivate && !isAuth) {
    const [, locale] = pathname.split('/');
    const redirectUrl = new URL(`/${locale}/not-found`, request.url);

    return NextResponse.rewrite(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/(en|ru)/history',
    '/(en|ru)/history/:path*',
    '/(en|ru)/variables',
    '/(en|ru)/variables/:path*',
  ],
};
