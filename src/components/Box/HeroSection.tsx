import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-20 size-[300px] rounded-full bg-main/5 blur-3xl sm:size-[500px]" />
        <div className="absolute -bottom-20 -left-20 size-[300px] rounded-full bg-accent-2/5 blur-3xl sm:size-[500px]" />
        <div className="absolute left-1/2 top-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 sm:size-[800px]">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-[calc(100vh-4rem)] items-center gap-8 py-12 lg:grid-cols-2 lg:gap-12 lg:py-20">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl"
            >
              <span className="block">전문가급 이력서를</span>
              <span className="block text-main">몇 분 만에 작성하세요</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mx-auto mt-4 max-w-lg text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg lg:mx-0"
            >
              DevCV와 함께라면 누구나 쉽게 전문적인 이력서를 만들 수 있습니다.
              다양한 템플릿과 직무별 맞춤 가이드를 통해 여러분의 경력을 돋보이게
              해보세요.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start lg:gap-4"
            >
              <Link href="/builder" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full rounded-md bg-main px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-main/90 sm:px-8 sm:py-3 sm:text-base"
                >
                  이력서 작성하기
                </motion.button>
              </Link>
              <Link href="/templates" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full rounded-md border border-main bg-white px-6 py-2.5 text-sm font-semibold text-main shadow-sm hover:bg-gray-50 sm:px-8 sm:py-3 sm:text-base"
                >
                  템플릿 둘러보기
                </motion.button>
              </Link>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 flex items-center justify-center gap-3 sm:mt-12 lg:justify-start"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="relative size-6 overflow-hidden rounded-full border-2 border-white sm:size-8"
                  >
                    <Image
                      src={`/avatars/avatar${i}.jpg`}
                      alt={`User ${i}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-600 sm:text-sm">
                <span className="font-semibold text-gray-900">1,000+</span> 명의
                전문가들이 사용중
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto w-full max-w-sm lg:mx-0 lg:max-w-lg"
          >
            <div className="relative">
              <motion.div
                animate={{
                  y: [0, -10, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
                className="overflow-hidden rounded-2xl shadow-xl"
              >
                <Image
                  src="/resume-preview.png"
                  alt="Resume Preview"
                  width={500}
                  height={700}
                  className="w-full"
                  priority
                />
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                animate={{
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                className="absolute -right-8 -top-8 size-16 rounded-full bg-accent-1/30 blur-xl sm:size-24"
              />
              <motion.div
                animate={{
                  rotate: [360, 0]
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                className="absolute -bottom-8 -left-8 size-16 rounded-full bg-accent-2/30 blur-xl sm:size-24"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
