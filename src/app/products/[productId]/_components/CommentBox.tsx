'use client';

import { Comment } from '@/utils/type';
import { useSession } from 'next-auth/react';
import { FaStar } from 'react-icons/fa';
const CommentBox = ({
  commentDtoList,
  createdDate,
  grade,
  memberId,
  orderId,
  resumeId,
  reviewId,
  reviewerNickname,
  sellerNickname,
  text,
  updatedDate
}: Comment) => {
  const { status, data: session } = useSession();
  console.log(grade);

  return (
    <div className="flex flex-col justify-between gap-2 rounded-xl border-2 p-2">
      <div className="flex justify-between">
        <div className="flex gap-2 ">
          <span className="font-semibold">{reviewerNickname}</span>
          {[...Array(grade)].map((_, index) => (
            <div key={index} className="m-0 p-0">
              <FaStar className="text-main" />
            </div>
          ))}
          <div>{grade}</div>
        </div>
        {status === 'authenticated' ? (
          <div className="flex gap-2 text-default">
            <div>수정</div>
            <div>삭제</div>
          </div>
        ) : null}
      </div>

      <div>{text}</div>
      <div className="flex justify-between text-default">
        <span>{updatedDate ?? createdDate}</span>
        {/* <div className="flex items-center"> // 좋아요는 없는걸
          <CiHeart />
          45
        </div> */}
      </div>
    </div>
  );
};

export default CommentBox;
