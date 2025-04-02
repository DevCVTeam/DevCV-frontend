import { Metadata } from 'next';
import JobsClient from './_components/JobsClient';

export const metadata: Metadata = {
  title: '채용 정보 | DevCV',
  description: '개발자를 위한 채용 정보를 확인하세요.'
};

export default async function JobsPage() {
  return <JobsClient />;
}
