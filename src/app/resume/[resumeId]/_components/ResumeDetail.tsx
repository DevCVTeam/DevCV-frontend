'use client';

import Button from '@/components/common/Button';
import { useCartStore } from '@/store/useCartStore';
import { Resume } from '@/utils/type';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiShoppingCart } from 'react-icons/fi';
import Detail from './Detail';
import ProductInquiry from './ProductInquiry';
import Reviews from './Reviews';

const ResumeDetail = ({
  averageGrade,
  category,
  content,
  imageList,
  memberId,
  price,
  resumeFilePath,
  sellerEmail,
  resumeId,
  reviewCount,
  sellerNickname,
  stack,
  status,
  title
}: Resume) => {
  const { addResume, resumes } = useCartStore();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isInCart = resumes.some((resume) => resume.resumeId === resumeId);

  const handleAddToCart = () => {
    addResume({
      resumeId,
      title,
      price,
      imageList,
      sellerNickname
    });
    toast.success('장바구니에 추가되었습니다.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50 pb-20">
      <div className="relative mb-8">
        {/* 배경 이미지 및 오버레이 */}
        <div className="absolute inset-0 h-[300px] sm:h-[400px] lg:h-[500px]">
          <div className="absolute inset-0 bg-[url('/thumbnail.png')] bg-cover bg-center bg-no-repeat blur-lg opacity-30">
            <div className="absolute inset-0 bg-gradient-to-b from-sky-100/80 via-white/80 to-indigo-50/80" />
          </div>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-12 pt-8 pb-6 sm:py-16">
            {/* 이미지 섹션 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative w-[240px] sm:w-[280px] lg:w-[300px] aspect-[3/4] rounded-xl overflow-hidden shadow-xl ring-1 ring-black/5"
            >
              <Image
                src={imageList[currentImageIndex].resumeImgPath}
                alt="productImage"
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
              />
              {/* 이미지 썸네일 */}
              {imageList.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {imageList.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        currentImageIndex === idx
                          ? 'bg-blue-500 scale-125'
                          : 'bg-white/70 hover:bg-white'
                      }`}
                    />
                  ))}
                </div>
              )}
            </motion.div>

            {/* 상품 정보 섹션 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-4 sm:gap-6 w-full text-center lg:text-left px-2 sm:px-6"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  <span className="px-4 py-1.5 bg-blue-100 rounded-full text-sm font-medium border border-blue-200 text-blue-700">
                    {category.companyType}
                  </span>
                  <span className="px-4 py-1.5 bg-amber-100 rounded-full text-sm font-medium border border-amber-200 text-amber-700">
                    평점 {averageGrade.toFixed(1)}
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600">
                  {title}
                </h1>
                <div className="flex items-center justify-center lg:justify-start gap-2 text-lg">
                  <span className="text-gray-500">판매자</span>
                  <span className="font-medium text-gray-900">
                    {sellerNickname}
                  </span>
                </div>
              </div>

              {/* 기술 스택 */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 rounded-lg bg-gray-50 text-gray-700 text-sm font-medium 
                    transition-all hover:bg-gray-100 border border-gray-200 hover:border-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* 가격 및 버튼 */}
              <div className="space-y-6 mt-4">
                <div className="flex flex-col items-center lg:items-start gap-2">
                  <span className="text-gray-500 text-sm">판매가</span>
                  <p className="text-3xl sm:text-4xl font-bold text-gray-900">
                    {price.toLocaleString()}{' '}
                    <span className="text-xl text-blue-600">Point</span>
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full">
                  <Link href="/order" className="w-full sm:w-[240px]">
                    <Button
                      className="w-full h-[56px] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 
                      text-white px-8 text-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-200 
                      hover:-translate-y-0.5 rounded-lg whitespace-nowrap"
                    >
                      결제하기
                    </Button>
                  </Link>
                  <button
                    onClick={handleAddToCart}
                    disabled={isInCart}
                    className={`w-full sm:w-[240px] h-[56px] flex items-center justify-center gap-2 px-8 rounded-lg text-lg font-medium
                      transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap
                      ${
                        isInCart
                          ? 'bg-main text-gray-400 cursor-not-allowed border border-gray-200'
                          : 'bg-main hover:bg-green-400 text-slate-900 border border-gray-200 hover:border-gray-300 hover:shadow-gray-200'
                      }`}
                  >
                    <FiShoppingCart className="text-xl flex-shrink-0" />
                    <span className="truncate">
                      {isInCart ? '장바구니에 있음' : '장바구니 담기'}
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 탭 섹션 */}
      <div className="container mx-auto px-4 max-w-7xl">
        <TabGroup>
          <TabList className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
            {['상품 상세', '구매 후기', '상품 문의'].map((tab) => (
              <Tab
                key={tab}
                className={({ selected }) => `
                  relative w-full sm:w-72 py-3 sm:py-4 text-center text-base sm:text-lg font-medium rounded-lg transition-all
                  ${
                    selected
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-gray-200'
                  }
                `}
              >
                {tab}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            <TabPanel className="rounded-xl bg-white p-4 sm:p-6 lg:p-8 shadow-lg ring-1 ring-black/5">
              <Detail
                content={content}
                stack={stack}
                category={category}
                sellerNickname={sellerNickname}
              />
            </TabPanel>
            <TabPanel className="rounded-xl bg-white p-4 sm:p-6 lg:p-8 shadow-lg ring-1 ring-black/5">
              <Reviews
                resumeId={resumeId}
                reviewCount={reviewCount}
                averageGrade={averageGrade}
              />
            </TabPanel>
            <TabPanel className="rounded-xl bg-white p-4 sm:p-6 lg:p-8 shadow-lg ring-1 ring-black/5">
              <ProductInquiry sellerEmail={sellerEmail} />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
};

export default ResumeDetail;
