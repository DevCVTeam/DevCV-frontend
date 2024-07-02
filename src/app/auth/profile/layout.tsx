import { ReactNode } from 'react';

export default function Layout({
  children,
  point,
  orderlist,
  modal
}: {
  children: ReactNode;
  point: ReactNode;
  orderlist: ReactNode;
  modal: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-12">
      {modal}
      <div>{children}</div>
      <hr />
      <div>{point}</div>
      <hr />
      <div>{orderlist}</div>
    </div>
  );
}
