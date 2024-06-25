import NextAuth, { NextAuthOptions } from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
const decodeJwtResponse = (token: string) => {
  let base64Url = token.split('.')[1];
  let base64 = base64Url?.replace(/-/g, '+')?.replace(/_/g, '/');
  let jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
};
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/auth/signin',
    signOut: '/',
    error: '/error'
  },
  session: {
    strategy: 'jwt' as const,
    maxAge: 60 * 60, // 1시간
    updateAge: 60 * 60 * 2 // 2시간
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        try {
          // 외부 서버와 통신하여 유저 정보와 토큰을 가져오는 로직을 여기에 구현합니다.
          const { email, password } = credentials!;
          // 외부 서버와의 통신을 통해 유저 정보와 토큰을 가져옵니다.

          const res = await fetch(`${process.env.SERVER_URL}/members/login`, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
              'Content-Type': 'application/json'
            }
          });

          const user = await res.json();
          if (user.errorCode) {
            return null;
          }
          // const user = await response.json();
          console.log(user);
          return {
            id: user.accessToken,
            name: user.memberName,
            email: user.email
          };
        } catch (e: any) {
          throw new Error(e.response);
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || '',
      clientSecret: process.env.KAKAO_CLIENT_SECRET || ''
    })
  ],

  callbacks: {
    async signIn({ user, account, profile, credentials, email }) {
      console.log(user, account, profile);
      if (account?.provider === 'google') {
        const res = await fetch(
          `${process.env.SERVER_URL}/members/google-login?token=${account.access_token}`,
          {
            method: 'GET'
          }
        );
        if (!res.ok) {
          console.log(res);
          return false;
        }
        const data = await res.json();
        console.log(data);
        return true;
      }
      if (account?.provider === 'kakao') {
        const res = await fetch(
          `${process.env.SERVER_URL}/members/kakao-login?token=${account.access_token}`,
          {
            method: 'GET'
          }
        );
        if (!res.ok) {
          console.log(res);
          return false;
        }
        const data = await res.json();
        console.log(data);
        return true;
      }
      if (account?.provider === 'credentials') return true;

      return false;
    },
    // redirect: (url, baseUrl) => {
    //   return '/';
    // },

    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          ...decodeJwtResponse(token.sub!),
          id: token.sub
        }
      };
    },
    jwt: async ({ user, token, account, profile, session, trigger }) => {
      if (user) {
        token.user = user.id;
      }
      return token;
    }
  }
  // logger: {
  //   error(code, metadata) {
  //     error(code, metadata);
  //   },
  //   warn(code) {
  //     warn(code);
  //   },
  //   debug(code, metadata) {
  //     debug(code, metadata);
  //   }
  // }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };