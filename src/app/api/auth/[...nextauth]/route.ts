/* eslint-disable @typescript-eslint/no-explicit-any */
import { authOptions } from '@/libs/auth';
import NextAuth from 'next-auth/next';

// Estendendo o tipo JWT para incluir nossas propriedades personalizadas

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
