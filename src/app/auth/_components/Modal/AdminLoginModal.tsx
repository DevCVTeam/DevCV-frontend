'use client';

import { signFn } from '@/utils/jwt';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FC, useRef } from 'react';
import toast from 'react-hot-toast';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import Modal from '../../../../components/Modal';

type AdminLoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
};

const AdminLoginModal: FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  title
}) => {
  const router = useRouter();
  const idRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  const handleSubmit = async () => {
    const pwdToken = await signFn(pwdRef.current?.value!);
    const result = await signIn('credentials', {
      email: idRef.current?.value,
      password: pwdToken
    });
    console.log(result);
    if (result?.error) {
      return toast.error('로그인에 실패하였습니다.');
    } else if (result === null) {
      return toast.error('로그인에 실패하였습니다.');
    } else {
      toast.success('로그인에 성공하였습니다.');
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div>
        <form className="mt-4 flex flex-col gap-4">
          <Input ref={idRef} placeholder="아이디를 입력하세요." type="email" />
          <Input
            ref={pwdRef}
            placeholder="패스워드를 입력하세요."
            type="password"
          />
          <Button type="button" className="w-full" onClick={handleSubmit}>
            로그인
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default AdminLoginModal;
