import { getUserInfo } from '@/utils/fetch';
import { authOptions } from '@/utils/next-auth';
import { getServerSession } from 'next-auth';
import UserDetailsEditor from './_components/UserDetailsEditor';

// API 를 분리예정이므로 병렬라우팅 작업 예정
export default async function ProfilePage() {
  const user = await getServerSession(authOptions);
  const data = await getUserInfo({
    memberId: user?.user.memberId!,
    token: user?.user.accessToken!
  });
  return <UserDetailsEditor {...data} />;
}
