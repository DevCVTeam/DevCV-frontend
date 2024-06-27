'use client';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col justify-center text-center">
      <div>
        <h2 className="text-2xl font-semibold text-rose-700">
          Error.tsx Page!
        </h2>
        <p className="mt-4 font-semibold text-gray-500">
          해당 페이지를 가져오던 중 문제가 생겼습니다.
        </p>
        <p className="mt-2 text-sm text-gray-500">{error?.message}</p>
        <div className="mt-8">
          <button
            onClick={() => reset()}
            className="rounded-md bg-rose-700 px-2.5 py-1.5 text-sm text-white"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
