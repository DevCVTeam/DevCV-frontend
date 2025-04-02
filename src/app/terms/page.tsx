import { Metadata } from 'next';
import TermsClient from './_components/TermsClient';

export const metadata: Metadata = {
  title: '이용약관 | DevCV',
  description: 'DevCV 서비스 이용약관입니다.'
};

export default async function TermsPage() {
  return <TermsClient />;
}
