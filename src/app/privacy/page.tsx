import { Metadata } from 'next';
import PrivacyClient from './_components/PrivacyClient';

export const metadata: Metadata = {
  title: '개인정보처리방침 | DevCV',
  description: 'DevCV의 개인정보처리방침을 확인하세요.'
};

export default async function PrivacyPage() {
  return <PrivacyClient />;
}
