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
        <h4 className="text-lg font-semibold">기업 종류</h4>
      </div>
      <div className="flex flex-col flex-wrap text-black sm:flex-row">
        {[
          {
            type: 'largeE',
            icon: <FaBuilding size={60} color="#001aff" />,
            name: '대기업'
          },
          {
            type: 'mediumE',
            icon: <MdDomain size={60} color="#0066ff" />,
            name: '중견기업'
          },
          {
            type: 'smallE',
            icon: <FaStore size={60} color="#00ff37" />,
            name: '중소기업'
          },
          {
            type: 'startE',
            icon: <FaRocket size={60} color="#6f00ff" />,
            name: '스타트업'
          },
          {
            type: 'unicornE',
            icon: <GiUnicorn size={60} color="#9900ff" />,
            name: '유니콘기업'
          },
          {
            type: 'publicE',
            icon: <MdAccountBalance size={60} color="#c300ff" />,
            name: '공기업'
          },
          {
            type: 'ventureE',
            icon: <FaLightbulb size={60} color="#ff0062" />,
            name: '벤처기업'
          }
        ].map(({ type, icon, name }) => (
          <div
            key={type}
            className={cn(
              `3xl:size-44 m-2 flex w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-4 border-white bg-white p-4 transition-all 
             xs:w-full sm:w-full md:size-20 lg:size-20 xl:size-32 2xl:size-44`,
              company === type ? 'border-hover' : 'hover:border-hover'
            )}
            onClick={() => {
              handleClick(type as CompanyType);
              resetPage(type as CompanyType);
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
    </div>
  );
};

export default CompanyBox;
