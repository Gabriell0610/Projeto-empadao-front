import { baseUrl } from '@/utils/helpers';
import { ApiResponse } from '@/utils/types/generics/apiResponse';
import { ListActiveItemsInterface } from '@/utils/types/items.type';

export async function listActiveItem(): Promise<
  ApiResponse<ListActiveItemsInterface[]>
> {
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
