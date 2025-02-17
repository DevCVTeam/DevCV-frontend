'use client';

import { useCartStore } from '@/store/useCartStore';
import Image from 'next/image';
import { BsTrash } from 'react-icons/bs';

const OrderBox = ({ resumeResponse }: any) => {
  const { removeResume } = useCartStore();
  return (
    <div className="flex flex-col justify-start gap-2 rounded-xl border bg-subgray p-4 text-lg relative">
      <div className="mt-0 font-semibold text-sub">주문 정보</div>
      <div className="mt-2 flex justify-self-center">
        <Image
          src={resumeResponse.imageList[0].resumeImgPath}
          width={120}
          height={120}
          alt="주문이미지"
          className="rounded-xl border border-sub"
        />
        <div className="ml-2 flex justify-between text-sm">
          <div className="m-2 flex flex-col gap-4">
            <span>이름</span>
            <span>판매</span>
            <span>가격</span>
            <span>이력서 번호</span>
          </div>
          <div className="m-2 flex flex-col gap-4">
            <p className="font-semibold">{resumeResponse.title}</p>
            <p className="font-semibold">{resumeResponse.sellerNickname}</p>
            <p className="font-semibold">
              {resumeResponse.price.toLocaleString()} Point
            </p>
            <p className="font-semibold">No. {resumeResponse.resumeId}</p>
          </div>
        </div>
      </div>
      <button
        onClick={() => removeResume(resumeResponse.resumeId)}
        className="self-end flex items-center gap-1 text-red-500 hover:text-red-600"
      >
        <BsTrash className="h-4 w-4 sm:h-5 sm:w-5" />
        <span className="text-sm">삭제</span>
      </button>
    </div>
  );
};

export default OrderBox;
