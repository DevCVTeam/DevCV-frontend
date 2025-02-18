'use client';

import type { TEvent } from '@/utils/type';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaDollarSign } from 'react-icons/fa';
import { MdOutlineDateRange } from 'react-icons/md';
import AttendanceCheckIn from './_components/AttendanceCheckIn';
import Pending from './_components/Pending';

const EventIdPage = ({
  params: { eventId }
}: {
  params: { eventId: number };
}) => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [event, setEvent] = useState<TEvent>();
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    (async () => {
      const res = await fetch(`/server/events/${eventId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`
        }
      });
      const data = await res.json();
      setEvent(data);

      if (eventId === 2) {
        const questionsRes = await fetch(
          `/server/events/${eventId}/questions`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${session?.user.accessToken}`
            }
          }
        );
        const questionsData = await questionsRes.json();
        setQuestions(questionsData);
      }
    })();
  }, [eventId, session]);

  const handleAttend = async () => {
    const res = await fetch('/server/attendance', {
      method: 'POST',
      body: JSON.stringify({
        memberId: session?.user.memberId,
        eventId: eventId
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user.accessToken}`
      }
    });
    if (!res.ok) {
      const data = await res.json();
      return toast.error(data.message);
    }
    toast.success('출석체크에 성공했습니다.');
    setShow(true);
    return router.push('/');
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmitAnswers = async () => {
    if (
      answers.length !== questions.length ||
      answers.some((answer) => !answer)
    ) {
      return toast.error('모든 질문에 답변해주세요.');
    }

    const res = await fetch(`/server/events/${eventId}/answers`, {
      method: 'POST',
      body: JSON.stringify({ answers }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user.accessToken}`
      }
    });

    if (!res.ok) {
      const data = await res.json();
      return toast.error(data.message);
    }

    toast.success('답변이 제출되었습니다.');
    handleAttend();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-2xl">
      <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-6 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {event?.name}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 text-blue-50">
              <span className="flex items-center gap-2">
                <MdOutlineDateRange className="text-xl" />
                {new Date(event?.startDate!).toLocaleDateString()} ~{' '}
                {new Date(event?.endDate!).toLocaleDateString()}
              </span>
              <div className="flex items-center gap-2">
                <FaDollarSign className="text-xl" />
                <p className="font-semibold">{event?.point} Point</p>
              </div>
            </div>
          </div>
          <div className="p-6 sm:p-10">
            {show ? (
              <AttendanceCheckIn />
            ) : (
              <div className="flex flex-col gap-8">
                <div className="text-center">
                  <h4 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                    {eventId === 8
                      ? '이력서 공유 출석체크'
                      : '이력서 공유 질문'}
                  </h4>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    {eventId === 8
                      ? '이력서 공유 세션 출석체크를 위해 아래 아이콘을 클릭해주세요!'
                      : '이력서에 대한 모든 질문에 답변하신 후 제출 버튼을 클릭해주세요.'}
                  </p>
                </div>
                {eventId === 8 ? (
                  <div className="transform transition-transform hover:scale-105">
                    <Pending onClick={handleAttend} />
                  </div>
                ) : (
                  <div className="space-y-6 flex justify-center">
                    {questions.map((question, index) => (
                      <div
                        key={index}
                        className="transform transition-all duration-300 hover:translate-x-2"
                      >
                        <label className="block text-gray-700 font-semibold mb-3">
                          {question}
                        </label>
                        <textarea
                          className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white resize-none"
                          rows={3}
                          placeholder="답변을 입력해주세요..."
                          value={answers[index] || ''}
                          onChange={(e) =>
                            handleAnswerChange(index, e.target.value)
                          }
                        />
                      </div>
                    ))}
                    <button
                      onClick={handleSubmitAnswers}
                      className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-500 focus:ring-4 focus:ring-blue-200 transform transition-all duration-300 hover:translate-y-[-2px] active:translate-y-[0px]"
                    >
                      답변 제출 및 출석체크
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventIdPage;
