'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useContext } from 'react';
import Agree from './_components/Agree';
import Begin from './_components/Begin';
import { SignupContext } from './_components/SignupProvider';
import Success from './_components/Success';

const SignupPage = () => {
  const { agreements } = useContext(SignupContext);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  };

  return (
    <motion.div
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50 px-4
      py-16 before:fixed before:z-[1] before:h-1/2 before:w-3/4 before:animate-spin-slower before:rounded-bl-full before:rounded-tr-full before:bg-accent-2 before:blur-3xl after:fixed after:z-[1] after:size-2/3 
      after:animate-spin-slow after:rounded-bl-full after:rounded-tr-full after:bg-accent-1/80 after:blur-3xl sm:px-6 lg:px-8 xl:px-0"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* 배경 장식 요소들 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 -top-1/4 size-1/2 animate-float rounded-full bg-gradient-to-br from-blue-100/30 to-purple-100/30 blur-3xl" />
        <div className="absolute -bottom-1/4 -right-1/4 size-1/2 animate-float-delay rounded-full bg-gradient-to-br from-green-100/30 to-blue-100/30 blur-3xl" />
      </div>

      <motion.div
        className="relative z-10 flex w-full max-w-screen-sm
        flex-col items-center
        justify-center gap-4 rounded-2xl border border-gray-100 
        bg-white/80 p-6
        shadow-xl backdrop-blur-xl
        transition-all duration-300
        hover:shadow-2xl xs:max-w-screen-fold sm:max-w-[520px]
        sm:rounded-3xl sm:p-8 md:max-w-[640px] lg:p-10"
      >
        <motion.div
          className="mb-6 flex flex-col items-center gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
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
              className="drop-shadow-md sm:size-12"
            />
          </motion.div>
          <motion.h2
            className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-center text-2xl font-bold text-transparent sm:text-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            회원가입
          </motion.h2>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={agreements}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {agreements === 0 && <Agree />}
            {agreements === 1 && <Begin />}
            {agreements === 2 && <Success />}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default SignupPage;
