import { cx } from 'class-variance-authority';
import type { ClassValue } from 'class-variance-authority/types';
import { twMerge } from 'tailwind-merge';

export * from 'class-variance-authority';

export type * from 'class-variance-authority';

// 중복되는 클래스명 방지하는 유틸함수 작성
export const cn = (...args: ClassValue[]) => twMerge(cx(args));
