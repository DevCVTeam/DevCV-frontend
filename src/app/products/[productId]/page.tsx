'use client';

import Button from '@/components/Header/Button';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import Image from 'next/image';
import { useState } from 'react';
import Comments from './_components/Comments';
import Detail from './_components/Detail';
import ProductInquiry from './_components/ProductInquiry';

const ProductsPage = () => {
  const [page, setPage] = useState(0);
  return (
    <div className="flex flex-1 flex-col">
      <div className="relative mb-12 h-full overflow-hidden rounded-xl">
        <div className="absolute inset-0 h-80 w-full rounded-lg bg-[url('/thumbnail.png')] bg-cover bg-center bg-no-repeat blur-lg">
          <div className="absolute inset-0 bg-slate-800 opacity-50" />
        </div>
        <div className="relative z-10 m-4 flex flex-1 flex-row items-center justify-center gap-12 text-white">
          <div>
            <Image
              src="/thumbnail.png"
              alt="Product Image"
              width={300}
              height={300}
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-sm">
              <span className="text-slate-300">기업 분류</span>
              <h2 className="text-xl">
                취준을 마음먹으면 봐야되는 필수 입문서
              </h2>
            </div>
            <span>판매자</span>
            <span>React</span>

            <span>가격</span>
            <Button className="bg-main text-black hover:bg-hover">
              결제하기
            </Button>
          </div>
        </div>
      </div>
      {/* <div className="relative mx-4 mt-8 flex justify-center gap-4">
        <div
          className="m-0 inline-block w-72 cursor-pointer text-center text-black after:block after:scale-x-0 after:border-b-4 after:border-sub after:transition-transform after:duration-200 after:content-[''] hover:text-sub hover:after:scale-x-100"
          onClick={() => setPage(0)}
        >
          상품 상세
        </div>
        <div
          className="m-0 inline-block w-72 cursor-pointer  text-center text-black after:block after:scale-x-0 after:border-b-4 after:border-sub after:transition-transform after:duration-200 after:content-[''] hover:text-sub hover:after:scale-x-100"
          onClick={() => setPage(1)}
        >
          구매 후기
        </div>
        <div
          className="m-0 inline-block w-72 cursor-pointer  text-center text-black after:block after:scale-x-0 after:border-b-4 after:border-sub after:transition-transform after:duration-200 after:content-[''] hover:text-sub hover:after:scale-x-100"
          onClick={() => setPage(2)}
        >
          상품 문의
        </div>
      </div> */}

      {/* <div className="flex h-full w-3/4 items-center justify-center self-center p-6 shadow">
        {page === 0 ? <Detail /> : null}
        {page === 1 ? <Comments /> : null}
        {page === 2 ? <ProductInquiry /> : null}
      </div> */}
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
              key={'comments'}
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
              <Detail />
            </TabPanel>
            <TabPanel key={'comments'} className="rounded-xl bg-white/5 p-3">
              <Comments />
            </TabPanel>
            <TabPanel key={'inquiry'} className="rounded-xl bg-white/5 p-3">
              <ProductInquiry />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
};

export default ProductsPage;
