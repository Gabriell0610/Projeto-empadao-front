'use client';

import { useSession, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SessionManager() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      console.warn('Usuário não autenticado — redirecionando');
      router.push('/login');
    },
  });

  useEffect(() => {
    if (status === 'authenticated') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const expiresAt = (session as any).expiresAt;
      if (expiresAt && Date.now() > expiresAt) {
        console.warn('Token expirado — forçando logout');
        signOut({ callbackUrl: '/login' });
      }
    }
  }, [session, status]);

  return null;
}
