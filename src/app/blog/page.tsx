import { Metadata } from 'next';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
  title: '블로그 | DevCV',
  description: 'DevCV의 최신 소식과 이력서 작성 팁을 확인해보세요.'
};

export default function BlogPage() {
  return <BlogClient />;
}
