'use client';

import AdminLoginModal from '@/app/auth/_components/Modal/AdminLoginModal';
import IdFindModal from '@/app/auth/_components/Modal/IdFindModal';
import PwdFindModal from '@/app/auth/_components/Modal/PwdFindModal';
import Button from '@/components/Header/Button';
import Input from '@/components/Input';
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
        <Image width={48} height={48} src="/logo.png" alt="logoImage" />
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold">안녕하세요!</h2>
          <h2 className="text-2xl font-semibold">DevCV 입니다.</h2>
        </div>
      </div>
      <form className="flex w-1/3 flex-col gap-4">
        <Input placeholder="아이디를 입력해주세요." />
        <Input placeholder="비밀번호를 입력해주세요." type="password" />
        <Button type="submit" className="w-full bg-main hover:bg-hover">
          로그인
        </Button>
        <div className="flex justify-between text-sm">
          <div className="flex gap-2">
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
          <div className="flex gap-2">
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
