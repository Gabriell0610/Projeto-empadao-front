'use client';
import { CloseButton, Drawer, Portal } from '@chakra-ui/react';
import { ButtonDefault } from '../Button/Button';
import { TitleH4 } from '../Titles/Titles';
import { normalizeCurrency } from '@/utils/helpers/normalizeCurrency';
import Image from 'next/image';
import ImageFood from '../../../public/image_food2.png';
import { FaPlus } from 'react-icons/fa6';
import { FaMinus } from 'react-icons/fa6';
import { useCart } from '@/providers/cartContext/cartProvider';
import { FaRegTrashAlt } from 'react-icons/fa';

interface CartProps {
  openCart: boolean;
  setOpenCart: (open: boolean) => void;
}

const Cart = ({ openCart, setOpenCart }: CartProps) => {
  const {
    itemsLocal,
    isLoading,
    quantity,
    incrementOrDecrementItem,
    removeItem,
  } = useCart();

  const getTotalPrice = () => {
    return itemsLocal.reduce(
      (total, item) => total + parseFloat(item.item?.preco) * item.quantity,
      0,
    );
  };

  return (
    <Drawer.Root
      size={'sm'}
      open={openCart}
      onOpenChange={(details) => setOpenCart(details.open)}
    >
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header className="px-3 py-5">
              <TitleH4 className="font-normal">
                Sacola
                <span className="text-xs text-text-secondary">
                  ({quantity})
                </span>
              </TitleH4>
            </Drawer.Header>
            <Drawer.Body className="h-2 overflow-y-auto bg-neutral-offWhite px-3 py-5">
              {itemsLocal.map((item, index) => (
                <div className="mb-5 flex gap-2 bg-white px-2 py-2" key={index}>
                  <Image
                    src={item.item?.image || ImageFood}
                    alt="imagem do produto"
                    quality={100}
                    className="h-20 w-24 flex-shrink-0 rounded-sm object-cover"
                  />
                  <div className="flex flex-col gap-3">
                    <p>{item.item?.descricao}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">
                        {normalizeCurrency(item.item?.preco)}
                      </p>
                      <div className="flex items-center gap-4">
                        <ButtonDefault
                          onClick={() =>
                            incrementOrDecrementItem('increment', item.item?.id)
                          }
                        >
                          <FaPlus />
                        </ButtonDefault>
                        <span className="font-semibold">{item.quantity}</span>
                        <ButtonDefault
                          onClick={() =>
                            incrementOrDecrementItem('decrement', item.item?.id)
                          }
                        >
                          <FaMinus />
                        </ButtonDefault>
                        <ButtonDefault
                          onClick={() => removeItem(item.item?.id)}
                        >
                          <FaRegTrashAlt />
                        </ButtonDefault>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Drawer.Body>
            <Drawer.Footer className="flex flex-col border-t border-gray-200 px-4 py-5">
              <div className="flex w-full flex-col">
                <div className="mb-4 flex items-center justify-between">
                  <TitleH4 className="font-semibold">Subtotal</TitleH4>
                  <p className="font-semibold">
                    {normalizeCurrency(getTotalPrice().toFixed(2))}
                  </p>
                </div>
              </div>
              <ButtonDefault
                variant="primary"
                className="w-full py-3"
                isLoading={isLoading}
              >
                Finalizar Pedido
              </ButtonDefault>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};
export { Cart };
