import { getCheckout } from '@/utils/fetch';
import { authOptions } from '@/utils/next-auth';
import { getServerSession } from 'next-auth';
import OrderBox from './_components/OrderBox';
import PaymentBox from './_components/PaymentBox';
import PaymentButton from './_components/PaymentButton';
export default async function OrderPage({
  params: { resumeId }
}: {
  params: { resumeId: number };
}) {
  console.log(resumeId);
  const user = await getServerSession(authOptions);
  const payment = await getCheckout({
    resumeId,
    token: user?.user.accessToken!
  });

  console.log(payment);

  return (
    <div className="flex flex-col gap-8">
      <h4 className="text-2xl font-semibold text-sub">주문 결제</h4>
      <div className="flex gap-8">
        <OrderBox resumeResponse={payment.resumeResponse} />
        <PaymentBox
          resumePrice={payment.resumeResponse.price}
          point={payment?.myPoint!}
        />
      </div>
      <PaymentButton
        memberId={payment.memberResponse.memberId}
        price={payment.resumeResponse.price}
        resumeId={payment.resumeResponse.resumeId}
        token={user?.user.accessToken!}
      />
    </div>
  );
}
