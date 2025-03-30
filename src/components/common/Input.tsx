// components/Input.tsx

import { cn } from '@/utils/style';
import { ComponentPropsWithRef, forwardRef } from 'react';

type InputProps = ComponentPropsWithRef<'input'>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, id, ...rest }, ref) => {
    return (
      <input
        id={id}
        className={cn(
          'h-12 rounded-md border border-gray-300 bg-subgray p-2 transition-all focus:bg-white',
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
