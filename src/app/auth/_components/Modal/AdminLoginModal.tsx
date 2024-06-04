'use client';

import { FC, useRef } from 'react';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import Modal from './Modal';

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
  const idRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div>
        <form className="mt-4 flex flex-col gap-4">
          <Input ref={idRef} placeholder="아이디를 입력하세요." />
          <Input ref={pwdRef} placeholder="패스워드를 입력하세요." />
          <Button type="submit" className="w-full">
            로그인
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default AdminLoginModal;
