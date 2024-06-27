'use client';

import { pendingModifiedResumeList } from '@/utils/fetch';
import { PendingModifiedResumeListResponse } from '@/utils/type';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import ApplyModal from './ApplyModal';
type ResumeListProps = {
  type: 'pending' | 'modified';
};

const ResumeList: FC<ResumeListProps> = ({ type }) => {
  const router = useRouter();
  const [pendingIsOpen, setPendingIsOpen] = useState(false);
  const { data: session } = useSession();
  const [resumeList, setResumeList] =
    useState<PendingModifiedResumeListResponse>();

  useEffect(() => {
    const fetchEvents = async () => {
      if (session?.user.accessToken) {
        const events = await pendingModifiedResumeList({
          page: 1,
          token: session?.user.accessToken,
          type
        });
        setResumeList(events);
      }
    };

    fetchEvents();
  }, [session, type]);
  return (
    <div className="flex flex-col gap-1">
      <ApplyModal
        isOpen={pendingIsOpen}
        onClose={() => setPendingIsOpen(false)}
        type={type}
      />
      <div className="flex items-center justify-between px-4 py-2">
        <p className="min-w-[200px] font-semibold">이력서 제목</p>
        <div className="grid grid-cols-3 gap-12 text-center">
          <p className="w-[100px]">판매처</p>
          <p className="w-[100px]">가격</p>
          <p className="w-[100px]">등록일자</p>
        </div>
      </div>
      {resumeList?.content[0].resumeList.length !== 0 ? (
        resumeList?.content[0].resumeList.map((item, index) => (
          <div
            className="flex cursor-pointer items-center justify-between rounded-xl border-b border-gray-300 bg-subgray px-4 py-2 hover:bg-slate-200"
            key={index}
            onClick={() => setPendingIsOpen(true)}
          >
            <div className="flex items-center">
              <div className="mr-4 size-8 rounded-full bg-blue-500"></div>
              <div>
                <p className="min-w-[200px] font-semibold">{item.title}</p>
                <p className="min-w-[150px] text-gray-500">
                  {item.companyType}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-12 text-center">
              <p className="w-[100px]">{item.sellerNickname}</p>
              <p className="w-[100px]">{item.price}</p>
              <p className="w-[100px] text-gray-500">{item.price}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="m-4 text-2xl font-semibold">신청 목록이 없습니다.</div>
      )}
    </div>
  );
};

export default ResumeList;
