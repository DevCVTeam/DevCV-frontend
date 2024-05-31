import Banner from '@/components/carousel/Banner';
import CategoryResume from '@/components/resume/CategoryResume';
import { images } from '@/utils/dummy';

export default function Home() {
  return (
    <main className="mt-8 flex min-h-screen flex-1 flex-col items-center  text-clip">
      <Banner images={images} />
      <CategoryResume />
    </main>
  );
}
