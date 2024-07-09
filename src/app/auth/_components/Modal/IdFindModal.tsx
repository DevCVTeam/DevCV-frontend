'use client';

import { SocialObj } from '@/utils/constant';
import { Authenticate } from '@/utils/imp';
import { SocialType } from '@/utils/type';
import { FC, useState } from 'react';
import toast from 'react-hot-toast';
import Button from '../../../../components/Button';
import Modal from '../../../../components/Modal';
type IdFindModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
};

type TResponse = {
  findMemberList: {
    social: SocialType;
    email: string;
  }[];
  errorCode?: string;
  message?: string;
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
    const data: TResponse = await res.json();
    if (data.errorCode) {
      return toast.error(`${data.message}`);
    }
    console.log(data);
    setEmail(data);
    console.log(email);
  };
  const [email, setEmail] = useState<TResponse>();
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="my-10 flex items-center justify-center">
        {email?.findMemberList ? (
          <div className="flex flex-col gap-4 text-center">
            <span className="text-2xl">회원의 이메일은 아래와 같습니다.</span>
            <hr />
            <div className="flex flex-col gap-8 ">
              {email.findMemberList.map((member) => (
                <div key={member.email}>
                  <div className="flex">
                    <span>Email : </span>&nbsp;
                    <p className="font-semibold">{member.email}</p>
                  </div>
                  <div className="flex">
                    <span>Social : </span>&nbsp;
                    <p className="font-semibold">{SocialObj[member.social]}</p>
                  </div>
                </div>
              ))}
            </div>
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
