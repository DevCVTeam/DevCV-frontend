import { getDetailResume } from '@/utils/fetch';
import { notFound } from 'next/navigation';
import ResumeDetail from './_components/ResumeDetail';

export default async function ProductsPage({
  params: { productId }
}: {
  params: { productId: string };
}) {
  const resume = await getDetailResume(productId);
  if (!resume) return notFound();
  return <ResumeDetail {...resume} />;
}
