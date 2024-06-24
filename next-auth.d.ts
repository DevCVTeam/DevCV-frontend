import { RoleType, SocialType } from '@/utils/type';
import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
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
