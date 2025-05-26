'use client';

import { formatDate } from '@/utils/format';
import { EventCategory, TEvent } from '@/utils/type';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai';

// 임시 데이터 - 실제로는 API에서 가져와야 함
const sampleEvents: TEvent[] = [
  {
    eventId: 1,
    name: '프론트엔드 개발자 인터뷰',
    eventCategory: 'INTERVIEW',
    startDate: '2024-05-01',
    endDate: '2024-05-30',
    point: 100
  },
  {
    eventId: 2,
    name: '여름 프로모션',
    eventCategory: 'PROMOTION',
    startDate: '2024-06-01',
    endDate: '2024-06-30',
    point: 50
  },
  {
    eventId: 3,
    name: '코딩 콘테스트',
    eventCategory: 'CONTEST',
    startDate: '2024-07-15',
    endDate: '2024-07-16',
    point: 200
  }
];

const getCategoryColor = (category: EventCategory) => {
  const colors = {
    ATTENDANCE: 'bg-orange-100 text-orange-800',
    QUIZ: 'bg-teal-100 text-teal-800',
    INTERVIEW: 'bg-blue-100 text-blue-800',
    PROMOTION: 'bg-green-100 text-green-800',
    CONTEST: 'bg-purple-100 text-purple-800',
    SEMINAR: 'bg-yellow-100 text-yellow-800',
    WEBINAR: 'bg-indigo-100 text-indigo-800',
    WORKSHOP: 'bg-pink-100 text-pink-800',
    OTHER: 'bg-gray-100 text-gray-800'
  };

  return colors[category] || colors['OTHER'];
};

export default function EventsManagementPage() {
  const [events, setEvents] = useState<TEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 실제 구현에서는 API 호출로 대체
    setEvents(sampleEvents);
    setIsLoading(false);
  }, []);

  const handleDeleteEvent = async (eventId: number) => {
    if (confirm('정말로 이 이벤트를 삭제하시겠습니까?')) {
      // 실제 구현에서는 API 호출로 삭제
      setEvents(events.filter((event) => event.eventId !== eventId));
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">로딩 중...</div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="rounded-lg bg-white shadow-md">
        <div className="flex flex-row items-center justify-between border-b p-4">
          <h2 className="text-xl font-semibold">이벤트 관리</h2>
          <Link href="/admin/events/create">
            <button className="flex items-center gap-1 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
              <AiOutlinePlus size={16} />
              <span>이벤트 추가</span>
            </button>
          </Link>
        </div>
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    이벤트명
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    카테고리
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    기간
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    포인트
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                    작업
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {events.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-gray-500">
                      등록된 이벤트가 없습니다
                    </td>
                  </tr>
                ) : (
                  events.map((event) => (
                    <tr key={event.eventId} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                        {event.eventId}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {event.name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold leading-5 ${getCategoryColor(event.eventCategory)}`}
                        >
                          {event.eventCategory}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {formatDate(event.startDate)} ~{' '}
                        {formatDate(event.endDate)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {event.point} P
                      </td>
                      <td className="space-x-2 whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                        <Link href={`/admin/events/${event.eventId}`}>
                          <button className="inline-flex items-center rounded-md border border-gray-300 p-1 text-indigo-600 hover:text-indigo-900">
                            <AiOutlineEdit size={16} />
                          </button>
                        </Link>
                        <button
                          className="inline-flex items-center rounded-md border border-gray-300 p-1 text-red-600 hover:text-red-900"
                          onClick={() => handleDeleteEvent(event.eventId)}
                        >
                          <AiOutlineDelete size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
