'use client';

import Button from '@/components/Button';
import { SalesResume } from '@/utils/type';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import toast from 'react-hot-toast';

const SalesTable: FC<SalesResume> = ({ count, memberId, resumeList }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const handleApproved = async (resumeId: number) => {
    const res = await fetch(
      `/server/members/${memberId}/resumes/${resumeId}/status`,
      {
        method: 'PUT',
        body: JSON.stringify({
          resumeId: resumeId
        }),
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`
        }
      }
    );
    if (!res.ok) {
      return toast.error('이력서를 등록에 실패했습니다.');
    }
    router.refresh();
    return toast.success('이력서를 등록하였습니다.');
  };

  const handleRemove = async (resumeId: number) => {
    try {
      const data = await fetch(
        `/server/members/${session?.user.memberId}/resumes/${resumeId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`
          }
        }
      );
      if (data.status < 300) {
        router.refresh();
        return toast.success('이력서 삭제되었습니다.');
      }
    } catch (error) {
      toast.error('이력서 삭제에 실패했습니다.');
    }
  };
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between px-4 py-2">
        <p className="min-w-[200px] font-semibold">이력서 제목</p>
        <div className="grid grid-cols-4 gap-12 text-center">
          <p className="w-[80px]">판매처</p>
          <p className="w-[80px]">가격</p>
          <p className="w-[100px]">등록일자</p>
          <p className="w-[200px]">상태</p>
        </div>
      </div>

      {resumeList.map((resume, index) => (
        <div
          className="flex items-center justify-between rounded-xl border-b border-gray-300 bg-subgray px-4 py-2"
          key={index}
        >
          <div
            className="flex cursor-pointer items-center hover:bg-slate-200"
            onClick={() =>
              router.push(`/auth/profile/salesResume/${resume.resumeId}`)
            }
          >
            <div className="mr-4 size-8 rounded-full bg-blue-500"></div>
            <div>
              <p className="min-w-[200px] font-semibold">{resume.title}</p>
              <p className="min-w-[150px] text-gray-500">
                {resume.sellerNickname}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-12 text-center">
            <p className="w-[80px]">{resume.stackType}</p>
            <p className="w-[80px]">{resume.price}</p>
            <p className="w-[100px] text-gray-500">
              {new Date(resume.createdDate).toLocaleDateString('ko-kr')}
            </p>

            {resume.resumeStatus === 'approved' ? (
              <p
                className="flex w-[200px] cursor-pointer items-center justify-center gap-4 underline"
                onClick={() => handleApproved(resume.resumeId)}
              >
                등록하기
              </p>
            ) : null}
            {resume.resumeStatus === 'pending' ? (
              <p className="flex w-[200px] items-center justify-center gap-4 underline">
                대기
              </p>
            ) : null}
            {resume.resumeStatus === 'rejected' ? (
              <p className="flex w-[200px] items-center justify-center gap-4 underline">
                반려
              </p>
            ) : null}
            {resume.resumeStatus === 'regcompleted' ? (
              <p className="flex w-[200px] gap-4">
                <Button
                  onClick={() =>
                    router.push(`/auth/profile/salesResume/${resume.resumeId}`)
                  }
                  className="w-1/2 bg-white text-blue-500 hover:bg-slate-300"
                >
                  수정
                </Button>
                <Button
                  onClick={() => handleRemove(resume.resumeId)}
                  className="w-1/2 bg-white text-red-500 hover:bg-slate-300"
                >
                  삭제
                </Button>
              </p>
            ) : null}
            {resume.resumeStatus === 'modified' ? (
              <p className="flex w-[200px] items-center justify-center gap-4">
                수정대기
              </p>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SalesTable;
