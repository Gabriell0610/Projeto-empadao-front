/* eslint-disable react-hooks/rules-of-hooks */
import { Header } from '@/components/Header/Header';
import Home from './clientPage';
import { getServerSession } from 'next-auth';
import { ListActiveItemsInterface } from '@/utils/types/items.type';
import { authOptions } from '@/libs/auth';
import { listActiveItem } from '@/services/itemService';

export default async function HomePage() {
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
