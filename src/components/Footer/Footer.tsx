import Link from 'next/link';
import { FaInstagram } from 'react-icons/fa6';
import { FaWhatsapp } from 'react-icons/fa';
import { FaFacebookSquare } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-primary-greenFooter px-6 text-text-primary">
      <div className="container mx-auto flex flex-wrap justify-between gap-6 px-4 py-6">
        <div className="mb-6 flex min-w-[220px] flex-col items-start">
          <h3 className="mb-2 text-lg font-semibold">
            Horário de Funcionamento
          </h3>
          <p className="text-sm">
            Para entrega no mesmo dia, pedido até as 12h
          </p>
          <p className="text-sm">Para agendamento qualquer horário</p>
        </div>

        <div className="mb-6 flex min-w-[220px] flex-col items-start">
          <h3 className="mb-2 text-lg font-semibold">Suporte</h3>
          <p className="text-sm">Entre em contato com a gente</p>
          <p className="text-sm">pelo número: (21)99999-0909</p>
        </div>

        <div className="mb-6 flex min-w-[220px] flex-col items-start">
          <h3 className="mb-2 text-lg font-semibold">Redes Sociais</h3>
          <div className="flex gap-3">
            <Link
              href={''}
              className="flex items-center justify-center rounded-full bg-white p-2"
              target="_blank"
            >
              <FaInstagram size={20} />
            </Link>
            <Link
              href={''}
              className="flex items-center justify-center rounded-full bg-white p-2"
              target="_blank"
            >
              <FaWhatsapp size={20} />
            </Link>
            <Link
              href={''}
              className="flex items-center justify-center rounded-full bg-white p-2"
              target="_blank"
            >
              <FaFacebookSquare size={20} />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white pt-4 text-center text-base">
        <p>Empadão Da Aline &copy; 2025 - Todos os direitos reservados</p>
      </div>
    </footer>
  );
};

export { Footer };
