'use client';

import { SessionProvider } from 'next-auth/react';

/**
 * Client-side wrapper that makes NextAuth's useSession() available
 * throughout the component tree.  Imported in the root layout.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
