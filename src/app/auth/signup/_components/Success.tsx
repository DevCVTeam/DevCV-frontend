import Button from '@/components/Button';
import Link from 'next/link';
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const Success = () => {
  return (
    <div>
      <div className="flex flex-col items-center gap-10">
        <div className="flex flex-col items-center">
          <FaCheckCircle className="size-32 text-green-500" />
          <span className="text-slate-400">회원가입이 완료되었습니다.</span>
        </div>
        <div className="flex flex-col gap-4">
          <Link href="/">
            <Button className="w-80 bg-slate-400 hover:bg-slate-700">
              홈으로
            </Button>
          </Link>
          <Link href="/auth/signin">
            <Button className="w-80">로그인하기</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
