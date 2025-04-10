'use client';

import { motion } from 'framer-motion';
import { FiMail } from 'react-icons/fi';

const ProductInquiry = ({ sellerEmail }: { sellerEmail: string }) => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg space-y-6 text-center"
      >
        <h3 className="text-2xl font-semibold text-gray-900">상품 문의하기</h3>
        <p className="text-gray-600">
          상품에 대해 궁금한 점이 있으신가요?
          <br />
          판매자에게 직접 문의해보세요.
        </p>
        <motion.a
          href={`mailto:${sellerEmail}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 rounded-lg bg-main px-6 py-3 font-medium 
          text-black shadow-sm transition-colors duration-200 hover:bg-hover hover:shadow-md"
        >
          <FiMail className="text-xl" />
          <span>이메일로 문의하기</span>
        </motion.a>
        <p className="text-sm text-gray-500">문의 이메일: {sellerEmail}</p>
      </motion.div>
    </div>
  );
};

export default ProductInquiry;
