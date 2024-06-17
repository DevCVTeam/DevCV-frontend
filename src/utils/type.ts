export type Resume = {
  resumeId: number;
  userId: string;
  title: string;
  price: number;
  categoryCP: string;
  categorySTCK: string;
  thumbnail: string;
};

export enum StackType {
  대기업,
  중견기업,
  중소기업,
  스타트업,
  유니콘기업,
  공기업,
  벤처기업
}

export enum ComponyType {
  백엔드,
  프론트엔드,
  모바일,
  인프라,
  게임,
  임베디드,
  보안
}
