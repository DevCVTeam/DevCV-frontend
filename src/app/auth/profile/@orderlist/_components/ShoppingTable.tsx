'use client';

import { OrderList } from '@/utils/type';
import { FC } from 'react';

// 클릭 시 모달창 생성하고 PDF를 다운로드하게 진행
const ShoppingTable: FC<OrderList> = ({ count, memberId, orderList }) => {
  console.log(orderList);
  return (
    <div className="flex flex-col gap-1">
      {count !== 0 ? (
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
            {orderList?.map((order, index) => (
              <div
                className="flex items-center justify-between rounded-xl border-b border-gray-300 bg-subgray px-4 py-2 hover:bg-slate-200"
                key={index}
              >
                <div className="flex items-center">
                  <div className="mr-4 size-8 rounded-full bg-blue-500"></div>
                  <div>
                    <p className="min-w-[200px] font-semibold">
                      {order.resumeTitle}
                    </p>
                    <p className="min-w-[150px] text-gray-500">
                      {order.orderId}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-12 text-center">
                  <p className="w-[100px]">{order.sellerName ?? '홍길동'}</p>
                  <p className="w-[100px]">{order.totalAmount}</p>
                  <p className="w-[100px] text-gray-500">
                    {new Date(order.createdDate).toLocaleDateString('ko-KR')}
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
