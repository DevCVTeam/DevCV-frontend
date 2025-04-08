'use client';

import { motion } from 'framer-motion';
import { BsShieldCheck } from 'react-icons/bs';

interface PaymentButtonProps {
  price: number;
  token: string;
  onBulkPayment: () => Promise<void>;
}

export default function PaymentButton({
  price,
  token,
  onBulkPayment
}: PaymentButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg ring-1 ring-black/5 p-6"
    >
      <div className="flex items-center gap-2 mb-4 text-gray-600">
        <BsShieldCheck className="text-green-500" />
        <span className="text-sm">
          안전한 결제를 위해 SSL 암호화를 사용합니다.
        </span>
      </div>

      <button
        onClick={onBulkPayment}
        className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl
          font-medium text-lg transition-all duration-300 transform
          hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:shadow-blue-500/25
          hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
      >
        {price.toLocaleString()}P 결제하기
      </button>

      <p className="mt-4 text-xs text-center text-gray-500">
        결제 버튼을 클릭하면 결제가 진행되며, 결제 완료 후 프로필 페이지로
        이동합니다.
      </p>
    </motion.div>
  );
}
