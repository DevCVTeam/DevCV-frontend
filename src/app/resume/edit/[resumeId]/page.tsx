import { getDetailResume } from '@/utils/fetch';
import { authOptions } from '@/utils/next-auth';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import ResumeEdit from './_components/ResumeEdit';

export default async function ProductsPage({
  params: { resumeId }
}: {
  params: { resumeId: number };
}) {
  const user = await getServerSession(authOptions);
  const resume = await getDetailResume(resumeId);
  if (!resume) return notFound();
  return <ResumeEdit />;
}
