export type UserResponse = {
  memberName: string;
  email: string;
  accessToken: string;
  refreshToken: string;
  errorCode?: string;
  message?: string;
};

export type SocialResponse = {
  social: SocialType;
  nickName: string;
  accessToken: string;
  email: string;
};

export type ResumeResponse = {
  content: Resume[];
  totalElements: number;
  numberOfElements: number;
  currentPage: number;
  totalPages: number;
  size: number;
  startPage: number;
  endPage: number;
};

export type Image = {
  resumeImgPath: string;
  ord: number;
};

export type Resume = {
  resumeId: number;
  price: number;
  title: string;
  content: string;
  resumeFilePath: string;
  status: string;
  stack: string[];
  imageList: Image[];
  category: {
    categoryId: number;
    companyType: CompanyType;
    stackType: JobType;
  };
  memberId: number;
  sellerNickname: string;
  sellerEmail: string;
  averageGrade: number;
  reviewCount: number;
};

export type ReviewResponse = {
  content: Review[];
  totalElements: number;
  numberOfElements: number;
  currentPage: number;
  totalPages: number;
  size: number;
  startPage: number;
  endPage: number;
  totalReviews: number;
  averageRating: number;
  ratingCounts: number[];
};

export type Review = {
  reviewId: number;
  resumeId: number;
  memberId: number;
  orderId: string;
  grade: number;
  text: string;
  createdDate: string;
  updatedDate: string;
  reviewerNickname: string;
  sellerNickname: string;
  sellerEmail: string;
  commentDtoList: Comment[];
};

export type Comment = {
  commentId: number;
  reviewId: number;
  memberId: number;
  sellerNickname: string;
  text: string;
  createdDate: string;
  updatedDate: string;
};

export type UserInfo = {
  memberId: number;
  email: string;
  memberName: string;
  phone: string;
  company: string; // 변경필요 "중견기업" 이렇게 Response 되는데 기존의 type 대로
  job: JobType;
  stack: string[];
  nickName: string;
  address: string;
};
export type OrderListResponse = {
  memberId: number;
  orderCount: number;
  orderList?: OrderList[];
};

export type OrderList = {
  orderNumber: string;
  totalPrice: number;
  orderStatus: OrderStatus;
  createdDate: string;
  resumeList: Resume[];
};

export type User = {
  email: string;
  exp: number;
  memberId: number;
  memberName: string;
  role: RoleType;
  social: SocialType;
};

export type EventList = {
  count: number;
  eventListResponse: TEvent[];
};

export type TEvent = {
  eventId: number;
  name: string;
  eventCategory: string;
  startDate: string;
  endDate: string;
  point: number;
};

export type PendingModifiedResumeListResponse = {
  content: PendingModifiedResumeList[];
} & Omit<ResumeResponse, 'content'>;

export type PendingModifiedResumeList = {
  status: 'pending' | 'modified';
  resumeList: {
    resumeId: number;
    title: string;
    price: number;
    resumeFilePath: string;
    thumbnail: string;
    sellerNickname: string;
    stackType: JobType;
    companyType: CompanyType;
  }[];
};

export type PaymentResponse = {
  memberResponse: {
    memberId: number;
    nickname: string;
    memberName: string;
    email: string;
    point: number;
  };

  resumeResponse: {
    title: string;
    sellerName: string;
    price: number;
    stackType: JobType;
    updatedDate: string;
  };
};

export type SalesResume = {
  memberId: number;
  count: number;
  resumeList: {
    resumeId: number;
    title: string;
    price: number;
    resumeFilePath: string;
    thumbnail: string;
    sellerNickname: string;
    stackType: JobType;
    companyType: CompanyType;
    createdDate: string;
    updatedDate: string;
    resumeStatus: ResumeStatus;
  }[];
};

export type PointType = 'POINT';

export type JobType =
  | 'backend'
  | 'frontend'
  | 'mobile'
  | 'infra'
  | 'game'
  | 'embedded'
  | 'security';

export type CompanyType =
  | 'largeE'
  | 'mediumE'
  | 'smallE'
  | 'startE'
  | 'unicornE'
  | 'publicE'
  | 'ventureE';

export type OrderStatus = 'CREATED' | 'PENDING_PAYMENT' | 'COMPLETED';

export type ResumeStatus =
  | 'pending'
  | 'approved'
  | 'regcompleted'
  | 'deleted'
  | 'rejected'
  | 'modified';

export type SocialType = 'nomal' | 'google' | 'kakao';

export type RoleType = 'admin' | 'nomal';
