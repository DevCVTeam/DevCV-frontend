import { getOrders, salesResumes } from '@/utils/fetch';
import { authOptions } from '@/utils/next-auth';
import { getServerSession } from 'next-auth';
import ShoppingTable from './_components/ShoppingTable';

export default async function OrderListPage() {
  const user = await getServerSession(authOptions);
  const orderList = await getOrders({
    memberId: user?.user.memberId!,
    token: user?.user.accessToken!
  });

  const sales = await salesResumes({
    memberId: user?.user.memberId!,
    token: user?.user.accessToken!
  });
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-2xl font-semibold text-sub">구매목록</h3>
      <ShoppingTable
        orderCount={orderList.orderCount}
        memberId={orderList.memberId}
        orderList={orderList.orderList}
        token={user?.user.accessToken!}
      />
    </div>
  );
}
