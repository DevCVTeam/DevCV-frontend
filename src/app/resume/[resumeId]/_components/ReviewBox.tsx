'use client';

import { Review } from '@/utils/type';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaStar } from 'react-icons/fa';
import CommentWrite from './CommentWrite';
import CommentEdit from './ReviewEdit';
const ReviewBox = ({
  commentDtoList,
  createdDate,
  sellerEmail,
  grade,
  memberId,
  orderId,
  resumeId,
  reviewId,
  reviewerNickname,
  sellerNickname,
  text,
  updatedDate,
  refetch
}: Review & { refetch: any }) => {
  const { status, data: session } = useSession();
  const [editOpen, setEditOpen] = useState(false);
  const [writeOpen, setWriteOpen] = useState(false);
  const router = useRouter();
  const handleRemove = async () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      const res = await fetch(
        `/server/resumes/${resumeId}/reviews/${reviewId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`
          }
        }
      );
      const data = await res.json();
      if (!res.ok) {
        return toast.error(data.message);
      }
      router.refresh();
      refetch();
      return toast.success('구매후기를 삭제했습니다.');
    }
  };
  return (
    <div className="flex flex-col justify-between gap-4 rounded-xl border border-gray-200 p-3 transition-shadow hover:shadow-sm sm:flex-row sm:p-4">
      <CommentEdit
        resumeId={resumeId}
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        rating={grade}
        reviewId={reviewId}
        text={text}
        refetch={refetch}
      />
      <CommentWrite
        resumeId={resumeId}
        isOpen={writeOpen}
        reviewId={reviewId}
        onClose={() => setWriteOpen(false)}
        refetch={refetch}
      />
      <div className="flex-1">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-gray-900 sm:text-base">
              {reviewerNickname}
            </span>
            <div className="flex items-center gap-1">
              {[...Array(grade)].map((_, index) => (
                <div key={index} className="text-yellow-400">
                  <FaStar className="size-3.5 sm:size-4" />
                </div>
              ))}
              <span className="ml-1 text-sm text-gray-600">{grade}</span>
            </div>
          </div>
          <div className="text-sm text-gray-700 sm:text-base">{text}</div>
          <span className="text-xs text-gray-400">
            {new Date(updatedDate).toLocaleString('ko-KR', {
              year: 'numeric',
              month: 'short',
              day: '2-digit'
            })}
          </span>
        </div>
      </div>

      <div className="flex flex-row justify-end gap-2 text-sm sm:flex-col">
        {status === 'authenticated' && memberId === session.user.memberId ? (
          <div className="flex gap-2">
            <button
              onClick={() => setEditOpen(true)}
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-gray-700 transition-colors hover:bg-gray-50"
            >
              수정
            </button>
            <button
              onClick={handleRemove}
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-gray-700 transition-colors hover:bg-gray-50"
            >
              삭제
            </button>
          </div>
        ) : null}
        {sellerEmail === session?.user.email ? (
          <button
            onClick={() => setWriteOpen(true)}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-gray-700 transition-colors hover:bg-gray-50"
          >
            댓글 작성
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default ReviewBox;
