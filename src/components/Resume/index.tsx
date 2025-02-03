'use client';

import { Company, Job } from '@/utils/constant';
import { getResumes } from '@/utils/fetch';
import { CompanyType, JobType, type ResumeResponse } from '@/utils/type';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC, useEffect, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { GrPowerReset } from 'react-icons/gr';
import ReactPaginate from 'react-paginate';
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
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [isCompanyVisible, setIsCompanyVisible] = useState(true);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const companyRef = useRef<HTMLDivElement>(null);
  const prevScrollPos = useRef(0);

  const {
    data: resumePage,
    isPending,
    isError,
    isLoading,
    error,
    isPlaceholderData,
    isFetching
  } = useQuery({
    queryKey: ['resumes', company, job, page],
    queryFn: async () => {
      const { content, totalPages } = await getResumes({ page, company, job });
      setTotalPage(totalPages);
      if (!content)
        return {
          resumes: []
        };
      return {
        resumes: content
      };
    },
    initialData: !!initialResumes
      ? {
          resumes: initialResumes
        }
      : undefined
  });

  const handlePageClick = async (event: any) => {
    setPage(event.selected + 1);
    if (job && company) {
      router.push(
        `/?jobType=${job}&companyType=${company}&page=${event.selected + 1}`,

        { scroll: false }
      );
    } else if (job) {
      router.push(`/?jobType=${job}&page=${event.selected + 1}`, {
        scroll: false
      });
    } else if (company) {
      router.push(`/?companyType=${company}&page=${event.selected + 1}`, {
        scroll: false
      });
    } else {
      router.push(`/?page=${event.selected + 1}`, {
        scroll: false
      });
    }
  };

  useEffect(() => {
    const pageNum = Number(params.get('page'));
    if (pageNum) {
      setPage(pageNum);
    } else {
      setPage(1);
    }
  }, [params]);

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
        setPage(1);
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
        setPage(1);
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
    <div className="relative w-full">
      <h4 className="mb-4 text-lg font-semibold">기업 및 기술 선택</h4>
      <div
        ref={companyRef}
        className={`sticky bg-white transition-all duration-300 ${
          isHeaderVisible ? 'top-20' : 'top-0'
        } z-20`}
      >
        <div className="mb-8 flex w-full gap-3 rounded-2xl border p-4">
          <CompanyBox
            onClick={handleTypeClick}
            company={company!}
            job={job!}
            resetPage={(companyType) => {
              setPage(1);
              if (job) {
                router.push(
                  `/?jobType=${job}&companyType=${companyType}&page=1`,
                  {
                    scroll: false
                  }
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
      <div
        className={`relative mt-4 flex flex-col gap-4 rounded-2xl bg-subgray p-8 transition-all duration-300 ${
          isCompanyVisible ? 'translate-y-0' : 'translate-y-4'
        }`}
      >
        <div className="mt-4 flex gap-2">
          <h2 className="text-2xl font-semibold">
            {Company[company!]} {Job[job!]} 이력서
          </h2>
          <span className="self-end text-sm">선택된 기업의 이력서입니다.</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <GrPowerReset
            onClick={() => {
              setCompany(undefined);
              setJob(undefined);
              router.push('/');
            }}
            className="cursor-pointer rounded-full"
            size={24}
          />
          <span className="text-xs">선택 초기화</span>
        </div>
        {isFetching ? (
          <LoaderGrid />
        ) : isError ? (
          <div>Error: {error.message}</div>
        ) : (
          <div className="grid grid-cols-1 grid-rows-2 gap-4 transition-all xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {resumePage?.resumes.map((resume) => (
              <ResumeBox
                key={resume.resumeId}
                resumeId={resume.resumeId}
                thumbnail={resume.imageList[0].resumeImgPath}
                title={resume.title}
                userId={resume.sellerNickname}
                price={resume.price}
              />
            ))}
          </div>
        )}
        <ReactPaginate
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
          renderOnZeroPageCount={() => <div>이력서 없음</div>}
          containerClassName="flex list-none gap-3" // 페이지 네이션 컨테이너 클래스
          pageClassName="flex justify-center items-center size-7 rounded-xl transition-colors" // 각 페이지 아이템 클래스
          activeClassName="bg-main text-white" // 선택된 페이지 클래스
          className="flex items-center justify-center gap-4"
        />
      </div>
    </div>
  );
};
