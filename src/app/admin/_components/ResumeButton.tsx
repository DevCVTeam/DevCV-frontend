'use client';

import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const ResumeButton = ({
  token,
  resumeId
}: {
  token: string;
  resumeId: number;
}) => {
  const router = useRouter();
  const handleApproved = async () => {
    const res = await fetch(`/server/admin/resumes/${resumeId}/approved`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (!res.ok) {
      return toast.error('실패');
    }
    toast.success('성공');
    return router.refresh();
  };
  const handleRejected = async () => {
    const res = await fetch(`/server/admin/resumes/${resumeId}/rejected`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (!res.ok) {
      return toast.error('반려 실패');
    }
    toast.success('반려 완료');
    return router.refresh();
  };
  return (
    <div className="mt-20 flex justify-around">
      <Button onClick={handleApproved}>승인</Button>
      <Button
        className="bg-slate-200 hover:bg-slate-400"
        onClick={handleRejected}
      >
        반려
      </Button>
    </div>
  );
};

export default ResumeButton;
