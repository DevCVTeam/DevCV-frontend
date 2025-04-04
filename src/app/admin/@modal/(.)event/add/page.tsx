'use client';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Label from '@/components/common/Label';
import Modal from '@/components/common/Modal';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import toast from 'react-hot-toast';
export default function EventAdd() {
  const { data: session } = useSession();
  const router = useRouter();
  const startRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const pointRef = useRef<HTMLInputElement>(null);

  const handleEventAdd = async () => {
    if (
      !startRef.current?.value &&
      !endRef.current?.value &&
      !titleRef.current?.value &&
      !pointRef.current?.value
    ) {
      toast.error('빈 값을 작성해주세요.');
    }
    const res = await fetch('/server/admin/events', {
      method: 'POST',
      body: JSON.stringify({
        name: titleRef.current?.value,
        startDate: new Date(startRef.current?.value!),
        eventCategory: 'ATTENDANCE',
        point: pointRef.current?.value,
        endDate: new Date(endRef.current?.value!)
      }),
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    if (!res.ok) {
      return toast.error('이벤트가 작성되지 않았습니다.');
    }
    toast.success('이벤트가 등록되었습니다.');
    return router.refresh();
  };
  return (
    <Modal title="이벤트 생성" isOpen={true}>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-4">
          <Label htmlFor="title">이벤트 제목</Label>
          <Input ref={titleRef} id="title" type="text" />
        </div>
        <div className="flex flex-col gap-4">
          <Label htmlFor="point">이벤트 포인트</Label>
          <Input ref={pointRef} id="point" type="number" />
        </div>
        <div className="flex flex-col gap-4">
          <Label htmlFor="startDate">이벤트 시작일</Label>
          <Input ref={startRef} id="startDate" type="date" />
        </div>
        <div className="flex flex-col gap-4">
          <Label htmlFor="endDate">이벤트 종료일</Label>
          <Input id="endDate" type="date" ref={endRef} />
        </div>
        <div className="flex justify-center gap-2">
          <Button onClick={handleEventAdd}>이벤트 등록</Button>
          <Button className="bg-subgray hover:bg-slate-200">취소</Button>
        </div>
      </div>
    </Modal>
  );
}
