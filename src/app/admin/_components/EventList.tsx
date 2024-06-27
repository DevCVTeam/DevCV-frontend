'use client';

import { getEvents } from '@/utils/fetch';
import { type EventList } from '@/utils/type';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import EventModal from './EventModal';

const EventList = () => {
  const { data: session } = useSession();
  const [events, setEvents] = useState<EventList>();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      if (session?.user.accessToken) {
        const events = await getEvents(session.user.accessToken);
        setEvents(events);
      }
    };

    fetchEvents();
  }, [session]);

  return (
    <div className="flex flex-col gap-1">
      <EventModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="이벤트 수정"
      />
      <div className="flex items-center justify-between px-4 py-2">
        <p className="min-w-[200px] font-semibold">제목</p>
        <div className="grid grid-cols-1 gap-12 text-center">
          <p className="w-[300px]">기간</p>
          {/* <p className="w-[100px]">포인트</p> */}
        </div>
      </div>
      {events
        ? events.eventListResponse.map((item, index) => (
            <div
              className="flex cursor-pointer items-center justify-between rounded-xl border-b border-gray-300 bg-subgray px-4 py-2 hover:bg-slate-200"
              key={index}
              onClick={() => setIsOpen(true)}
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
            </div>
          ))
        : null}
    </div>
  );
};

export default EventList;
