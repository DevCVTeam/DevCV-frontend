'use client';

import { COMPANIES } from '@/constants/companies';
import { CompanyType, JobType } from '@/utils/type';
import { AnimatePresence, motion } from 'framer-motion';
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

  // 버튼 애니메이션 변형
  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  // 항목 애니메이션 변형
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
  };

  return (
    <div className="w-full space-y-4">
      {/* 버튼 영역 */}
      <div className="flex gap-4 mb-4">
        <motion.button
          className={`px-4 py-2 rounded-lg ${
            selectedType === 'enterprise'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100'
          }`}
          onClick={handleTypeChange('enterprise')}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          기업 분류
        </motion.button>
        <motion.button
          className={`px-4 py-2 rounded-lg ${
            selectedType === 'job' ? 'bg-blue-600 text-white' : 'bg-gray-100'
          }`}
          onClick={handleTypeChange('job')}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          직무 분류
        </motion.button>
      </div>

      {/* Swiper 슬라이드 영역 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedType}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
            exit: { opacity: 0 }
          }}
        >
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
                  <motion.div
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
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon
                      size={18}
                      className={
                        isSelected || isHovered
                          ? 'text-blue-600'
                          : 'text-gray-600'
                      }
                    />
                    <span className="whitespace-nowrap text-xs sm:text-sm font-medium">
                      {item.name}
                    </span>
                  </motion.div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CompanyBox;
