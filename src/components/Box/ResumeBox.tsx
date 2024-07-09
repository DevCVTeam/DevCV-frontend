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
      className="h-60 rounded-3xl bg-white shadow-md hover:bg-slate-100 hover:shadow-2xl sm:w-40 md:w-40 lg:w-52 xl:w-60 3xl:w-72"
    >
      <div className="mb-3 flex h-full flex-col items-center justify-between p-3">
        <div className="relative h-[220px] w-full">
          {/* 부모 요소에 상대적 위치 및 고정된 높이 설정 */}
          <Image
            src={thumbnail}
            alt="thumbnail"
            layout="fill" // 부모 요소를 채우도록 설정
            objectFit="cover" // 이미지가 부모 요소를 덮도록 설정
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
            className="rounded-t-lg" // 이미지 상단 모서리를 둥글게 설정
          />
        </div>
        <h3 className="mt-2 self-start font-semibold">{title}</h3>
        <div className="my-3 flex w-full flex-row justify-between text-sm">
          <p>{userId}</p>
          <p className="font-bold text-green-500">
            가격: {price.toLocaleString()}원
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ResumeBox;
