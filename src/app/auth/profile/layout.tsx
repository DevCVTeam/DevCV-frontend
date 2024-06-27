import { ReactNode } from 'react';

export default function Layout({
  children,
  point,
  orderlist
}: {
  children: ReactNode;
  point: ReactNode;
  orderlist: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-12">
      <div>{children}</div>
      <hr />
      <div>{point}</div>
      <hr />
      <div>{orderlist}</div>
    </div>
  );
}
