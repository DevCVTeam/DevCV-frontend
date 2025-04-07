'use client';

import { motion } from 'framer-motion';
import { FiMail } from 'react-icons/fi';

const ProductInquiry = ({ sellerEmail }: { sellerEmail: string }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg w-full text-center space-y-6"
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
          className="inline-flex items-center gap-2 px-6 py-3 bg-main text-black rounded-lg 
          hover:bg-hover transition-colors duration-200 font-medium shadow-sm hover:shadow-md"
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
