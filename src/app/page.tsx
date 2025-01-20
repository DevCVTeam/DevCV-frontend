import { CategoryResume } from '@/components/Resume';
import { getResumes } from '@/utils/fetch';

export default async function Home() {
  const resumes = await getResumes({});

  return (
    <main className="relative mt-4 flex min-h-screen flex-1 flex-col items-center gap-8 text-clip py-3">
      {/* <Banner /> */}
      {/* <div className="sticky top-20 z-50">TsteTsteTsteTste</div> */}
      <CategoryResume {...resumes} />
    </main>
  );
}
