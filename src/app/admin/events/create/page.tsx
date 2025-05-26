'use client';

import { EventCategory } from '@/utils/type';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const eventCategories: EventCategory[] = [
  'INTERVIEW',
  'PROMOTION',
  'CONTEST',
  'SEMINAR',
  'WEBINAR',
  'WORKSHOP',
  'OTHER'
];

export default function CreateEventPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    eventCategory: 'INTERVIEW' as EventCategory,
    startDate: '',
    endDate: '',
    point: 0,
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'point' ? parseInt(value) || 0 : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // 이벤트 데이터 유효성 검사
      if (!formData.name || !formData.startDate || !formData.endDate) {
        throw new Error('모든 필수 필드를 입력해주세요.');
      }

      if (new Date(formData.startDate) > new Date(formData.endDate)) {
        throw new Error('시작일은 종료일보다 이전이어야 합니다.');
      }

      // API 호출 - 실제 구현에서는 API 연동 필요
      // const response = await fetch('/api/admin/events', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });

      // if (!response.ok) {
      //   throw new Error('이벤트 생성 중 오류가 발생했습니다.');
      // }

      // Mock Success - 실제 구현에서는 제거
      console.log('Event created:', formData);

      // 성공 시 이벤트 목록 페이지로 이동
      router.push('/admin/events');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="rounded-lg bg-white p-6 shadow-md">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">새 이벤트 생성</h2>
          <p className="mt-1 text-sm text-gray-500">
            이벤트 정보를 입력해주세요.
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                이벤트명 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="eventCategory"
                className="block text-sm font-medium text-gray-700"
              >
                카테고리 <span className="text-red-500">*</span>
              </label>
              <select
                id="eventCategory"
                name="eventCategory"
                value={formData.eventCategory}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              >
                {eventCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-gray-700"
              >
                시작일 <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-gray-700"
              >
                종료일 <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="point"
                className="block text-sm font-medium text-gray-700"
              >
                포인트
              </label>
              <input
                type="number"
                id="point"
                name="point"
                value={formData.point}
                onChange={handleChange}
                min="0"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              이벤트 설명
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => router.push('/admin/events')}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isSubmitting ? '처리 중...' : '저장'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
