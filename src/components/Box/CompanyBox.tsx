'use client';

import { CAROUSEL_CONFIG, COMPANIES } from '@/constants/companies';
import { CompanyType, JobType } from '@/utils/type';
import { FC, useCallback, useMemo } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // 캐러셀 기본 스타일 임포트
type CompanyBoxProps = {
  onClick: (e: CompanyType | JobType) => void;
  resetPage: (e: CompanyType | JobType) => void;
  company: CompanyType;
  job: JobType;
};

const CompanyBox: FC<CompanyBoxProps> = ({
  onClick,
  company,
  job,
  resetPage
}) => {
  const groupedCompanies = useMemo(() => {
    return [
      COMPANIES.slice(0, CAROUSEL_CONFIG.itemsPerSlide),
      COMPANIES.slice(CAROUSEL_CONFIG.itemsPerSlide)
    ];
  }, []);

  const handleClick = useCallback(
    (companyType: CompanyType) => {
      onClick(companyType);
      resetPage(companyType);
    },
    [onClick, resetPage]
  );

  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-lg font-semibold">기업 및 기술 선택</h4>
      <Carousel
        showArrows={false}
        showStatus={false}
        showThumbs={false}
        infiniteLoop={true}
        useKeyboardArrows={true}
        stopOnHover={true}
        swipeable={true}
        emulateTouch={true}
        interval={3000}
        transitionTime={500}
        className="w-full"
      >
        {groupedCompanies.map((group, index) => (
          <div
            key={index}
            className="grid grid-cols-1 gap-4 md:grid-cols-4 xl:grid-cols-8"
          >
            {group.map(({ type, icon: Icon, name, color, size }) => (
              <div
                key={type}
                className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-4 border-white bg-white p-4 transition-all ${
                  company === type ? 'border-hover' : 'hover:border-hover'
                } ${job === type ? 'border-hover' : 'hover:border-hover'}`}
                onClick={() => handleClick(type as CompanyType)}
              >
                <div className="flex items-center justify-center">
                  {Icon && <Icon size={size} color={color} />}
                </div>
                <p className="text-center text-xl">{name}</p>
              </div>
            ))}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CompanyBox;
