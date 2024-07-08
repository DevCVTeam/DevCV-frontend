'use client';

import { type EventList } from '@/utils/type';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { IoMdTime } from 'react-icons/io';

const EventList = ({ events }: { events: EventList }) => {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 gap-3 2xl:grid-cols-3 2xl:gap-6">
      {events.eventListResponse
        .filter((event) => event.eventCategory === 'ATTENDANCE')
        .map((event, index) => (
          <div
            onClick={() => router.push(`/event/${event.eventId}`)}
            className="m-12 flex cursor-pointer flex-col items-center gap-4 rounded-2xl border hover:bg-slate-100"
            key={index}
          >
            <div key={index} className="m-12 flex flex-col items-center gap-4">
              <Image
                src="/logo.png"
                width={0}
                height={0}
                sizes="75vw"
                alt="이벤트 이미지"
                className="h-auto w-2/3"
              />
              <div className="flex gap-4">
                <div className="flex flex-col justify-center text-center">
                  <h3 className="text-xl text-sub">
                    {event.point.toLocaleString()}
                  </h3>
                  <span className="">Point</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="line-clamp-2 text-xl font-semibold">
                    {event.name}
                  </h3>
                  <div className="flex items-center gap-1">
                    <IoMdTime />
                    <span>
                      {new Date(event.startDate).toLocaleDateString('ko-kr')} ~{' '}
                      {new Date(event.endDate).toLocaleDateString('ko-kr')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default EventList;
