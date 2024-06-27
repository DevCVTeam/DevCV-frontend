import toast from 'react-hot-toast';
import { PAGESIZE } from './constant';
import {
  CommentResponse,
  CompanyType,
  EventList,
  JobType,
  OrderList,
  PendingModifiedResumeListResponse,
  Resume,
  ResumeResponse,
  UserInfo
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
      `${process.env.SERVER_URL ?? '/server'}/resumes?page=${page}&size=${PAGESIZE}&stack-type=${job}&company-type=${company}`,
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
  const data: ResumeResponse = await res.json();
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
export const getOrders = async ({
  memberId,
  token
}: {
  memberId: number;
  token: string;
}) => {
  const res = await fetch(
    `${process.env.SERVER_URL || '/server'}/members/${memberId}/orders`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  const data: OrderList = await res.json();
  return data;
};

export const getUserInfo = async ({
  memberId,
  token
}: {
  memberId: number;
  token?: string;
}) => {
  const res = await fetch(`${process.env.SERVER_URL}/members/${memberId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data: UserInfo = await res.json();
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

export const getPoint = async ({
  memberId,
  token
}: {
  memberId: number;
  token: string;
}) => {
  try {
    const res = await fetch(
      `${process.env.SERVER_URL}/members/${memberId}/points`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    const data: { memberId: number; point: number } = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const modifiedResumes = async ({
  page,
  token
}: {
  page: number;
  token: string;
}) => {
  try {
    const res = await fetch(
      `${process.env.SERVER_URL ?? 'server'}/admin/resumes/modified?page=${page}&size=${PAGESIZE}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getEvents = async (token: string) => {
  try {
    const res = await fetch(`${process.env.SERVER_URL || '/server'}/events`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data: EventList = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const pendingModifiedResumeList = async ({
  page,
  token,
  type
}: {
  page: number;
  token: string;
  type: 'pending' | 'modified';
}) => {
  try {
    const res = await fetch(
      `${process.env.SERVER_URL ?? 'server'}/admin/resumes/${type}?page=${page}&size=${PAGESIZE}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    const data: PendingModifiedResumeListResponse = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
