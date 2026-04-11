import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import type { SessionData } from '@/types/auth';

const SESSION_OPTIONS = {
  password: process.env.SESSION_SECRET ?? 'galgalim-quiz-secret-key-change-in-prod-32ch',
  cookieName: 'galgalim_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax' as const,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
};

export async function getSession() {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, SESSION_OPTIONS);
}
