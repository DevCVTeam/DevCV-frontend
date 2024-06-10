'use client';

import { FC } from 'react';
import CommentBox from './CommentBox';

type CommentContainerProps = {
  type: string;
};
const CommentContainer: FC<CommentContainerProps> = ({ type }) => {
  return (
    <div className="flex flex-col gap-4">
      {[...Array(10)].map((_, index) => (
        <CommentBox key={index} />
      ))}
    </div>
  );
};

export default CommentContainer;
