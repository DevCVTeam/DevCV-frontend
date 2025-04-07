import { getResumeId } from '@/utils/fetch';
import { MetadataRoute } from 'next';

// URL 타입 정의
type SitemapURL = {
  url: string;
  lastModified: Date;
  changeFrequency:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';
  priority: number;
};

// 기본 URL 설정
const BASE_URL = 'https://devcv.net';

// URL 생성 헬퍼 함수
const createURL = (
  path: string,
  priority: number,
  changeFrequency: SitemapURL['changeFrequency'],
  lastModified: Date = new Date()
): SitemapURL => ({
  url: `${BASE_URL}${path}`,
  lastModified,
  changeFrequency,
  priority
});

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 핵심 페이지 (Core Pages)
  const coreSitemap: SitemapURL[] = [
    createURL('', 1.0, 'daily'), // 홈페이지
    createURL('/resume/explore', 0.9, 'daily'), // 이력서 탐색
    createURL('/templates', 0.9, 'weekly') // 이력서 템플릿
  ];

  // 문서 페이지 (Documentation)
  const docsSitemap: SitemapURL[] = [
    createURL('/docs', 0.8, 'weekly'),
    createURL('/docs/getting-started', 0.8, 'weekly'),
    createURL('/docs/user-guide', 0.8, 'weekly'),
    createURL('/docs/api', 0.8, 'weekly'),
    createURL('/docs/contributing', 0.8, 'weekly'),
    createURL('/docs/faq', 0.8, 'weekly')
  ];

  // 사용자 관련 페이지 (User Related)
  const userSitemap: SitemapURL[] = [
    createURL('/auth/signin', 0.6, 'monthly'),
    createURL('/auth/signup', 0.6, 'monthly'),
    createURL('/profile/settings', 0.5, 'monthly')
  ];

  // 정보 페이지 (Informational)
  const infoSitemap: SitemapURL[] = [
    createURL('/about', 0.7, 'monthly'),
    createURL('/roadmap', 0.7, 'monthly'),
    createURL('/tech-blog', 0.7, 'weekly'),
    createURL('/contribute', 0.7, 'monthly')
  ];

  // 법적 페이지 (Legal)
  const legalSitemap: SitemapURL[] = [
    createURL('/privacy', 0.4, 'monthly'),
    createURL('/terms', 0.4, 'monthly'),
    createURL('/licenses', 0.4, 'monthly')
  ];

  // 동적 이력서 페이지 (Dynamic Resume Pages)
  const resumes = await getResumeId();
  const resumeSitemap: SitemapURL[] = resumes.map(
    ({ resumeId, created_at }: { resumeId: string; created_at: string }) => {
      let lastModified: Date;
      try {
        lastModified = new Date(created_at);
        if (isNaN(lastModified.getTime())) {
          lastModified = new Date();
        }
      } catch {
        lastModified = new Date();
      }
      return createURL(`/resume/${resumeId}`, 0.8, 'daily', lastModified);
    }
  );

  // 기술 스택 페이지 (Tech Stack Pages)
  const techStacks = [
    'javascript',
    'typescript',
    'react',
    'nextjs',
    'nodejs',
    'python',
    'java',
    'spring',
    'go',
    'rust',
    'aws',
    'docker',
    'kubernetes',
    'devops'
  ];
  const techSitemap: SitemapURL[] = techStacks.map((tech) =>
    createURL(`/tech/${tech}`, 0.6, 'weekly')
  );

  // 회사 유형 페이지 (Company Type Pages)
  const companies = [
    'startup',
    'enterprise',
    'fintech',
    'commerce',
    'platform',
    'service',
    'ai',
    'security'
  ];
  const companySitemap: SitemapURL[] = companies.map((company) =>
    createURL(`/company/${company}`, 0.6, 'weekly')
  );

  // 모든 URL을 우선순위에 따라 결합
  return [
    ...coreSitemap, // 최우선 (0.9-1.0)
    ...docsSitemap, // 높은 우선순위 (0.8)
    ...resumeSitemap, // 높은 우선순위 (0.8)
    ...infoSitemap, // 중간 우선순위 (0.7)
    ...userSitemap, // 중간 우선순위 (0.5-0.6)
    ...techSitemap, // 중간 우선순위 (0.6)
    ...companySitemap, // 중간 우선순위 (0.6)
    ...legalSitemap // 낮은 우선순위 (0.4)
  ];
}
