'use client';

import Modal from '@/components/Modal';
import type { TEvent } from '@/utils/type';
import { format } from 'date-fns';
import { AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaRegCalendarAlt } from 'react-icons/fa';
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

      if (data.eventCategory === 'QUIZ') {
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
  }, [session]);

  const handleAttend = async (feedback?: string) => {
    const attendanceData = {
      memberId: session?.user.memberId,
      eventId: eventId,
      ...(feedback && { feedback })
    };

    const res = await fetch('/server/attendance', {
      method: 'POST',
      body: JSON.stringify(attendanceData),
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

    if (feedback) {
      toast.success('소중한 의견 감사합니다!', {
        duration: 3000,
        icon: '💌'
      });
    }

    setTimeout(() => {
      router.push('/');
    }, 3000);
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

  const renderEventContent = () => {
    if (show) {
      return <AttendanceCheckIn onClose={() => setShow(false)} />;
    }

    switch (event?.eventCategory) {
      case 'ATTENDANCE':
        return (
          <div className="flex flex-col gap-8">
            <div className="text-center">
              <h4 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                출석 이벤트
              </h4>
              <p className="text-gray-600 max-w-2xl mx-auto">
                오늘의 소감을 남기고 출석체크를 완료해주세요!
              </p>
            </div>
            <div className="transform transition-transform hover:scale-105">
              <Pending onClick={handleAttend} />
            </div>
          </div>
        );

      case 'QUIZ':
        return (
          <div className="flex flex-col gap-8">
            <div className="text-center">
              <h4 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                퀴즈 이벤트
              </h4>
              <p className="text-gray-600 max-w-2xl mx-auto">
                모든 질문에 답변하신 후 제출 버튼을 클릭해주세요.
              </p>
            </div>
            <div className="space-y-6 flex flex-col items-center">
              {questions.map((question, index) => (
                <div
                  key={index}
                  className="w-full max-w-2xl transform transition-all duration-300 hover:translate-x-2"
                >
                  <label className="block text-gray-700 font-semibold mb-3">
                    {question}
                  </label>
                  <textarea
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-white resize-none"
                    rows={3}
                    placeholder="답변을 입력해주세요..."
                    value={answers[index] || ''}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                  />
                </div>
              ))}
              <button
                onClick={handleSubmitAnswers}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl 
                hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-200 
                transform transition-all duration-300 hover:translate-y-[-2px] active:translate-y-[0px]
                shadow-md hover:shadow-lg"
              >
                답변 제출 및 출석체크
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center text-gray-600">
            지원하지 않는 이벤트 유형입니다.
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-2xl">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="overflow-hidden rounded-2xl bg-white shadow">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex flex-col items-center space-y-6">
                <div className="flex flex-col items-center space-y-4">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                    {event?.name}
                  </h2>
                  <p className="text-center text-base text-gray-600">
                    {event?.message}
                  </p>
                </div>

                <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="rounded-lg bg-gray-50 p-6">
                    <div className="flex items-center space-x-3">
                      <div className="flex size-10 items-center justify-center rounded-full bg-blue-100">
                        <FaRegCalendarAlt className="size-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          일시
                        </p>
                        <p className="text-sm text-gray-600">
                          {event?.startDate
                            ? format(
                                new Date(event.startDate),
                                'yyyy년 MM월 dd일'
                              )
                            : '날짜 미정'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {questions && questions.length > 0 && (
                  <div className="w-full space-y-6">
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-medium text-gray-900">
                        참가 신청 질문
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        이벤트 참가를 위해 다음 질문들에 답변해주세요.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {questions.map((question, index) => (
                        <div key={index}>
                          <label
                            htmlFor={`question-${index}`}
                            className="block text-sm font-medium text-gray-700"
                          >
                            {question}
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id={`question-${index}`}
                              value={answers[index] || ''}
                              onChange={(e) =>
                                setAnswers((prev) => {
                                  const newAnswers = [...prev];
                                  newAnswers[index] = e.target.value;
                                  return newAnswers;
                                })
                              }
                              className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm transition-all duration-300 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                              placeholder="답변을 입력해주세요..."
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={handleSubmitAnswers}
                      disabled={!answers.every((answer) => answer.trim())}
                      className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-400"
                    >
                      답변 제출하기
                    </button>
                  </div>
                )}

                {!questions?.length && (
                  <button
                    onClick={() => handleAttend()}
                    className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    출석체크 하기
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {show && (
          <Modal onClose={() => setShow(false)} title="출석체크">
            <AttendanceCheckIn onClose={() => setShow(false)} />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventIdPage;
