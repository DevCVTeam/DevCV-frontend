'use client';

import { cn } from '@/utils/style';
import { JobType } from '@/utils/type';
import { FC } from 'react';
import {
  FaGamepad,
  FaHtml5,
  FaLock,
  FaMicrochip,
  FaMobileAlt,
  FaNetworkWired,
  FaServer
} from 'react-icons/fa';

type StackBoxProps = {
  onClick: (e: JobType) => void;
  resetPage: (e: JobType) => void;
  job: JobType;
};

const StackBox: FC<StackBoxProps> = ({ onClick, job, resetPage }) => {
  const handleClick = (type: JobType) => {
    onClick(type);
  };

  return (
    <span className="flex flex-col">
      <div>
        <h4 className="mb-4 text-lg font-semibold">기술 분야</h4>
      </div>
      <div className="flex flex-col flex-wrap text-black sm:flex-row">
        {[
          { type: 'backend', icon: <FaServer size={80} />, name: '백엔드' },
          {
            type: 'frontend',
            icon: <FaHtml5 size={80} />,
            name: '프론트엔드'
          },
          { type: 'mobile', icon: <FaMobileAlt size={80} />, name: '모바일' },
          {
            type: 'infra',
            icon: <FaNetworkWired size={80} />,
            name: '인프라'
          },
          { type: 'game', icon: <FaGamepad size={80} />, name: '게임' },
          {
            type: 'embedded',
            icon: <FaMicrochip size={80} />,
            name: '임베디드'
          },
          { type: 'security', icon: <FaLock size={80} />, name: '보안' }
        ].map(({ type, icon, name }) => (
          <div
            key={type}
            className={cn(
              `m-2 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-4 border-white bg-white p-4 transition-all md:size-12 lg:size-20 xl:size-28 2xl:size-36 3xl:size-44`,
              job === type ? 'border-main' : 'hover:border-main'
            )}
            onClick={() => {
              handleClick(type as JobType);
              resetPage(type as JobType);
            }}
          >
            {icon}
            <p className="text-xl">{name}</p>
          </div>
        ))}
      </div>
    </span>
  );
};

export default StackBox;
