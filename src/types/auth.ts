// ─── Stored in the authorized-users list ─────────────────────────────────────

export interface AuthorizedUser {
  id: number;
  username: string;
  password: string;      // plain-text for MVP — swap for bcrypt hash in Phase 2
  active: boolean;       // false = blocked (payment lapsed, manual disable, etc.)
  displayName: string;   // shown inside the app
  phone?: string;        // kept for future OTP / WhatsApp login migration
}

// ─── Stored in the encrypted session cookie (public fields only) ──────────────

export interface AppUser {
  id: number;
  username: string;
  displayName: string;
}

// ─── iron-session payload ─────────────────────────────────────────────────────

export interface SessionData {
  user?: AppUser;
}

// ─── Return type for login lookup ─────────────────────────────────────────────

export type LoginResult =
  | { ok: true;  user: AppUser }
  | { ok: false; reason: 'invalid_credentials' | 'inactive' };
