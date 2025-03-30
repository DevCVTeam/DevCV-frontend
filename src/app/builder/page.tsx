import { Metadata } from 'next';
import BuilderClient from './BuilderClient';

export const metadata: Metadata = {
  title: '이력서 작성 | DevCV',
  description: '몇 분 만에 전문가급 이력서를 작성해보세요.'
};

export default async function BuilderPage() {
  return <BuilderClient />;
}
