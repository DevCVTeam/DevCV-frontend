import { Metadata } from 'next';
import ContactClient from './_components/ContactClient';

export const metadata: Metadata = {
  title: '문의하기 | DevCV',
  description: '궁금한 점이나 제안사항이 있으시다면 언제든지 문의해주세요.'
};

export default async function ContactPage() {
  return <ContactClient />;
}
