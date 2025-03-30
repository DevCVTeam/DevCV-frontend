'use client';

import { cn } from '@/utils/style';
import { HTMLMotionProps, motion, Variants } from 'framer-motion';
import { FC } from 'react';

type ButtonProps = Omit<HTMLMotionProps<'button'>, 'ref'> & {
  variants: Variants;
};

const Button: FC<ButtonProps> = ({
  className,
  children,
  variants,
  ...rest
}) => {
  return (
    <motion.button
      variants={variants}
      whileHover="hover"
      whileTap="tap"
      className={cn(
        'w-28 rounded-md bg-gray-200 py-2 text-black transition-all hover:bg-gray-400',
        className
      )}
      {...rest}
    >
      {children}
    </motion.button>
  );
};

export default Button;
