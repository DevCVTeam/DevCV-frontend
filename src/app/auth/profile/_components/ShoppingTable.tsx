'use client';

import { UserDetail } from '@/utils/type';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

const ShoppingTable: FC<Pick<UserDetail, 'orderList'>> = ({ orderList }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-1">
      {orderList.orderList.length !== 0 ? (
        <div>
          <div className="flex items-center justify-between px-4 py-2">
            <p className="min-w-[200px] font-semibold">이력서 제목</p>
            <div className="grid grid-cols-3 gap-12 text-center">
              <p className="w-[100px]">판매처</p>
              <p className="w-[100px]">가격</p>
              <p className="w-[100px]">등록일자</p>
            </div>
          </div>

          <div>
            {orderList.orderList.map((item, index) => (
              <div
                className="flex items-center justify-between rounded-xl border-b border-gray-300 bg-subgray px-4 py-2 hover:bg-slate-200"
                key={index}
              >
                <div className="flex items-center">
                  <div className="mr-4 size-8 rounded-full bg-blue-500"></div>
                  <div>
                    <p className="min-w-[200px] font-semibold">{item.title}</p>
                    <p className="min-w-[150px] text-gray-500">
                      {item.resumeId}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-12 text-center">
                  <p className="w-[100px]">{item.resumeId}</p>
                  <p className="w-[100px]">{item.price}</p>
                  <p className="w-[100px] text-gray-500">
                    {new Date(item.orderDate).toLocaleDateString()}
                  </p>
                  <p className="w-[100px] cursor-pointer text-gray-500">
                    등록하기
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>구매한 이력서가 없습니다.</div>
      )}
    </div>
  );
};

export default ShoppingTable;
