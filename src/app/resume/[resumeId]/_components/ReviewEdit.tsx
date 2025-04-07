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
const ReviewEdit = ({
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
      className="w-full max-w-lg mx-auto p-4 sm:p-6"
    >
      <form
        method="post"
        onSubmit={handleSubmit}
        className="mt-4 sm:mt-6 flex flex-col items-center justify-center gap-4"
      >
        <div className="flex items-center gap-2 text-sm sm:text-base">
          <span className="font-medium text-gray-700">별점:</span>
          {[...Array(5)].map((a, i) => (
            <FaStar
              className={cn(
                'cursor-pointer text-xl sm:text-2xl transition-colors',
                i + 1 <= grade
                  ? 'text-yellow-400'
                  : 'text-gray-200 hover:text-yellow-300'
              )}
              key={i}
              onClick={() => setGrade(i + 1)}
            />
          ))}
          <span className="text-sm text-gray-600 ml-1">({grade}점)</span>
        </div>
        <Textarea
          className="w-full min-h-[200px] rounded-lg border border-gray-300 bg-white p-3 sm:p-4 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          id="commentContent"
          placeholder="이력서 구매후기 입력"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setContent(e.target.value)
          }
          value={content}
          rows={10}
        />
        <Button
          type="submit"
          className="w-full sm:w-2/3 md:w-1/2 py-2.5 sm:py-3 mt-4 sm:mt-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          onClick={onClose}
        >
          구매후기 수정하기
        </Button>
      </form>
    </Modal>
  );
};

export default ReviewEdit;
