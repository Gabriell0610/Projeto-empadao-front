/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    email: string
    role: AccessProfile
    accessToken: string
    expiresAt: number
  }

  interface Session {
    user: {
      id: string
      email: string
      role: AccessProfile
      accessToken: string
    }
  }

  interface JWT {
    id: string
    email: string
    role: AccessProfile
    accessToken: string
    expiresAt: number
  }
}
