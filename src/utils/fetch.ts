import toast from 'react-hot-toast';
import { PAGESIZE } from './constant';
import {
  CommentResponse,
  CompanyType,
  JobType,
  Resume,
  ResumeResponse
} from './type';

export const getResumes = async ({
  page = 1,
  job,
  company
}: {
  page?: number;
  job?: JobType;
  company?: CompanyType;
}) => {
  if (job && company) {
    const res = await fetch(
      `${process.env.SERVER_URL ?? '/server'}/resumes?page=${page}&size=${PAGESIZE}&stackType=${job}&companyType=${company}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        cache: 'force-cache'
      }
    );
    const data: ResumeResponse = await res.json();
    return data;
  }

  const res = await fetch(
    `${process.env.SERVER_URL ?? '/server'}/resumes?page=${page}&size=${PAGESIZE}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'force-cache'
    }
  );
  if (!res.ok) {
    console.log(res);
  }
  console.log(res);
  const data: ResumeResponse = await res.json();
  console.log(data);
  return data;
};

// 이력서 상세페에지
export const getDetailResume = async (productId: string) => {
  const res = await fetch(`${process.env.SERVER_URL}/resumes/${productId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'force-cache'
  });

  const data: Resume = await res.json();
  return data;
};

// size, page 페이지네이션 추가 예정
export const getReviews = async (resumeId: number, page: number) => {
  const res = await fetch(
    `${process.env.SERVER_URL || '/server'}/resumes/${resumeId}/reviews?page=${page}&size=${PAGESIZE}`,
    {
      method: 'GET'
    }
  );
  const data: CommentResponse = await res.json();
  return data;
};

// size, page 페이지네이션 추가 예정
export const getResumePending = async (size: number, page: number) => {
  const res = await fetch(
    `${process.env.SERVER_URL || '/server'}/resumes/pending`,
    {
      method: 'GET'
    }
  );
  const data = await res.json();
  return data;
};

// size, page 페이지네이션 추가 예정
export const getOrders = async (id: number) => {
  const res = await fetch(`${process.env.SERVER_URL || '/server'}/orders`, {
    method: 'GET'
  });
  const data = await res.json();
  return data;
};

export const getEmailSend = async (email: string) => {
  try {
    const res = await fetch(
      `${process.env.SERVER_URL || '/server'}/members/cert-email?email=${email}`,
      {
        method: 'GET'
      }
    );
    const { certnumber } = await res.json();
    toast.success('이메일 인증코드 전송 완료');
    return certnumber.toString();
  } catch (error) {
    return toast.error('이메일 인증코드 전송 실패');
  }
};
