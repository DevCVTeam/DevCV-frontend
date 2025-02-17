'use client';

import Button from '@/components/Button';
import { useRouter } from 'next/navigation';

const PaymentButton = ({
  resumeId,
  price,
  token,
  onBulkPayment,
  handlePayment
}: {
  resumeId?: number;
  price: number;
  token: string;
  onBulkPayment?: () => void;
  handlePayment?: () => void;
}) => {
  const router = useRouter();

  return (
    <div>
      <Button className="my-10 w-full self-center" onClick={onBulkPayment}>
        결제하기
      </Button>
    </div>
  );
};

export default PaymentButton;
