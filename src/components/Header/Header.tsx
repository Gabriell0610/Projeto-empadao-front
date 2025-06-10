/* eslint-disable prettier/prettier */
'use client';
import logo from 'public/logo.svg';
import { ButtonDefault } from '../Button/Button';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  login?: boolean;
}

export function Header(props: HeaderProps) {
  const navigate = useRouter();
  const { login } = props;
  return (
    <header className="px-8 py-4">
      <nav className="mx-auto flex w-full max-w-screen-xl items-center justify-between px-4 py-2">
        <div className="flex min-w-0 items-center">
          <Link href="/">
            <Image
              alt="logo da marca"
              src={logo}
              quality={100}
              className="h-14 w-auto object-contain sm:h-20"
            />
          </Link>
        </div>

        {/* BOTÕES LOGIN / CADASTRO */}
        {!login && (
          <div className="flex shrink-0 items-center gap-2">
            <ButtonDefault
              variant="secondary"
              onClick={() => navigate.push('/login')}
            >
              Login
            </ButtonDefault>
            <ButtonDefault
              variant="primary"
              onClick={() => navigate.push('/register')}
            >
              Cadastro
            </ButtonDefault>
          </div>
        )}
      </nav>
    </header>
  );
}
