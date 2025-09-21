import { adminAuth, adminDb } from '@/lib/firebase/admin';
import { cookies } from 'next/headers';
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
    .limit(200)
    .get();

  const requests = snap.docs.map((d) => {
    const data = d.data();
    const ts = data.requestTimestamp;

    let iso: string;
    if (ts?.toDate) {
      iso = ts.toDate().toISOString();
    } else if (typeof ts?.seconds === 'number') {
      iso = new Date(ts.seconds * 1000 + (ts.nanoseconds || 0) / 1e6).toISOString();
    } else if (ts instanceof Date) {
      iso = ts.toISOString();
    } else if (typeof ts === 'string') {
      iso = ts;
    } else {
      iso = new Date().toISOString();
    }

    return {
      id: d.id,
      ...data,
      requestTimestamp: iso,
    };
  });

  return NextResponse.json(requests);
}

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;

  if (!sessionCookie) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
  const data = await req.json();

  if (!data?.method || !data?.url) {
    return NextResponse.json({ error: 'method and url required' }, { status: 400 });
  }

  await adminDb.collection('requests').add({
    userId: decoded.uid,
    method: data.method,
    url: data.url,
    headers: data.headers,
    body: data.body,
    responseStatus: data.response?.status ?? null,
    responseBody: data.response?.body ?? null,
    latency: data.latency ?? null,
    requestTimestamp: new Date(),
  });

  return NextResponse.json({ success: true });
}
