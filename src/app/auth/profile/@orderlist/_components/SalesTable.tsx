'use client';

import { SalesResume } from '@/utils/type';
import Link from 'next/link';
import { FC } from 'react';

const SalesTable: FC<SalesResume> = ({ count, memberId, resumeList }) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between px-4 py-2">
        <p className="min-w-[200px] font-semibold">이력서 제목</p>
        <div className="grid grid-cols-4 gap-12 text-center">
          <p className="w-[100px]">판매처</p>
          <p className="w-[100px]">가격</p>
          <p className="w-[100px]">등록일자</p>
          <p className="w-[100px]"></p>
        </div>
      </div>

      {resumeList.map((item, index) => (
        <Link
          className="flex items-center justify-between rounded-xl border-b border-gray-300 bg-subgray px-4 py-2 hover:bg-slate-200"
          key={index}
          href={`/auth/profile/salesResume/${item.resumeId}`}
          passHref
        >
          <div className="flex items-center">
            <div className="mr-4 size-8 rounded-full bg-blue-500"></div>
            <div>
              <p className="min-w-[200px] font-semibold">{item.title}</p>
              <p className="min-w-[150px] text-gray-500">
                {item.sellerNickname}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-12 text-center">
            <p className="w-[100px]">{item.stackType}</p>
            <p className="w-[100px]">{item.price}</p>
            <p className="w-[100px] text-gray-500">
              {new Date(item.createdDate).toLocaleDateString('ko-kr')}
            </p>
            <p className="w-[100px] cursor-pointer text-gray-500">등록하기</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SalesTable;
