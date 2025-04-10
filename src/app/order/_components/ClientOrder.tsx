'use client';

import { useCartStore } from '@/store/useCartStore';
import { motion } from 'framer-motion';
import { type Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BsArrowLeft } from 'react-icons/bs';
import OrderBox from './OrderBox';
import PaymentBox from './PaymentBox';
import PaymentButton from './PaymentButton';

interface ClientOrderProps {
  user: Session['user'];
  userPoint: { point: number };
}

export default function ClientOrder({ user, userPoint }: ClientOrderProps) {
  const router = useRouter();
  const { getOrderItems, getTotalPrice, setDirectPurchaseItem } =
    useCartStore();
  const [isLoading, setIsLoading] = useState(true);
  const orderItems = getOrderItems();
  const totalPrice = getTotalPrice();

  useEffect(() => {
    // 클라이언트 사이드에서만 실행되는 초기화 로직
    setIsLoading(false);

    return () => {
      setDirectPurchaseItem(null);
    };
  }, [setDirectPurchaseItem]);

  // 로딩 중에는 아무것도 표시하지 않음
  if (isLoading) {
    return null;
  }

  // 장바구니가 비어있으면 리다이렉트
  if (orderItems.length === 0) {
    router.push('/resume');
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50"
    >
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900"
          >
            <BsArrowLeft className="text-xl" />
            <span>뒤로가기</span>
          </button>
          <h1 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-3xl font-bold text-transparent">
            주문/결제
          </h1>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          <motion.div
            variants={itemVariants}
            className="w-full space-y-6 lg:w-2/3"
          >
            <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-black/5">
              <h2 className="mb-6 text-xl font-semibold text-gray-900">
                주문 상품 ({orderItems.length}개)
              </h2>
              <div className="space-y-4">
                {orderItems.map((resume) => (
                  <OrderBox key={resume.resumeId} resume={resume} />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="w-full space-y-6 lg:sticky lg:top-8 lg:w-1/3"
          >
            <PaymentBox resumePrice={totalPrice} point={userPoint.point} />
            <PaymentButton
              price={totalPrice}
              token={user.accessToken}
              onBulkPayment={async () => {
                try {
                  await handleBulkPayment(orderItems, user, router);
                  toast.success('결제가 완료되었습니다.');
                } catch (error) {
                  toast.error(
                    error instanceof Error
                      ? error.message
                      : '결제 처리 중 오류가 발생했습니다.'
                  );
                }
              }}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

async function handleBulkPayment(
  orderItems: any[],
  user: Session['user'],
  router: any
) {
  const res = await fetch('/server/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.accessToken}`
    },
    body: JSON.stringify({
      resumeCount: orderItems.length,
      totalPrice: orderItems.reduce((sum, item) => sum + item.price, 0),
      cartList: orderItems.map((resume) => ({
        resumeId: resume.resumeId,
        price: resume.price
      }))
    })
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || '결제 처리 중 오류가 발생했습니다.');
  }

  router.push('/auth/profile');
}
