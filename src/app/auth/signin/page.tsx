'use client';

import AdminLoginModal from '@/app/auth/_components/Modal/AdminLoginModal';
import IdFindModal from '@/app/auth/_components/Modal/IdFindModal';
import PwdFindModal from '@/app/auth/_components/Modal/PwdFindModal';
import Button from '@/components/Header/Button';
import Input from '@/components/Input';
import { signFn } from '@/utils/actions/jwt';
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
    <div
      className="min-h-screen flex justify-center items-center px-4 py-8 sm:px-6 lg:px-8
      before:absolute before:-z-10 before:h-1/2 before:w-3/4 before:animate-spin-slower before:rounded-bl-full before:rounded-tr-full before:bg-accent-2 before:blur-3xl 
      after:absolute after:-z-10 after:size-2/3 after:animate-spin-slow after:rounded-bl-full after:rounded-tr-full after:bg-accent-1/80 after:blur-3xl"
    >
      <div
        className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl 
        flex flex-col items-center justify-center gap-4 
        rounded-2xl sm:rounded-3xl border-2 border-gray-200 
        bg-white p-4 sm:p-6 md:p-8 
        shadow-lg transition-all"
      >
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

        <div className="flex flex-col items-center gap-4 sm:gap-6">
          <Image
            width={40}
            height={40}
            src="/logo.png"
            alt="logoImage"
            className="sm:w-12 sm:h-12"
          />
          <div className="flex flex-col items-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              안녕하세요!
            </h2>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              DevCV 입니다.
            </h2>
          </div>
        </div>

        <form className="w-full flex flex-col gap-4 sm:gap-6 mt-4">
          <Input
            placeholder="이메일을 입력해주세요."
            ref={emailRef}
            type="email"
            className="w-full rounded-xl border border-gray-300 p-2.5 sm:p-3 
              text-sm sm:text-base
              focus:outline-none focus:ring-2 focus:ring-main"
          />
          <Input
            placeholder="비밀번호를 입력해주세요."
            type="password"
            ref={pwdRef}
            className="w-full rounded-xl border border-gray-300 p-2.5 sm:p-3 
              text-sm sm:text-base
              focus:outline-none focus:ring-2 focus:ring-main"
          />
          <Button
            type="button"
            className="w-full rounded-xl bg-main py-2.5 sm:py-3 
              text-sm sm:text-base font-semibold text-white 
              hover:bg-hover transition-colors"
            onClick={handleLogin}
          >
            로그인
          </Button>
          <div
            className="flex sm:flex-row justify-between items-center gap-3 sm:gap-6 mt-4
            text-xs sm:text-sm text-gray-600"
          >
            <span
              className="cursor-pointer underline hover:text-main transition-colors"
              onClick={() => setAdminInOpen(true)}
            >
              관리자로그인
            </span>
            <span
              className="cursor-pointer underline hover:text-main transition-colors"
              onClick={() => router.push('/auth/signup')}
            >
              회원가입
            </span>
            <span
              className="cursor-pointer underline hover:text-main transition-colors"
              onClick={() => setIdFindIsOpen(true)}
            >
              ID 찾기
            </span>
            <span
              className="cursor-pointer underline hover:text-main transition-colors"
              onClick={() => setPwdFindIsOpen(true)}
            >
              비밀번호 찾기
            </span>
          </div>
        </form>

        <div className="mt-4 sm:mt-6 transform scale-90 sm:scale-100">
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY!}
            onChange={onChange}
          />
        </div>

        <hr className="my-4 sm:my-6 w-1/4 border-gray-300" />

        <div className="flex flex-col items-center gap-4 sm:gap-6">
          <span className="text-base sm:text-lg font-semibold text-gray-700">
            소셜 로그인
          </span>
          <div className="flex gap-6 sm:gap-10">
            <div
              onClick={kakaoLoginHandler}
              className="cursor-pointer rounded-full bg-yellow-400 p-2.5 sm:p-3 
                transition-all hover:bg-yellow-500"
            >
              <SiKakaotalk className="text-neutral-800 w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div
              onClick={googleLoginHandler}
              className="cursor-pointer rounded-full bg-neutral-800 p-2.5 sm:p-3 
                transition-all hover:bg-neutral-700"
            >
              <FcGoogle className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
