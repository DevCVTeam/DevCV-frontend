import { Metadata } from 'next';
import RoadmapClient from './_components/RoadmapClient';

export const metadata: Metadata = {
  title: '개발자 로드맵 | DevCV',
  description: '프론트엔드와 백엔드 개발자를 위한 학습 로드맵입니다.'
};

export default async function RoadmapPage() {
  return <RoadmapClient />;
}
