import { Metadata } from 'next';
import TechBlogClient from './_components/TechBlogClient';

export const metadata: Metadata = {
  title: '기술 블로그 | DevCV',
  description: '개발자들을 위한 기술 블로그입니다.'
};

export default async function TechBlogPage() {
  return <TechBlogClient />;
}
