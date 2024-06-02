'use client';

import { cn } from '@/utils/style';
import { ComponentPropsWithRef, forwardRef } from 'react';

type InputPorps = ComponentPropsWithRef<'input'>;

// 특정 document 에서 useRef를 많이 쓰는데 컴포넌트 별로 전달하는 것을 도움.
const Input = forwardRef<HTMLInputElement, InputPorps>(
  ({ className, ...rest }, ref) => {
    return (
      <input
        className={cn(
          'rounded-md border border-gray-300 p-2 transition-all hover:border-gray-400',
          className
        )}
        ref={ref}
        {...rest}
      />
    );
  }
);

export default Input;

Input.displayName = 'Input';
