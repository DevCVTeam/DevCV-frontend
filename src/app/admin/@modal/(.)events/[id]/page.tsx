import Button from '@/components/Button';
import Input from '@/components/Input';
import Label from '@/components/Label';
import Modal from '@/components/Modal';
import { getEvent } from '@/utils/fetch';
import { authOptions } from '@/utils/next-auth';
import { getServerSession } from 'next-auth';

export default async function ResumeModal({
  params: { id: eventId }
}: {
  params: { id: number };
}) {
  const user = await getServerSession(authOptions);
  const event = await getEvent({ token: user?.user.accessToken!, eventId });
  return (
    <Modal title="이벤트 목록" isOpen={true}>
      <span className="text-sm text-slate-400">
        이벤트를 질문 중 수정할 부분을 수정하세요
      </span>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center">
          <Label htmlFor="title">이벤트 제목</Label>
          <Input
            type="text"
            className="w-full"
            id="title"
            value={event.name}
            disabled
          />
        </div>
        <div className="flex flex-col items-center">
          <Label htmlFor="eventCategory">이벤트 종류</Label>
          <Input
            type="text"
            className="w-full"
            id="eventCategory"
            value={event.eventCategory}
            disabled
          />
        </div>
        <div className="flex flex-col items-center">
          <Label htmlFor="startDate">이벤트 시작일</Label>
          <Input
            type="date"
            className="w-full"
            id="startDate"
            value={new Date(event.startDate).toISOString().slice(0, 10)}
            disabled
          />
        </div>
        <div className="flex flex-col items-center">
          <Label htmlFor="endDate">이벤트 종료일</Label>
          <Input
            type="date"
            className="w-full"
            id="endDate"
            value={new Date(event.endDate).toISOString().slice(0, 10)}
            disabled
          />
        </div>
      </div>
      <div className="mt-4 flex justify-center gap-4">
        <Button>수정하기</Button>
        <Button className="bg-black text-white hover:bg-slate-800">
          이벤트 삭제하기
        </Button>
        <Button className="bg-slate-200 hover:bg-slate-400">취소하기</Button>
      </div>
    </Modal>
  );
}
