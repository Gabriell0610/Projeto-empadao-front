/* eslint-disable prettier/prettier */
import logo from 'public/logo.svg';
import { ButtonDefault } from '../Button/Button';
import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
  login?: boolean;
}

export function Header(props: HeaderProps) {
  const { login } = props;
  return (
    <header className="py-4">
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={'/'}>
            <Image alt="logo da marca" src={logo} quality={100} />
          </Link>
          <div className="flex gap-4">
            <ButtonDefault variant="link" className="pb-0 text-text-primary">
              Contato
            </ButtonDefault>
            <ButtonDefault variant="link" className="pb-0 text-text-primary">
              Menu
            </ButtonDefault>
          </div>
        </div>
        {!login && (
          <div className="flex gap-2">
            <ButtonDefault variant="secondary" className="mt-0">
              Login
            </ButtonDefault>
            <ButtonDefault variant="primary" className="mt-0 rounded-md">
              Cadastro
            </ButtonDefault>
          </div>
        )}{' '}
        {/*aqui vai ter os icones de carinho e perfil para quando houver usuario logado */}
      </nav>
    </header>
  );
}
