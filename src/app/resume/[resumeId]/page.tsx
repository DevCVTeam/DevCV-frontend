import { getDetailResume } from '@/utils/fetch';
import { authOptions } from '@/utils/next-auth';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import ResumeDetail from './_components/ResumeDetail';

export default async function ProductsPage({
  params: { resumeId }
}: {
  params: { resumeId: number };
}) {
  const user = await getServerSession(authOptions);
  const resume = await getDetailResume(resumeId);
  console.log(resume);
  if (!resume) return notFound();
  return <ResumeDetail {...resume} />;
}
