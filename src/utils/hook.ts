import { useQuery } from '@tanstack/react-query';
import { getReviews } from './fetch';

export const useReviews = (resumeId: number, page: number) =>
  useQuery({
    queryKey: ['reviews', resumeId],
    queryFn: () => getReviews(resumeId, page)
  });
