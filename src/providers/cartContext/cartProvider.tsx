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

interface CartItem {
  item: ListActiveItemsByIdInterface;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
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
  const { createUserCart } = useCartHook();
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const [quantity, setQuantity] = useState(0);
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('cart-items');
      setItems(stored ? JSON.parse(stored) : []);
    } catch {
      setItems([]);
    }
  }, []);

  // Atualiza o localStorage toda vez que items mudar
  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem('cart-items', JSON.stringify(items));
      const quantity = items.reduce((acc, curr) => acc + curr.quantity, 0);
      setQuantity(quantity > 0 ? quantity : 0);
    }, 300);

    return () => clearTimeout(timeout);
  }, [items]);

  // Função para adicionar item ao carrinho
  const addItemById = useCallback(
    async (itemId: string) => {
      if (!session?.user?.id) {
        setIsLoading(true);

        const response = await listItemById(itemId);

        const existingIndex = items.findIndex(
          (cartItem) => cartItem.item?.id === response.data.id,
        );

        if (existingIndex >= 0) {
          const updatedItems = [...items];
          updatedItems[existingIndex].quantity += 1;
          setItems(updatedItems);
        } else {
          setItems((prevItems) => [
            ...prevItems,
            { item: response.data, quantity: 1 },
          ]);
        }

        setIsLoading(false);
      } else {
        setIsLoading(true);
        const res = await createUserCart({
          token: session.user.accessToken,
          body: { itemId: itemId, userId: session.user.id },
        });

        console.log('RES CREATE CART', res);
        setIsLoading(false);
      }
    },
    [session?.user?.id, listItemById, setIsLoading, items],
  );

  const incrementOrDecrementItem = (act: string, itemId: string) => {
    if (!session?.user.id) {
      const updatedItems = items.map((item) => {
        if (item.item.id === itemId) {
          const newQuantity =
            act === 'increment' ? item.quantity + 1 : item.quantity - 1;
          return { ...item, quantity: Math.max(1, newQuantity) };
        }
        return item;
      });
      setItems(updatedItems);
    }
  };

  const removeItem = (itemId: string) => {
    if (!session?.user.id) {
      const updatedItems = items.filter((item) => item.item.id !== itemId);
      setItems(updatedItems);
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
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
