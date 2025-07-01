/* eslint-disable react-hooks/rules-of-hooks */
import { Header } from '@/components/Header/Header';
import Home from './clientPage';
import { getServerSession } from 'next-auth';
import { useItems } from '@/hooks/useItems';
import { ListActiveItemsInterface } from '@/utils/types/items.type';
import { authOptions } from '@/libs/auth';
export default async function HomePage() {
  const { listActiveItem } = useItems();
  const session = await getServerSession(authOptions);
  const res = await listActiveItem();

  const data: ListActiveItemsInterface[] = res.data;
  return (
    <>
      <Header login={session} />
      <Home data={data} />
    </>
  );
}
