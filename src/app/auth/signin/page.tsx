'use client';

import Button from '@/components/Header/Button';
import Input from '@/components/Input';
import AdminLoginModal from '@/components/Modal/AdminLoginModal';
import IdFindModal from '@/components/Modal/IdFindModal';
import PwdFindModal from '@/components/Modal/PwdFindModal';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SigninPage = () => {
  const [adminIsOpen, setAdminInOpen] = useState(false);
  const [idFindIsOpen, setIdFindIsOpen] = useState(false);
  const [pwdFindIsOpen, setPwdFindIsOpen] = useState(false);
  const router = useRouter();
  return (
    <div className="my-40 flex w-full flex-col items-center gap-4">
      <AdminLoginModal
        isOpen={adminIsOpen}
        onClose={() => setAdminInOpen(false)}
        title="관리자 로그인"
      />
      <IdFindModal
        isOpen={idFindIsOpen}
        onClose={() => setIdFindIsOpen(false)}
        title="아이디 찾기"
      />
      <PwdFindModal
        isOpen={pwdFindIsOpen}
        onClose={() => setPwdFindIsOpen(false)}
        title="패스워드 찾기"
      />

      <div className="flex flex-col items-center gap-6">
        <Image
          width={48}
          height={48}
          src="/logo.png"
          alt="image"
          placeholder="data:image/jpeg;base64,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"
        />
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold">안녕하세요!</h2>
          <h2 className="text-2xl font-semibold">DevCV 입니다.</h2>
        </div>
      </div>
      <form className="flex w-1/3 flex-col gap-4">
        <Input placeholder="아이디를 입력해주세요." type="id" />
        <Input placeholder="비밀번호를 입력해주세요." type="password" />
        <Button type="submit" className="w-full bg-main hover:bg-hover">
          로그인
        </Button>
        <div className="flex justify-between text-sm">
          <div className="flex gap-4">
            <span
              className="cursor-pointer text-main underline"
              onClick={() => setAdminInOpen(true)}
            >
              관리자로그인
            </span>
            <span
              className="cursor-pointer text-main underline"
              onClick={() => router.push('/auth/signup')}
            >
              회원가입
            </span>
          </div>
          <div className="flex gap-4">
            <span
              className="cursor-pointer text-main underline"
              onClick={() => setIdFindIsOpen(true)}
            >
              ID 찾기
            </span>
            <span
              className="cursor-pointer text-main underline"
              onClick={() => setPwdFindIsOpen(true)}
            >
              비밀번호 찾기
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SigninPage;
