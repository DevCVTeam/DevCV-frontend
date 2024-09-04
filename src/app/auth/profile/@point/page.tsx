import { getPoint } from '@/utils/fetch';
import { authOptions } from '@/utils/next-auth';
import { getServerSession } from 'next-auth';
import Point from './_components/Point';
export default async function PointPage() {
  const data = await getServerSession(authOptions);
  const point = await getPoint({
    memberId: data?.user.memberId!,
    token: data?.user.accessToken!
  });
  return <Point mypoint={point?.point!} />;
}
