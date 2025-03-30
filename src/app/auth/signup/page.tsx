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
        className="w-full max-w-[360px] xs:max-w-[400px] sm:max-w-[520px] md:max-w-[640px]
        relative z-10
        flex flex-col items-center justify-center gap-4 
        rounded-2xl sm:rounded-3xl
        border border-gray-100
        bg-white/80 backdrop-blur-xl
        p-6 sm:p-8 lg:p-10
        shadow-xl hover:shadow-2xl transition-all duration-300"
      >
        <motion.div
          className="flex flex-col items-center gap-4 sm:gap-6 mb-6"
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
              className="sm:w-12 sm:h-12 drop-shadow-md"
            />
          </motion.div>
          <motion.h2
            className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent text-center"
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
