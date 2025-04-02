import { Metadata } from 'next';
import GuideClient from './_components/GuideClient';

export const metadata: Metadata = {
  title: '이용 가이드 | DevCV',
  description: 'DevCV 서비스 이용 가이드와 자주 묻는 질문을 확인하세요.'
};

export default async function GuidePage() {
  return <GuideClient />;
}
