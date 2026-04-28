/**
 * Auth types — now powered by NextAuth / Auth.js
 *
 * The full session shape is provided by next-auth's built-in types.
 * Use `useSession()` on the client or `auth()` on the server to access it.
 *
 * Session payload (from Google):
 *   session.user.name   — full display name
 *   session.user.email  — Gmail address (used for whitelist check)
 *   session.user.image  — Google profile photo URL
 */

// Kept as a convenience alias used in a few places that need just these two fields.
export interface AppUser {
  name:  string;
  email: string;
}
