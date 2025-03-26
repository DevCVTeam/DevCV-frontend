'use client';

import AdminLoginModal from '@/app/auth/_components/Modal/AdminLoginModal';
import IdFindModal from '@/app/auth/_components/Modal/IdFindModal';
import PwdFindModal from '@/app/auth/_components/Modal/PwdFindModal';
import Button from '@/components/Header/Button';
import Input from '@/components/Input';
import { signFn } from '@/utils/actions/jwt';
import { AnimatePresence, motion } from 'framer-motion';
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
  const [captchaSize, setCaptchaSize] = useState<'normal' | 'compact'>(
    'normal'
  );

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/');
    }
  }, [router, status]);

  // 화면 크기에 따라 captcha 크기 조정
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        // sm 브레이크포인트 (640px)
        setCaptchaSize('compact');
      } else {
        setCaptchaSize('normal');
      }
    };

    // 초기 로드 시 크기 설정
    handleResize();

    // 창 크기 변경 시 감지
    window.addEventListener('resize', handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 정리
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

  // 애니메이션 변형 정의
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div
      className="flex items-center justify-center px-4 pt-12 sm:px-6 lg:px-8 xl:px-0
      before:fixed before:-z-10 before:h-1/2 before:w-3/4 before:animate-spin-slower before:rounded-bl-full before:rounded-tr-full before:bg-accent-2 before:blur-3xl 
      after:fixed after:-z-10 after:size-2/3 after:animate-spin-slow after:rounded-bl-full after:rounded-tr-full after:bg-accent-1/80 after:blur-3xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="w-full max-w-[360px] xs:max-w-[400px] sm:max-w-[520px] 
        flex flex-col items-center justify-center gap-4 
        rounded-2xl sm:rounded-3xl border-2 border-gray-200 
        bg-white p-4 sm:p-6 lg:p-8 
        shadow-lg transition-all"
        variants={itemVariants}
      >
        <AnimatePresence>
          {adminIsOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <AdminLoginModal
                isOpen={adminIsOpen}
                onClose={() => setAdminInOpen(false)}
                title="관리자 로그인"
              />
            </motion.div>
          )}
          {idFindIsOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <IdFindModal
                isOpen={idFindIsOpen}
                onClose={() => setIdFindIsOpen(false)}
                title="아이디 찾기"
              />
            </motion.div>
          )}
          {pwdFindIsOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <PwdFindModal
                isOpen={pwdFindIsOpen}
                onClose={() => setPwdFindIsOpen(false)}
                title="패스워드 찾기"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="flex flex-col items-center gap-3 sm:gap-4"
          variants={itemVariants}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              width={36}
              height={36}
              src="/logo.png"
              alt="logoImage"
              className="sm:w-10 sm:h-10"
            />
          </motion.div>
          <motion.div
            className="flex flex-col items-center"
            variants={itemVariants}
          >
            <motion.h2
              className="text-xl sm:text-2xl font-bold text-gray-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              안녕하세요!
            </motion.h2>
            <motion.h2
              className="text-xl sm:text-2xl font-bold text-gray-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              DevCV 입니다.
            </motion.h2>
          </motion.div>
        </motion.div>

        <motion.form
          className="w-full flex flex-col gap-3 sm:gap-4 mt-2 sm:mt-4"
          variants={itemVariants}
        >
          <motion.div variants={itemVariants}>
            <Input
              placeholder="이메일을 입력해주세요."
              ref={emailRef}
              type="email"
              className="w-full rounded-xl border border-gray-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-main"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Input
              placeholder="비밀번호를 입력해주세요."
              type="password"
              ref={pwdRef}
              className="w-full rounded-xl border border-gray-300 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-main"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Button
              type="button"
              className="w-full rounded-xl bg-main py-2.5 text-sm font-semibold text-slate-600 hover:bg-hover transition-colors"
              onClick={handleLogin}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              로그인
            </Button>
          </motion.div>
          <motion.div
            className="flex flex-col gap-6 items-center mt-2 sm:mt-0 justify-between text-xs text-gray-600 sm:flex-row sm:gap-2"
            variants={itemVariants}
          >
            <div className="flex gap-3">
              <motion.span
                className="cursor-pointer underline hover:text-main transition-colors"
                onClick={() => setAdminInOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                관리자로그인
              </motion.span>
              <motion.span
                className="cursor-pointer underline hover:text-main transition-colors"
                onClick={() => router.push('/auth/signup')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                회원가입
              </motion.span>
            </div>
            <div className="flex gap-3">
              <motion.span
                className="cursor-pointer underline hover:text-main transition-colors"
                onClick={() => setIdFindIsOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ID 찾기
              </motion.span>
              <motion.span
                className="cursor-pointer underline hover:text-main transition-colors"
                onClick={() => setPwdFindIsOpen(true)} // 오타 수정: false -> true
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                비밀번호 찾기
              </motion.span>
            </div>
          </motion.div>
        </motion.form>

        <motion.div
          className="mt-2 sm:mt-4 w-full flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="overflow-hidden">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY!}
              onChange={onChange}
              size={captchaSize}
            />
          </div>
        </motion.div>

        <hr className="my-3 sm:my-4 w-1/4 border-gray-300" />

        <motion.div
          className="flex flex-col items-center gap-3 sm:gap-4"
          variants={itemVariants}
        >
          <span className="text-sm sm:text-base font-semibold text-gray-700">
            소셜 로그인
          </span>
          <div className="flex gap-4 sm:gap-6">
            <motion.div
              onClick={kakaoLoginHandler}
              className="cursor-pointer rounded-full bg-yellow-400 p-2 sm:p-2.5 transition-all hover:bg-yellow-500"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <SiKakaotalk className="text-neutral-800 w-5 h-5 sm:w-6 sm:h-6" />
            </motion.div>
            <motion.div
              onClick={googleLoginHandler}
              className="cursor-pointer rounded-full bg-neutral-800 p-2 sm:p-2.5 transition-all hover:bg-neutral-700"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FcGoogle className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SigninPage;
