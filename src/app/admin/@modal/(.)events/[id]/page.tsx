import EventButton from '@/app/admin/_components/EventButton';
import Input from '@/components/common/Input';
import Label from '@/components/common/Label';
import Modal from '@/components/common/Modal';
import { getEvent } from '@/utils/fetch';
import { authOptions } from '@/utils/next-auth';
import { getServerSession } from 'next-auth';

// 타입 정의 변경
type Props = {
  id: string;
};

export default async function Events({ params }: { params: Props }) {
  const user = await getServerSession(authOptions);
  const event = await getEvent({
    token: user?.user.accessToken!,
    eventId: Number(params.id)
  });

  if (event.errorCode) {
    return (
      <Modal title="이벤트 목록" isOpen={true}>
        삭제완료
      </Modal>
    );
  }

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
      <EventButton eventId={Number(params.id)} user={user!} />
    </Modal>
  );
}
