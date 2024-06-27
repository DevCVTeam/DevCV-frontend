'use client';

import { cn } from '@/utils/style';
import { ComponentPropsWithoutRef, FC } from 'react';

type ButtonProps = ComponentPropsWithoutRef<'button'>;

const Button: FC<ButtonProps> = ({ className, children, ...rest }) => {
  return (
    <button
      className={cn(
        'h-12 w-40 rounded-md bg-main py-2 text-black transition-all hover:bg-[#71d671]',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
