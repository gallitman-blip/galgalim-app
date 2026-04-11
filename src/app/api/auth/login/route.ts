import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { findUser } from '@/lib/auth/authorizedUsers';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'שם משתמש וסיסמה נדרשים' },
        { status: 400 },
      );
    }

    const result = findUser(String(username).trim(), String(password));

    if (!result.ok) {
      if (result.reason === 'inactive') {
        return NextResponse.json(
          { error: 'החשבון שלך אינו פעיל. אנא צור קשר להפעלה.' },
          { status: 403 },
        );
      }
      return NextResponse.json(
        { error: 'שם משתמש או סיסמה שגויים' },
        { status: 401 },
      );
    }

    const session = await getSession();
    session.user = result.user;
    await session.save();

    return NextResponse.json({ user: result.user });
  } catch {
    return NextResponse.json({ error: 'שגיאת שרת פנימית' }, { status: 500 });
  }
}
