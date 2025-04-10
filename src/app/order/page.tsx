import { getMemberPoint } from '@/utils/fetch';
import { authOptions } from '@/utils/next-auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import ClientOrder from './_components/ClientOrder';

export default async function OrderPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  const userPoint = await getMemberPoint(
    session.user.memberId,
    session.user.accessToken
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold">주문/결제</h1>
      <ClientOrder user={session.user} userPoint={userPoint} />
    </div>
  );
}
