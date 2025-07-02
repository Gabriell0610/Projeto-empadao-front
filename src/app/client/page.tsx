import { Header } from '@/components/Header/Header';
import ClientPage from './clientPage';
import { getServerSession } from 'next-auth';
import { Footer } from '@/components/Footer/Footer';
import { authOptions } from '@/libs/auth';

export default async function ClientDefaultPage() {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex min-h-screen flex-col">
      <Header login={session} />
      <ClientPage session={session} />
      <Footer />
    </div>
  );
}
