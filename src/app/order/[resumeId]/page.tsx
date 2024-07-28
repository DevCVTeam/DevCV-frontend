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
  const user = await getServerSession(authOptions);
  const payment = await getCheckout({
    resumeId,
    token: user?.user.accessToken!
  });

  return (
    <div className="flex flex-col gap-8">
      <h4 className="text-2xl font-semibold text-sub">주문 결제</h4>
      <div className="flex gap-8">
        <OrderBox resumeResponse={payment.resumeResponse} />
        <PaymentBox
          resumePrice={payment.resumeResponse.price}
          point={payment?.memberResponse.point!}
        />
      </div>
      <PaymentButton
        memberId={payment.memberResponse.memberId}
        price={payment.resumeResponse.price}
        resumeId={resumeId}
        token={user?.user.accessToken!}
      />
    </div>
  );
}
