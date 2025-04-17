import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const data = await request.json()

  const req = await fetch('http://localhost:1338/api/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  })

  const res = await req.json()

  if (req.status >= 400) {
    return NextResponse.json({ ...res, success: false })
  }

  return NextResponse.json({ ...res, success: true })
}
