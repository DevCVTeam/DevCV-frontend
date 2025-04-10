'use client';

import { useCartStore } from '@/store/useCartStore';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { BsTrash } from 'react-icons/bs';

export default function CartPage() {
  const { resumes, removeResume, getTotalPrice } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);

  const totalPrice = getTotalPrice();

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: 'beforeChildren',
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 100
      }
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: { duration: 0.3 }
    }
  };

  const summaryVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 100,
        delay: 0.3
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <motion.div
          className="size-32 border-y-2 border-main"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  }

  return (
    <motion.div
      className="container mx-auto min-h-[calc(100vh-80px)] px-4 py-6 sm:px-6 lg:px-8 xl:px-0"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="mx-auto max-w-screen-xl">
        <motion.div
          className="mb-6 flex items-center justify-between"
          variants={itemVariants}
        >
          <h1 className="text-2xl font-bold sm:text-3xl">장바구니</h1>
          <span className="text-sm text-gray-500 sm:text-base">
            총 {resumes.length}개의 이력서
          </span>
        </motion.div>

        {resumes.length === 0 ? (
          <motion.div
            className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed py-12 sm:py-16"
            variants={itemVariants}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                type: 'spring',
                damping: 12,
                stiffness: 100
              }
            }}
          >
            <p className="mb-4 text-lg text-gray-500">
              장바구니가 비어있습니다
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/"
                className="rounded-lg bg-main px-6 py-2.5 text-white transition-colors hover:bg-hover"
              >
                이력서 구경하기
              </Link>
            </motion.div>
          </motion.div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <motion.div
                className="divide-y rounded-lg border bg-white"
                variants={itemVariants}
              >
                <AnimatePresence>
                  {resumes.map((resume) => (
                    <motion.div
                      key={resume.resumeId}
                      className="flex gap-4 p-4 sm:p-6"
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                    >
                      <motion.div
                        className="relative size-20 shrink-0 overflow-hidden rounded-lg sm:size-24"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Image
                          src={resume.imageList[0].resumeImgPath}
                          alt={resume.title}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <h3 className="text-base font-medium sm:text-lg">
                              {resume.title}
                            </h3>
                            <p className="text-sm text-gray-500">
                              판매자: {resume.sellerNickname}
                            </p>
                          </div>
                          <p className="text-base font-bold sm:text-lg">
                            {resume.price.toLocaleString()} Point
                          </p>
                        </div>
                        <motion.button
                          onClick={() => removeResume(resume.resumeId)}
                          className="flex items-center gap-1 self-end text-red-500 hover:text-red-600"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <BsTrash className="size-4 sm:size-5" />
                          <span className="text-sm">삭제</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Summary */}
            <motion.div className="lg:col-span-1" variants={summaryVariants}>
              <motion.div
                className="rounded-lg border bg-white p-4 sm:p-6"
                initial={{ boxShadow: '0px 0px 0px rgba(0,0,0,0.1)' }}
                animate={{ boxShadow: '0px 4px 15px rgba(0,0,0,0.1)' }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-lg font-semibold sm:text-xl">주문 요약</h2>
                <div className="mt-4 space-y-3 sm:mt-6">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span>이력서 수</span>
                    <motion.span
                      key={resumes.length}
                      initial={{ scale: 1.2, color: '#4F46E5' }}
                      animate={{ scale: 1, color: '#000000' }}
                      transition={{ duration: 0.3 }}
                    >
                      {resumes.length}개
                    </motion.span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span>총 결제 포인트</span>
                    <motion.span
                      className="font-bold"
                      key={totalPrice}
                      initial={{ scale: 1.2, color: '#4F46E5' }}
                      animate={{ scale: 1, color: '#000000' }}
                      transition={{ duration: 0.3 }}
                    >
                      {totalPrice.toLocaleString()} Point
                    </motion.span>
                  </div>
                </div>
                <motion.div
                  className="mt-6"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    href="/order"
                    className="block w-full rounded-lg bg-main py-3 text-center text-white transition-colors hover:bg-hover"
                  >
                    결제하기
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
