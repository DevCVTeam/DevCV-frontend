'use client';

import Button from '@/components/Button';
import { getReviews } from '@/utils/fetch';
import { cn } from '@/utils/style';
import { Resume } from '@/utils/type';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import CommentBox from './CommentBox';
import CommentWrite from './CommentWrite';
const Comments = ({
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
      if (!totalRating) setTotalRating(comments.averageRating);
      if (comments) {
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
      <div className="flex w-3/4 flex-col gap-4 self-center">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h2 className="text-3xl font-semibold">구매후기</h2>
            <span>총 {reviewCount.toLocaleString()}개</span>
          </div>
          <Button onClick={() => setWriteOpen(true)}>구매 후기 작성하기</Button>
        </div>
        <div className="flex justify-center gap-8">
          <div className="flex w-1/4 flex-col items-center justify-center rounded-xl border bg-subgray">
            <h4 className="text-3xl font-semibold">{totalRating}점</h4>
            <p>{reviewCount.toLocaleString()}개의 수강평</p>
          </div>
          <div className="w-3/4 rounded-xl border bg-subgray p-6">
            {averageRating?.map((rating, i) => (
              <div
                key={i + 1}
                onClick={() => console.log(rating)}
                className="flex items-center gap-4 text-nowrap rounded-xl"
              >
                <span>{i + 1}점</span>
                <div className={cn('h-1 w-full self-center bg-main')} />
                <p>{rating}개</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {writeOpen ? (
        <CommentWrite resumeId={resumeId} />
      ) : (
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
              // <div key={index} className="flex ">
              <CommentBox key={index} {...comment} />
              // </div>
            ))}
          </div>
          <div ref={ref} />
        </div>
      )}
    </div>
  );
};

export default Comments;
