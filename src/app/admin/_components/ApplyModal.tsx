import Button from '@/components/Button';
import Modal from '@/components/Modal';
import { FC } from 'react';
import { FaCloudDownloadAlt } from 'react-icons/fa';

type ApplyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  type: 'apply' | 'modify';
};

const ApplyModal: FC<ApplyModalProps> = ({ isOpen, onClose, type }) => {
  const handleAccept = () => {
    // 수락 시 이력서신청, 이력서수정신청 요청보내기
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={type === 'apply' ? '이력서 신청' : '이력서 수정 신청'}
      className="sm:max-w-6xl"
    >
      <div className="mt-6 flex flex-col gap-4">
        <div className="flex justify-between">
          <span className="text-slate-800">판매자 닉네임</span>
          <p className="w-3/4 text-slate-400">김꺽새</p>
        </div>
        <hr className="w-full border" />
        <div className="flex justify-between">
          <span className="text-slate-800">개발 직무</span>
          <p className="w-3/4 text-slate-400">백엔드</p>
        </div>
        <hr className="w-full border" />
        <div className="flex justify-between">
          <span className="text-slate-800">기술 스택</span>
          <p className="w-3/4 text-slate-400">Spring, JPA, Jenkins</p>
        </div>
        <hr className="w-full border" />
        <div className="flex justify-between">
          <span className="text-slate-800">판매자 닉네임</span>
          <p className="w-3/4 text-slate-400">김꺽새</p>
        </div>
        <hr className="w-full border" />
        <div className="flex justify-between">
          <span className="text-slate-800">주요경력</span>
          <p className="w-3/4 text-slate-400">김꺽새</p>
        </div>
        <hr className="w-full border" />
        <div className="flex justify-between">
          <span className="text-slate-800">활동내역</span>
          <p className="w-3/4 text-slate-400">김꺽새</p>
        </div>
        <hr className="w-full border" />
        <div className="flex justify-between">
          <span className="text-slate-800">합격 증빙자료</span>
          <div className="flex w-3/4 flex-col">
            <div className="flex cursor-pointer items-center gap-1 text-sky-500">
              <FaCloudDownloadAlt />
              네이버 합격 통지서.PDF
            </div>
            <div className="flex cursor-pointer items-center gap-1 text-sky-500">
              <FaCloudDownloadAlt />
              네이버 합격 통지서.JPG
            </div>
          </div>
        </div>
        <hr className="w-full border" />
        <div className="flex justify-between">
          <span className="text-slate-800">이력서</span>
          <div className="flex w-3/4 cursor-pointer items-center gap-1 text-sky-500">
            <FaCloudDownloadAlt />
            PDF
          </div>
        </div>
        <hr className="w-full border" />
        <div className="flex justify-between">
          <span className="text-slate-800">설명</span>
          <p className="w-3/4 text-slate-400">PDF</p>
        </div>
      </div>
      <div className="mt-20 flex justify-around">
        <Button>{type === 'modify' ? '수락하기' : '수정 수락하기'}</Button>
        <Button className="bg-slate-200 hover:bg-slate-400">취소하기</Button>
      </div>
    </Modal>
  );
};

export default ApplyModal;
