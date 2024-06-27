'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';

const OrderBox = () => {
  const { data } = useSession();
  console.log(data);
  return (
    <div className="flex w-3/5 flex-col justify-start gap-4 rounded-2xl border bg-subgray p-8 text-xl">
      <div className="mt-0 font-semibold text-sub">주문 정보</div>
      <div className="mt-10 flex justify-self-center">
        <Image
          src="/thumbnail.png"
          width={300}
          height={500}
          alt="주문이미지"
          className="rounded-2xl border border-sub"
        />
        <div className="flex w-3/5 flex-col gap-8">
          <div className="flex justify-around">
            <span>이름</span>
            <p className="font-semibold">중소기업</p>
          </div>
          <div className="flex justify-around">
            <span>판매</span>
            <p className="font-semibold">중소기업</p>
          </div>
          <div className="flex justify-around">
            <span>가격</span>
            <p className="font-semibold">중소기업</p>
          </div>
          <div className="flex justify-around">
            <span>분야</span>
            <p className="font-semibold">중소기업</p>
          </div>
          <div className="flex justify-around">
            <span>판매 날짜</span>
            <p className="text-start font-semibold">중소기업</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderBox;
