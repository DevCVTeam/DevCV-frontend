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
  job: JobType;
};

const StackBox: FC<StackBoxProps> = ({ onClick, job }) => {
  const handleClick = (type: JobType) => {
    onClick(type);
  };

  return (
    <span className="flex flex-col">
      <div>
        <h4 className="mb-4 text-lg font-semibold">기업 종류</h4>
      </div>
      <div className="flex flex-col flex-wrap sm:flex-row">
        {[
          { type: 'backend', icon: <FaServer size={100} />, name: '백엔드' },
          {
            type: 'frontend',
            icon: <FaHtml5 size={100} />,
            name: '프론트엔드'
          },
          { type: 'mobile', icon: <FaMobileAlt size={100} />, name: '모바일' },
          {
            type: 'infra',
            icon: <FaNetworkWired size={100} />,
            name: '인프라'
          },
          { type: 'game', icon: <FaGamepad size={100} />, name: '게임' },
          {
            type: 'embedded',
            icon: <FaMicrochip size={100} />,
            name: '임베디드'
          },
          { type: 'security', icon: <FaLock size={100} />, name: '보안' }
        ].map(({ type, icon, name }) => (
          <div
            key={type}
            className={cn(
              `m-2 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-md border p-4 transition-all md:size-20 lg:size-28 xl:size-36 2xl:size-44 3xl:size-52`,
              job === type ? 'bg-hover' : 'hover:bg-main'
            )}
            onClick={() => handleClick(type as JobType)}
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
