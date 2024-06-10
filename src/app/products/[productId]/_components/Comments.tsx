'use client';

import Button from '@/components/Button';
import { cn } from '@/utils/style';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import CommentContainer from './CommentContainer';

const Comments = () => {
  return (
    <div className="flex size-full flex-col gap-28 px-20">
      <div className="flex w-3/4 flex-col gap-4 self-center">
        <div className="flex items-center justify-between">
          <div className="flex items-center ">
            <h2 className="text-3xl font-semibold">구매후기</h2>
            <span>총 5,956개</span>
          </div>
          <Button>구매 후기 작성하기</Button>
        </div>
        <div className="flex justify-center gap-8">
          <div className="flex w-1/4 flex-col items-center justify-center rounded-xl border bg-subgray">
            <h4 className="text-3xl font-semibold">5</h4>
            <p>5,967개의 수강평</p>
          </div>
          <div className="w-3/4 rounded-xl border bg-subgray p-6">
            <div className="flex items-center gap-4 text-nowrap rounded-xl">
              <span>5점</span>
              <div className={cn('h-1 w-full self-center bg-main')} />
              <p>1,234개</p>
            </div>
            <div className="flex items-center gap-4 text-nowrap rounded-xl">
              <span>4점</span>
              <div className={cn('h-1 w-full self-center bg-main')} />
              <p>1,234개</p>
            </div>
            <div className="flex items-center gap-4 text-nowrap rounded-xl">
              <span>3점</span>
              <div className={cn('h-1 w-full self-center bg-main')} />
              <p>1,234개</p>
            </div>
            <div className="flex items-center gap-4 text-nowrap rounded-xl">
              <span>2점</span>
              <div className={cn('h-1 w-full self-center bg-main')} />
              <p>1,234개</p>
            </div>
            <div className="flex items-center gap-4 text-nowrap rounded-xl">
              <span>1점</span>
              <div className={cn('h-1 w-full self-center bg-main')} />
              <p>1,234개</p>
            </div>
          </div>
        </div>
      </div>
      <TabGroup className={`self-center`}>
        <TabList className={`flex text-nowrap`}>
          <Tab
            key={'recommend'}
            className="m-0 inline-block w-72 cursor-pointer text-center text-black after:block after:scale-x-0 after:border-b-4 after:border-sub after:transition-transform after:duration-200 after:content-[''] hover:text-sub hover:after:scale-x-100 data-[selected]:text-sub"
          >
            추천 순
          </Tab>
          <Tab
            key={'recent'}
            className="m-0 inline-block w-72 cursor-pointer text-center text-black after:block after:scale-x-0 after:border-b-4 after:border-sub after:transition-transform after:duration-200 after:content-[''] hover:text-sub hover:after:scale-x-100 data-[selected]:text-sub"
          >
            최신 순
          </Tab>
          <Tab
            key={'high'}
            className="m-0 inline-block w-72 cursor-pointer text-center text-black after:block after:scale-x-0 after:border-b-4 after:border-sub after:transition-transform after:duration-200 after:content-[''] hover:text-sub hover:after:scale-x-100 data-[selected]:text-sub"
          >
            높은 평점 순
          </Tab>
          <Tab
            key={'low'}
            className="m-0 inline-block w-72 cursor-pointer text-center text-black after:block after:scale-x-0 after:border-b-4 after:border-sub after:transition-transform after:duration-200 after:content-[''] hover:text-sub hover:after:scale-x-100 data-[selected]:text-sub"
          >
            낮은 평점 순
          </Tab>
        </TabList>
        <TabPanels className={`flex`}>
          <TabPanel key={'recommend'}>
            <CommentContainer type="recommend" />
          </TabPanel>
          <TabPanel key={'recent'}>
            <CommentContainer type="recent" />
          </TabPanel>
          <TabPanel key={'high'}>
            <CommentContainer type="high" />
          </TabPanel>
          <TabPanel key={'low'}>
            <CommentContainer type="low" />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default Comments;
