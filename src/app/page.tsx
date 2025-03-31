'use client';

import { CategoryResume } from '@/components/features/Resume';
import { getResumes } from '@/utils/fetch';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Home() {
  const [resumes, setResumes] = useState<any>(null);

  useEffect(() => {
    const fetchResumes = async () => {
      const data = await getResumes({});
      setResumes(data);
    };
    fetchResumes();
  }, []);

  return (
    <motion.main
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen flex-1 flex-col items-center gap-8 text-clip py-3"
    >
      {resumes && <CategoryResume {...resumes} />}
    </motion.main>
  );
}
