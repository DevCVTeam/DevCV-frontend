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
    <Link
      href={`/resume/${resumeId}`}
      className="3xl:w-72 size-full rounded-3xl bg-white shadow-md hover:bg-slate-100 hover:shadow-2xl "
    >
      <div className="mb-3 flex h-full flex-col items-center justify-around p-3 gap-2">
        <div className="relative h-[180px] w-full">
          {/* 부모 요소에 상대적 위치 및 고정된 높이 설정 */}
          <Image
            src={thumbnail}
            alt="thumbnail"
            layout="fill" // 부모 요소를 채우도록 설정
            objectFit="contain" // 이미지가 부모 요소를 덮도록 설정
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
          />
        </div>
        <h3 className="self-start font-semibold">{title}</h3>
        <div className="flex w-full flex-row justify-between text-sm">
          <p>{userId}</p>
          <p className="font-bold text-black">
            가격: {price.toLocaleString()}원
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ResumeBox;
