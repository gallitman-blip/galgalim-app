import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { ALLOWED_EMAILS } from '@/constants/allowedUsers';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      authorization: {
        params: { prompt: 'select_account', access_type: 'offline' },
      },
    }),
  ],

  /**
   * trustHost: true is REQUIRED for any non-localhost deployment (Vercel, etc.).
   * Without it, @auth/core throws UntrustedHost on every OAuth callback,
   * which redirects to the error page and makes the flow appear as a login loop.
   * See: node_modules/@auth/core/lib/utils/assert.js
   */
  trustHost: true,

  pages: {
    signIn: '/login',
    // AccessDenied and other auth errors go to the dedicated Hebrew page,
    // NOT back to /login (which would create a confusing silent loop).
    error: '/unauthorized',
  },

  callbacks: {
    /**
     * Called after Google returns a successful OAuth token.
     * Return true  → create session, proceed to callbackUrl.
     * Return false → AccessDenied error → redirect to pages.error (/unauthorized).
     */
    async signIn({ user }) {
      const received  = user.email ?? '';
      const normalized = received.toLowerCase().trim();
      const allowList  = ALLOWED_EMAILS.map(e => e.toLowerCase().trim());
      const allowed    = allowList.includes(normalized);

      console.log('[AUTH] signIn callback');
      console.log('[AUTH]   received email :', JSON.stringify(received));
      console.log('[AUTH]   normalized     :', JSON.stringify(normalized));
      console.log('[AUTH]   allowList      :', JSON.stringify(allowList));
      console.log('[AUTH]   allowed        :', allowed);

      if (!received) {
        console.log('[AUTH]   REJECTED — no email returned by Google');
        return false;
      }

      return allowed;
    },
  },
});
