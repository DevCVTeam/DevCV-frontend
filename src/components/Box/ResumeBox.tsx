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
      className="flex flex-col items-center rounded-2xl shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg w-full xs:max-w-[340px] min-h-[200px] xs:min-h-[240px]"
    >
      <div className="relative w-full h-48 xs:h-35 overflow-hidden rounded-t-2xl">
        <Image
          src={thumbnail || '/default-thumbnail.png'} // 기본 이미지 추가
          alt="thumbnail"
          layout="fill"
          objectFit="cover"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
          className="transition-all duration-500 hover:scale-110"
        />
      </div>
      <div className="flex h-auto xs:h-2/5 w-full flex-col justify-between rounded-b-2xl bg-white p-3 xs:p-4">
        <h3 className="truncate text-base xs:text-xl font-semibold text-gray-800">
          {title}
        </h3>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-xs xs:text-sm text-gray-500">{userId}</p>
          <p className="text-sm xs:text-base font-bold text-green-600">
            {price.toLocaleString()}원
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ResumeBox;
