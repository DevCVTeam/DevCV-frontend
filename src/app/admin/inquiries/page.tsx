'use client';

import { formatDateTime } from '@/utils/format';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  AiOutlineCheckCircle,
  AiOutlineEye,
  AiOutlineSync
} from 'react-icons/ai';

// 문의 상태에 따른 색상 및 텍스트
const statusConfig = {
  pending: { color: 'bg-yellow-100 text-yellow-800', text: '대기 중' },
  inProgress: { color: 'bg-blue-100 text-blue-800', text: '처리 중' },
  completed: { color: 'bg-green-100 text-green-800', text: '완료' }
};

// 임시 인터페이스 (실제로는 shared/types에 정의)
interface Inquiry {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'pending' | 'inProgress' | 'completed';
  response?: string;
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  useEffect(() => {
    // 실제로는 API 호출
    const fetchInquiries = async () => {
      try {
        // const response = await fetch('/api/inquiries' + (activeFilter ? `?status=${activeFilter}` : ''));
        // const data = await response.json();
        // setInquiries(data.inquiries);

        // 임시 데이터
        setInquiries([
          {
            id: 1,
            name: '홍길동',
            email: 'hong@example.com',
            subject: '이력서 결제 관련 문의',
            message: '이력서 결제 후 다운로드가 되지 않는 문제가 발생했습니다.',
            createdAt: new Date().toISOString(),
            status: 'pending'
          },
          {
            id: 2,
            name: '김철수',
            email: 'kim@example.com',
            subject: '이벤트 참여 방법',
            message: '현재 진행 중인 이벤트에 참여하는 방법을 알고 싶습니다.',
            createdAt: new Date(Date.now() - 86400000).toISOString(), // 어제
            status: 'inProgress',
            response: '안녕하세요, 이벤트 참여 방법은 다음과 같습니다...'
          },
          {
            id: 3,
            name: '이영희',
            email: 'lee@example.com',
            subject: '개발자 인터뷰 참여 신청',
            message: '개발자 인터뷰에 참여하고 싶습니다. 어떻게 해야 하나요?',
            createdAt: new Date(Date.now() - 172800000).toISOString(), // 2일 전
            status: 'completed',
            response: '개발자 인터뷰 참여 신청이 접수되었습니다...'
          }
        ]);
      } catch (error) {
        console.error('Error fetching inquiries:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInquiries();
  }, [activeFilter]);

  // 상태 필터 변경 핸들러
  const handleFilterChange = (filter: string | null) => {
    setActiveFilter(filter);
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">로딩 중...</div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="rounded-lg bg-white shadow-md">
        <div className="border-b p-4">
          <h2 className="text-xl font-semibold">문의 관리</h2>
          <p className="mt-1 text-sm text-gray-500">
            사용자 문의 내역을 확인하고 관리합니다.
          </p>
        </div>

        {/* 필터 */}
        <div className="border-b p-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleFilterChange(null)}
              className={`rounded-full px-3 py-1 text-sm ${
                activeFilter === null
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              전체
            </button>
            <button
              onClick={() => handleFilterChange('pending')}
              className={`rounded-full px-3 py-1 text-sm ${
                activeFilter === 'pending'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              대기 중
            </button>
            <button
              onClick={() => handleFilterChange('inProgress')}
              className={`rounded-full px-3 py-1 text-sm ${
                activeFilter === 'inProgress'
                  ? 'bg-blue-500 text-white'
                  : 'bg-blue-100 text-blue-800'
              }`}
            >
              처리 중
            </button>
            <button
              onClick={() => handleFilterChange('completed')}
              className={`rounded-full px-3 py-1 text-sm ${
                activeFilter === 'completed'
                  ? 'bg-green-500 text-white'
                  : 'bg-green-100 text-green-800'
              }`}
            >
              완료
            </button>
          </div>
        </div>

        {/* 문의 목록 */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  제목/이름
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  등록일
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  상태
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  작업
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {inquiries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-gray-500">
                    문의 내역이 없습니다.
                  </td>
                </tr>
              ) : (
                inquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                      {inquiry.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="font-medium text-gray-900">
                        {inquiry.subject}
                      </div>
                      <div className="mt-1 text-xs text-gray-500">
                        {inquiry.name} ({inquiry.email})
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {formatDateTime(inquiry.createdAt)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold leading-5 ${statusConfig[inquiry.status].color}`}
                      >
                        {statusConfig[inquiry.status].text}
                      </span>
                    </td>
                    <td className="space-x-2 whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                      <Link href={`/admin/inquiries/${inquiry.id}`}>
                        <button className="inline-flex items-center rounded-md border border-gray-300 p-1 text-indigo-600 hover:text-indigo-900">
                          <AiOutlineEye size={16} />
                        </button>
                      </Link>
                      {inquiry.status === 'pending' && (
                        <button className="inline-flex items-center rounded-md border border-gray-300 p-1 text-blue-600 hover:text-blue-900">
                          <AiOutlineSync size={16} />
                        </button>
                      )}
                      {inquiry.status === 'inProgress' && (
                        <button className="inline-flex items-center rounded-md border border-gray-300 p-1 text-green-600 hover:text-green-900">
                          <AiOutlineCheckCircle size={16} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
