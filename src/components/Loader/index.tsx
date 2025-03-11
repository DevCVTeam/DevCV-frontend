'use client';

import { cn } from '@/utils/style';
import { motion } from 'framer-motion';

export function Loader({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center justify-center gap-4', className)}>
      <motion.div
        className="size-2 rounded-full bg-gray-500"
        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
        transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="size-2 rounded-full bg-gray-500"
        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: 0.2,
          ease: 'easeInOut'
        }}
      />
      <motion.div
        className="size-2 rounded-full bg-gray-500"
        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: 0.4,
          ease: 'easeInOut'
        }}
      />
    </div>
  );
}

export function LoaderGrid({ className }: { className?: string }) {
  return (
    <div className="grid grid-cols-1 grid-rows-2 gap-4 transition-all sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className={cn(
            'z-[0] max-h-[340px] min-h-[240px] max-w-[340px] rounded-md bg-gray-200 object-cover',
            className
          )}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.1
          }}
        />
      ))}
    </div>
  );
}
export function FullPageLoader() {
  return (
    <div className="fixed inset-x-0 top-0 z-50 flex h-screen w-full flex-col justify-center bg-white">
      <motion.div
        className="m-auto size-10 rounded-full border-4 border-current border-t-transparent text-gray-400"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      <motion.p
        className="mt-4 text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        로딩 중...
      </motion.p>
    </div>
  );
}

export function PrimaryLoader({ className }: { className?: string }) {
  return (
    <div className="z-50 flex min-h-screen flex-col justify-center">
      <div className="flex items-center justify-center gap-5">
        <motion.div
          className="size-2 rounded-full bg-rose-600"
          animate={{ y: [0, -10, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="size-2 rounded-full bg-rose-600"
          animate={{ y: [0, -10, 0], scale: [1, 1.2, 1] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: 0.2,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className="size-2 rounded-full bg-rose-600"
          animate={{ y: [0, -10, 0], scale: [1, 1.2, 1] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: 0.4,
            ease: 'easeInOut'
          }}
        />
      </div>
    </div>
  );
}
