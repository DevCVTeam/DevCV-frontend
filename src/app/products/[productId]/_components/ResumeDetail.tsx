import Button from '@/components/Button';
import { Resume } from '@/utils/type';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import Image from 'next/image';
import Comments from './Comments';
import Detail from './Detail';
import ProductInquiry from './ProductInquiry';

const ResumeDetail = ({
  averageGrade,
  category,
  content,
  imageList,
  memberId,
  price,
  resumeFilePath,
  resumeId,
  reviewCount,
  sellerNickname,
  stack,
  status,
  title
}: Resume) => {
  return (
    <div>
      <div className="relative mb-12 h-full overflow-hidden rounded-xl">
        <div className="absolute inset-0 h-80 w-full rounded-lg bg-[url('/thumbnail.png')] bg-cover bg-center bg-no-repeat blur-lg">
          <div className="absolute inset-0 bg-slate-800 opacity-50" />
        </div>
        <div className="relative z-10 m-4 flex flex-1 flex-row items-center justify-center gap-12 text-white">
          <div>
            <Image
              src={imageList[0].resumeImgPath}
              alt="Product Image"
              width={300}
              height={300}
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
            <Button className="bg-main text-black hover:bg-hover">
              결제하기
            </Button>
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
              <Detail
                content={content}
                stack={stack}
                category={category}
                sellerNickname={sellerNickname}
              />
            </TabPanel>
            <TabPanel key={'comments'} className="rounded-xl bg-white/5 p-3">
              <Comments resumeId={resumeId} reviewCount={reviewCount} />
            </TabPanel>
            <TabPanel key={'inquiry'} className="rounded-xl bg-white/5 p-3">
              <ProductInquiry email="ironjustlikethat@gmail.com" />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
};

export default ResumeDetail;
