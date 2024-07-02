import { getDetailResume } from '@/utils/fetch';
import { authOptions } from '@/utils/next-auth';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import ResumeDetail from './_components/ResumeDetail';

export default async function ProductsPage({
  params: { productId }
}: {
  params: { productId: string };
}) {
  const user = await getServerSession(authOptions);
  const resume = await getDetailResume(productId);
  console.log(resume);
  if (!resume) return notFound();
  return <ResumeDetail {...resume} />;
}
