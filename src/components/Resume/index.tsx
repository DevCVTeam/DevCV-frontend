'use client';

import { Company, Job } from '@/utils/constant';
import { getResumes } from '@/utils/fetch';
import { CompanyType, JobType, ResumeResponse } from '@/utils/type';
import { useQuery } from '@tanstack/react-query';
import { FC, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { GrPowerReset } from 'react-icons/gr';
import ReactPaginate from 'react-paginate';
import CompanyBox from '../Box/CompanyBox';
import ResumeBox from '../Box/ResumeBox';
import StackBox from '../Box/StackBox';
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
  const [company, setCompany] = useState<CompanyType | undefined>(undefined);
  const [job, setJob] = useState<JobType | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

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
    queryFn: async ({}) => {
      const { content, totalPages } = await getResumes({ page, company, job });
      console.log(totalPage);
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
  };

  return (
    <div className="flex w-full flex-col gap-8 rounded-sm">
      <span className="flex">
        <h3 className="text-2xl font-semibold">기업 선택</h3>
        <p className="ml-2 self-end">원하시는 기업을 선택해주세요.</p>
      </span>
      <CompanyBox onClick={setCompany} company={company!} />
      <StackBox onClick={setJob} job={job!} />
      <hr />
      <div className="mt-4">
        <h2 className="text-2xl">
          {Job[job!]} {Company[company!]} 이력서
        </h2>
        <span>선택된 기업의 이력서입니다.</span>
      </div>
      <div className="flex flex-col items-center justify-center gap-1">
        <GrPowerReset
          onClick={() => {
            setCompany(undefined);
            setJob(undefined);
          }}
          className="cursor-pointer rounded-full"
          size={24}
        />
        <span className="text-xs">선택 초기화</span>
      </div>
      <div className="flex flex-col justify-center">
        {isFetching ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error: {error.message}</div>
        ) : (
          <div className="mb-8 grid grid-cols-1 grid-rows-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
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
          renderOnZeroPageCount={() => <div>이력서 없음</div>}
          containerClassName="flex list-none gap-3" // 페이지 네이션 컨테이너 클래스
          pageClassName="flex justify-center items-center size-7 rounded-xl transition-colors" // 각 페이지 아이템 클래스
          activeClassName="bg-main text-white" // 선택된 페이지 클래스
          className="flex items-center justify-center gap-4"
        />
        {/* <div className="flex justify-center">
          {isFetching && <div>Fetching...</div>}
        </div> */}
      </div>
    </div>
  );
};
