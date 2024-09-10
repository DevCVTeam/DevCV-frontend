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
        <h4 className="text-lg font-semibold">기술 분야</h4>
      </div>
      <div className="flex flex-col flex-wrap text-black sm:flex-row">
        {[
          {
            type: 'backend',
            icon: <FaServer size={60} color="black" />,
            name: '백엔드'
          },
          {
            type: 'frontend',
            icon: <FaHtml5 size={60} color="#ff3c00" />,
            name: '프론트엔드'
          },
          {
            type: 'mobile',
            icon: <FaMobileAlt size={60} color="#00ff73" />,
            name: '모바일'
          },
          {
            type: 'infra',
            icon: <FaNetworkWired size={60} color="#001aff" />,
            name: '인프라'
          },
          {
            type: 'game',
            icon: <FaGamepad size={60} color="#ff3e3e" />,
            name: '게임'
          },
          {
            type: 'embedded',
            icon: <FaMicrochip size={60} color="#554646" />,
            name: '임베디드'
          },
          {
            type: 'security',
            icon: <FaLock size={60} color="#000000" />,
            name: '보안'
          }
        ].map(({ type, icon, name }) => (
          <div
            key={type}
            className={cn(
              `3xl:size-44 m-2 flex w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-4 border-white bg-white p-4 transition-all 
              xs:w-full sm:w-full md:size-20 lg:size-24 xl:size-36 2xl:size-44`,
              job === type ? 'border-main' : 'hover:border-main'
            )}
            onClick={() => {
              handleClick(type as JobType);
              resetPage(type as JobType);
            }}
          >
            <div className="hidden items-center justify-center md:flex lg:flex xl:flex 2xl:flex">
              {icon}
            </div>
            <p className="flex items-center justify-center text-nowrap text-center text-xl sm:text-xs md:text-sm lg:text-lg  xl:text-xl">
              {name}
            </p>
          </div>
        ))}
      </div>
    </span>
  );
};

export default StackBox;
