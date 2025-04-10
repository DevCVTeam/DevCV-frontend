'use client';

import { motion } from 'framer-motion';
import { BsCoin, BsCreditCard2Back } from 'react-icons/bs';

interface PaymentBoxProps {
  resumePrice: number;
  point: number;
}

export default function PaymentBox({ resumePrice, point }: PaymentBoxProps) {
  const canPurchase = point >= resumePrice;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-black/5"
    >
      <h2 className="mb-6 text-xl font-semibold text-gray-900">결제 정보</h2>

      <div className="space-y-6">
        <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
          <div className="flex items-center gap-3">
            <BsCreditCard2Back className="text-xl text-blue-600" />
            <span className="text-gray-600">총 결제 금액</span>
          </div>
          <span className="text-lg font-semibold text-gray-900">
            {resumePrice.toLocaleString()} P
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
          <div className="flex items-center gap-3">
            <BsCoin className="text-xl text-amber-500" />
            <span className="text-gray-600">보유 포인트</span>
          </div>
          <span className="text-lg font-semibold text-gray-900">
            {point.toLocaleString()} P
          </span>
        </div>

        <div className="my-4 h-px bg-gray-200" />

        <div className="flex items-center justify-between rounded-xl bg-blue-50 p-4">
          <span className="font-medium text-gray-900">결제 후 잔여 포인트</span>
          <span
            className={`text-lg font-semibold ${canPurchase ? 'text-blue-600' : 'text-red-500'}`}
          >
            {(point - resumePrice).toLocaleString()} P
          </span>
        </div>

        {!canPurchase && (
          <div className="mt-4 rounded-xl border border-red-100 bg-red-50 p-4">
            <p className="text-sm text-red-600">
              포인트가 부족합니다. 충전 후 다시 시도해 주세요.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
