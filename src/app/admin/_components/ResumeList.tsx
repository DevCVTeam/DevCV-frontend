'use client';

import Button from '@/components/Button';
import { pendingModifiedResumeList } from '@/utils/fetch';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import toast from 'react-hot-toast';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ReactPaginate from 'react-paginate';
type ResumeListProps = {
  type: 'pending' | 'modified';
  token: string;
};

const ResumeList: FC<ResumeListProps> = ({ type, token }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const {
    data: resumeList,
    isPending,
    isError,
    isLoading,
    error,
    isPlaceholderData,
    isFetching
  } = useQuery({
    queryKey: [`${type} events`, currentPage],
    queryFn: async () => {
      const resumeList = await pendingModifiedResumeList({
        page: currentPage,
        token,
        type
      });
      setTotalPage(resumeList?.totalPages!);
      if (resumeList?.content[0].resumeList.length === 0)
        return {
          resumeList: []
        };
      return {
        resumeList: resumeList?.content[0].resumeList
      };
    }
  });
  console.log(type, isPending);
  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected + 1);
  };
  const handleApproved = async (resumeId: number) => {
    const res = await fetch(`/server/admin/resumes/${resumeId}/approved`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (!res.ok) {
      return toast.error('이력서 승인 실패');
    }
    toast.success('이력서 승인 성공');
    return router.refresh();
  };

  const handleRejected = async (resumeId: number) => {
    const res = await fetch(`/server/admin/resumes/${resumeId}/rejected`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (!res.ok) {
      return toast.error('반려 실패');
    }
    toast.success('반려 완료');
    return router.refresh();
  };
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between px-4 py-2">
        <p className="min-w-[200px] font-semibold">이력서 제목</p>
        <div className="grid grid-cols-4 gap-12 text-center">
          <p className="w-[80px]">판매처</p>
          <p className="w-[80px]">가격</p>
          <p className="w-[80px]">등록일자</p>
          <p className="w-[200px]">승인 / 반려</p>
        </div>
      </div>
      {isFetching ? (
        <div>데이터 로딩중...</div>
      ) : (
        resumeList?.resumeList?.map((resume, index) => (
          <div
            className="flex cursor-pointer items-center justify-between rounded-xl border-b border-gray-300 bg-subgray px-4 py-2 hover:bg-slate-200"
            key={index}
          >
            <Link
              className="flex items-center"
              href={`/admin/resumePending/${resume.resumeId}`}
              passHref
            >
              <div className="mr-4 size-8 rounded-full bg-blue-500"></div>
              <div>
                <p className="min-w-[200px] font-semibold">{resume.title}</p>
                <p className="min-w-[150px] text-gray-500">
                  {resume.companyType}
                </p>
              </div>
            </Link>
            <div className="grid grid-cols-4 items-center gap-12 text-center">
              <p className="w-[80px]">{resume.sellerNickname}</p>
              <p className="w-[80px]">{resume.price}</p>
              <p className="w-[80px] text-gray-500">{resume.price}</p>
              <p className="flex w-[200px] gap-4">
                <Button
                  onClick={() => handleApproved(resume.resumeId)}
                  className="w-1/2 bg-white text-blue-500 hover:bg-slate-300"
                >
                  승인
                </Button>
                <Button
                  className="w-1/2 bg-white text-red-500 hover:bg-slate-300"
                  onClick={() => handleRejected(resume.resumeId)}
                >
                  반려
                </Button>
              </p>
            </div>
          </div>
        ))
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
    </div>
  );
};

export default ResumeList;
