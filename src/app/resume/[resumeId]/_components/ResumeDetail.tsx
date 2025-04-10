'use client';

import Button from '@/components/common/Button';
import { useCartStore } from '@/store/useCartStore';
import { Resume } from '@/utils/type';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
  const { addResume, resumes, setDirectPurchaseItem } = useCartStore();
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

  const handleDirectPurchase = () => {
    setDirectPurchaseItem({
      resumeId,
      title,
      price,
      imageList,
      sellerNickname
    });
    router.push('/order');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50 pb-20">
      <div className="relative mb-8">
        {/* 배경 이미지 및 오버레이 */}
        <div className="absolute inset-0 h-[300px] sm:h-[400px] lg:h-[500px]">
          <div className="absolute inset-0 bg-[url('/thumbnail.png')] bg-cover bg-center bg-no-repeat opacity-30 blur-lg">
            <div className="absolute inset-0 bg-gradient-to-b from-sky-100/80 via-white/80 to-indigo-50/80" />
          </div>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="container mx-auto max-w-7xl px-4">
          <div className="relative z-10 flex flex-col items-center justify-center gap-6 pb-6 pt-8 sm:gap-12 sm:py-16 lg:flex-row">
            {/* 이미지 섹션 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative aspect-[3/4] w-[240px] overflow-hidden rounded-xl shadow-xl ring-1 ring-black/5 sm:w-[280px] lg:w-[300px]"
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
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                  {imageList.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`size-2 rounded-full transition-all ${
                        currentImageIndex === idx
                          ? 'scale-125 bg-blue-500'
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
              className="flex w-full flex-col gap-4 px-2 text-center sm:gap-6 sm:px-6 lg:text-left"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
                  <span className="rounded-full border border-blue-200 bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700">
                    {category.companyType}
                  </span>
                  <span className="rounded-full border border-amber-200 bg-amber-100 px-4 py-1.5 text-sm font-medium text-amber-700">
                    평점 {averageGrade.toFixed(1)}
                  </span>
                </div>
                <h1 className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-3xl font-bold leading-tight text-transparent sm:text-4xl lg:text-5xl">
                  {title}
                </h1>
                <div className="flex items-center justify-center gap-2 text-lg lg:justify-start">
                  <span className="text-gray-500">판매자</span>
                  <span className="font-medium text-gray-900">
                    {sellerNickname}
                  </span>
                </div>
              </div>

              {/* 기술 스택 */}
              <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
                {stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm 
                    font-medium text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-100"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* 가격 및 버튼 */}
              <div className="mt-4 space-y-6">
                <div className="flex flex-col items-center gap-2 lg:items-start">
                  <span className="text-sm text-gray-500">판매가</span>
                  <p className="text-3xl font-bold text-gray-900 sm:text-4xl">
                    {price.toLocaleString()}{' '}
                    <span className="text-xl text-blue-600">Point</span>
                  </p>
                </div>
                <div className="flex w-full flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                  <Button
                    onClick={handleDirectPurchase}
                    className="h-[56px] w-full whitespace-nowrap rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-8 
                    text-lg font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700 
                    hover:shadow-lg hover:shadow-blue-200 sm:w-[240px]"
                  >
                    결제하기
                  </Button>
                  <button
                    onClick={handleAddToCart}
                    disabled={isInCart}
                    className={`flex h-[56px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg px-8 text-lg font-medium
                      transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:w-[240px]
                      ${
                        isInCart
                          ? 'cursor-not-allowed border border-gray-200 bg-main text-gray-400'
                          : 'border border-gray-200 bg-main text-slate-900 hover:border-gray-300 hover:bg-green-400 hover:shadow-gray-200'
                      }`}
                  >
                    <FiShoppingCart className="shrink-0 text-xl" />
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
      <div className="container mx-auto max-w-7xl px-4">
        <TabGroup>
          <TabList className="mb-6 flex flex-col items-stretch justify-center gap-2 sm:mb-8 sm:flex-row sm:items-center sm:gap-4">
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
            <TabPanel className="rounded-xl bg-white p-4 shadow-lg ring-1 ring-black/5 sm:p-6 lg:p-8">
              <Detail
                content={content}
                stack={stack}
                category={category}
                sellerNickname={sellerNickname}
              />
            </TabPanel>
            <TabPanel className="rounded-xl bg-white p-4 shadow-lg ring-1 ring-black/5 sm:p-6 lg:p-8">
              <Reviews
                resumeId={resumeId}
                reviewCount={reviewCount}
                averageGrade={averageGrade}
              />
            </TabPanel>
            <TabPanel className="rounded-xl bg-white p-4 shadow-lg ring-1 ring-black/5 sm:p-6 lg:p-8">
              <ProductInquiry sellerEmail={sellerEmail} />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
};

export default ResumeDetail;
