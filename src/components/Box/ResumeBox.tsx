'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

type ResumeBoxProps = {
  resumeId: number;
  title: string;
  userId: string;
  price: number;
  thumbnail: string;
};

const ResumeBox: FC<ResumeBoxProps> = ({
  resumeId,
  title,
  userId,
  price,
  thumbnail
}) => {
  return (
    <Link href={`/products/${resumeId}`} shallow>
      {/* shallow prop 추가 */}
      <div className="h-60 rounded-lg bg-white p-3 shadow-md hover:bg-slate-100 hover:shadow-xl sm:w-64">
        <div className="mb-3 flex flex-col items-center justify-between">
          <Image src={thumbnail} alt="thumbnail" width={260} height={220} />
          <h3 className="mt-2 self-start text-lg font-semibold">{title}</h3>
          <div className="my-3 flex w-full flex-row justify-between text-sm">
            <p>{userId}</p>
            <p className="font-bold text-green-500">
              가격: {price.toLocaleString()}원
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ResumeBox;
