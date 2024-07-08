import { RoleType, SocialType } from '@/utils/type';
import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      accessToken: string;
      refreshToken: string;
      name?: string;
      email?: string;
      image?: string;
      exp: number;
      memberId: number;
      memberName: string;
      role: RoleType;
      social: SocialType;
    };
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    id: string;
    name: string;
    email: string;
    sub: string;
    refreshToken: string;
    iat: number;
    exp: number;
    jti: string;
  }
}
