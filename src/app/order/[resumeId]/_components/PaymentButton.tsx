'use client';

import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const PaymentButton = ({
  memberId,
  resumeId,
  price,
  token
}: {
  memberId: number;
  resumeId: number;
  price: number;
  token: string;
}) => {
  console.log(token);
  const router = useRouter();
  const handlePayment = async () => {
    const res = await fetch(`/server/orders`, {
      method: 'POST',
      body: JSON.stringify({
        resumeCount: 1,
        totalPrice: price,
        cartList: [
          {
            resumeId,
            price
          }
        ]
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    if (!res.ok) {
      const data = await res.json();
      toast.error(data.message);
      return router.push('/');
    }

    toast.success('성공했습니다.');
    return router.push('/auth/profile');
  };
  return (
    <div>
      <Button className="my-10 w-full self-center" onClick={handlePayment}>
        결제하기
      </Button>
    </div>
  );
};

export default PaymentButton;
