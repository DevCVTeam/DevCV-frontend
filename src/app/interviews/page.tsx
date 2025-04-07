import { Metadata } from 'next';
import InterviewsClient from './_components/InterviewsClient';

export const metadata: Metadata = {
  title: '기술 면접 가이드 | DevCV',
  description:
    '프론트엔드, 백엔드, 데이터베이스 등 다양한 기술 면접 질문과 모범 답안을 제공합니다.'
};

// Sample interview data (실제로는 API나 데이터베이스에서 가져와야 함)
const sampleInterviews = [
  {
    id: '1',
    name: '김개발',
    role: 'Senior Frontend Developer',
    company: 'Naver',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7',
    summary:
      '10년차 프론트엔드 개발자로서 대규모 서비스의 성능 최적화와 사용자 경험 개선에 대한 경험을 공유합니다.',
    date: '2024-04-07',
    tags: ['React', 'Next.js', 'Performance', 'UX'],
    links: {
      github: 'https://github.com/kimdev',
      linkedin: 'https://linkedin.com/in/kimdev'
    }
  },
  {
    id: '2',
    name: '이백엔드',
    role: 'Backend Team Lead',
    company: 'Kakao',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    summary:
      '카카오의 대용량 트래픽 처리 시스템 설계와 운영 경험, 그리고 팀 리드로서의 성장 과정을 이야기합니다.',
    date: '2024-04-06',
    tags: ['Spring', 'MSA', 'Leadership', 'System Design'],
    links: {
      github: 'https://github.com/leebackend'
    }
  },
  {
    id: '3',
    name: '박데브옵스',
    role: 'DevOps Engineer',
    company: 'Coupang',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    summary:
      '쿠팡의 대규모 인프라 운영 경험과 CI/CD 파이프라인 최적화, 클라우드 마이그레이션 프로젝트에 대해 공유합니다.',
    date: '2024-04-05',
    tags: ['AWS', 'Kubernetes', 'DevOps', 'Cloud'],
    links: {
      github: 'https://github.com/parkdevops',
      linkedin: 'https://linkedin.com/in/parkdevops'
    }
  },
  {
    id: '4',
    name: '최AI',
    role: 'AI Research Engineer',
    company: 'SK AI',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    summary:
      '실시간 자연어 처리 시스템 개발과 대규모 언어 모델 최적화 경험을 공유하며, AI 엔지니어로서의 커리어 패스를 소개합니다.',
    date: '2024-04-04',
    tags: ['AI', 'Machine Learning', 'NLP', 'Python'],
    links: {
      github: 'https://github.com/choiai'
    }
  }
];

export default async function InterviewsPage() {
  return <InterviewsClient interviews={sampleInterviews} />;
}
