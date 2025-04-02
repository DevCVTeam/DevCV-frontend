import { Metadata } from 'next';
import AboutClient from './_components/AboutClient';

export const metadata: Metadata = {
  title: '회사 소개 | DevCV',
  description: 'DevCV는 개발자들의 이력서 공유 플랫폼입니다.'
};

export default async function AboutPage() {
  return <AboutClient />;
}
