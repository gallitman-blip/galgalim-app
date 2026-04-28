import { auth } from '@/auth';
import { NextResponse } from 'next/server';

// Routes that require a valid NextAuth session
const PROTECTED = ['/dashboard', '/quiz', '/progress', '/profile', '/onboarding'];

// Routes only for guests (redirect to dashboard when already signed in)
const GUEST_ONLY = ['/login'];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  // req.auth can be {} (truthy) in some NextAuth v5 beta builds when no session exists.
  // Only treat as authenticated when req.auth.user is actually populated.
  const isAuthenticated = !!req.auth?.user;

  const isProtected = PROTECTED.some(p => pathname.startsWith(p));
  const isGuestOnly = GUEST_ONLY.some(p => pathname.startsWith(p));

  if (!isProtected && !isGuestOnly) return NextResponse.next();

  // No session → send to login
  if (isProtected && !isAuthenticated) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Already signed in → skip login page
  if (isGuestOnly && isAuthenticated) {
    const url = req.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/quiz/:path*',
    '/progress/:path*',
    '/profile/:path*',
    '/onboarding/:path*',
    '/login',
  ],
};
