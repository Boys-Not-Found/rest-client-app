import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  const cookieHeader = request.headers.get('cookie') || '';
  const isAuth = cookieHeader.includes('session');

  const { pathname } = request.nextUrl;

  const privateRoutes = ['/history', '/variables', '/rest-client'];
  const isPrivate = privateRoutes.some((route) => pathname.includes(route));

  const publicRoutes = ['/sign-in', '/sign-up'];
  const isPublic = publicRoutes.some((route) => pathname.includes(route));

  if (isPrivate && !isAuth) {
    const [, locale] = pathname.split('/');
    const redirectUrl = new URL(`/${locale}/`, request.url);
    return NextResponse.redirect(redirectUrl);
  }

  if (isPublic && isAuth) {
    const [, locale] = pathname.split('/');
    const redirectUrl = new URL(`/${locale}/`, request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/(en|ru)/history',
    '/(en|ru)/history/:path*',
    '/(en|ru)/variables',
    '/(en|ru)/variables/:path*',
    '/(en|ru)/rest-client',
    '/(en|ru)/rest-client/:path*',
    '/(en|ru)/sign-in',
    '/(en|ru)/sign-up',
  ],
};
