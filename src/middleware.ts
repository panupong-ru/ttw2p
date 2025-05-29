import type { NextRequest } from 'next/server';

import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

import { ROUTE } from '@/core/constants/route';
import { env } from '@/environment';

// Public paths that don't require authentication
const publicPaths = [
  ROUTE.SIGN_IN,
  ROUTE.FORGET_PASSWORD,
  '/api',
  '/_next',
  '/static',
  '/favicon.ico',
  '/images',
  '/.well-known',
  '/public',
];

const protectedPathPrefixes = [ROUTE.HOME];

const isPublicPath = (path: string) => {
  return publicPaths.some((publicPath) => path === publicPath || path.startsWith(`${publicPath}/`));
};

const isProtectedPath = (path: string) => {
  return protectedPathPrefixes.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
};

// Next.js Middleware Configuration
export const config = {
  matcher: ['/((?!api|_next|static|sign-in|images|favicon.ico|.well-known).+)', '/sign-in'],
};

// Next.js Middleware
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublicPath(pathname) && !pathname.startsWith(ROUTE.SIGN_IN)) {
    return NextResponse.next();
  }

  try {
    const token = await getToken({
      req: request,
      secret: env.AUTH_SECRET,
      secureCookie: env.MODE === 'production',
      cookieName: 'next-auth.session-token',
    });

    if ((isProtectedPath(pathname) || !isPublicPath(pathname)) && !token) {
      const signInUrl = new URL(ROUTE.SIGN_IN, request.url);
      return NextResponse.redirect(signInUrl);
    }

    if (pathname === ROUTE.SIGN_IN && token) {
      const dashboardUrl = new URL(ROUTE.HOME, request.url);
      return NextResponse.redirect(dashboardUrl);
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Error checking authentication:', error);

    if (isProtectedPath(pathname) || !isPublicPath(pathname)) {
      const signInUrl = new URL(ROUTE.SIGN_IN, request.url);
      return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
  }
}
