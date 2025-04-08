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
      className="bg-white rounded-2xl shadow-lg ring-1 ring-black/5 p-6"
    >
      <h2 className="text-xl font-semibold mb-6 text-gray-900">결제 정보</h2>

      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-3">
            <BsCreditCard2Back className="text-xl text-blue-600" />
            <span className="text-gray-600">총 결제 금액</span>
          </div>
          <span className="text-lg font-semibold text-gray-900">
            {resumePrice.toLocaleString()} P
          </span>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-3">
            <BsCoin className="text-xl text-amber-500" />
            <span className="text-gray-600">보유 포인트</span>
          </div>
          <span className="text-lg font-semibold text-gray-900">
            {point.toLocaleString()} P
          </span>
        </div>

        <div className="h-px bg-gray-200 my-4" />

        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
          <span className="text-gray-900 font-medium">결제 후 잔여 포인트</span>
          <span
            className={`text-lg font-semibold ${canPurchase ? 'text-blue-600' : 'text-red-500'}`}
          >
            {(point - resumePrice).toLocaleString()} P
          </span>
        </div>

        {!canPurchase && (
          <div className="mt-4 p-4 bg-red-50 rounded-xl border border-red-100">
            <p className="text-red-600 text-sm">
              포인트가 부족합니다. 충전 후 다시 시도해 주세요.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
