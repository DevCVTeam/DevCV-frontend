'use client';

import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.keys();

  // 컨테이너 애니메이션 설정
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  // 버튼 애니메이션 설정
  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div
      className="flex h-[60vh] flex-col justify-center text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        className="text-3xl font-semibold text-rose-600"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        404 Not Found
      </motion.h2>
      <motion.p
        className="mt-4 text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {error.next().value
          ? '로그인 후 이용 가능한 서비스입니다.'
          : '해당 경로에 맞는 페이지를 찾을 수 없습니다.'}
      </motion.p>
      <motion.div
        className="mt-8"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        <button
          type="button"
          onClick={() => router.replace('/')}
          className="rounded-xl bg-main px-4 py-2.5 hover:bg-sub hover:shadow-lg"
        >
          메인으로 돌아가기
        </button>
      </motion.div>
    </motion.div>
  );
}
