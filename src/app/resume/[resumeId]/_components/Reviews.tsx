'use client';

import Button from '@/components/common/Button';
import { getReviews } from '@/utils/fetch';
import { cn } from '@/utils/style';
import { Resume } from '@/utils/type';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import CommentBox from './CommentBox';
import ReviewBox from './ReviewBox';
import ReviewWrite from './ReviewWrite';
const Reviews = ({
  resumeId,
  reviewCount
}: Pick<Resume, 'resumeId' | 'reviewCount'>) => {
  const { ref, inView } = useInView();
  const [sort, setSort] = useState('');
  const [totalRating, setTotalRating] = useState(0);
  const [averageRating, setAverageRating] = useState<number[]>();
  const {
    data: commentPages,
    fetchNextPage,
    refetch,
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
      if (pageParam === 1 && totalRating === 0 && averageRating === undefined) {
        setTotalRating(comments.averageRating);
        setAverageRating((prev) => {
          const newRating = comments.ratingCounts?.map((data, i) => {
            return data + (prev?.[i] ?? 0);
          });
          return newRating;
        });
      }
      return {
        comments: comments,
        nextPage: comments.content.length === 10 ? pageParam + 1 : null
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage
  });

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  const sortedComments = commentPages?.pages
    .flatMap((page) => page.comments)
    .flatMap((data) => data.content)
    .sort((a, b) => {
      if (sort === 'latest') {
        return (
          new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
        ); // 최신 순 정렬
      } else if (sort === 'high Rating') {
        return b.grade - a.grade; // 높은 평점 순 정렬
      } else if (sort === 'low Rating') {
        return a.grade - b.grade; // 낮은 평점 순 정렬
      }
      return 0; // 정렬 옵션이 없는 경우
    });
  const [writeOpen, setWriteOpen] = useState(false);
  return (
    <div className="flex size-full flex-col gap-28 px-20">
      <ReviewWrite
        resumeId={resumeId}
        isOpen={writeOpen}
        onClose={() => setWriteOpen(false)}
        refetch={refetch}
      />
      <div className="flex w-3/4 flex-col gap-4 self-center">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h2 className="text-3xl font-semibold">구매후기</h2>
            <span>총 {reviewCount.toLocaleString()}개</span>
          </div>
          <Button onClick={() => setWriteOpen(true)}>구매 후기 작성하기</Button>
        </div>

        <div className="flex justify-center gap-8">
          <div className="flex w-1/4 flex-col items-center justify-center gap-2 rounded-xl border bg-subgray">
            <h4 className="text-5xl font-semibold">{totalRating}</h4>
            <div className="flex">
              {[...Array(totalRating)].map((d, i) => (
                <FaStar className={'text-xl text-main'} key={d} />
              ))}
            </div>
            <p className="text-default">
              {reviewCount.toLocaleString()}개의 수강평
            </p>
          </div>

          <div className="flex w-3/4 flex-col gap-4 rounded-xl bg-subgray p-6 shadow-sm">
            {averageRating?.map((rating, i) => (
              <div
                key={i + 1}
                className="flex items-center justify-between gap-4 text-nowrap"
              >
                <span className="w-10 text-gray-600">{i + 1}점</span>
                <div className="flex flex-1 items-center">
                  <div className="relative h-2 flex-1 rounded-full bg-gray-200">
                    <div
                      className="absolute left-0 top-0 h-full rounded-full bg-main transition-all duration-500"
                      style={{ width: `${(rating / reviewCount) * 100}%` }}
                    />
                  </div>
                  <p className="ml-4 w-20 text-left text-gray-500">
                    {rating.toLocaleString()}개
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-center gap-6">
          {['latest', 'high Rating', 'low Rating'].map((sortOption) => (
            <div
              key={sortOption}
              className={cn(
                'm-0 inline-block w-72 cursor-pointer text-center text-black after:block after:scale-x-0 after:border-b-4 after:border-sub after:transition-transform after:duration-200 hover:text-sub hover:after:scale-x-50',
                sort === sortOption ? 'text-main' : ''
              )}
              onClick={() => setSort(sortOption)}
            >
              {sortOption === 'latest'
                ? '최신 순'
                : sortOption === 'high Rating'
                  ? '높은 평점 순'
                  : '낮은 평점 순'}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {sortedComments?.map((comment, index) => (
            <div key={index} className="flex flex-col gap-2">
              <ReviewBox key={index} refetch={refetch} {...comment} />
              {comment.commentDtoList.length !== 0 ? (
                <CommentBox {...comment.commentDtoList[0]} />
              ) : null}
              <hr className="my-6 w-full border" />
            </div>
          ))}
        </div>
        <div ref={ref} />
      </div>
    </div>
  );
};

export default Reviews;
