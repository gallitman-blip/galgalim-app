import type { AuthorizedUser, AppUser, LoginResult } from '@/types/auth';

/**
 * MVP Authorized Users List
 * ─────────────────────────
 * When a student pays, add an entry here with a username + password and set
 * active: true.  To block a student (e.g. payment lapsed), flip active: false.
 *
 * Migration roadmap:
 *   Phase 1 (now)   — static list, plain-text passwords
 *   Phase 2         — move to a database; hash passwords with bcrypt
 *   Phase 3         — OTP login via SMS / WhatsApp using the `phone` field
 *   Phase 4         — payment / subscription gateway integration
 *
 * ─── HOW TO ADD A NEW STUDENT ───────────────────────────────────────────────
 *  1. Copy the block below and increment the id.
 *  2. Fill in username, password, displayName, and optionally phone.
 *  3. Set active: true.
 *  4. Redeploy (or restart the dev server).
 * ────────────────────────────────────────────────────────────────────────────
 */
export const AUTHORIZED_USERS: AuthorizedUser[] = [
  // ── Demo / test account (keep for internal QA) ──────────────────────────
  {
    id: 1,
    username: 'demo',
    password: 'demo',
    active: true,
    displayName: 'משתמש הדגמה',
    phone: '',
  },

  // ── Add real students below ──────────────────────────────────────────────
  // {
  //   id: 2,
  //   username: 'student_username',
  //   password: 'choose_a_password',
  //   active: true,
  //   displayName: 'שם התלמיד',
  //   phone: '050-0000000',   // optional — for future OTP login
  // },
];

// ─── Lookup helpers ───────────────────────────────────────────────────────────

/** Validates credentials and returns a LoginResult. Never throws. */
export function findUser(username: string, password: string): LoginResult {
  const record = AUTHORIZED_USERS.find(
    u => u.username === username && u.password === password,
  );

  if (!record) return { ok: false, reason: 'invalid_credentials' };
  if (!record.active) return { ok: false, reason: 'inactive' };

  // Return only the public fields — never expose the password downstream
  const user: AppUser = {
    id: record.id,
    username: record.username,
    displayName: record.displayName,
  };
  return { ok: true, user };
}
