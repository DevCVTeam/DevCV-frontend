import { Metadata } from 'next';
import InterviewsClient from './_components/InterviewsClient';

export const metadata: Metadata = {
  title: '기술 면접 가이드 | DevCV',
  description:
    '프론트엔드, 백엔드, 데이터베이스 등 다양한 기술 면접 질문과 모범 답안을 제공합니다.'
};

export default async function InterviewsPage() {
  return <InterviewsClient />;
}
