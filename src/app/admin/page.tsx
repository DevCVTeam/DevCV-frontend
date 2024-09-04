import Button from '@/components/Button';
import { authOptions } from '@/utils/next-auth';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import EventList from './_components/EventList';
import ResumeList from './_components/ResumeList';

// 병렬 라우팅 가능하지만 최상단
export default async function Admin() {
  const user = await getServerSession(authOptions);
  return (
    <div className="flex flex-col gap-32">
      <div className="mt-12">
        <div className="flex items-center gap-4">
          <h2 className="mb-4 text-3xl font-semibold">이벤트 목록</h2>
          <Button className="mb-4 w-32 rounded-full">
            <Link href={`/admin/event/add`} passHref>
              이벤트 생성
            </Link>
          </Button>
        </div>
        <EventList token={user?.user.accessToken!} />
      </div>
      <div className="">
        <h2 className="mb-4 text-3xl font-semibold">이력서 신청 목록</h2>
        <ResumeList type="pending" token={user?.user.accessToken!} />
      </div>
      <div>
        <h2 className="text-3xl font-semibold">이력서 수정 신청 목록</h2>
        <ResumeList type="modified" token={user?.user.accessToken!} />
      </div>
    </div>
  );
}
