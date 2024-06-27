'use client';

import Button from '@/components/Button';
import { Authenticate } from '@/utils/imp';
import { FC, useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import Modal from '../../../../components/Modal';
import EmailFind from '../EmailFind';
import PhoneFind from '../PhoneFind';

type PwdFindModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
};

const PwdFindModal: FC<PwdFindModalProps> = ({ isOpen, onClose, title }) => {
  const [emailSkip, setEmailSkip] = useState(false);
  const [phoneSkip, setPhoneSkip] = useState(false);
  const [memberId, setMemberId] = useState(0);

  const handlePhone = async () => {
    const { name, phone } = await Authenticate();
    if (!name || !phone) {
      return toast.error('인증에 실패하였습니다.');
    }
    const res = await fetch('/server/members/find-pw', {
      method: 'POST',
      body: JSON.stringify({
        memberName: name,
        phone
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const { memberId } = await res.json();
    setMemberId(memberId);
    setPhoneSkip(true);
  };

  const handleClose = useCallback(() => {
    // 상태 초기화
    setMemberId(0);
    // 실제 onClose 호출
    onClose();
    setEmailSkip(false);
    setPhoneSkip(false);
  }, [onClose]);
  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={title}>
      <div className="my-10 flex flex-col items-center justify-center gap-4">
        {!emailSkip && !phoneSkip ? (
          <div className="flex flex-col gap-4">
            <Button onClick={handlePhone}>휴대전화 인증</Button>
            <Button
              className="bg-slate-100 hover:bg-slate-300"
              onClick={() => setEmailSkip(true)}
            >
              이메일 인증
            </Button>
          </div>
        ) : null}
        {phoneSkip ? <PhoneFind onClose={onClose} memberId={memberId} /> : null}
        {emailSkip ? <EmailFind onClose={onClose} /> : null}
      </div>
    </Modal>
  );
};

export default PwdFindModal;
