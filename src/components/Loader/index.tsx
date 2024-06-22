import { cn } from '@/utils/style';

export function Loader({ className }: { className?: string }) {
  return (
    <div className={cn('flex justify-center gap-4', className)}>
      <div className="size-2 animate-ping rounded-full bg-gray-500" />
      <div className="size-2 animate-ping rounded-full bg-gray-500" />
      <div className="size-2 animate-ping rounded-full bg-gray-500" />
    </div>
  );
}

export function LoaderGrid({ className }: { className?: string }) {
  return (
    <>
      {[...Array(12)].map((e, i) => (
        <div
          key={i}
          className={cn(
            'z-[0] h-72 w-full animate-pulse rounded-md bg-gray-100 object-cover md:h-64',
            className
          )}
        />
      ))}
    </>
  );
}

export function FullPageLoader() {
  return (
    <div className="fixed inset-x-0 top-0 z-50 flex h-screen w-full flex-col justify-center bg-black/60">
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
