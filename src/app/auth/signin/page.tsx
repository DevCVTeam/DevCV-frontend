'use client';

import AdminLoginModal from '@/app/auth/_components/Modal/AdminLoginModal';
import IdFindModal from '@/app/auth/_components/Modal/IdFindModal';
import PwdFindModal from '@/app/auth/_components/Modal/PwdFindModal';
import Button from '@/components/Header/Button';
import Input from '@/components/Input';
import { signFn } from '@/utils/jwt';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { SiKakaotalk } from 'react-icons/si';

const SigninPage = () => {
  const [adminIsOpen, setAdminInOpen] = useState(false);
  const [idFindIsOpen, setIdFindIsOpen] = useState(false);
  const [pwdFindIsOpen, setPwdFindIsOpen] = useState(false);
  const [recaptcha, setRecaptcha] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/');
    }
  }, [router, status]);
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8 && password.length <= 16;
  };

  const handleLogin = async () => {
    try {
      if (!recaptcha) {
        return toast.error('입력방지를 체크해주세요');
      }
      const email = emailRef.current?.value;
      const password = pwdRef.current?.value;

      if (!email || !validateEmail(email)) {
        return toast.error('유효한 이메일을 입력해주세요.');
      }

      if (!password || !validatePassword(password)) {
        return toast.error('비밀번호는 8글자 이상 16글자 이하여야 합니다.');
      }

      const token = await signFn(password);
      const result = await signIn('credentials', {
        email,
        password: token,
        redirect: false
      });
      if (result?.error) {
        toast.error('로그인에 실패하였습니다.');
      } else if (result === null) {
        toast.error('로그인에 실패하였습니다.');
      } else {
        toast.success('로그인에 성공하였습니다.');
      }
    } catch (error) {
      console.log(error);
      toast.error('로그인에 실패하였습니다.');
    }
  };

  // 자동입력방지 ReCAPTCHA
  const onChange = () => {
    setRecaptcha(true);
  };

  const kakaoLoginHandler = () => {
    try {
      signIn('kakao', {
        callbackUrl: '/auth/social/profile?social=kakao',
        redirect: false
      });
    } catch (error) {
      toast.error('로그인 실패하였습니다.');
    }
  };
  const googleLoginHandler = () => {
    try {
      signIn('google', {
        callbackUrl: '/auth/social/profile?social=google',
        redirect: false
      });
    } catch (error) {
      toast.error('로그인 실패하였습니다.');
    }
  };
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
        <Input
          placeholder="이메일을 입력해주세요."
          ref={emailRef}
          type="email"
        />
        <Input
          placeholder="비밀번호를 입력해주세요."
          type="password"
          ref={pwdRef}
        />
        <Button
          type="button"
          className="w-full bg-main hover:bg-hover"
          onClick={handleLogin}
        >
          로그인
        </Button>
        <div className="flex justify-between text-sm">
          <div className="flex gap-2">
            <span
              className="cursor-pointer text-sub underline"
              onClick={() => setAdminInOpen(true)}
            >
              관리자로그인
            </span>
            <span
              className="cursor-pointer text-sub underline"
              onClick={() => router.push('/auth/signup')}
            >
              회원가입
            </span>
          </div>
          <div className="flex gap-2">
            <span
              className="cursor-pointer text-sub underline"
              onClick={() => setIdFindIsOpen(true)}
            >
              ID 찾기
            </span>
            <span
              className="cursor-pointer text-sub underline"
              onClick={() => setPwdFindIsOpen(true)}
            >
              비밀번호 찾기
            </span>
          </div>
        </div>
      </form>
      <div className="mt-10">
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY!}
          onChange={onChange}
        />
      </div>
      <hr className="my-6 w-1/3" />
      <div className="flex flex-col items-center gap-4">
        <span>소셜 로그인</span>
        <div className="flex gap-8">
          <div
            onClick={kakaoLoginHandler}
            className="cursor-pointer rounded-full"
          >
            <SiKakaotalk className="size-12 rounded-full bg-neutral-800 text-yellow-400" />
          </div>
          <div className="cursor-pointer rounded-full">
            <FcGoogle onClick={googleLoginHandler} className="size-12" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
