import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;

  if (!sessionCookie) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
  const data = await req.json();

  await adminDb.collection('requests').add({
    userId: decoded.uid,
    requestData: data,
    requestTimestamp: data.requestTimestamp,
  });

  return NextResponse.json({ status: 'ok' });
}
