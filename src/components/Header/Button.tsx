'use client';

import { cn } from '@/utils/style';
import { ComponentPropsWithoutRef, FC } from 'react';

type ButtonProps = ComponentPropsWithoutRef<'button'>;

const Button: FC<ButtonProps> = ({ className, children, ...rest }) => {
  return (
    <button
      className={cn(
        'w-28 rounded-md bg-gray-200 py-2 text-black transition-all hover:bg-gray-400',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
