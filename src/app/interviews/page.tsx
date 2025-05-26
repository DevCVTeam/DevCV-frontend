import { EventCategory } from '@/utils/type';
import { Metadata } from 'next';
import InterviewsClient from './_components/InterviewsClient';

export const metadata: Metadata = {
  title: '기술 면접 가이드 | DevCV',
  description:
    '프론트엔드, 백엔드, 데이터베이스 등 다양한 기술 면접 질문과 모범 답안을 제공합니다.'
};

// 이벤트 인터뷰 데이터 가져오기 함수
async function getEventInterviews() {
  try {
    // 실제로는 API 호출
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events/interviews`, {
    //   headers: {
    //     Cookie: cookies().toString()
    //   },
    //   cache: 'no-store'
    // });
    // if (!res.ok) throw new Error('이벤트 인터뷰 데이터를 불러오는 중 오류가 발생했습니다.');
    // const data = await res.json();
    // return data.interviews;

    // 임시 데이터
    return [
      {
        id: '5',
        name: '장인터뷰',
        role: 'Spring 백엔드 개발자',
        company: 'DevCV',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a',
        summary:
          'Spring 백엔드 개발자로서 MSA 아키텍처 설계와 구현 경험, 대용량 트래픽 처리 방법에 대해 공유합니다.',
        date: '2024-05-22',
        tags: ['Spring', 'MSA', 'Backend', 'JPA'],
        links: {
          github: 'https://github.com/janginterview'
        },
        isEventInterview: true,
        eventCategory: 'INTERVIEW' as EventCategory
      },
      {
        id: '6',
        name: '김코딩',
        role: 'DevOps 엔지니어',
        company: 'CodeLab',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
        summary:
          'CI/CD 파이프라인 구축 및 컨테이너화 경험, Kubernetes 클러스터 운영 노하우를 전달합니다.',
        date: '2024-05-18',
        tags: ['Docker', 'Kubernetes', 'DevOps', 'CI/CD'],
        links: {
          github: 'https://github.com/kimcoding',
          linkedin: 'https://linkedin.com/in/kimcoding'
        },
        isEventInterview: true,
        eventCategory: 'INTERVIEW' as EventCategory
      }
    ];
  } catch (error) {
    console.error('이벤트 인터뷰 데이터 로드 오류:', error);
    return [];
  }
}

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
  // 이벤트 인터뷰와 일반 인터뷰 데이터 결합
  const eventInterviews = await getEventInterviews();
  const combinedInterviews = [...eventInterviews, ...sampleInterviews];

  // 날짜 순으로 정렬 (최신 인터뷰가 먼저 나오도록)
  combinedInterviews.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return <InterviewsClient interviews={combinedInterviews} />;
}
