import Button from '@/components/Button';
import Link from 'next/link';
import { IoCard } from 'react-icons/io5';

const PaymentBox = () => {
  return (
    <div className="flex w-2/5 flex-col justify-between gap-6 rounded-2xl border bg-subgray p-8 text-xl">
      <h3 className="font-semibold text-sub">결제</h3>
      <IoCard size={100} />
      <div className="flex items-center justify-between gap-8">
        <span className="">포인트</span>
        <span className="font-semibold">18,000</span>
        <Button type="button">
          <Link href="/event">포인트 쌓기</Link>
        </Button>
      </div>
      <hr className="bg-default" />
      <div className="flex items-center justify-between gap-8">
        <span className="">현재 포인트</span>
        <span className="font-semibold">18,000</span>
        <span>포인트</span>
      </div>
      <div className="flex justify-between gap-8 text-nowrap ">
        <span>결제 포인트</span>
        <span className="font-semibold">- 16,000</span>
        <span>포인트</span>
      </div>
      <hr className="bg-default" />
      <div className="flex justify-between gap-8">
        <span>잔여 포인트</span>
        <span className="font-semibold text-sub">18,000</span>
        <span>포인트</span>
      </div>
    </div>
  );
};

export default PaymentBox;
