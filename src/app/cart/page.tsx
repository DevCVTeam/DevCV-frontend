'use client';

import { useCartStore } from '@/store/useCartStore';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { BsTrash } from 'react-icons/bs';

export default function CartPage() {
  const { resumes, removeResume, getTotalPrice } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);

  const totalPrice = getTotalPrice();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-main"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto min-h-[calc(100vh-80px)] px-4 py-6 sm:px-6 lg:px-8 xl:px-0">
      <div className="mx-auto max-w-screen-xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold sm:text-3xl">장바구니</h1>
          <span className="text-sm text-gray-500 sm:text-base">
            총 {resumes.length}개의 이력서
          </span>
        </div>

        {resumes.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed py-12 sm:py-16">
            <p className="mb-4 text-lg text-gray-500">
              장바구니가 비어있습니다
            </p>
            <Link
              href="/"
              className="rounded-lg bg-main px-6 py-2.5 text-white hover:bg-hover transition-colors"
            >
              이력서 구경하기
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="divide-y rounded-lg border bg-white">
                {resumes.map((resume) => (
                  <div key={resume.resumeId} className="flex gap-4 p-4 sm:p-6">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg sm:h-24 sm:w-24">
                      <Image
                        src={resume.imageList[0].resumeImgPath}
                        alt={resume.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
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
                      <button
                        onClick={() => removeResume(resume.resumeId)}
                        className="self-end flex items-center gap-1 text-red-500 hover:text-red-600"
                      >
                        <BsTrash className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span className="text-sm">삭제</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="flex flex-col gap-4 lg:col-span-1">
              <div className="rounded-lg border bg-white p-4 sm:p-6">
                <h2 className="text-lg font-semibold sm:text-xl">주문 요약</h2>
                <div className="mt-4 space-y-3 sm:mt-6">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span>이력서 수</span>
                    <span>{resumes.length}개</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span>총 결제 포인트</span>
                    <span className="font-bold">
                      {totalPrice.toLocaleString()} Point
                    </span>
                  </div>
                </div>
              </div>
              <Link
                href="/order"
                className="w-full rounded-lg bg-main py-3 text-slate-600 text-center hover:bg-hover transition-colors"
              >
                결제하기
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
