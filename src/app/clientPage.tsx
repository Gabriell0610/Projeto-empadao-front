/* eslint-disable prettier/prettier */
'use client';
import Image from 'next/image';
import ImageChef from '../../public/image_chef.png';
import ImageFood from '../../public/image5.png';
import { Footer } from '@/components/Footer/Footer';
import { TitleH1, TitleH3 } from '@/components/Titles/Titles';
import { useState } from 'react';
import { ListActiveItemsInterface } from '@/utils/types/items.type';
import { normalizeCurrency } from '@/utils/helpers/normalizeCurrency';
import { Cart } from '@/components/Cart/Cart';
import { ButtonDefault } from '@/components/Button/Button';
import { useCart } from '@/providers/cartContext/cartProvider';

interface PropsHome {
  data: ListActiveItemsInterface[];
}
/* eslint-disable prettier/prettier */
export default function Home({ data }: PropsHome) {
  const [openCart, setOpenCart] = useState(false);
  const { addItemById } = useCart();

  function handleOpenCart(itemId: string) {
    setOpenCart(true);
    addItemById(itemId);
  }
  return (
    <main className="mx-auto w-full">
      <section className="w-full px-8 py-10">
        <article className="flex flex-col items-center gap-6 md:flex-row md:gap-8">
          <div className="flex flex-col gap-4">
            <TitleH1 className="mb-0">
              Receitas artesanais que{' '}
              <span className="text-yellow-600">aquecem</span> o coração e{' '}
              <span className="text-text-green">encantam</span> o paladar.
            </TitleH1>
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

      <section className="w-full px-8 py-6">
        <TitleH1>Os mais pedidos</TitleH1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {data
            ?.filter((_, index) => index === 0 || index === 5 || index === 11)
            .map((value, index) => (
              <div
                className="flex h-full flex-col justify-between overflow-hidden rounded-lg bg-white shadow-md"
                key={index}
              >
                <Image
                  src={value.image || ImageFood}
                  alt="Empadão"
                  className="h-40 w-full object-cover"
                />
                <div className="flex h-full flex-col justify-between p-4">
                  <TitleH3 className="md:text-sm">{value.nome}</TitleH3>
                  <p className="font mb-3 min-h-[72px] text-gray-700 md:text-sm lg:text-base">
                    {value.descricao}
                  </p>
                  <div className="flex items-center justify-between text-gray-700 md:text-sm lg:text-base">
                    <span>{normalizeCurrency(value.preco)}</span>
                    <span>{value.pesoReal}</span>
                  </div>
                  <ButtonDefault
                    type="button"
                    variant="third"
                    className="mt-4 outline-none"
                    onClick={() => handleOpenCart(value.id)}
                  >
                    Adicionar
                  </ButtonDefault>
                </div>
              </div>
            ))}
        </div>
      </section>
      <Cart openCart={openCart} setOpenCart={setOpenCart} />
      <Footer />
    </main>
  );
}
