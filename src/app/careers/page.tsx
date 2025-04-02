import { Metadata } from 'next';
import CareersClient from './_components/CareersClient';

export const metadata: Metadata = {
  title: '채용 | DevCV',
  description: 'DevCV와 함께 성장할 수 있는 기회를 찾아보세요.'
};

export default async function CareersPage() {
  return <CareersClient />;
}
