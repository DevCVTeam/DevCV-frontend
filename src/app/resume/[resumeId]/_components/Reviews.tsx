'use client';

import Button from '@/components/common/Button';
import { getReviews } from '@/utils/fetch';
import { useInfiniteQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import ReviewWrite from './ReviewWrite';

interface ReviewsProps {
  resumeId: number;
  reviewCount: number;
  averageGrade: number;
}

interface ReviewResponse {
  content: Review[];
  averageRating: number;
  ratingCounts: number[];
}

interface Review {
  reviewId: number;
  nickname: string;
  grade: number;
  content: string;
  createdDate: string;
}

const Reviews = ({ resumeId, reviewCount, averageGrade }: ReviewsProps) => {
  const { ref, inView } = useInView();
  const [totalRating, setTotalRating] = useState(0);
  const [averageRating, setAverageRating] = useState<number[]>();
  const { data: session } = useSession();

  const {
    data: commentPages,
    fetchNextPage,
    hasNextPage,
    refetch
  } = useInfiniteQuery({
    queryKey: ['comments', resumeId],
    queryFn: async ({ pageParam = 1 }) => {
      const comments = await getReviews(resumeId, pageParam);
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
        comments: comments.content,
        nextPage: comments.content.length === 10 ? pageParam + 1 : null
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const reviews = commentPages?.pages.flatMap((page) => page.comments) ?? [];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const [writeOpen, setWriteOpen] = useState(false);

  return (
    <div className="space-y-6 sm:space-y-8">
      <ReviewWrite
        resumeId={resumeId}
        isOpen={writeOpen}
        onClose={() => setWriteOpen(false)}
        refetch={refetch}
      />
      {/* 리뷰 통계 섹션 */}
      <div className="rounded-xl bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:gap-10">
          {/* 왼쪽: 평점 & 리뷰 수 */}
          <div className="flex flex-row  items-center gap-4 sm:flex-col lg:flex-1 lg:gap-6">
            <div className="flex-1 text-center sm:text-left">
              <h3 className="mb-2 text-sm font-medium text-gray-500 sm:text-base">
                전체 평점
              </h3>
              <div className="flex flex-col items-center justify-center gap-2 sm:justify-start">
                <span className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
                  {totalRating.toFixed(1)}
                </span>
                <div className="flex items-center text-lg text-yellow-400 sm:text-xl lg:text-2xl">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < Math.round(totalRating)
                          ? 'text-yellow-400'
                          : 'text-gray-200'
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="hidden h-16 w-px bg-gray-200 sm:block sm:h-8" />
            <div className="flex-1 text-center sm:flex-col sm:text-left">
              <h3 className="mb-2 text-sm font-medium text-gray-500 sm:text-base">
                전체 리뷰
              </h3>
              <div className="flex items-center justify-center sm:justify-start">
                <span className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
                  {reviewCount}
                </span>
                <span className="ml-2 text-sm text-gray-500 sm:text-base">
                  개
                </span>
              </div>
            </div>
          </div>

          {/* 오른쪽: 평점 분포 */}
          {averageRating && (
            <div className="lg:flex-1 lg:border-l lg:border-gray-200 lg:pl-8">
              <h3 className="mb-3 text-center text-sm font-medium text-gray-500 sm:mb-4 sm:text-base lg:text-left">
                평점 분포
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {averageRating.map((count, index) => (
                  <div key={index} className="flex items-center gap-2 sm:gap-3">
                    <div className="flex w-12 items-center gap-1 sm:w-16 sm:gap-2">
                      <span className="text-xs font-medium text-gray-600 sm:text-sm">
                        {5 - index}
                      </span>
                      <FaStar className="text-xs text-yellow-400" />
                    </div>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full rounded-full bg-yellow-400 transition-all duration-500"
                        style={{
                          width: `${(count / reviewCount) * 100}%`
                        }}
                      />
                    </div>
                    <span className="w-14 text-right text-xs text-gray-500 sm:w-16 sm:text-sm">
                      {count.toLocaleString()}
                      <span className="ml-1 text-gray-400">개</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 리뷰 작성 버튼 */}
      <div className="rounded-xl bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <h3 className="mb-1 text-base font-medium text-gray-900">
              리뷰 작성
            </h3>
            <p className="text-sm text-gray-500">
              이 이력서에 대한 리뷰를 작성해주세요.
            </p>
          </div>
          <Button
            onClick={() => setWriteOpen(true)}
            disabled={!session}
            className={`w-full rounded-lg px-6 py-2.5 text-sm text-white transition-colors sm:w-auto ${
              !session
                ? 'cursor-not-allowed bg-gray-400'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            리뷰 작성하기
          </Button>
        </div>
        {!session && (
          <p className="mt-4 text-center text-xs text-gray-500">
            리뷰를 작성하려면 로그인이 필요합니다.
          </p>
        )}
      </div>

      {/* 리뷰 목록 */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        {reviews.map((review) => (
          <motion.div
            key={review.reviewId}
            variants={itemVariants}
            className="rounded-xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-6"
          >
            <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200">
                  <span className="text-sm font-medium text-gray-600">
                    {review.reviewerNickname[0]}
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    {review.reviewerNickname}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {new Date(review.createdDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < review.grade ? 'text-yellow-400' : 'text-gray-300'
                    }
                    size={12}
                  />
                ))}
              </div>
            </div>
            <p className="whitespace-pre-wrap text-sm text-gray-700">
              {review.text}
            </p>
          </motion.div>
        ))}

        {/* 무한 스크롤 트리거 */}
        <div ref={ref} className="h-4" />

        {/* 리뷰가 없는 경우 */}
        {(!reviews || reviews.length === 0) && (
          <div className="py-8 text-center sm:py-12">
            <p className="text-base text-gray-500 sm:text-lg">
              아직 리뷰가 없습니다.
            </p>
            <p className="text-sm text-gray-400 sm:text-base">
              첫 번째 리뷰를 작성해보세요!
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Reviews;
