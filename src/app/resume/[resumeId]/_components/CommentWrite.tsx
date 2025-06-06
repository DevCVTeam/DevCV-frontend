'use client';

import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import { cn } from '@/utils/style';
import { Textarea } from '@headlessui/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { FaStar } from 'react-icons/fa';
const CommentWrite = ({
  resumeId,
  isOpen,
  onClose,
  refetch,
  reviewId
}: {
  resumeId: number;
  isOpen: boolean;
  onClose: () => void;
  reviewId?: number;
  refetch: any;
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [content, setContent] = useState('');
  const [grade, setGrade] = useState(0);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch(`/server/reviews/${reviewId}/comments`, {
      method: 'POST',
      body: JSON.stringify({
        text: content
      }),
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await res.json();
    if (!res.ok) {
      return toast.error(data.message);
    }
    toast.success('코멘트 작성되었습니다.');
    refetch();
    return router.push(`/products/${resumeId}`);
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={'댓글 작성'}
      className="sm:max-w-xl"
    >
      <form
        method="post"
        onSubmit={handleSubmit}
        className="mt-6 flex flex-col items-center justify-center gap-4"
      >
        <div className="flex items-center ">
          <span>별점: </span>
          {[...Array(5)].map((a, i) => (
            <FaStar
              className={cn(
                'cursor-pointer text-slate-200 hover:text-main',
                i + 1 <= grade ? 'text-main' : 'text-slate-200'
              )}
              key={i}
              onClick={() => setGrade(i + 1)}
            />
          ))}
          <span>&nbsp;({grade}점)</span>
        </div>
        <Textarea
          className="rounded-2xl border bg-subgray p-4"
          id="commentContent"
          placeholder="이력서 후기입력"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setContent(e.target.value)
          }
          rows={20}
          cols={40}
        />
        <Button
          type="submit"
          className="my-10 w-2/4 self-center"
          onClick={onClose}
        >
          후기 등록하기
        </Button>
      </form>
    </Modal>
  );
};

export default CommentWrite;
