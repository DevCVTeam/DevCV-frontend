'use client';

import { FC } from 'react';
import Button from '../../../../components/Button';
import Modal from '../../../../components/Modal';

type PwdFindModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
};

const PwdFindModal: FC<PwdFindModalProps> = ({ isOpen, onClose, title }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="my-10 flex flex-col items-center justify-center gap-4">
        <Button>휴대전화 인증</Button>
        <Button>이메일 인증</Button>
      </div>
    </Modal>
  );
};

export default PwdFindModal;
