'use client';

import { resumes } from '@/utils/dummy';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ReactPaginate from 'react-paginate';
import ResumeBox from './Box/ResumeBox';

const ResumePagenation = () => {
  const router = useRouter();
  const [itemOffset, setItemOffset] = useState(0); // 현재 페이지 번호 상태 변수
  const itemsPerPage = 10;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = resumes.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(resumes.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % resumes.length;
    setItemOffset(newOffset);
    router.push(`/?page=${newOffset}`, { scroll: false }); // shallow routing 사용
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="mb-8 grid grid-cols-1 gap-2  md:grid-cols-2 md:gap-2 xl:grid-cols-3 xl:gap-3 2xl:grid-cols-4 2xl:gap-5 3xl:grid-cols-5 3xl:gap-8">
        {currentItems.map((item, index) => (
          <ResumeBox
            key={item.resumeId}
            resumeId={item.resumeId}
            thumbnail={item.thumbnail}
            title={item.title}
            userId={item.userId}
            price={item.price}
          />
        ))}
      </div>

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
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        containerClassName="flex list-none gap-3" // 페이지 네이션 컨테이너 클래스
        pageClassName="flex justify-center items-center size-7 rounded-xl transition-colors" // 각 페이지 아이템 클래스
        activeClassName="bg-main text-white" // 선택된 페이지 클래스
        className="flex items-center justify-center gap-4"
      />
    </div>
  );
};

export default ResumePagenation;
