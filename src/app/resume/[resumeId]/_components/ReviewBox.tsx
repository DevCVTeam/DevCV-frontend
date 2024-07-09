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
    <div className="flex justify-between rounded-xl border-2 p-4">
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
      <div className="flex">
        <div className="flex flex-col gap-4">
          <div className="flex items-center">
            <span className="mr-2 font-semibold">{reviewerNickname}</span>
            {[...Array(grade)].map((_, index) => (
              <div key={index} className="m-0 p-0">
                <FaStar className="text-main" />
              </div>
            ))}
            <div className="ml-1">{grade}</div>
          </div>
          <div>{text}</div>
          <span className="text-xs text-slate-400">
            {new Date(updatedDate).toLocaleString('ko-KR', {
              year: 'numeric',
              month: 'short',
              day: '2-digit'
            })}
          </span>
        </div>
      </div>

      <div className="flex justify-between text-default">
        {status === 'authenticated' && memberId === session.user.memberId ? (
          <div className="flex gap-2 text-default">
            <p
              onClick={() => setEditOpen(true)}
              className="flex h-8 w-20 cursor-pointer items-center justify-center rounded-lg border-2 hover:bg-slate-100"
            >
              수정
            </p>
            <p
              onClick={handleRemove}
              className="flex h-8 w-20 cursor-pointer items-center justify-center rounded-lg border-2 hover:bg-slate-100"
            >
              삭제
            </p>
          </div>
        ) : null}
        {sellerEmail === session?.user.email ? (
          <p
            onClick={() => setWriteOpen(true)}
            className="flex h-8 w-20 cursor-pointer items-center justify-center rounded-lg border-2 hover:bg-slate-100"
          >
            댓글 작성
          </p>
        ) : null}
        {/* <div className="flex items-center"> // 좋아요는 없는걸
          <CiHeart />
          45
        </div> */}
      </div>
    </div>
  );
};

export default ReviewBox;
