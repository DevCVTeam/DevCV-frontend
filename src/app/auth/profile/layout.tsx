import { ReactNode } from 'react';

export default function Layout({
  children,
  point,
  orderlist,
  saleslist,
  modal
}: {
  children: ReactNode;
  point: ReactNode;
  orderlist: ReactNode;
  saleslist: ReactNode;
  modal: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-12">
      <div>{children}</div>
      <hr />
      <div>{point}</div>
      <hr />
      <div>{orderlist}</div>
      {modal}
      <hr />
      <div>{saleslist}</div>
    </div>
  );
}
