'use client';
import { SomeChildrenInterface } from '@/utils/types/layout.type';
import { SessionProvider as NextSessionProvider } from 'next-auth/react';

// interface SessionProviderInterface extends SomeChildrenInterface {
//   session: Session
// }

export const SessionProvider = ({ children }: SomeChildrenInterface) => {
  return <NextSessionProvider>{children}</NextSessionProvider>;
};
