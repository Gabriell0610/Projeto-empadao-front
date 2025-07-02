import { ApiResponse } from '@/utils/types/generics/apiResponse';
import { ListActiveItemsByIdInterface } from '@/utils/types/items.type';

export function useItems() {
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
    listItemById,
  };
}
