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
const ReviewWrite = ({
  resumeId,
  isOpen,
  onClose,
  refetch
}: {
  resumeId: number;
  isOpen: boolean;
  onClose: () => void;
  refetch: any;
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [content, setContent] = useState('');
  const [grade, setGrade] = useState(0);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch(`/server/resumes/${resumeId}/reviews`, {
      method: 'POST',
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
    toast.success('구매후기 작성되었습니다.');
    refetch();
    return router.push(`/resume/${resumeId}`);
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={'댓글 작성'}
      className="mx-auto w-full max-w-lg p-4 sm:p-6"
    >
      <form
        method="post"
        onSubmit={handleSubmit}
        className="mt-4 flex flex-col items-center justify-center gap-4 sm:mt-6"
      >
        <div className="flex items-center gap-2 text-sm sm:text-base">
          <span className="font-medium text-gray-700">별점:</span>
          {[...Array(5)].map((a, i) => (
            <FaStar
              className={cn(
                'cursor-pointer text-xl transition-colors sm:text-2xl',
                i + 1 <= grade
                  ? 'text-yellow-400'
                  : 'text-gray-200 hover:text-yellow-300'
              )}
              key={i}
              onClick={() => setGrade(i + 1)}
            />
          ))}
          <span className="ml-1 text-sm text-gray-600">({grade}점)</span>
        </div>
        <Textarea
          className="min-h-[200px] w-full rounded-lg border border-gray-300 bg-white p-3 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 sm:p-4 sm:text-base"
          id="commentContent"
          placeholder="이력서 후기입력"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setContent(e.target.value)
          }
          rows={10}
        />
        <Button
          type="submit"
          className="mt-4 w-full rounded-lg bg-blue-600 py-2.5 text-white transition-colors hover:bg-blue-700 sm:mt-6 sm:w-2/3 sm:py-3 md:w-1/2"
          onClick={onClose}
        >
          후기 등록하기
        </Button>
      </form>
    </Modal>
  );
};

export default ReviewWrite;
