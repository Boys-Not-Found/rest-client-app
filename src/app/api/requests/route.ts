import { NextResponse } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebase/admin';
import { cookies } from 'next/headers';

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
    method: data.method,
    url: data.url,
    headers: data.headers,
    body: data.body,
    responseStatus: data.response?.status ?? null,
    responseBody: data.response?.data ?? null,
    requestSize: data.requestSize ?? null,
    responseSize: data.responseSize ?? null,
    latency: data.latency ?? null,
    error: data.response?.error ?? null,
    requestTimestamp: new Date(),
  });

  return NextResponse.json({ status: 'ok' });
}
