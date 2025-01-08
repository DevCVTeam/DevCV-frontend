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
      className="flex max-h-[340px] min-h-[240px] max-w-[340px] flex-col items-center rounded-2xl shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
    >
      <div className="relative h-3/5 w-full overflow-hidden rounded-t-2xl">
        <Image
          src={thumbnail}
          alt="thumbnail"
          layout="fill"
          objectFit="cover"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
          className="transition-all duration-500 hover:scale-110"
        />
      </div>
      <div className="flex h-2/5 w-full flex-col justify-between rounded-b-2xl bg-white p-4">
        <h3 className="truncate text-xl font-semibold text-gray-800">
          {title}
        </h3>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm text-gray-500">{userId}</p>
          <p className="font-bold text-green-600">{price.toLocaleString()}원</p>
        </div>
      </div>
    </Link>
  );
};

export default ResumeBox;
