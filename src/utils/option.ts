export const companyOptions = [
  { value: 'largeE', label: '대기업' },
  { value: 'mediumE', label: '중견기업' },
  { value: 'smallE', label: '중소기업' },
  { value: 'startE', label: '스타트업' },
  { value: 'unicornE', label: '유니콘기업' },
  { value: 'publicE', label: '공기업' },
  { value: 'ventureE', label: '벤처기업' }
];

export const jobOptions = [
  { value: 'backend', label: '백엔드' },
  { value: 'frontend', label: '프론트엔드' },
  { value: 'mobile', label: '모바일' },
  { value: 'infra', label: '인프라' },
  { value: 'game', label: '게임' },
  { value: 'embedded', label: '임베디드' },
  { value: 'security', label: '보안' }
];

export const techstackOptions = [
  { value: 'Spring', label: 'Spring' },
  { value: 'Node.JS', label: 'Node.JS' },
  { value: '.NET', label: '.NET' },
  { value: 'React', label: 'React' },
  { value: 'Next.JS', label: 'Next.JS' },
  { value: 'Vue', label: 'Vue' },
  { value: 'Nuxt.JS', label: 'Nuxt.JS' },
  { value: 'Angular', label: 'Angular' }
];
type TForm = {
  userName: string;
  nickName: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: string;
  detailAddress: string;
  job: string;
  compony: string;
  techStack: string;
  // referrer: string;
};
