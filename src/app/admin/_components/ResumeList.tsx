'use client';

import { pendingModifiedResumeList } from '@/utils/fetch';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { FC, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ReactPaginate from 'react-paginate';
type ResumeListProps = {
  type: 'pending' | 'modified';
  token: string;
};

const ResumeList: FC<ResumeListProps> = ({ type, token }) => {
  console.log(type);
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
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between px-4 py-2">
        <p className="min-w-[200px] font-semibold">이력서 제목</p>
        <div className="grid grid-cols-3 gap-12 text-center">
          <p className="w-[100px]">판매처</p>
          <p className="w-[100px]">가격</p>
          <p className="w-[100px]">등록일자</p>
        </div>
      </div>
      {isFetching ? (
        <div>데이터 로딩중...</div>
      ) : (
        resumeList?.resumeList?.map((item, index) => (
          <Link
            className="flex cursor-pointer items-center justify-between rounded-xl border-b border-gray-300 bg-subgray px-4 py-2 hover:bg-slate-200"
            key={index}
            href={`/admin/resumePending/${item.resumeId}`}
            passHref
          >
            <div className="flex items-center">
              <div className="mr-4 size-8 rounded-full bg-blue-500"></div>
              <div>
                <p className="min-w-[200px] font-semibold">{item.title}</p>
                <p className="min-w-[150px] text-gray-500">
                  {item.companyType}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-12 text-center">
              <p className="w-[100px]">{item.sellerNickname}</p>
              <p className="w-[100px]">{item.price}</p>
              <p className="w-[100px] text-gray-500">{item.price}</p>
            </div>
          </Link>
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
