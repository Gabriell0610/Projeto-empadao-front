import { baseUrl } from '@/utils/helpers';
import { ApiResponse } from '@/utils/types/generics/apiResponse';
import {
  ListActiveItemsByIdInterface,
  ListActiveItemsInterface,
} from '@/utils/types/items.type';

export function useItems() {
  async function listActiveItem() {
    const req = await fetch(`${baseUrl()}/itens/active`, {
      method: 'GET',
      cache: 'no-cache',
    });

    const response: ApiResponse<ListActiveItemsInterface[]> = await req.json();

    if (req.status >= 400) {
      const error = { ...response, success: false };
      return error;
    }
    return response;
  }

  async function listItemById(itemId: string) {
    console.log('ID DO ITEM', itemId);
    const req = await fetch(`/api/item?itemId=${itemId}`, {
      method: 'GET',
    });

    const res: ApiResponse<ListActiveItemsByIdInterface> = await req.json();
    console.log('Response do backend', res);
    return res;
  }

  return {
    listActiveItem,
    listItemById,
  };
}
