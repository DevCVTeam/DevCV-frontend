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
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-green-100/30 to-blue-100/30 rounded-full blur-3xl animate-float-delay" />
      </div>

      <motion.div
        className="w-full max-w-[360px] xs:max-w-[400px] sm:max-w-[520px] 
        relative z-10
        flex flex-col items-center justify-center gap-4 
        rounded-2xl sm:rounded-3xl
        border border-gray-100
        bg-white/80 backdrop-blur-xl
        p-6 sm:p-8 lg:p-10
        shadow-xl hover:shadow-2xl transition-all duration-300"
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
          className="flex flex-col items-center gap-4 sm:gap-6"
          variants={itemVariants}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
          >
            <Image
              width={48}
              height={48}
              src="/logo.png"
              alt="logoImage"
              className="sm:w-12 sm:h-12 drop-shadow-md"
            />
          </motion.div>
          <motion.div
            className="flex flex-col items-center gap-1"
            variants={itemVariants}
          >
            <motion.h2
              className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              안녕하세요!
            </motion.h2>
            <motion.h2
              className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-600 to-gray-900 bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              DevCV 입니다.
            </motion.h2>
          </motion.div>
        </motion.div>

        <motion.form
          className="w-full flex flex-col gap-4 sm:gap-5 mt-4 sm:mt-6"
          variants={itemVariants}
        >
          <motion.div variants={itemVariants}>
            <Input
              placeholder="이메일을 입력해주세요."
              ref={emailRef}
              type="email"
              className="w-full rounded-xl border border-gray-200 p-3 text-sm 
              bg-gray-50/50 backdrop-blur-sm
              focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent
              transition-all duration-300"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Input
              placeholder="비밀번호를 입력해주세요."
              type="password"
              ref={pwdRef}
              className="w-full rounded-xl border border-gray-200 p-3 text-sm 
              bg-gray-50/50 backdrop-blur-sm
              focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent
              transition-all duration-300"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Button
              type="button"
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 py-3 text-sm font-semibold text-white 
              shadow-lg hover:shadow-xl
              transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-700 hover:to-blue-800
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={handleLogin}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              로그인
            </Button>
          </motion.div>
          <motion.div
            className="flex flex-col gap-6 items-center mt-2 justify-between text-sm text-gray-600 sm:flex-row sm:gap-2"
            variants={itemVariants}
          >
            <div className="flex gap-4">
              <motion.span
                className="cursor-pointer hover:text-gray-900 transition-colors relative group"
                onClick={() => setAdminInOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                관리자로그인
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </motion.span>
              <motion.span
                className="cursor-pointer hover:text-gray-900 transition-colors relative group"
                onClick={() => router.push('/auth/signup')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                회원가입
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </motion.span>
            </div>
            <div className="flex gap-4">
              <motion.span
                className="cursor-pointer hover:text-gray-900 transition-colors relative group"
                onClick={() => setIdFindIsOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ID 찾기
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </motion.span>
              <motion.span
                className="cursor-pointer hover:text-gray-900 transition-colors relative group"
                onClick={() => setPwdFindIsOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                비밀번호 찾기
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </motion.span>
            </div>
          </motion.div>
        </motion.form>

        <motion.div
          className="mt-4 sm:mt-6 w-full flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="overflow-hidden rounded-lg shadow-md">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY!}
              onChange={onChange}
              size={captchaSize}
            />
          </div>
        </motion.div>

        <motion.div
          className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        />

        <motion.div
          className="flex flex-col items-center gap-4 sm:gap-5"
          variants={itemVariants}
        >
          <span className="text-sm sm:text-base font-medium text-gray-700">
            소셜 로그인
          </span>
          <div className="flex gap-4 sm:gap-6">
            <motion.button
              onClick={kakaoLoginHandler}
              className="flex items-center justify-center size-12 sm:size-14
              rounded-2xl bg-yellow-400 shadow-lg hover:shadow-xl
              transition-all duration-300 hover:-translate-y-0.5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SiKakaotalk className="text-neutral-800 w-6 h-6 sm:w-7 sm:h-7" />
            </motion.button>
            <motion.button
              onClick={googleLoginHandler}
              className="flex items-center justify-center size-12 sm:size-14
              rounded-2xl bg-white shadow-lg hover:shadow-xl
              transition-all duration-300 hover:-translate-y-0.5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FcGoogle className="w-6 h-6 sm:w-7 sm:h-7" />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SigninPage;
