import { CreateCartInteface } from '@/utils/types/cart.type';
import { RequestInterface } from '@/utils/types/generics/request.type';

export function useCartHook() {
  async function createUserCart(data: RequestInterface<CreateCartInteface>) {
    const req = await fetch('/api/cart', {
      method: 'POST',
      headers: {
        authorization: `${data.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data.body),
    });

    const res = await req.json();

    return res;
  }

  return {
    createUserCart,
  };
}
