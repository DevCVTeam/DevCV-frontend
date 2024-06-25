import { getMyPage } from '@/utils/fetch';
import { authOptions } from '@/utils/next-auth';
import { getServerSession } from 'next-auth';
import UserDetailsEditor from './_components/UserDetailsEditor';

// fetch 데이터가 공통적으로 사용해서 병렬라우팅 불가
export default async function ProfilePage() {
  const user = await getServerSession(authOptions);
  const data = await getMyPage({
    memberId: user?.user.memberId!,
    token: user?.user.id!
  });

  return <UserDetailsEditor {...data} />;
}
