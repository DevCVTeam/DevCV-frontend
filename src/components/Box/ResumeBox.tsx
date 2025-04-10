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
      className="flex min-h-[200px] w-full flex-col items-center rounded-2xl shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg xs:min-h-[240px] xs:max-w-[340px]"
    >
      <div className="relative h-48 w-full overflow-hidden rounded-t-2xl xs:h-35">
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
      <div className="flex h-auto w-full flex-col justify-between rounded-b-2xl bg-white p-3 xs:h-2/5 xs:p-4">
        <h3 className="truncate text-base font-semibold text-gray-800 xs:text-xl">
          {title}
        </h3>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-xs text-gray-500 xs:text-sm">{userId}</p>
          <p className="text-sm font-bold text-green-600 xs:text-base">
            {price.toLocaleString()}원
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ResumeBox;
