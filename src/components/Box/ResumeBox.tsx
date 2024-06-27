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
      href={`/products/${resumeId}`}
      className="h-80 rounded-lg bg-white shadow-md hover:bg-slate-100 hover:shadow-2xl sm:w-40 md:w-72 lg:w-72"
    >
      <div className="mb-3 flex h-full flex-col items-center justify-between p-3">
        <Image
          src={thumbnail}
          alt="thumbnail"
          width={260}
          height={220}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
        />
        <h3 className="mt-2 self-start text-lg font-semibold">{title}</h3>
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
