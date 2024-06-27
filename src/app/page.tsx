import Banner from '@/components/Carousel/Banner';
import { CategoryResume } from '@/components/Resume';
import { getResumes } from '@/utils/fetch';

export default async function Home() {
  const resumes = await getResumes({});

  return (
    <main className="mt-8 flex min-h-screen flex-1 flex-col items-center gap-20 text-clip">
      <Banner />
      <CategoryResume {...resumes} />
    </main>
  );
}
