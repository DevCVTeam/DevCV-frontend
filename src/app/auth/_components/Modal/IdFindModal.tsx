'use client';

import { Authenticate } from '@/utils/imp';
import { FC, useState } from 'react';
import toast from 'react-hot-toast';
import Button from '../../../../components/Button';
import Modal from '../../../../components/Modal';
type IdFindModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
};

const IdFindModal: FC<IdFindModalProps> = ({ isOpen, onClose, title }) => {
  const handleAuthenticate = async () => {
    const { name, phone } = await Authenticate();
    if (!name || !phone) {
      return toast.error('인증에 실패하였습니다.');
    }
    const res = await fetch('/server/members/find-id', {
      method: 'POST',
      body: JSON.stringify({
        memberName: name,
        phone
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!res.ok) {
      return toast.error('에러 발생');
    }
    const data = await res.json();
    if (data.errorCode) {
      return toast.error(`${data.message}`);
    }
    setEmail(data.email);
  };
  const [email, setEmail] = useState('');
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="my-10 flex items-center justify-center">
        {email ? (
          <div className="flex flex-col gap-4 text-center">
            <span className="text-2xl">사용자의 이메일은 아래와 같습니다.</span>
            <hr />
            <span className="text-2xl font-semibold">{email}</span>
          </div>
        ) : (
          <Button
            className="h-12 w-40 rounded-xl"
            onClick={handleAuthenticate}
            type="button"
          >
            본인 인증
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default IdFindModal;
