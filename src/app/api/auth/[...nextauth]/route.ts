/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth/next'
import { JWT, NextAuthOptions } from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'
import { jwtDecode } from 'jwt-decode'

const authOption: NextAuthOptions = {
  providers: [
    CredentialProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const res = await fetch('http://localhost:1338/api/auth/login', {
          method: 'POST',
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { 'Content-Type': 'application/json' },
        })

        const user = await res.json()

        if (!res.ok) {
          throw new Error('Email ou senha inválidos')
        }
        // Decodificando token para pegar id, email e role
        const decoded = jwtDecode<JWT>(user.access_token)
        console.log(decoded)

        return {
          id: decoded.id, // Obrigatório para NextAuth
          email: decoded.email,
          role: decoded.role,
          accessToken: user.access_token,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.role = user.role
        token.accessToken = user.accessToken
      }

      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.role = token.role as string
        session.user.accessToken = token.accessToken as string
      }

      return session
    },
  },
  pages: {
    signIn: '/login',
  },
}
const handler = NextAuth(authOption)

export { handler as GET, handler as POST }
