# מכללת גלגלים — מערכת תרגול

אפליקציית תרגול שאלות לקורס מוביל מקצועי.

---

## סקירת מערכת האימות

הגישה לאפליקציה מוגנת באמצעות **Google OAuth** (Auth.js / NextAuth).  
רק כתובות Gmail שמופיעות ברשימה `src/constants/allowedUsers.ts` יכולות להיכנס.

---

## התקנה מקומית

### 1. שכפל את הפרוייקט והתקן תלויות

```bash
git clone <repo-url>
cd galgalim-quiz
npm install
```

### 2. הגדר משתני סביבה

```bash
cp .env.example .env.local
```

ערוך את `.env.local` והכנס את הערכים הבאים:

```
AUTH_SECRET=<generate with: openssl rand -base64 32>
AUTH_GOOGLE_ID=<from Google Cloud Console>
AUTH_GOOGLE_SECRET=<from Google Cloud Console>
NEXTAUTH_URL=http://localhost:3000
```

### 3. הפעל שרת פיתוח

```bash
npm run dev
```

פתח [http://localhost:3000](http://localhost:3000).

---

## הגדרת Google Cloud Console

### יצירת OAuth 2.0 Client ID

1. פתח [console.cloud.google.com](https://console.cloud.google.com)
2. צור פרויקט חדש (או השתמש בקיים)
3. נווט אל **APIs & Services → Credentials**
4. לחץ **+ Create Credentials → OAuth 2.0 Client ID**
5. בחר **Application type: Web application**
6. תן שם, לדוגמה: `Galgalim Quiz`

### הגדרת Authorized Redirect URIs

הוסף את ה-URIs הבאים:

**לפיתוח מקומי:**
```
http://localhost:3000/api/auth/callback/google
```

**לפרודקשן ב-Vercel** (החלף את הדומיין שלך):
```
https://your-app.vercel.app/api/auth/callback/google
```

7. שמור — קבל `Client ID` ו-`Client Secret`
8. הכנס אותם ב-`.env.local` (מקומי) ו-Vercel (פרודקשן)

---

## פריסה ב-Vercel

### משתני סביבה ב-Vercel

ב-Vercel Dashboard: **Project → Settings → Environment Variables**

| שם משתנה | ערך |
|---|---|
| `AUTH_SECRET` | מחרוזת אקראית (32+ תווים) |
| `AUTH_GOOGLE_ID` | Client ID מ-Google Cloud |
| `AUTH_GOOGLE_SECRET` | Client Secret מ-Google Cloud |
| `NEXTAUTH_URL` | `https://your-app.vercel.app` |

---

## הוספת משתמש משלם

1. פתח `src/constants/allowedUsers.ts`
2. הוסף את כתובת ה-Gmail שלו למערך:

```ts
export const ALLOWED_EMAILS: string[] = [
  'existing@gmail.com',
  'newstudent@gmail.com', // ← הוסף כאן
];
```

3. **פרוס מחדש ל-Vercel** (או הפעל מחדש את שרת הפיתוח)

> המייל חייב להיות **כתובת Gmail מדויקת** (לא רגיש לאותיות גדולות/קטנות).

---

## מבנה מערכת האימות

```
src/
├── auth.ts                         ← NextAuth config + email whitelist check
├── middleware.ts                   ← route protection (redirect to /login)
├── constants/
│   └── allowedUsers.ts            ← רשימת המיילים המורשים
├── components/
│   ├── providers.tsx              ← SessionProvider wrapper
│   └── auth/
│       └── LoginForm.tsx          ← כפתור "התחברות עם Google"
└── app/
    ├── login/page.tsx             ← דף כניסה
    ├── unauthorized/page.tsx      ← דף "חשבון לא מאושר"
    └── api/auth/[...nextauth]/
        └── route.ts               ← NextAuth route handler
```

### זרימת האימות

```
משתמש → /dashboard
  ↓ אין session → /login
  ↓ לחץ "התחברות עם Google"
  ↓ Google OAuth
  ↓ בדיקת מייל מול ALLOWED_EMAILS
    ✓ מורשה  → session נוצר → /dashboard
    ✗ לא ברשימה → /unauthorized (הודעה בעברית)
```

---

## בדיקה מקומית

1. ודא ש-`.env.local` מלא
2. הפעל `npm run dev`
3. פתח `http://localhost:3000` — תנותב ל-`/login`
4. לחץ "התחברות עם Google"
5. בחר חשבון Google שמופיע ב-`ALLOWED_EMAILS` — תכנס ל-dashboard
6. נסה עם חשבון שאינו ברשימה — תופיע הודעת "החשבון שלך עדיין לא אושר"
