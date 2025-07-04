'use client';
import { SomeChildrenInterface } from '@/utils/types/generics/layout.type';
import { ListActiveItemsByIdInterface } from '@/utils/types/items.type';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useItems } from '@/hooks/useItems';
import { useSession } from 'next-auth/react';
import { LoadingContext } from '@/providers/loadingProvider/loadingProvider';
import { useCartHook } from '@/hooks/useCart';
import toast from 'react-hot-toast';
import { ItemCarrinho } from '@/utils/types/cart.type';

interface CartItemLocal {
  item: ListActiveItemsByIdInterface;
  quantity: number;
}

interface CartApiResponse {
  valorTotal: string;
  carrinhoItens: ItemCarrinho[];
}

interface CartContextType {
  itemsLocal: CartItemLocal[];
  itemsCartApi: CartApiResponse | null;
  addItemById: (itemId: string) => Promise<void>;
  incrementOrDecrementItem: (
    itemId: string,
    act: string,
  ) => Promise<void> | void;
  removeItem: (itemId: string) => Promise<void> | void;
  isLoading: boolean;
  quantity: number;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export const CartProvider = ({ children }: SomeChildrenInterface) => {
  const { data: session } = useSession();
  const { listItemById } = useItems();
  const { createUserCart, listCartByUser } = useCartHook();
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const [quantity, setQuantity] = useState(0);
  const [itemsLocal, setItemsLocal] = useState<CartItemLocal[]>([]);
  const [itemsCartApi, setItemsCartApi] = useState<CartApiResponse | null>(
    null,
  );

  useEffect(() => {
    try {
      const stored = localStorage.getItem('cart-items');
      setItemsLocal(stored ? JSON.parse(stored) : []);
    } catch {
      setItemsLocal([]);
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem('cart-items', JSON.stringify(itemsLocal));
      const quantity = itemsLocal.reduce((acc, curr) => acc + curr.quantity, 0);
      setQuantity(quantity > 0 ? quantity : 0);
    }, 300);
    return () => clearTimeout(timeout);
  }, [itemsLocal]);

  useEffect(() => {
    listCart();
  }, [session]);

  const listCart = async () => {
    const token = session?.user?.accessToken || '';

    const res = await listCartByUser({ token });

    if (!res.data) {
      console.warn('Sem dados no carrinho.');
      return;
    }

    const carrinhoSimplificado: CartApiResponse = {
      valorTotal: res.data.valorTotal,
      carrinhoItens: res.data.carrinhoItens.map((ci: ItemCarrinho) => ({
        id: ci.id,
        precoAtual: ci.precoAtual,
        itemId: ci.itemId,
        carrinhoId: ci.carrinhoId,
        quantidade: ci.quantidade,
        Item: {
          nome: ci.Item.nome,
          preco: ci.Item.preco,
          image: ci.Item.image,
          descricao: ci.Item.descricao,
          disponivel: ci.Item.disponivel,
          tamanho: ci.Item.tamanho,
        },
      })),
    };

    console.log('ANTES do set:', itemsCartApi);
    console.log('Novo carrinhoSimplificado:', carrinhoSimplificado);

    setItemsCartApi(carrinhoSimplificado);
  };

  // Função para adicionar item ao carrinho
  const addItemById = useCallback(
    async (itemId: string) => {
      if (!session?.user?.id) {
        setIsLoading(true);

        const response = await listItemById(itemId);

        const existingIndex = itemsLocal.findIndex(
          (cartItem) => cartItem.item?.id === response.data.id,
        );

        if (existingIndex >= 0) {
          const updatedItems = [...itemsLocal];
          updatedItems[existingIndex].quantity += 1;
          setItemsLocal(updatedItems);
        } else {
          setItemsLocal((prevItems) => [
            ...prevItems,
            { item: response.data, quantity: 1 },
          ]);
        }

        setIsLoading(false);
      } else {
        try {
          setIsLoading(true);
          const res = await createUserCart({
            token: session.user.accessToken,
            body: { itemId: itemId, userId: session.user.id },
          });

          if (!res.success) {
            toast.error('Erro ao criar Carrinho. Entre em contato com suporte');
          }
          console.log(res);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    },
    [
      session?.user?.id,
      session?.user.accessToken,
      listItemById,
      createUserCart,
      setIsLoading,
      itemsLocal,
    ],
  );

  const incrementOrDecrementItem = (act: string, itemId: string) => {
    if (!session?.user.id) {
      const updatedItems = itemsLocal.map((item) => {
        if (item.item.id === itemId) {
          const newQuantity =
            act === 'increment' ? item.quantity + 1 : item.quantity - 1;
          return { ...item, quantity: Math.max(1, newQuantity) };
        }
        return item;
      });
      setItemsLocal(updatedItems);
    }
  };

  const removeItem = (itemId: string) => {
    if (!session?.user.id) {
      const updatedItems = itemsLocal.filter((item) => item.item.id !== itemId);
      setItemsLocal(updatedItems);
    }
  };

  return (
    <CartContext.Provider
      value={{
        itemsLocal,
        itemsCartApi,
        isLoading,
        quantity,
        addItemById,
        incrementOrDecrementItem,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro do CartProvider');
  }
  return context;
}
