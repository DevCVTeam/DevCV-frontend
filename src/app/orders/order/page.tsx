import Button from '@/components/Button';
import OrderBox from './_components/OrderBox';
import PaymentBox from './_components/PaymentBox';

const PaymentPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <h4 className="text-2xl font-semibold text-sub">주문 결제</h4>
      <div className="flex gap-8">
        <OrderBox />
        <PaymentBox />
      </div>
      <Button className="my-10 w-3/5 self-center">결제하기</Button>
    </div>
  );
};

export default PaymentPage;
