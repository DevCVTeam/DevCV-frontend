const PaymentTable = () => {
  return (
    <div className="flex w-96 flex-col justify-between gap-6 rounded-2xl border bg-subgray p-6 text-xl">
      <div className="flex gap-8">
        <span>현재 포인트</span>
        <span className="font-semibold">18,000</span>
        <span className="self-end">포인트</span>
      </div>
      <div className="flex gap-8 text-nowrap">
        <span>결제 포인트</span>
        <span className="font-semibold">- 16,000</span>
        <span className="self-end">포인트</span>
      </div>
      <hr className="bg-default" />
      <div className="flex justify-start gap-8">
        <span>잔여 포인트</span>
        <span className="font-semibold">18,000</span>
        <span className="self-end">포인트</span>
      </div>
    </div>
  );
};

export default PaymentTable;
