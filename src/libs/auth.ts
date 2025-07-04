/* eslint-disable @typescript-eslint/no-explicit-any */
import { JWT, NextAuthOptions } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import { jwtDecode } from 'jwt-decode';
import { AccessProfile } from '@/constants/enums/AccessProfile';
import { baseUrl } from '@/utils/helpers';

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email: string;
    role: AccessProfile;
    accessToken: string;
    expiresAt: number;
  }
}

const login = async (credentials: any) => {
  try {
    const res = await fetch(`${baseUrl()}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({
        email: credentials?.email,
        password: credentials?.password,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    console.log('resposta do login: ', res);

    const user = await res.json();
    console.log('dados do login: ', user);

    if (!res.ok) {
      throw new Error('Email ou senha inválidos');
    }

    return user;
  } catch (error) {
    console.log(error);
  }
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const res = await login(credentials);

        if (!res) {
          throw new Error('Email ou senha inválidos');
        }

        if (!res.access_token) {
          throw new Error('Erro interno, tente novamente mais tarde');
        }

        // Decodificando token para pegar id, email e role
        const decoded = jwtDecode<JWT>(res.access_token);
        //console.log('token 1', res.access_token);

        return {
          id: decoded.id, // Obrigatório para NextAuth
          email: decoded.email,
          role: decoded.role,
          accessToken: res.access_token,
          expiresAt: decoded.expiresAt * 1000,
        };
      },
    }),
  ],
  callbacks: {
    // aqui eu to salvando os dados vindo do backend no token do nextAuth
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.expiresAt = user.expiresAt;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.role = token.role as AccessProfile;
        session.user.accessToken = token.accessToken as string;
      }
      (session as any).expiresAt = token.expiresAt;

      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  events: {
    signOut: () => {},
  },
};
