import { Metadata } from 'next';
import InterviewDetailClient from '../_components/InterviewDetailClient';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // 실제로는 API나 데이터베이스에서 인터뷰 데이터를 가져와야 함
  const interview = sampleInterviewDetail;

  return {
    title: `${interview.name}님의 인터뷰 | DevCV`,
    description: interview.summary
  };
}

// 실제로는 API나 데이터베이스에서 가져와야 함
const sampleInterviewDetail = {
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
  },
  content: [
    {
      type: 'question' as const,
      text: '개발자가 되기로 결심하게 된 계기가 무엇인가요?'
    },
    {
      type: 'answer' as const,
      text: '어릴 때부터 컴퓨터를 좋아했고, 대학교에서 컴퓨터공학을 전공하면서 개발에 매료되었습니다. 특히 사용자들이 직접 경험하는 프론트엔드 개발에 큰 흥미를 느꼈고, 이를 통해 많은 사람들에게 가치를 전달할 수 있다는 점이 매력적이었습니다.'
    },
    {
      type: 'question' as const,
      text: '현재 회사에서 어떤 프로젝트를 진행하고 계신가요?'
    },
    {
      type: 'answer' as const,
      text: '네이버의 대규모 서비스 중 하나를 담당하고 있으며, 최근에는 서비스의 성능 최적화 프로젝트를 주도적으로 진행했습니다. 특히 초기 로딩 시간을 50% 이상 단축시키는 성과를 달성했습니다.'
    },
    {
      type: 'question' as const,
      text: '주니어 개발자들에게 해주고 싶은 조언이 있다면?'
    },
    {
      type: 'answer' as const,
      text: '기본기를 탄탄히 하는 것이 중요합니다. 새로운 프레임워크나 라이브러리를 배우는 것도 좋지만, JavaScript나 브라우저 동작 원리 같은 기본적인 지식을 깊이 있게 이해하는 것이 장기적으로 더 도움이 됩니다. 또한, 코드 리뷰를 적극적으로 받고, 피드백을 수용하는 자세도 중요합니다.'
    }
  ],
  relatedInterviews: [
    {
      id: '2',
      name: '이백엔드',
      role: 'Backend Team Lead',
      company: 'Kakao'
    },
    {
      id: '3',
      name: '박데브옵스',
      role: 'DevOps Engineer',
      company: 'Coupang'
    }
  ]
};

export default function InterviewDetailPage({ params }: Props) {
  return <InterviewDetailClient interview={sampleInterviewDetail} />;
}
