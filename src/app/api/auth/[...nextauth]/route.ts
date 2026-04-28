import { handlers } from '@/auth';

// Expose NextAuth's GET and POST handlers at /api/auth/*
// This covers: /api/auth/signin, /api/auth/callback/google, /api/auth/signout, etc.
export const { GET, POST } = handlers;
