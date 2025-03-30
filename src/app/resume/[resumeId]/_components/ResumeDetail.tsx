'use client';

import Button from '@/components/common/Button';
import { useCartStore } from '@/store/useCartStore';
import { Resume } from '@/utils/type';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
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
    <div>
      <div className="relative mb-12 h-full overflow-hidden rounded-xl">
        <div className="absolute inset-0 h-80 w-full rounded-lg bg-[url('/thumbnail.png')] bg-cover bg-center bg-no-repeat blur-lg">
          <div className="absolute inset-0 bg-slate-800 opacity-50" />
        </div>
        <div className="relative z-10 m-4 flex flex-1 flex-row items-center justify-center gap-12 text-white">
          <div className="relative h-[300px] w-[225px]">
            <Image
              src={imageList[0].resumeImgPath}
              alt="productImage"
              layout="fill" // 부모 요소를 채우도록 설정
              objectFit="cover" // 이미지가 부모 요소를 덮도록 설정
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
              className="rounded-t-lg" // 이미지 상단 모서리를 둥글게 설정
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-sm">
              <span className="text-slate-300">기업 분류</span>
              <h2 className="text-xl">{title}</h2>
            </div>
            <span>판매자: {sellerNickname}</span>
            <span className="flex gap-4">
              {stack.map((data) => (
                <div
                  key={data}
                  className="rounded-2xl bg-subgray p-2 text-black"
                >
                  {data}
                </div>
              ))}
            </span>

            <span>가격: {price.toLocaleString()} Point</span>
            <div className="flex gap-2">
              <Button className="bg-main text-black hover:bg-hover">
                <Link href="/order">결제하기</Link>
              </Button>
              <button
                onClick={handleAddToCart}
                disabled={isInCart}
                className={`${
                  isInCart
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-sub hover:bg-hover'
                } h-12 w-40 rounded-md py-2 text-sm text-black`}
              >
                {isInCart ? '장바구니에 있음' : '장바구니 담기'}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <TabGroup>
          <TabList className="flex w-full items-center justify-center gap-4">
            <Tab
              key={'detail'}
              className="m-0 inline-block w-72 cursor-pointer text-center text-black after:block after:scale-x-0 after:border-b-4 after:border-sub after:transition-transform after:duration-200 after:content-[''] hover:text-sub hover:after:scale-x-100 data-[selected]:text-sub"
            >
              상품 상세
            </Tab>
            <Tab
              key={'reviews'}
              className="m-0 inline-block w-72 cursor-pointer text-center text-black after:block after:scale-x-0 after:border-b-4 after:border-sub after:transition-transform after:duration-200 after:content-[''] hover:text-sub hover:after:scale-x-100 data-[selected]:text-sub"
            >
              구매 후기
            </Tab>
            <Tab
              key={'inquiry'}
              className="m-0 inline-block w-72 cursor-pointer rounded-xl text-center text-black after:block after:scale-x-0 after:border-b-4 after:border-sub after:transition-transform after:duration-200 after:content-[''] hover:text-sub hover:after:scale-x-100 data-[selected]:text-sub"
            >
              상품 문의
            </Tab>
          </TabList>
          <TabPanels className="mt-12">
            <TabPanel key={'detail'} className="rounded-xl bg-white/5 p-3">
              <Detail
                content={content}
                stack={stack}
                category={category}
                sellerNickname={sellerNickname}
              />
            </TabPanel>
            <TabPanel key={'reviews'} className="rounded-xl bg-white/5 p-3">
              <Reviews resumeId={resumeId} reviewCount={reviewCount} />
            </TabPanel>
            <TabPanel key={'inquiry'} className="rounded-xl bg-white/5 p-3">
              <ProductInquiry sellerEmail={sellerEmail} />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
};

export default ResumeDetail;
