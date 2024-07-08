import { ReactNode } from 'react';

export default function Layout({
  children,
  point,
  orderlist,
  saleslist,
  orderModal,
  salesModal
}: {
  children: ReactNode;
  point: ReactNode;
  orderlist: ReactNode;
  saleslist: ReactNode;
  orderModal: ReactNode;
  salesModal: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-12">
      <div>{children}</div>
      <hr />
      <div>{point}</div>
      <hr />
      <div>
        {orderModal}
        {orderlist}
      </div>
      <hr />
      <div>
        {salesModal}
        {saleslist}
      </div>
    </div>
  );
}
