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
      <div className="mt-10 rounded-3xl border border-slate-300 p-4 shadow-lg transition-all duration-300 hover:shadow-2xl">
        {children}
      </div>
      <hr />
      <div className="mt-10 rounded-3xl border border-slate-300 p-4 shadow-lg transition-all duration-300 hover:shadow-2xl">
        {point}
      </div>
      <hr />
      <div className="mt-10 rounded-3xl border border-slate-300 p-4 shadow-lg transition-all duration-300 hover:shadow-2xl">
        {orderlist}
      </div>
      {modal}
      <hr />
      <div className="mt-10 rounded-3xl border border-slate-300 p-4 shadow-lg transition-all duration-300 hover:shadow-2xl">
        {saleslist}
      </div>
    </div>
  );
}
