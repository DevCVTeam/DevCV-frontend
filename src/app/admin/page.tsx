import { authOptions } from '@/utils/next-auth';
import { getServerSession } from 'next-auth';
import EventList from './_components/EventList';
import ResumeList from './_components/ResumeList';

// 병렬 라우팅 가능하지만 최상단
export default async function Admin() {
  const user = await getServerSession(authOptions);

  return (
    <div className="flex flex-col gap-32">
      <div className="mt-12">
        <h2 className="mb-4 text-3xl font-semibold">이벤트 목록</h2>
        <EventList />
      </div>
      <div className="">
        <h2 className="mb-4 text-3xl font-semibold">이력서 신청 목록</h2>
        <ResumeList type="pending" />
      </div>
      <div>
        <h2 className="text-3xl font-semibold">이력서 수정 신청 목록</h2>
        <ResumeList type="modified" />
      </div>
    </div>
  );
}
