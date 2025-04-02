import { Metadata } from 'next';
import LicensesClient from './_components/LicensesClient';

export const metadata: Metadata = {
  title: '오픈소스 라이선스 | DevCV',
  description: 'DevCV에서 사용된 오픈소스 라이선스 정보를 확인하세요.'
};

export default async function LicensesPage() {
  return <LicensesClient />;
}
