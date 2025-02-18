'use client';

import type { EventHandler, MouseEvent } from 'react';
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
      className="rounded-lg border border-blue-500 bg-blue-800 bg-opacity-50 hover:bg-opacity-75 transition-all duration-200"
    >
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
};

export default Pending;
