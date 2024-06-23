'use client';

import Button from '@/components/Button';
import { getReviews } from '@/utils/fetch';
import { cn } from '@/utils/style';
import { Resume } from '@/utils/type';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import CommentBox from './CommentBox';
const Comments = ({
  resumeId,
  reviewCount
}: Pick<Resume, 'resumeId' | 'reviewCount'>) => {
  const { ref, inView } = useInView();
  const [sort, setSort] = useState('');
  const [averageRating, setAverageRating] = useState(0);
  const {
    data: commentPages,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery({
    queryKey: ['comments'],
    queryFn: async ({ pageParam }) => {
      const comments = await getReviews(resumeId!, pageParam);
      if (!comments)
        return {
          comments: [],
          nextPage: null
        };
      if (comments.averageRating !== averageRating && comments.averageRating)
        setAverageRating(comments.averageRating);
      return {
        comments: comments.content,
        nextPage: comments.content.length === 10 ? pageParam + 10 : null
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage
  });

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className="flex size-full flex-col gap-28 px-20">
      <div className="flex w-3/4 flex-col gap-4 self-center">
        <div className="flex items-center justify-between">
          <div className="flex items-center ">
            <h2 className="text-3xl font-semibold">구매후기</h2>
            <span>총 {reviewCount.toLocaleString()}개</span>
          </div>
          <Button>구매 후기 작성하기</Button>
        </div>
        <div className="flex justify-center gap-8">
          <div className="flex w-1/4 flex-col items-center justify-center rounded-xl border bg-subgray">
            <h4 className="text-3xl font-semibold">{averageRating}</h4>
            <p>{reviewCount.toLocaleString()}개의 수강평</p>
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

      <div className="flex gap-6 self-center ">
        <div
          className={cn(
            'm-0 inline-block w-72 cursor-pointer text-center text-black after:block after:scale-x-0 after:border-b-4 after:border-sub after:transition-transform after:duration-200  hover:text-sub hover:after:scale-x-50 data-[selected]:text-sub',
            sort === 'latest' ? 'text-main' : ''
          )}
          onClick={() => setSort('latest')}
        >
          최신 순
        </div>
        <div
          className={cn(
            'm-0 inline-block w-72 cursor-pointer text-center text-black after:block after:scale-x-0 after:border-b-4 after:border-sub after:transition-transform after:duration-200  hover:text-sub hover:after:scale-x-50 data-[selected]:text-sub',
            sort === 'high Rating' ? 'text-main' : ''
          )}
          onClick={() => setSort('high Rating')}
        >
          높은 평점 순
        </div>
        <div
          className={cn(
            'm-0 inline-block w-72 cursor-pointer text-center text-black after:block after:scale-x-0 after:border-b-4 after:border-sub after:transition-transform after:duration-200  hover:text-sub hover:after:scale-x-50 data-[selected]:text-sub',
            sort === 'low Rating' ? 'text-main' : ''
          )}
          onClick={() => setSort('low Rating')}
        >
          낮은 평점 순
        </div>
      </div>
      <div>
        {commentPages?.pages
          .flatMap((data) => data.comments)
          .sort((a, b) => {
            if (sort === 'latest') {
              // 문자열을 Date 객체로 변환하여 비교
              return (
                new Date(b.createdDate).getTime() -
                new Date(a.createdDate).getTime()
              ); // 최신 순 정렬
            } else if (sort === 'high Rating') {
              return b.grade - a.grade; // 높은 평점 순 정렬
            } else if (sort === 'low Rating') {
              return a.grade - b.grade; // 낮은 평점 순 정렬
            }
            return 0; // 정렬 옵션이 없는 경우
          })
          .map((comments, index) => {
            return <CommentBox key={index} {...comments} />;
          })}
      </div>
      <div ref={ref} />
    </div>
  );
};

export default Comments;
