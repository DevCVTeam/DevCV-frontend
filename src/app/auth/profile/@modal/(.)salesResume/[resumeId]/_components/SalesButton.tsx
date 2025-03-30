'use client';

import Button from '@/components/common/Button';
import axios from 'axios';
import { Session } from 'next-auth';
import toast from 'react-hot-toast';

const SalesButton = ({
  user,
  resumeId
}: {
  user: Session;
  resumeId: number;
}) => {
  const handleRemove = async () => {
    try {
      const data = await axios.post(
        `/server/members/${user.user.memberId}/resumes/${resumeId}`
      );
      if (data.status === 200) {
        return toast.success('이력서 삭제되었습니다.');
      }
    } catch (error) {
      toast.error('Error');
    }
  };

  const handleModified = () => {};

  return (
    <div className="mt-20 flex justify-around">
      <Button
        className="bg-black text-white hover:bg-slate-800"
        onClick={handleRemove}
      >
        삭제하기
      </Button>
      <Button>수정하기</Button>
      <Button className="bg-slate-200 hover:bg-slate-400">취소하기</Button>
    </div>
  );
};

export default SalesButton;
