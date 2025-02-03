'use client';

import { CAROUSEL_CONFIG, COMPANIES } from '@/constants/companies';
import { CompanyType, JobType } from '@/utils/type';
import { FC, useCallback, useMemo } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
type CompanyBoxProps = {
  onClick: (e: CompanyType | JobType) => void;
  resetPage: (e: CompanyType | JobType) => void;
  company: CompanyType;
  job: JobType;
};

// TODO: 기업 분류와 기술 분류를 개별적으로 선택할 수 있도록 기획이 되어있는데 이걸 어떻게 변경할지 고민.
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
    <>
      {/* <Carousel
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
      > */}
      {groupedCompanies.map((group, index) => (
        <div
          key={index}
          className="grid grid-cols-1 gap-4 md:grid-cols-4 xl:grid-cols-14"
        >
          {group.map(({ type, icon: Icon, name, color, size }) => (
            <div
              key={type}
              className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-4 border-white bg-white p-2 transition-all ${
                company === type ? 'border-hover' : 'hover:border-hover'
              } ${job === type ? 'border-hover' : 'hover:border-hover'}`}
              onClick={() => handleClick(type as CompanyType)}
            >
              <div className="flex items-center justify-center">
                {Icon && <Icon size={size} color={color} />}
              </div>
              <p className="whitespace-nowrap text-center text-sm">{name}</p>
            </div>
          ))}
        </div>
      ))}
      {/* </Carousel> */}
    </>
  );
};

export default CompanyBox;
