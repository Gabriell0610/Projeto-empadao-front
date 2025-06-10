import { baseUrl } from '@/utils/helpers';
import { NextResponse } from 'next/server';

export async function GET() {
  const req = await fetch(`${baseUrl()}/itens/active`, {
    method: 'GET',
    cache: 'no-cache',
  });

  const res = await req.json();

  if (req.status >= 400) return NextResponse.json({ ...res, success: false });

  return NextResponse.json({ ...res, success: true });
}
