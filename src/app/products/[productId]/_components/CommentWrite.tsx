'use client';

import Button from '@/components/Button';
import { cn } from '@/utils/style';
import { Textarea } from '@headlessui/react';
import { useSession } from 'next-auth/react';
import { FormEvent, useState } from 'react';
import { FaStar } from 'react-icons/fa';
const CommentWrite = ({ resumeId }: { resumeId: number }) => {
  const { data: session } = useSession();
  const [content, setContent] = useState('');
  const [grade, setGrade] = useState(0);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(grade);
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
    console.log(data);
  };
  return (
    <form method="post" onSubmit={handleSubmit} className="flex flex-col">
      <label className="mb-4 text-xl" htmlFor="commentContent">
        댓글 작성
      </label>
      <div className="flex items-center">
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
        defaultValue="이력서 후기입력"
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setContent(e.target.value)
        }
        rows={20}
        cols={40}
      />
      <Button type="submit" className="my-10 w-2/4 self-center">
        후기 등록하기
      </Button>
    </form>
  );
};

export default CommentWrite;
