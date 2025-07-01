/* eslint-disable react-hooks/rules-of-hooks */
import { Header } from '@/components/Header/Header';
import Home from './clientPage';
import { authOptions } from './api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { useItems } from '@/hooks/useItems';
import { ListActiveItemsInterface } from '@/utils/types/items.type';
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
