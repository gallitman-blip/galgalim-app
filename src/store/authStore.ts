import { create } from 'zustand';
import { signOut } from 'next-auth/react';

interface AuthState {
  logout: () => Promise<void>;
}

/**
 * Thin store kept so that existing components (TopNav, dashboard, profile)
 * can call `useAuthStore(s => s.logout)` without changes.
 * Session state is now managed by NextAuth — use useSession() to read the user.
 */
export const useAuthStore = create<AuthState>(() => ({
  logout: async () => {
    await signOut({ callbackUrl: '/login' });
  },
}));
