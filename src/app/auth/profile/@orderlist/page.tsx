import { getOrders } from '@/utils/fetch';
import { authOptions } from '@/utils/next-auth';
import { getServerSession } from 'next-auth';
import SalesTable from './_components/SalesTable';
import ShoppingTable from './_components/ShoppingTable';

export default async function OrderListPage() {
  const user = await getServerSession(authOptions);
  const orderList = await getOrders({
    memberId: user?.user.memberId!,
    token: user?.user.accessToken!
  });
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-semibold text-sub">구매목록</h3>
        <ShoppingTable
          count={orderList.count}
          memberId={orderList.memberId}
          orderList={orderList.orderList}
        />
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-semibold text-sub">판매목록</h3>
        <SalesTable />
      </div>
    </div>
  );
}
