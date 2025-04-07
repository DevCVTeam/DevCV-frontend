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
      <div className="bg-gray-50 rounded-xl p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-10">
          {/* 왼쪽: 평점 & 리뷰 수 */}
          <div className="flex flex-row  sm:flex-col items-center gap-4 lg:gap-6 lg:flex-1">
            <div className="text-center sm:text-left flex-1">
              <h3 className="text-sm sm:text-base font-medium text-gray-500 mb-2">
                전체 평점
              </h3>
              <div className="flex items-center gap-2 justify-center sm:justify-start flex-col">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                  {totalRating.toFixed(1)}
                </span>
                <div className="flex items-center text-lg sm:text-xl lg:text-2xl text-yellow-400">
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
            <div className="h-16 w-px bg-gray-200 hidden sm:block sm:h-8" />
            <div className="text-center sm:text-left flex-1 sm:flex-col">
              <h3 className="text-sm sm:text-base font-medium text-gray-500 mb-2">
                전체 리뷰
              </h3>
              <div className="flex items-center justify-center sm:justify-start">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                  {reviewCount}
                </span>
                <span className="text-sm sm:text-base text-gray-500 ml-2">
                  개
                </span>
              </div>
            </div>
          </div>

          {/* 오른쪽: 평점 분포 */}
          {averageRating && (
            <div className="lg:flex-1 lg:border-l lg:border-gray-200 lg:pl-8">
              <h3 className="text-sm sm:text-base font-medium text-gray-500 mb-3 sm:mb-4 text-center lg:text-left">
                평점 분포
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {averageRating.map((count, index) => (
                  <div key={index} className="flex items-center gap-2 sm:gap-3">
                    <div className="flex items-center gap-1 sm:gap-2 w-12 sm:w-16">
                      <span className="text-xs sm:text-sm font-medium text-gray-600">
                        {5 - index}
                      </span>
                      <FaStar className="text-yellow-400 text-xs" />
                    </div>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 transition-all duration-500 rounded-full"
                        style={{
                          width: `${(count / reviewCount) * 100}%`
                        }}
                      />
                    </div>
                    <span className="w-14 sm:w-16 text-right text-xs sm:text-sm text-gray-500">
                      {count.toLocaleString()}
                      <span className="text-gray-400 ml-1">개</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 리뷰 작성 버튼 */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-medium text-gray-900 mb-1">
              리뷰 작성
            </h3>
            <p className="text-sm text-gray-500">
              이 이력서에 대한 리뷰를 작성해주세요.
            </p>
          </div>
          <Button
            onClick={() => setWriteOpen(true)}
            disabled={!session}
            className={`w-full sm:w-auto px-6 py-2.5 rounded-lg text-white text-sm transition-colors ${
              !session
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            리뷰 작성하기
          </Button>
        </div>
        {!session && (
          <p className="text-xs text-gray-500 text-center mt-4">
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
            className="bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <span className="text-sm text-gray-600 font-medium">
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
            <p className="text-sm text-gray-700 whitespace-pre-wrap">
              {review.text}
            </p>
          </motion.div>
        ))}

        {/* 무한 스크롤 트리거 */}
        <div ref={ref} className="h-4" />

        {/* 리뷰가 없는 경우 */}
        {(!reviews || reviews.length === 0) && (
          <div className="text-center py-8 sm:py-12">
            <p className="text-base sm:text-lg text-gray-500">
              아직 리뷰가 없습니다.
            </p>
            <p className="text-sm sm:text-base text-gray-400">
              첫 번째 리뷰를 작성해보세요!
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Reviews;
