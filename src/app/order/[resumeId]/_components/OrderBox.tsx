'use client';

import { PaymentResponse } from '@/utils/type';
import Image from 'next/image';

const OrderBox = ({
  resumeResponse
}: Pick<PaymentResponse, 'resumeResponse'>) => {
  console.log(resumeResponse);
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
        <div className="m-4 flex w-1/5 flex-col gap-8">
          <span>이름</span>
          <span>판매</span>
          <span>가격</span>
          <span>분야</span>
          <span>판매 날짜</span>
        </div>
        <div>
          <div className="m-4 flex flex-col gap-8">
            <p className="font-semibold">{resumeResponse.title}</p>
            <p className="font-semibold">{resumeResponse.sellerName}</p>
            <p className="font-semibold">{resumeResponse.price}</p>
            <p className="font-semibold">{resumeResponse.stackType}</p>
            <p className="font-semibold">
              {new Date(resumeResponse.updatedDate).toLocaleDateString('ko-kr')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderBox;
