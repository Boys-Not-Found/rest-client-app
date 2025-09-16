import { cookies } from 'next/headers';
import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;

  if (!sessionCookie) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);

  const snap = await adminDb
    .collection('requests')
    .where('userId', '==', decoded.uid)
    .orderBy('requestTimestamp', 'desc')
    .get();

  const requests = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  return NextResponse.json(requests);
}
