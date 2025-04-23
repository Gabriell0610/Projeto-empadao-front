/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from 'next-auth/next'
import { JWT, NextAuthOptions } from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'
import { jwtDecode } from 'jwt-decode'
import { AccessProfile } from '@/constants/enums/accessProfile'
import { baseUrl } from '@/utils/helpers'

const login = async (credentials: any) => {
  try {
    const res = await fetch(`${baseUrl()}/auth/login`, {
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

    return user
  } catch (error) {
    console.log(error)
  }
}

const authOption: NextAuthOptions = {
  providers: [
    CredentialProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const res = await login(credentials)

        if (!res) {
          throw new Error('Email ou senha inválidos')
        }

        if (!res.access_token) {
          throw new Error('Erro interno, tente novamente mais tarde')
        }

        // Decodificando token para pegar id, email e role
        const decoded = jwtDecode<JWT>(res.access_token)

        return {
          id: decoded.id, // Obrigatório para NextAuth
          email: decoded.email,
          role: decoded.role,
          accessToken: res.access_token,
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
        session.user.role = token.role as AccessProfile
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
