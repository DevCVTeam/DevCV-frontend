import toast from 'react-hot-toast';
import { PAGESIZE } from './constant';
import {
  CompanyType,
  EventList,
  JobType,
  OrderListResponse,
  PaymentResponse,
  PendingModifiedResumeListResponse,
  Resume,
  ResumeResponse,
  ReviewResponse,
  SalesResume,
  TEvent,
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
        }
      }
    );
    const data: ResumeResponse = await res.json();
    return data;
  } else if (job) {
    const res = await fetch(
      `${process.env.SERVER_URL ?? '/server'}/resumes?page=${page}&size=${PAGESIZE}&stack-type=${job}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    const data: ResumeResponse = await res.json();
    return data;
  } else if (company) {
    const res = await fetch(
      `${process.env.SERVER_URL ?? '/server'}/resumes?page=${page}&size=${PAGESIZE}&company-type=${company}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
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
      }
    }
  );
  if (!res.ok) {
    console.log(res);
  }
  const data: ResumeResponse = await res.json();
  return data;
};

// 이력서 상세페에지
export const getDetailResume = async (resumeId: number) => {
  const res = await fetch(`${process.env.SERVER_URL}/resumes/${resumeId}`, {
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
  const data: ReviewResponse = await res.json();
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
  const data: OrderListResponse = await res.json();
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
      `${process.env.SERVER_URL ?? '/server'}/admin/resumes/${type}?page=${page}&size=${PAGESIZE}`,
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

export const getCheckout = async ({
  resumeId,
  token
}: {
  resumeId: number;
  token: string;
}) => {
  const res = await fetch(
    `${process.env.SERVER_URL}/resumes/${resumeId}/checkout`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  const data: PaymentResponse = await res.json();
  return data;
};

export const getEvent = async ({
  token,
  eventId
}: {
  token: string;
  eventId: number;
}) => {
  const res = await fetch(`${process.env.SERVER_URL}/events/${eventId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data: TEvent = await res.json();
  return data;
};

export const salesResumes = async ({
  memberId,
  token
}: {
  memberId: number;
  token: string;
}) => {
  const res = await fetch(
    `${process.env.SERVER_URL}/members/${memberId}/resumes`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  const resumes: SalesResume = await res.json();
  return resumes;
};

// sitemap.xml
export const getResumeId = async () => {
  const res = await fetch(`${process.env.SERVER_URL}/resumes/sitemap`, {
    method: 'GET',
    cache: 'force-cache',
    next: { revalidate: 3600 } // 1시간마다 재검증
  });
  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  return data;
};

// 포인트 조회, 저장
export const getMemberPoint = async (
  memberId: number | undefined,
  token: string
) => {
  const res = await fetch(
    `${process.env.SERVER_URL}/members/${memberId}/points`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  return data;
};
