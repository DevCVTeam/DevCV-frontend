import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import { UserResponse } from './type';
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
    maxAge: 60 * 60 // 1시간,
    // updateAge: 60 * 60 // 1시간
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
          console.log(email, password);
          const res = await fetch(`${process.env.SERVER_URL}/members/login`, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
              'Content-Type': 'application/json'
            }
          });

          const user: UserResponse = await res.json();
          if (user.errorCode) {
            return null;
          }
          console.log(user.accessToken);

          return {
            id: user.accessToken,
            refreshToken: user.refreshToken,
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
      console.log(account);
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
        return true;
      }
      if (account?.provider === 'credentials') return true;

      return false;
    },
    // redirect: (url, baseUrl) => {
    //   return '/';
    // },

    session: ({ session, token }) => {
      // console.log(session, token);

      // if (
      //   res.headers.get('Authorization') &&
      //   res.headers.get('refreshtoken')
      // ) {
      //   const authorization = res.headers.get('authorization');
      //   const refreshToken = res.headers.get('refreshtoken');
      //   cookies().set('Authorization', authorization!, {
      //     expires: 3600,
      //     maxAge: 3600
      //   });
      //   cookies().set('RefreshToken', refreshToken!, {
      //     expires: 3600,
      //     maxAge: 3600
      //   });
      // }
      return {
        ...session,
        user: {
          ...session.user,
          ...decodeJwtResponse(token.sub!),
          accessToken: token.sub
        }
      };
    },
    jwt: async ({ user, token, account, profile, session, trigger }) => {
      // if (account) {
      //    token.refreshToken = refreshToken;
      //     token.accessTokenExpires = jwtParse(accessToken).exp;
      //   }
      const timeRemaing =
        token?.exp - (Math.floor(new Date().getTime() / 1000) + 10 * 60);

      if (timeRemaing <= 0) {
        const newToken = await refreshAccessToken(token.id);

        return { ...token, accessToken: newToken };
      }
      return token;
    }
  }
};

const refreshAccessToken = async (token: string) => {
  const res = await fetch(`${process.env.SERVER_URL}/members/refresh-token`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const newToken = await res.json();
  return newToken;
};
