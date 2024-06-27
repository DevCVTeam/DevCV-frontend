import Button from '@/components/Button';
import Link from 'next/link';

const Point = ({ mypoint }: { mypoint: number }) => {
  return (
    <div>
      <div className="self-start">
        <h3 className="text-2xl font-semibold text-sub">포인트</h3>
        <span className="text-2xl font-semibold">
          포인트 {mypoint.toLocaleString()}
        </span>
        <span className="text-sm"> point</span>
        <Link href="/event">
          <Button className="m-4 self-center">이벤트 이동</Button>
        </Link>
      </div>
    </div>
  );
};

export default Point;
