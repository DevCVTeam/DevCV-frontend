'use client';

import { Company, Job } from '@/utils/constant';
import { getResumes } from '@/utils/fetch';
import { CompanyType, JobType, type ResumeResponse } from '@/utils/type';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { FC, useEffect, useRef, useState } from 'react';
import { GrPowerReset } from 'react-icons/gr';
import { useInView } from 'react-intersection-observer';
import CompanyBox from '../Box/CompanyBox';
import ResumeBox from '../Box/ResumeBox';
import { LoaderGrid } from '../Loader';

// TODO: sticky 이 컴포넌트에서 문제
export const CategoryResume: FC<ResumeResponse> = ({
  content: initialResumes,
  currentPage,
  endPage,
  numberOfElements,
  size,
  startPage,
  totalElements,
  totalPages
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const [company, setCompany] = useState<CompanyType | undefined>(
    params.get('companyType') as CompanyType
  );
  const [job, setJob] = useState<JobType | undefined>(
    params.get('jobType') as JobType
  );
  // const [page, setPage] = useState(1);
  // const [totalPage, setTotalPage] = useState(0);
  const [isCompanyVisible, setIsCompanyVisible] = useState(true);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const companyRef = useRef<HTMLDivElement>(null);
  const prevScrollPos = useRef(0);

  // Intersection Observer hook for infinite scroll
  const { ref: loadMoreRef, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isPending,
    error
  } = useInfiniteQuery({
    queryKey: ['resumes', company, job],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getResumes({
        page: pageParam,
        company,
        job
      });
      return response;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
    initialData: initialResumes
      ? {
          pages: [
            {
              content: initialResumes,
              totalElements,
              numberOfElements,
              currentPage,
              totalPages,
              startPage,
              endPage,
              size
            }
          ],
          pageParams: [1]
        }
      : undefined
  });

  // Fetch next page when bottom is visible
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  // const handlePageClick = async (event: any) => {
  //   setPage(event.selected + 1);
  //   if (job && company) {
  //     router.push(
  //       `/?jobType=${job}&companyType=${company}&page=${event.selected + 1}`,

  //       { scroll: false }
  //     );
  //   } else if (job) {
  //     router.push(`/?jobType=${job}&page=${event.selected + 1}`, {
  //       scroll: false
  //     });
  //   } else if (company) {
  //     router.push(`/?companyType=${company}&page=${event.selected + 1}`, {
  //       scroll: false
  //     });
  //   } else {
  //     router.push(`/?page=${event.selected + 1}`, {
  //       scroll: false
  //     });
  //   }
  // };

  // useEffect(() => {
  //   const pageNum = Number(params.get('page'));
  //   if (pageNum) {
  //     setPage(pageNum);
  //   } else {
  //     setPage(1);
  //   }
  // }, [params]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsHeaderVisible(
        prevScrollPos.current > currentScrollPos || currentScrollPos < 10
      );
      prevScrollPos.current = currentScrollPos;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsCompanyVisible(entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: '-80px 0px 0px 0px'
      }
    );

    if (companyRef.current) {
      observer.observe(companyRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleTypeClick = (selectedType: CompanyType | JobType) => {
    const COMPANY_TYPES = [
      'largeE',
      'mediumE',
      'smallE',
      'startE',
      'unicornE',
      'publicE',
      'ventureE'
    ] as const;

    const isCompanyTye = Object.values(COMPANY_TYPES).includes(
      selectedType as CompanyType
    );

    if (isCompanyTye) {
      if (company === selectedType) {
        setCompany(undefined);
        router.push('/', { scroll: false });
      } else {
        setCompany(selectedType as CompanyType);
        // setPage(1);
        if (job) {
          router.push(`/?jobType=${job}&companyType=${selectedType}&page=1`, {
            scroll: false
          });
        } else {
          router.push(`/?companyType=${selectedType}&page=1`, {
            scroll: false
          });
        }
      }
    } else {
      if (job === selectedType) {
        setJob(undefined);
        router.push('/', { scroll: false });
      } else {
        setJob(selectedType as JobType);
        // setPage(1);
        if (company) {
          router.push(
            `/?jobType=${selectedType}&companyType=${company}&page=1`,
            {
              scroll: false
            }
          );
        } else {
          router.push(`/?jobType=${selectedType}&page=1`, {
            scroll: false
          });
        }
      }
    }
  };

  return (
    <div className="w-full relative">
      {/* Company section - 모바일에서는 일반 스크롤, 태블릿 이상에서만 sticky */}
      <h4 className="mb-2 sm:mb-4 text-base sm:text-lg font-semibold">
        기업 및 기술 선택
      </h4>
      <div
        ref={companyRef}
        className={`bg-white transition-all duration-300 sm:sticky ${
          isHeaderVisible ? 'sm:top-16 md:top-20' : 'sm:top-0'
        } z-20`}
      >
        <div className="mb-4 sm:mb-8 w-full rounded-xl sm:rounded-2xl border p-2 sm:p-4">
          <div className="w-full overflow-x-auto scrollbar-hide">
            <div className="flex justify-center sm:min-w-full gap-2 sm:gap-3">
              <CompanyBox
                onClick={handleTypeClick}
                company={company!}
                job={job!}
                resetPage={(companyType) => {
                  // setPage(1);
                  if (job) {
                    router.push(
                      `/?jobType=${job}&companyType=${companyType}&page=1`,
                      { scroll: false }
                    );
                  } else {
                    router.push(`/?companyType=${companyType}&page=1`, {
                      scroll: false
                    });
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Resume section */}
      <div
        className={`relative mt-2 sm:mt-4 flex flex-col gap-4 rounded-xl sm:rounded-2xl bg-subgray p-4 sm:p-8 transition-all duration-300 ${
          isCompanyVisible ? 'translate-y-0' : 'translate-y-4'
        }`}
      >
        <div className="mt-2 sm:mt-4 flex flex-col sm:flex-row gap-2 items-start sm:items-center">
          <h2 className="text-lg sm:text-2xl font-semibold">
            {Company[company!]} {Job[job!]} 이력서
          </h2>
          <span className="text-xs sm:text-sm text-gray-500">
            선택된 기업의 이력서입니다.
          </span>
        </div>

        <div className="flex flex-col items-center justify-center gap-1">
          <GrPowerReset
            onClick={() => {
              setCompany(undefined);
              setJob(undefined);
              router.push('/');
            }}
            className="cursor-pointer rounded-full"
            size={20}
          />
          <span className="text-xs">선택 초기화</span>
        </div>

        {isPending ? (
          <LoaderGrid />
        ) : status === 'error' ? (
          <div>Error: {error.message}</div>
        ) : (
          <>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4">
              {data.pages.map((group, i) => (
                <React.Fragment key={i}>
                  {group.content?.map((resume) => (
                    <ResumeBox
                      key={resume.resumeId}
                      resumeId={resume.resumeId}
                      thumbnail={resume.imageList[0].resumeImgPath}
                      title={resume.title}
                      userId={resume.sellerNickname}
                      price={resume.price}
                    />
                  ))}
                </React.Fragment>
              ))}
            </div>

            {/* Loading more indicator */}
            <div ref={loadMoreRef} className="w-full flex justify-center p-4">
              {isFetchingNextPage ? (
                <LoaderGrid />
              ) : hasNextPage ? (
                <div className="h-10" /> // Spacer for intersection observer
              ) : (
                <p className="text-gray-500 text-sm">
                  더 이상 이력서가 없습니다.
                </p>
              )}
            </div>
          </>
        )}

        {/* Pagination */}
        {/* <ReactPaginate
          breakLabel="..."
          nextLabel={
            <div className="flex items-center justify-center">
              <span>다음</span>
              <FiChevronRight />
            </div>
          }
          previousLabel={
            <div className="flex items-center justify-center">
              <FiChevronLeft />
              <span>이전</span>
            </div>
          }
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPage}
          forcePage={page - 1} // 현재 페이지를 강제로 설정
          // renderOnZeroPageCount={() => <div>이력서 없음</div>}
          containerClassName="flex items-center justify-center gap-2 sm:gap-4 text-sm sm:text-base"
          pageClassName="flex justify-center items-center size-6 sm:size-7 rounded-xl transition-colors"
          activeClassName="bg-main text-white"
        /> */}
      </div>
    </div>
  );
};
