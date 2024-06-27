'use client';

import { cn } from '@/utils/style';
import { CompanyType } from '@/utils/type';
import { FC } from 'react';
import { FaBuilding, FaLightbulb, FaRocket, FaStore } from 'react-icons/fa';
import { GiUnicorn } from 'react-icons/gi';
import { MdAccountBalance, MdDomain } from 'react-icons/md';

type CompanyBoxProps = {
  onClick: (e: CompanyType) => void;
  company: CompanyType;
};

const CompanyBox: FC<CompanyBoxProps> = ({ onClick, company }) => {
  const handleClick = (companyType: CompanyType) => {
    onClick(companyType);
  };

  return (
    <div className="flex flex-col">
      <div>
        <h4 className="mb-4 text-lg font-semibold">기업 종류</h4>
      </div>
      <div className="flex flex-col flex-wrap sm:flex-row">
        {[
          { type: 'largeE', icon: <FaBuilding size={100} />, name: '대기업' },
          { type: 'mediumE', icon: <MdDomain size={100} />, name: '중견기업' },
          { type: 'smallE', icon: <FaStore size={100} />, name: '중소기업' },
          { type: 'startE', icon: <FaRocket size={100} />, name: '스타트업' },
          {
            type: 'unicornE',
            icon: <GiUnicorn size={100} />,
            name: '유니콘기업'
          },
          {
            type: 'publicE',
            icon: <MdAccountBalance size={100} />,
            name: '공기업'
          },
          {
            type: 'ventureE',
            icon: <FaLightbulb size={100} />,
            name: '벤처기업'
          }
        ].map(({ type, icon, name }) => (
          <div
            key={type}
            className={cn(
              `m-2 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-md border p-4 transition-all md:size-20 lg:size-28 xl:size-36 2xl:size-44 3xl:size-52`,
              company === type ? 'bg-main' : 'hover:bg-hover'
            )}
            onClick={() => handleClick(type as CompanyType)}
          >
            {icon}
            <p className="text-xl">{name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyBox;
