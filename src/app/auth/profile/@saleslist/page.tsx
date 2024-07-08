import { salesResumes } from '@/utils/fetch';
import { authOptions } from '@/utils/next-auth';
import { getServerSession } from 'next-auth';
import SalesTable from './_components/SalesTable';

export default async function OrderListPage() {
  const user = await getServerSession(authOptions);

  const sales = await salesResumes({
    memberId: user?.user.memberId!,
    token: user?.user.accessToken!
  });
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-2xl font-semibold text-sub">판매목록</h3>
      <SalesTable {...sales} />
    </div>
  );
}
