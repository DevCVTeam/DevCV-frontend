'use client';

import { signFn } from '@/utils/actions/jwt';
import { motion } from 'framer-motion';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

const SigninPage = () => {
  const [adminIsOpen, setAdminInOpen] = useState(false);
  const [idFindIsOpen, setIdFindIsOpen] = useState(false);
  const [pwdFindIsOpen, setPwdFindIsOpen] = useState(false);
  const [recaptcha, setRecaptcha] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  const { status } = useSession();
  const router = useRouter();
  const [captchaSize, setCaptchaSize] = useState<'normal' | 'compact'>(
    'normal'
  );

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/');
    }
  }, [router, status]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCaptchaSize('compact');
      } else {
        setCaptchaSize('normal');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
      if (result?.error || result === null) {
        toast.error('로그인에 실패하였습니다.');
      } else {
        toast.success('로그인에 성공하였습니다.');
      }
    } catch (error) {
      console.log(error);
      toast.error('로그인에 실패하였습니다.');
    }
  };

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

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const buttonVariants = {
    hover: { scale: 1.02, transition: { duration: 0.2 } },
    tap: { scale: 0.98 }
  };

  return (
    <motion.div
      className="relative min-h-screen flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8 xl:px-0 overflow-hidden
      bg-gradient-to-br from-gray-50 via-white to-gray-50 before:fixed before:z-[1] before:h-1/2 before:w-3/4 before:animate-spin-slower before:rounded-bl-full before:rounded-tr-full before:bg-accent-2 before:blur-3xl 
      after:fixed after:z-[1] after:size-2/3 after:animate-spin-slow after:rounded-bl-full after:rounded-tr-full after:bg-accent-1/80 after:blur-3xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* 배경 장식 요소들 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute size-1/2 animate-float" />
        <div className="absolute size-1/2 animate-float-delay" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-md space-y-8 rounded-2xl bg-white/80 p-8 shadow-xl backdrop-blur-xl sm:p-10">
        <div className="flex flex-col items-center space-y-4">
          <Link href="/" className="group">
            <Image
              src="/logo.png"
              alt="DevCV Logo"
              width={40}
              height={40}
              className="size-10 transition-transform duration-300 group-hover:rotate-12 sm:size-12"
            />
          </Link>
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            로그인
          </h2>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <button
              onClick={() => signIn('kakao', { callbackUrl: '/' })}
              className="flex w-full items-center justify-center gap-3 rounded-lg bg-[#FEE500] px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              <Image
                src="/icons/kakao.svg"
                alt="Kakao Logo"
                width={24}
                height={24}
                className="size-6 sm:size-7"
              />
              카카오로 시작하기
            </button>

            <button
              onClick={() => signIn('google', { callbackUrl: '/' })}
              className="flex w-full items-center justify-center gap-3 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              <Image
                src="/icons/google.svg"
                alt="Google Logo"
                width={24}
                height={24}
                className="size-6 sm:size-7"
              />
              구글로 시작하기
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">또는</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                이메일
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm transition-all duration-300 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                비밀번호
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm transition-all duration-300 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="size-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 sm:size-5"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  로그인 상태 유지
                </label>
              </div>

              <div className="text-sm">
                <Link
                  href="/auth/forgot-password"
                  className="font-medium text-blue-600 transition-colors hover:text-blue-500"
                >
                  비밀번호 찾기
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              로그인
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500">
          아직 회원이 아니신가요?{' '}
          <Link
            href="/auth/signup"
            className="font-medium text-blue-600 transition-colors hover:text-blue-500"
          >
            회원가입
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default SigninPage;
