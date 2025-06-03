/* eslint-disable prettier/prettier */
'use client';
import { Header } from '@/components/Header/Header';
import Image from 'next/image';
import ImageChef from '../../public/image_chef.png';
/* eslint-disable prettier/prettier */
export default function Home() {
  return (
    <main className="mx-auto w-full px-8">
      <Header />
      <section className="w-full px-2 py-10">
        <article className="flex flex-col items-center gap-6 md:flex-row md:gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">
              Receitas artesanais que{' '}
              <span className="text-yellow-600">aquecem</span> o coração e{' '}
              <span className="text-green-600">encantam</span> o paladar.
            </h2>
            <p className="text-text-secondary">
              Prove o melhor da nossa cozinha: receitas com ingredientes
              selecionados, preparo artesanal e muito sabor. Surpreenda-se e
              transforme cada refeição em um momento especial.
            </p>
            <button className="w-fit rounded-md bg-primary-greenLight px-4 py-2 text-neutral-white hover:bg-green-800">
              Veja nosso Menu
            </button>
          </div>

          <div className="hidden min-w-[350px] max-w-[350px] md:flex">
            <Image src={ImageChef} alt="foto de uma chefe estilo 2d" />
          </div>
        </article>
      </section>
    </main>
  );
}
