'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FaClipboard,
  FaEdit,
  FaEye,
  FaSearch,
  FaShare,
  FaUsers
} from 'react-icons/fa';

const userGuides = [
  {
    id: 'resume-creation',
    title: '이력서 작성',
    icon: <FaEdit className="w-6 h-6" />,
    description: '이력서 작성 방법과 팁',
    sections: [
      {
        title: '기본 정보 입력',
        content:
          '이름, 연락처, 소개글 등 기본적인 정보를 입력하는 방법을 안내합니다.'
      },
      {
        title: '경력 사항 작성',
        content:
          '프로젝트 경험, 업무 성과 등을 효과적으로 작성하는 방법을 설명합니다.'
      },
      {
        title: '기술 스택 추가',
        content:
          '보유한 기술과 스킬을 추가하고 수준을 표시하는 방법을 안내합니다.'
      }
    ]
  },
  {
    id: 'resume-templates',
    title: '템플릿 활용',
    icon: <FaClipboard className="w-6 h-6" />,
    description: '다양한 이력서 템플릿 활용 방법',
    sections: [
      {
        title: '템플릿 선택',
        content: '직무와 경력 수준에 맞는 템플릿을 선택하는 방법을 안내합니다.'
      },
      {
        title: '템플릿 커스터마이징',
        content:
          '선택한 템플릿을 자신의 필요에 맞게 수정하는 방법을 설명합니다.'
      },
      {
        title: '섹션 구성',
        content:
          '템플릿의 섹션을 효과적으로 구성하고 배치하는 방법을 안내합니다.'
      }
    ]
  },
  {
    id: 'resume-sharing',
    title: '이력서 공유',
    icon: <FaShare className="w-6 h-6" />,
    description: '작성한 이력서 공유 및 관리',
    sections: [
      {
        title: '공개 설정',
        content: '이력서의 공개 범위와 접근 권한을 설정하는 방법을 안내합니다.'
      },
      {
        title: '링크 공유',
        content: '이력서 링크를 생성하고 공유하는 방법을 설명합니다.'
      },
      {
        title: '버전 관리',
        content: '여러 버전의 이력서를 관리하고 업데이트하는 방법을 안내합니다.'
      }
    ]
  },
  {
    id: 'review-system',
    title: '리뷰 시스템',
    icon: <FaEye className="w-6 h-6" />,
    description: '이력서 리뷰 요청 및 피드백',
    sections: [
      {
        title: '리뷰 요청',
        content: '전문가에게 이력서 리뷰를 요청하는 방법을 안내합니다.'
      },
      {
        title: '피드백 확인',
        content: '받은 피드백을 확인하고 적용하는 방법을 설명합니다.'
      },
      {
        title: '리뷰어와 소통',
        content: '리뷰어와 효과적으로 소통하는 방법을 안내합니다.'
      }
    ]
  },
  {
    id: 'search-explore',
    title: '검색과 탐색',
    icon: <FaSearch className="w-6 h-6" />,
    description: '다른 이력서 검색 및 탐색',
    sections: [
      {
        title: '이력서 검색',
        content: '키워드, 기술 스택 등으로 이력서를 검색하는 방법을 안내합니다.'
      },
      {
        title: '필터 활용',
        content: '경력, 직무 등 다양한 필터를 활용하는 방법을 설명합니다.'
      },
      {
        title: '북마크',
        content: '관심 있는 이력서를 북마크하고 관리하는 방법을 안내합니다.'
      }
    ]
  },
  {
    id: 'community',
    title: '커뮤니티',
    icon: <FaUsers className="w-6 h-6" />,
    description: '커뮤니티 활동 및 네트워킹',
    sections: [
      {
        title: '토론 참여',
        content: '이력서 관련 토론에 참여하는 방법을 안내합니다.'
      },
      {
        title: '피드백 제공',
        content: '다른 사용자의 이력서에 피드백을 제공하는 방법을 설명합니다.'
      },
      {
        title: '네트워킹',
        content: '다른 개발자들과 네트워킹하는 방법을 안내합니다.'
      }
    ]
  }
];

export default function UserGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* 헤더 섹션 */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6"
          >
            사용자 가이드
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            DevCV의 주요 기능과 사용 방법을 상세히 안내합니다. 각 섹션별로
            자세한 설명을 확인하세요.
          </motion.p>
        </div>

        {/* 가이드 섹션 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {userGuides.map((guide, index) => (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1) }}
            >
              <Link href={`/docs/user-guide/${guide.id}`}>
                <div className="h-full bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                      {guide.icon}
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 ml-3">
                      {guide.title}
                    </h2>
                  </div>
                  <p className="text-gray-600 mb-6">{guide.description}</p>
                  <div className="space-y-4">
                    {guide.sections.map((section) => (
                      <div key={section.title}>
                        <h3 className="font-medium text-gray-900 mb-1">
                          {section.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {section.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* 도움말 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 p-6 bg-blue-50 rounded-xl"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            추가 도움이 필요하신가요?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/docs/faq"
              className="p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
            >
              자주 묻는 질문
            </Link>
            <Link
              href="https://github.com/DevCVTeam/DevCV-frontend/issues"
              className="p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
            >
              이슈 리포트
            </Link>
            <Link
              href="https://discord.gg/devcv"
              className="p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
            >
              Discord 커뮤니티
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
