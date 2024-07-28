'use client';

import { cn } from '@/utils/style';
import { CompanyType } from '@/utils/type';
import { FC } from 'react';
import { FaBuilding, FaLightbulb, FaRocket, FaStore } from 'react-icons/fa';
import { GiUnicorn } from 'react-icons/gi';
import { MdAccountBalance, MdDomain } from 'react-icons/md';

type CompanyBoxProps = {
  onClick: (e: CompanyType) => void;
  resetPage: (e: CompanyType) => void;
  company: CompanyType;
};

const CompanyBox: FC<CompanyBoxProps> = ({ onClick, company, resetPage }) => {
  const handleClick = (companyType: CompanyType) => {
    onClick(companyType);
  };

  return (
    <div className="flex flex-col">
      <div>
        <h4 className="mb-4 text-lg font-semibold">기업 종류</h4>
      </div>
      <div className="flex flex-col flex-wrap text-black  sm:flex-row">
        {[
          {
            type: 'largeE',
            icon: <FaBuilding size={80} />,
            name: '대기업'
          },
          {
            type: 'mediumE',
            icon: <MdDomain size={80} />,
            name: '중견기업'
          },
          {
            type: 'smallE',
            icon: <FaStore size={80} />,
            name: '중소기업'
          },
          {
            type: 'startE',
            icon: <FaRocket size={80} />,
            name: '스타트업'
          },
          {
            type: 'unicornE',
            icon: <GiUnicorn size={80} />,
            name: '유니콘기업'
          },
          {
            type: 'publicE',
            icon: <MdAccountBalance size={80} />,
            name: '공기업'
          },
          {
            type: 'ventureE',
            icon: <FaLightbulb size={80} />,
            name: '벤처기업'
          }
        ].map(({ type, icon, name }) => (
          <div
            key={type}
            className={cn(
              `m-2 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-4 border-white bg-white p-4 transition-all md:size-12 lg:size-20 xl:size-28 2xl:size-36 3xl:size-44`,
              company === type ? 'border-hover' : 'hover:border-hover'
            )}
            onClick={() => {
              handleClick(type as CompanyType);
              resetPage(type as CompanyType);
            }}
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
