import { NextRequest, NextResponse } from 'next/server';

// Routes that require a logged-in session
const PROTECTED = ['/dashboard', '/quiz', '/progress', '/profile', '/onboarding'];

// Routes only for guests (redirect to dashboard if already logged in)
const GUEST_ONLY = ['/login'];

const SESSION_COOKIE = 'galgalim_session';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtected = PROTECTED.some(p => pathname.startsWith(p));
  const isGuestOnly = GUEST_ONLY.some(p => pathname.startsWith(p));

  if (!isProtected && !isGuestOnly) return NextResponse.next();

  // Presence of the iron-session cookie is the lightweight indicator.
  // Actual session validity is enforced by iron-session in the API routes.
  const hasSession = Boolean(req.cookies.get(SESSION_COOKIE)?.value);

  if (isProtected && !hasSession) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  if (isGuestOnly && hasSession) {
    const url = req.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

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
