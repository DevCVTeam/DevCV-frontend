import { Metadata } from 'next';
import FAQClient from './FAQClient';

export const metadata: Metadata = {
  title: '자주 묻는 질문 | DevCV',
  description: 'DevCV 서비스에 대한 자주 묻는 질문과 답변을 확인하세요.'
};

export default function FAQPage() {
  return <FAQClient />;
}
