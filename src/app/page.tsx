import { CategoryResume } from '@/components/Resume';
import { getResumes } from '@/utils/fetch';

export default async function Home() {
  const resumes = await getResumes({});
  return (
    <main className="mt-8 flex min-h-screen flex-1 flex-col items-center text-clip">
      {/* <Banner images={images} /> */}
      <CategoryResume {...resumes} />
    </main>
  );
}
