'use client';

import Button from '@/components/Button';
import Modal from '@/components/Modal';
import { cn } from '@/utils/style';
import { Textarea } from '@headlessui/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { FaStar } from 'react-icons/fa';
const CommentEdit = ({
  resumeId,
  isOpen,
  onClose,
  refetch,
  rating = 0,
  text,
  reviewId
}: {
  resumeId: number;
  isOpen: boolean;
  onClose: () => void;
  refetch: any;
  rating?: number;
  text?: string;
  reviewId?: number;
}) => {
  console.log(resumeId, rating, text, reviewId);
  const { data: session } = useSession();
  const router = useRouter();
  const [content, setContent] = useState(text);
  const [grade, setGrade] = useState(rating);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch(`/server/resumes/${resumeId}/reviews/${reviewId}`, {
      method: 'PUT',
      body: JSON.stringify({
        grade,
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
    router.refresh();
    refetch();
    return toast.success('구매후기가 수정되었습니다.');
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={'구매후기 수정'}
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
          placeholder="이력서 구매후기 입력"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setContent(e.target.value)
          }
          value={content}
          rows={20}
          cols={40}
        />
        <Button
          type="submit"
          className="my-10 w-2/4 self-center"
          onClick={onClose}
        >
          구매후기 수정하기
        </Button>
      </form>
    </Modal>
  );
};

export default CommentEdit;
