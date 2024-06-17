import { debug, error, warn } from 'console';
import NextAuth, { NextAuthOptions } from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';
export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt' as const,
    maxAge: 60 * 60 * 24,
    updateAge: 60 * 60 * 2
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'example@example.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentialsm, req) {
        // 외부 서버와 통신하여 유저 정보와 토큰을 가져오는 로직을 여기에 구현합니다.
        const { email, password } = credentialsm!;

        // 외부 서버와의 통신을 통해 유저 정보와 토큰을 가져옵니다.
        const response = await fetch('/api/members/login', {
          method: 'GET',
          body: JSON.stringify({ email, password })
        });

        const user = await response.json();

        return user || null;
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID || '',
      clientSecret: process.env.NAVER_CLIENT_SECRET || ''
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || '',
      clientSecret: process.env.KAKAO_CLIENT_SECRET || ''
    })
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/error'
  },
  callbacks: {
    async signIn({ user, account, profile, credentials, email }) {
      return true;
    },

    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub
        }
      };
    },
    jwt: async ({ user, token, account, profile, session, trigger }) => {
      if (user) {
        token.sub = user.id;
      }
      return token;
    }
  },
  logger: {
    error(code, metadata) {
      error(code, metadata);
    },
    warn(code) {
      warn(code);
    },
    debug(code, metadata) {
      debug(code, metadata);
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
