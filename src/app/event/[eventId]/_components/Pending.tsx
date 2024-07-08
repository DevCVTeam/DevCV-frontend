'use client';

import { EventHandler, MouseEvent } from 'react';
import Lottie from 'react-lottie';
import animationdata from '../../../../../public/pending.json';
type MouseEventHandler<T = Element> = EventHandler<MouseEvent<T>>;

const Pending = ({
  onClick
}: {
  onClick: MouseEventHandler<HTMLDivElement>;
}) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationdata,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div
      onClick={onClick}
      className="rounded-lg border bg-slate-100 hover:bg-slate-300"
    >
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
};

export default Pending;
