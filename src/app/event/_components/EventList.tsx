'use client';

import Image from 'next/image';
import Link from 'next/link';
import { IoMdTime } from 'react-icons/io';

const EventList = () => {
  return (
    <div className=" grid grid-cols-1 gap-3 2xl:grid-cols-3 2xl:gap-6">
      {[...Array(6)].map((_, index) => (
        <Link
          href="/event/2"
          className="m-12 flex flex-col items-center gap-4 rounded-2xl border hover:bg-slate-100"
          key={index}
        >
          <div key={index} className="m-12 flex flex-col items-center gap-4">
            <Image
              src="/logo.png"
              width={0}
              height={0}
              sizes="75vw"
              alt="이벤트 이미지"
              className="h-auto w-2/3"
            />
            <div className="flex gap-4">
              <div className="flex flex-col justify-center text-center">
                <h3 className="text-xl text-sub">2,000</h3>
                <span className="">Point</span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="line-clamp-2 text-xl font-semibold">
                  취업에 관한 꿀팁 작성 시 포인트 지급
                </h3>
                <div className="flex items-center gap-1">
                  <IoMdTime />
                  <span>2024.04.01 ~ 2024.04.30</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default EventList;
