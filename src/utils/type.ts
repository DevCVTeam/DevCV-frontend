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
