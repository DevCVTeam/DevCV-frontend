'use client';

import { useState } from 'react';
import EventModal from './EventModal';

const EventList = () => {
  const data = [
    {
      title: '취업에 관한 꿀팁 작성 시 1,000원 포인트 지급',
      point: '1000',
      date: '2024.04.01 ~ 2024.04.30'
    },
    {
      title: '취업에 관한 꿀팁 작성 시 1,000원 포인트 지급',
      point: '1000',
      date: '2024.04.01 ~ 2024.04.30'
    },
    {
      title: '취업에 관한 꿀팁 작성 시 1,000원 포인트 지급',
      point: '1000',
      date: '2024.04.01 ~ 2024.04.30'
    },
    {
      title: '취업에 관한 꿀팁 작성 시 1,000원 포인트 지급',
      point: '1000',
      date: '2024.04.01 ~ 2024.04.30'
    },
    {
      title: '취업에 관한 꿀팁 작성 시 1,000원 포인트 지급',
      point: '1000',
      date: '2024.04.01 ~ 2024.04.30'
    },
    {
      title: '취업에 관한 꿀팁 작성 시 1,000원 포인트 지급',
      point: '1000',
      date: '2024.04.01 ~ 2024.04.30'
    },
    {
      title: '취업에 관한 꿀팁 작성 시 1,000원 포인트 지급',
      point: '1000',
      date: '2024.04.01 ~ 2024.04.30'
    },
    {
      title: '취업에 관한 꿀팁 작성 시 1,000원 포인트 지급',
      point: '1000',
      date: '2024.04.01 ~ 2024.04.30'
    }
  ];
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col gap-1">
      <EventModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="이벤트 수정"
      />
      <div className="flex items-center justify-between px-4 py-2">
        <p className="min-w-[200px] font-semibold">제목</p>
        <div className="grid grid-cols-2 gap-12 text-center">
          <p className="w-[300px]">기간</p>
          <p className="w-[100px]">포인트</p>
        </div>
      </div>

      {data.map((item, index) => (
        <div
          className="flex cursor-pointer items-center justify-between rounded-xl border-b border-gray-300 bg-subgray px-4 py-2 hover:bg-slate-200"
          key={index}
          onClick={() => setIsOpen(true)}
        >
          <div className="flex items-center">
            <div>
              <p className="min-w-[200px] font-semibold">{item.title}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-12 text-center">
            <p className="w-[300px]">{item.date}</p>
            <p className="w-[100px] text-gray-500">{item.point}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventList;
