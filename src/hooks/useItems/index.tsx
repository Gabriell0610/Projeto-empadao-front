import { ApiResponse } from '@/utils/types/generics/apiResponse';
import { ListActiveItemsInterface } from '@/utils/types/items.type';

export function useItems() {
  async function listActiveItem() {
    const req = await fetch('/api/items/', {
      method: 'GET',
    });

    const response: ApiResponse<ListActiveItemsInterface[]> = await req.json();

    return response;
  }

  return {
    listActiveItem,
  };
}
