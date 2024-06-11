import Button from '@/components/Button';
import ProductsTable from '@/components/ProductTable';
import { MdOutlinePayment } from 'react-icons/md';
import PaymentTable from './_components/PaymentTable';

const PaymentPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <h3 className="mt-8 text-2xl font-semibold">결제 정보</h3>
      <ProductsTable />
      <hr className="w-full border" />
      <div className="flex flex-col gap-8">
        <h3 className="text-2xl font-semibold">결제</h3>
        <div className="flex h-20 w-32 flex-col items-start justify-start rounded-xl bg-black p-4 text-white">
          <MdOutlinePayment className="text-white" size={24} />
          <span>Point</span>
        </div>
      </div>
      <span className="text-xl font-semibold">18,000 Point</span>
      <div className="">
        <PaymentTable />
      </div>
      <Button className="my-12 w-1/4 self-center">결제하기</Button>
    </div>
  );
};

export default PaymentPage;
