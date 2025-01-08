import { cn } from '@/utils/style';

export function Loader({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center justify-center gap-4', className)}>
      <div className="size-2 animate-ping rounded-full bg-gray-500" />
      <div className="size-2 animate-ping rounded-full bg-gray-500" />
      <div className="size-2 animate-ping rounded-full bg-gray-500" />
    </div>
  );
}

export function LoaderGrid({ className }: { className?: string }) {
  return (
    <div className="grid grid-cols-1 grid-rows-2 gap-4 transition-all sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {[...Array(10)].map((e, i) => (
        <div
          key={i}
          className={cn(
            'z-[0] max-h-[340px] min-h-[240px] max-w-[340px] animate-pulse rounded-md bg-gray-200 object-cover',
            className
          )}
        />
      ))}
    </div>
  );
}

export function FullPageLoader() {
  return (
    <div className="fixed inset-x-0 top-0 z-50 flex h-screen w-full flex-col justify-center bg-white">
      <div className="m-auto size-10 animate-spin rounded-full border-4 border-current border-t-transparent text-gray-400" />
    </div>
  );
}

export function PrimaryLoader({ className }: { className?: string }) {
  return (
    <div className="z-50 flex min-h-screen flex-col justify-center">
      <div className="flex items-center justify-center gap-5">
        <div className="size-2 animate-ping rounded-full bg-rose-600" />
        <div className="size-2 animate-ping rounded-full bg-rose-600" />
        <div className="size-2 animate-ping rounded-full bg-rose-600" />
      </div>
    </div>
  );
}
