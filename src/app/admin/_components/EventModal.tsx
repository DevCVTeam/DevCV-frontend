import Button from '@/components/Button';
import Input from '@/components/Input';
import Label from '@/components/Label';
import Modal from '@/components/Modal';
import { FC } from 'react';

type EventModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
};
const EventModal: FC<EventModalProps> = ({ isOpen, onClose, title }) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} title={title}>
      <span className="text-sm text-slate-400">
        이벤트를 질문 중 수정할 부분을 수정하세요
      </span>
      <div className="flex flex-col gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="flex flex-col items-center">
            <Label htmlFor={index.toString()}>{index + 1}번째 질문</Label>
            <Input type="text" className="w-full" id={index.toString()} />
          </div>
        ))}
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
};

export default EventModal;
