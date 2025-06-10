/* eslint-disable prettier/prettier */
'use client';
import Image from 'next/image';
import ImageChef from '../../public/image_chef.png';
import ImageFood from '../../public/image5.png';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import { Accordion, Span } from '@chakra-ui/react';
import { TitleH1 } from '@/components/Titles/Titles';
import { ButtonDefault } from '@/components/Button/Button';
import { useItems } from '@/hooks/useItems';
import { useEffect } from 'react';
//import { Cart } from '@/components/Cart/Cart';
/* eslint-disable prettier/prettier */
export default function Home() {
  const items = [
    {
      value: 'a',
      title: '1. Como fazer o pedido?',
      text: 'Faça login ou se cadastre antes de selecionar os pedidos no carrinho. Navegue no cardápio e selecione o produto de sua preferência. Ao finalizar, cadastre ou selecione o seu endereço, escolha o meio de pagamento e confirme os produtos do carrinho',
    },
    {
      value: 'b',
      title: '2. Meio de Pagamento',
      text: 'No momento ainda não fazemos pagamento pelo site. Na hora de fazer o pedido adicione o meio de pagamento apenas para facilitar a entrega. O pagamento será feito pessoalmente ou via pix enviando o comprovante para o nosso Whatsapp.',
    },
    {
      value: 'c',
      title: '3. Agendamento/Entrega',
      text: 'Caso você queira que o pedido seja entregue no mesmo dia, faça o seu pedido até as 12h. Após esse horário seu pedido será feito apenas com agendamento.',
    },
  ];

  const { listActiveItem } = useItems();

  useEffect(() => {
    const getMostOrderedProducts = async () => {
      const res = await listActiveItem();

      console.log(res.data);
    };
    getMostOrderedProducts();
  });

  return (
    <main className="mx-auto w-full">
      <Header />
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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-3">
          <div className="overflow-hidden rounded-lg bg-white shadow-md">
            <Image
              src={ImageFood}
              alt="Empadão"
              className="h-40 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="mb-2 font-semibold sm:text-sm">
                Delicioso Empadão de frango com uma massa crocante
              </h3>
              <div className="mb-4 flex items-center justify-between text-gray-700">
                <span>R$ 34,00</span>
                <span>1kg</span>
              </div>
              <ButtonDefault type="button" variant="third">
                Adicionar
              </ButtonDefault>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg bg-white shadow-md">
            <Image
              src={ImageFood}
              alt="Empadão"
              className="h-40 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="mb-2 font-semibold sm:text-sm">
                Delicioso Empadão de frango com uma massa crocante
              </h3>
              <div className="mb-4 flex items-center justify-between text-gray-700">
                <span>R$ 34,00</span>
                <span>1kg</span>
              </div>
              <ButtonDefault type="button" variant="third">
                Adicionar
              </ButtonDefault>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg bg-white shadow-md">
            <Image
              src={ImageFood}
              alt="Empadão"
              className="h-40 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="mb-2 font-semibold sm:text-sm">
                Delicioso Empadão de frango com uma massa crocante
              </h3>
              <div className="mb-4 flex items-center justify-between text-gray-700">
                <span>R$ 34,00</span>
                <span>1kg</span>
              </div>
              <ButtonDefault type="button" variant="third">
                Adicionar
              </ButtonDefault>
            </div>
          </div>
        </div>
      </section>

      <section id="duvidas" className="w-full px-8 py-6">
        <TitleH1>Dúvidas Frequentes</TitleH1>
        <Accordion.Root collapsible defaultValue={['b']}>
          {items.map((item, index) => (
            <Accordion.Item
              key={index}
              value={item.value}
              className="my-3 rounded-md border border-b-2 border-text-primary px-4 py-3"
            >
              <Accordion.ItemTrigger>
                <Span flex="1" className="text-lg font-semibold">
                  {item.title}
                </Span>
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
              <Accordion.ItemContent>
                <Accordion.ItemBody className="py-2">
                  {item.text}
                </Accordion.ItemBody>
              </Accordion.ItemContent>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </section>
      <Footer />
    </main>
  );
}
