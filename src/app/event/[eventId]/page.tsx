'use client';

import { TEvent } from '@/utils/type';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaDollarSign } from 'react-icons/fa';
import { MdOutlineDateRange } from 'react-icons/md';
import AttendanceCheckIn from './_components/AttendanceCheckIn';
import Pending from './_components/Pending';

const EventIdPage = ({
  params: { eventId }
}: {
  params: { eventId: number };
}) => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [event, setEvent] = useState<TEvent>();
  const { data: session } = useSession();
  useEffect(() => {
    (async () => {
      const res = await fetch(`/server/events/${eventId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`
        }
      });
      const data = await res.json();
      setEvent(data);
    })();
  }, []);

  const handleAttend = async () => {
    const res = await fetch('/server/attendance', {
      method: 'POST',
      body: JSON.stringify({
        memberId: session?.user.memberId,
        eventId: eventId
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user.accessToken}`
      }
    });
    if (!res.ok) {
      const data = await res.json();
      return toast.error(data.message);
    }
    toast.success('출석체크에 성공했습니다.');
    setShow(true);
    return router.push('/');
  };
  return (
    <div className="mt-8">
      <div className="flex w-full flex-col gap-4">
        <h2 className="text-3xl font-semibold">{event?.name}</h2>
        <span className="flex items-center gap-2">
          <MdOutlineDateRange />
          {new Date(event?.startDate!).toLocaleDateString()} ~{' '}
          {new Date(event?.endDate!).toLocaleDateString()}
        </span>
        <div className="flex items-center gap-2">
          <FaDollarSign />
          <p>{event?.point} Point 지급</p>
        </div>
      </div>
      <hr className="my-12 w-full border" />
      <div className="flex items-center justify-center">
        {show ? (
          <AttendanceCheckIn />
        ) : (
          <div className="flex flex-col gap-6">
            <h4 className="self-center text-2xl font-semibold">출석체크</h4>
            <code>
              출석체크를 진행하기 위해서는 아래 아이콘을 클릭해주세요!
            </code>
            <Pending onClick={handleAttend} />
          </div>
        )}
      </div>
    </div>
  );
};

export default EventIdPage;
