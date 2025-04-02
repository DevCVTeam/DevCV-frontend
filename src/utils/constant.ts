export const scriptUrl =
  '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

export const PAGESIZE = 20; // 페이지에 노출할 콘텐츠 갯수
export const passwordRegex: RegExp = /^[a-zA-Z\d@$!%*?&]{8,16}$/;
export const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Job = {
  backend: '백엔드',
  frontend: '프론트엔드',
  mobile: '모바일',
  infra: '인프라',
  game: '게임',
  embedded: '임베디드',
  security: '보안'
};

export const Company = {
  largeE: '대기업',
  mediumE: '중견기업',
  smallE: '중소기업',
  startE: '스타트업',
  unicornE: '유니콘기업',
  publicE: '공기업',
  ventureE: '벤처기업'
};

export const OrderStatus = {
  CREATED: '생성완료',
  PENDING_PAYMENT: '결제요청',
  COMPLETED: '구매완료'
};

export const SocialObj = {
  normal: '일반 로그인',
  kakao: '카카오 로그인',
  google: '구글 로그인'
};
