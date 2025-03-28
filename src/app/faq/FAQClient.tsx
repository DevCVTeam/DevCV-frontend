'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'DevCV는 어떤 서비스인가요?',
    answer:
      'DevCV는 개발자를 위한 맞춤형 이력서 작성 서비스입니다. AI 기술을 활용하여 개발자의 경력과 기술 스택을 효과적으로 표현할 수 있도록 도와드립니다.'
  },
  {
    question: '무료로 이용할 수 있나요?',
    answer:
      '기본적인 이력서 작성 기능은 무료로 제공됩니다. 프리미엄 기능은 유료로 제공되며, 자세한 내용은 요금제 페이지에서 확인하실 수 있습니다.'
  },
  {
    question: '작성한 이력서는 어떻게 저장되나요?',
    answer:
      '작성하신 이력서는 안전한 클라우드 서버에 암호화되어 저장됩니다. 언제든지 접근하여 수정하실 수 있으며, 개인정보 보호를 최우선으로 합니다.'
  },
  {
    question: '이력서 템플릿은 몇 개인가요?',
    answer:
      '현재 다양한 개발자 직군에 최적화된 여러 템플릿을 제공하고 있으며, 지속적으로 새로운 템플릿을 추가하고 있습니다.'
  },
  {
    question: 'PDF로 다운로드 할 수 있나요?',
    answer:
      '네, 작성하신 이력서는 PDF 형식으로 다운로드 하실 수 있습니다. 또한 링크 공유 기능을 통해 온라인으로도 공유가 가능합니다.'
  }
];

export default function FAQClient() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-center text-3xl font-bold">자주 묻는 질문</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="overflow-hidden rounded-lg border">
            <button
              className="flex w-full items-center justify-between bg-white px-6 py-4 text-left hover:bg-gray-50"
              onClick={() => toggleFAQ(index)}
            >
              <span className="font-medium">{faq.question}</span>
              <span className="transition-transform duration-200">
                {openIndex === index ? '−' : '+'}
              </span>
            </button>
            {openIndex === index && (
              <div className="bg-gray-50 px-6 py-4">
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
