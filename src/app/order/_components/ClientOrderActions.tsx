'use client';

import { useCartStore } from '@/store/useCartStore';
import { type Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import OrderBox from './OrderBox';
import PaymentBox from './PaymentBox';
import PaymentButton from './PaymentButton';

interface ClientOrderActionsProps {
  user: Session['user'];
  userPoint: { point: number };
}

const ClientOrderActions = ({ user, userPoint }: ClientOrderActionsProps) => {
  const { getOrderItems, getTotalPrice } = useCartStore();
  const orderItems = getOrderItems();
  const totalPrice = getTotalPrice();
  const router = useRouter();

  const handleBulkPayment = async () => {
    const res = await fetch(`/server/orders`, {
      method: 'POST',
      body: JSON.stringify({
        resumeCount: orderItems.length,
        totalPrice: totalPrice,
        cartList: orderItems.map((resume) => ({
          resumeId: resume.resumeId,
          price: resume.price
        }))
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.accessToken}`
      }
    });

    if (!res.ok) {
      const data = await res.json();
      toast.error(data.message);
      return;
    }

    toast.success('결제가 성공적으로 완료되었습니다.');
    router.push('/auth/profile');
  };

  return (
    <div>
      <div className="flex justify-around gap-4">
        <div className="flex gap-4 flex-col w-3/5">
          {orderItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center w-full h-64 text-gray-500">
              <p>결제할 상품이 없습니다.</p>
              <button
                onClick={() => router.push('/resume')}
                className="mt-4 text-blue-500"
              >
                이력서 구경하기
              </button>
            </div>
          ) : (
            orderItems.map((resume) => (
              <OrderBox key={resume.resumeId} resume={resume} />
            ))
          )}
        </div>
        <PaymentBox resumePrice={totalPrice} point={userPoint.point || 0} />
      </div>
      <PaymentButton
        price={totalPrice}
        token={user.accessToken}
        onBulkPayment={handleBulkPayment}
      />
    </div>
  );
};

export default ClientOrderActions;
