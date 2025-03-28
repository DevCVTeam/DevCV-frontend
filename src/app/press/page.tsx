import { Metadata } from 'next';
import PressClient from './PressClient';

export const metadata: Metadata = {
  title: '보도자료 | DevCV',
  description: 'DevCV의 최신 보도자료와 미디어 자료를 확인하세요.'
};

export default function PressPage() {
  return <PressClient />;
}
