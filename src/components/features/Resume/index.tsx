'use client';

import CompanyBox from '@/components/Box/CompanyBox';
import ResumeBox from '@/components/Box/ResumeBox';
import { LoaderGrid } from '@/components/Loader';
import { Company, Job } from '@/utils/constant';
import { getResumes } from '@/utils/fetch';
import { CompanyType, JobType, type ResumeResponse } from '@/utils/type';
import { useInfiniteQuery } from '@tanstack/react-query';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { FC, useEffect, useRef, useState } from 'react';
import { GrPowerReset } from 'react-icons/gr';
import { useInView } from 'react-intersection-observer';

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
  const { scrollYProgress } = useScroll();
  const [company, setCompany] = useState<CompanyType | undefined>(
    params.get('companyType') as CompanyType
  );
  const [job, setJob] = useState<JobType | undefined>(
    params.get('jobType') as JobType
  );
  const [isCompanyVisible, setIsCompanyVisible] = useState(true);
  const companyRef = useRef<HTMLDivElement>(null);
  const prevScrollPos = useRef(0);
  const [isScrollingUp, setIsScrollingUp] = useState(false);

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
      const response = await getResumes({ page: pageParam, company, job });
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

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsCompanyVisible(entry.isIntersecting);
      },
      { threshold: 0, rootMargin: '-80px 0px 0px 0px' }
    );

    if (companyRef.current) {
      observer.observe(companyRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsScrollingUp(prevScrollPos.current > currentScrollPos);
      prevScrollPos.current = currentScrollPos;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

    const isCompanyType = COMPANY_TYPES.includes(selectedType as CompanyType);

    if (isCompanyType) {
      if (company === selectedType) {
        setCompany(undefined);
        router.push('/', { scroll: false });
      } else {
        setCompany(selectedType as CompanyType);
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
        if (company) {
          router.push(
            `/?jobType=${selectedType}&companyType=${company}&page=1`,
            { scroll: false }
          );
        } else {
          router.push(`/?jobType=${selectedType}&page=1`, { scroll: false });
        }
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  const headerVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: -20 }
  };

  return (
    <motion.div
      className="relative w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="fixed left-0 top-0 z-30 h-1 w-full bg-gray-200"
        style={{ scaleX: scrollYProgress }}
      />

      <motion.h4
        className="mb-2 text-base font-semibold sm:mb-4 sm:text-lg"
        variants={itemVariants}
      >
        기업 및 기술 선택
      </motion.h4>
      <motion.div
        ref={companyRef}
        className={`bg-white transition-all duration-300 sm:sticky ${
          isScrollingUp ? 'sm:top-20' : 'sm:top-0'
        } z-20`}
        variants={headerVariants}
        transition={{ duration: 0.3 }}
      >
        <div className="mb-4 w-full rounded-xl border p-2 sm:mb-8 sm:rounded-2xl sm:p-4">
          <div className="w-full overflow-x-auto">
            <motion.div
              className="flex justify-center gap-2 sm:min-w-full sm:gap-3"
              variants={containerVariants}
            >
              <CompanyBox
                onClick={handleTypeClick}
                company={company!}
                job={job!}
                resetPage={(companyType) => {
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
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className={`relative mt-2 flex flex-col gap-4 rounded-xl bg-subgray p-4 transition-all duration-300 sm:mt-4 sm:rounded-2xl sm:p-8 ${
          isCompanyVisible ? 'translate-y-0' : 'translate-y-4'
        }`}
        variants={containerVariants}
      >
        <motion.div
          className="mt-2 flex flex-col items-start gap-2 sm:mt-4 sm:flex-row sm:items-center"
          variants={itemVariants}
          key={`${company}-${job}`}
        >
          <h2 className="text-lg font-semibold sm:text-2xl">
            {Company[company!]} {Job[job!]} 이력서
          </h2>
          <span className="text-xs text-gray-500 sm:text-sm">
            선택된 기업의 이력서입니다.
          </span>
        </motion.div>

        <motion.div
          className="flex flex-col items-center justify-center gap-1"
          variants={itemVariants}
        >
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
        </motion.div>

        {isPending ? (
          <LoaderGrid />
        ) : status === 'error' ? (
          <div>Error: {error.message}</div>
        ) : (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${company}-${job}`}
                className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {data.pages.map((group, i) => (
                  <React.Fragment key={i}>
                    {group.content?.map((resume, index) => (
                      <React.Fragment key={resume.resumeId}>
                        <motion.div
                          variants={itemVariants}
                          className="flex justify-center"
                        >
                          <ResumeBox
                            resumeId={resume.resumeId}
                            thumbnail={
                              resume.imageList?.[0]?.resumeImgPath ||
                              '/default-thumbnail.png'
                            }
                            title={resume.title}
                            userId={resume.sellerNickname}
                            price={resume.price}
                          />
                        </motion.div>
                        {(index + 1) % 10 === 0 && (
                          <motion.div
                            variants={itemVariants}
                            className="col-span-1 flex justify-center xl:col-span-3 2xl:col-span-4 3xl:col-span-5"
                          >
                            <div className="w-full">
                              <script
                                async
                                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3004906966180197"
                                crossOrigin="anonymous"
                              ></script>
                              <ins
                                className="adsbygoogle"
                                style={{ display: 'block' }}
                                data-ad-format="fluid"
                                data-ad-layout-key="-7f+ey-3-5f+9u"
                                data-ad-client="ca-pub-3004906966180197"
                                data-ad-slot="7851122160"
                              ></ins>
                              <script
                                dangerouslySetInnerHTML={{
                                  __html: `(adsbygoogle = window.adsbygoogle || []).push({});`
                                }}
                              ></script>
                            </div>
                          </motion.div>
                        )}
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                ))}
              </motion.div>
            </AnimatePresence>

            <div ref={loadMoreRef} className="flex w-full justify-center p-4">
              {isFetchingNextPage ? (
                <LoaderGrid />
              ) : hasNextPage ? (
                <div className="h-10" />
              ) : (
                <motion.p
                  className="text-sm text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  더 이상 이력서가 없습니다.
                </motion.p>
              )}
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};
