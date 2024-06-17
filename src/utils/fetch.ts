import { ComponyType, StackType } from './type';

export const getResumes = async (
  stack: StackType,
  compony: ComponyType,
  page: number,
  size: number
) => {
  const res = await fetch(
    `/server/resumes?page=${page}&size=${size}&stackType=${stack}&companyType=${compony}`
  );
  const data = await res.json();
  return data;
};
