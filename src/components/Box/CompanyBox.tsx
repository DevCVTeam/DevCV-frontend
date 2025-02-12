'use client';

import { COMPANIES } from '@/constants/companies';
import { CompanyType, JobType } from '@/utils/type';
import { FC, useState } from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

interface CompanyBoxProps {
  onClick: (type: CompanyType | JobType) => void;
  company: CompanyType | undefined;
  job: JobType | undefined;
  resetPage: (type: CompanyType | JobType) => void;
}

const CompanyBox: FC<CompanyBoxProps> = ({
  onClick,
  company,
  job,
  resetPage
}) => {
  const [selectedType, setSelectedType] = useState<'enterprise' | 'job'>(
    'enterprise'
  );
  const [hoveredItem, setHoveredItem] = useState<CompanyType | JobType | null>(
    null
  );

  const items =
    selectedType === 'enterprise' ? COMPANIES.enterprises : COMPANIES.jobs;

  const handleTypeChange =
    (type: 'enterprise' | 'job') => (e: React.MouseEvent) => {
      e.preventDefault(); // 이벤트 전파 중단
      setSelectedType(type);
    };

  return (
    <div className="w-full space-y-4">
      <div className="flex gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded-lg ${
            selectedType === 'enterprise'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100'
          }`}
          onClick={handleTypeChange('enterprise')}
        >
          기업 분류
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            selectedType === 'job' ? 'bg-blue-600 text-white' : 'bg-gray-100'
          }`}
          onClick={handleTypeChange('job')}
        >
          직무 분류
        </button>
      </div>

      <Swiper slidesPerView="auto" spaceBetween={8} className="w-full">
        {items.map((item) => {
          const isSelected =
            selectedType === 'enterprise'
              ? company === item.type
              : job === item.type;
          const isHovered = hoveredItem === item.type;
          const Icon = item.icon;

          return (
            <SwiperSlide key={item.type} className="!w-auto">
              <div
                className={`flex cursor-pointer items-center justify-center gap-1.5 rounded-xl px-3 py-2 transition-all duration-300
                  ${isSelected || isHovered ? 'bg-opacity-10 text-blue-600' : 'hover:bg-gray-100'}
                  ${isSelected ? 'border-2 border-blue-600' : 'border border-gray-200'}
                `}
                onClick={() => {
                  onClick(item.type as CompanyType | JobType);
                  resetPage(item.type as CompanyType | JobType);
                }}
                onMouseEnter={() =>
                  setHoveredItem(item.type as CompanyType | JobType)
                }
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Icon
                  size={18}
                  className={
                    isSelected || isHovered ? 'text-blue-600' : 'text-gray-600'
                  }
                />
                <span className="whitespace-nowrap text-xs sm:text-sm font-medium">
                  {item.name}
                </span>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default CompanyBox;
