import { baseUrl } from '@/utils/helpers';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();
  const token = headers().get('authorization');

  const req = await fetch(`${baseUrl()}/cart`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const res = await req.json();

  if (req.status >= 400) {
    return NextResponse.json({ ...res, success: false });
  }

  return NextResponse.json({ ...res, success: true });
}
