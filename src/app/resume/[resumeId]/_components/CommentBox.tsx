'use client';

import { Comment } from '@/utils/type';
import { FC } from 'react';

const CommentBox: FC<Comment> = ({
  commentId,
  createdDate,
  memberId,
  reviewId,
  sellerNickname,
  text,
  updatedDate
}) => {
  return (
    <div>
      <div className="flex justify-between rounded-xl border-2 bg-subgray p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center">
            <span className="mr-2 font-semibold">{sellerNickname}</span>
            <span className="rounded-xl bg-main px-2 py-1 text-sm">공유자</span>
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
    </div>
  );
};

export default CommentBox;
