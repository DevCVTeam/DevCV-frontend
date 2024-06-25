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
  averageGrade: number;
  reviewCount: number;
};

export type CommentResponse = {
  content: Comment[];
  totalElements: number;
  numberOfElements: number;
  currentPage: number;
  totalPages: number;
  size: number;
  startPage: number;
  endPage: number;
  totalReviews: number;
  averageRating: number;
};

export type Comment = {
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
  commentDtoList: Reply[];
};

export type Reply = {
  commentId: number;
  reviewId: number;
  memberId: number;
  sellerNickname: string;
  text: string;
  createdDate: string;
  updatedDate: string;
};

export type UserDetail = {
  memberInfo: {
    memberId: number;
    email: string;
    memberName: string;
    phone: string;
    company: string; // 변경필요 "중견기업" 이렇게 Response 되는데 기존의 type 대로
    job: JobType;
    stack: string[];
    address: string;
  };
  resumeList: {
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
    };
  };
  orderList: { memberId: number; count: number; orderList: OrderList[] };
  mypoint: number;
};

export type OrderList = {
  orderId: number;
  resumeId: number;
  title: string;
  price: number;
  orderDate: string;
};

export type User = {
  email: string;
  exp: number;
  memberId: number;
  memberName: string;
  role: RoleType;
  social: SocialType;
};

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

export type SocialType = 'nomal' | 'google' | 'kakao';

export type RoleType = 'admin' | 'nomal';
