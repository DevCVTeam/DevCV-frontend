'use client';

import Button from '@/components/Button';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const EventButton = ({ eventId, user }: { eventId: number; user: Session }) => {
  const router = useRouter();
  return (
    <div className="mt-4 flex justify-center gap-4">
      <Button
        className="bg-black text-white hover:bg-slate-800"
        onClick={async () => {
          const res = await fetch(`/server/admin/events/${eventId}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${user.user.accessToken}`
            }
          });
          if (!res.ok) {
            toast.error('이벤트 삭제에 실패했습니다.');
            return router.back();
          }
          toast.success('이벤트가 삭제되었습니다.');
          return router.back();
        }}
      >
        이벤트 삭제하기
      </Button>
      <Button className="bg-slate-200 hover:bg-slate-400">취소하기</Button>
    </div>
  );
};

export default EventButton;
