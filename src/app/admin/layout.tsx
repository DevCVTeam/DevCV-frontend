import { ReactNode } from 'react';

export default function Layout({
  modal,
  children
}: {
  modal: ReactNode;
  children: ReactNode;
}) {
  return (
    <div>
      {children}
      {modal}
    </div>
  );
}
