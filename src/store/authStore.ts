import { create } from 'zustand';
import type { AppUser } from '@/types/auth';

interface AuthState {
  user: AppUser | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: AppUser | null) => void;
  setLoading: (v: boolean) => void;
  setError: (msg: string | null) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  setUser: (user) => set({ user, error: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),

  logout: async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    set({ user: null });
    window.location.href = '/login';
  },
}));
