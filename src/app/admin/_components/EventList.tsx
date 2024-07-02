import { getEvents } from '@/utils/fetch';
import Link from 'next/link';

export default async function EventList({ token }: { token: string }) {
  console.log(token);
  const events = await getEvents(token);
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between px-4 py-2">
        <p className="min-w-[200px] font-semibold">제목</p>
        <div className="grid grid-cols-1 gap-12 text-center">
          <p className="w-[300px]">기간</p>
          {/* <p className="w-[100px]">포인트</p> */}
        </div>
      </div>
      {events?.eventListResponse.map((item, index) => (
        <Link
          className="flex cursor-pointer items-center justify-between rounded-xl border-b border-gray-300 bg-subgray px-4 py-2 hover:bg-slate-200"
          key={index}
          href={`/admin/events/${item.eventId}`}
        >
          <div className="flex items-center">
            <div>
              <p className="min-w-[200px] font-semibold">{item.name}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-12 text-center">
            <p className="w-[300px]">
              {new Date(item.startDate).toLocaleDateString()} ~{' '}
              {new Date(item.endDate).toLocaleDateString()}
            </p>
            {/* <p className="w-[100px] text-gray-500">{item.point}</p> */}
          </div>
        </Link>
      ))}
    </div>
  );
}
