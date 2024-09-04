import { getDetailResume } from '@/utils/fetch';
import { notFound } from 'next/navigation';
import ResumeDetail from './_components/ResumeDetail';

export default async function ProductsPage({
  params: { resumeId }
}: {
  params: { resumeId: number };
}) {
  const resume = await getDetailResume(resumeId);
  if (!resume) return notFound();
  return <ResumeDetail {...resume} />;
}
