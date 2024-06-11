'use client';

import { FC } from 'react';
import Button from '../../../../components/Button';
import Modal from '../../../../components/Modal';

type IdFindModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
};

const IdFindModal: FC<IdFindModalProps> = ({ isOpen, onClose, title }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="my-10 flex items-center justify-center">
        <Button className="h-12 w-40 rounded-xl">본인 인증</Button>
      </div>
    </Modal>
  );
};

export default IdFindModal;
