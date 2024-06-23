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
