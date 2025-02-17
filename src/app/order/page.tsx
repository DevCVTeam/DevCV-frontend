import { getMemberPoint } from '@/utils/fetch';
import { authOptions } from '@/utils/next-auth';
import { type UserPoint } from '@/utils/type';
import { getServerSession } from 'next-auth';
import ClientOrderActions from './_components/ClientOrderActions';

const OrderPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <p>로그인이 필요합니다.</p>;
  }

  const userPoint: UserPoint = await getMemberPoint(
    session.user.memberId,
    session.user.accessToken
  );
  return (
    <div className="flex flex-col gap-8">
      <h4 className="text-2xl font-semibold text-sub">주문 결제</h4>
      <ClientOrderActions user={session.user} userPoint={userPoint} />
    </div>
  );
};

export default OrderPage;
