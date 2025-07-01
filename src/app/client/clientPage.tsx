'use client';
import { LoadingComponent } from '@/components/Loading/LoadingComponent';
import { LoadingContext } from '@/providers/loadingProvider/loadingProvider';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import { useContext } from 'react';

interface ClienPageProps {
  session: Session | null;
}

export default function ClientPage({ session }: ClienPageProps) {
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  if (!session?.user.accessToken) {
    setIsLoading(true);
  } else {
    setIsLoading(false);
  }

  return (
    <main className="mx-auto w-full">
      <h2>
        Página onde o usuário vai pode escolher os itens e colocar no carrinho
      </h2>
      <div>
        <h1>Bem-vindo {session?.user.email}</h1>
        <p>ID: {session?.user.id}</p>
        <p>Role: {session?.user.role}</p>
        <p>Token: {session?.user.accessToken}</p>
        <p onClick={() => signOut({ callbackUrl: '/login' })}>sair</p>
      </div>
      <div>
        <h1>Bem-vindo {session?.user.email}</h1>
        <p>ID: {session?.user.id}</p>
        <p>Role: {session?.user.role}</p>
        <p>Token: {session?.user.accessToken}</p>
        <p onClick={() => signOut({ callbackUrl: '/login' })}>sair</p>
      </div>
      {isLoading && <LoadingComponent mode={'fullScreen'} />}
    </main>
  );
}
