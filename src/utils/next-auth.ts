import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import { cookies } from 'next/headers';
import { SocialResponse, UserResponse } from './type';
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
  // secret: process.env.NEXTAUTH_SECRET,
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
          const { email, password } = credentials!;
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
          const { memberId, role, social, memberName, emailRes, exp } =
            decodeJwtResponse(user.accessToken);
          return {
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
            id: memberId,
            email: user.email,
            memberName: memberName,
            role,
            social,
            exp
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
      const cookieStore = cookies();
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
        const data: SocialResponse = await res.json();
        const setCookieHeader = res.headers.get('Set-Cookie');
        const refreshTokenMatch =
          setCookieHeader?.match(/RefreshToken=([^;]+)/);
        const refreshToken = refreshTokenMatch ? refreshTokenMatch[1] : null;
        // cookieStore.set('RefreshToken', res.headers.get(""));
        cookieStore.set('Authorization', data.accessToken, {
          expires: new Date(Date.now() + 60 * 60 * 1000)
        });
        cookieStore.set('RefreshToken', refreshToken!, {
          expires: new Date(Date.now() + 60 * 60 * 1000)
        });
        user.accessToken = data.accessToken;
        user.refreshToken = refreshToken!;
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
          console.log(await res.json());
          return false;
        }
        const data: SocialResponse = await res.json();
        console.log(data);
        console.log('data');
        const setCookieHeader = res.headers.get('Set-Cookie');
        const refreshTokenMatch =
          setCookieHeader?.match(/RefreshToken=([^;]+)/);
        const refreshToken = refreshTokenMatch ? refreshTokenMatch[1] : null;
        // cookieStore.set('RefreshToken', res.headers.get(""));
        cookieStore.set('Authorization', data.accessToken, {
          expires: new Date(Date.now() + 60 * 60 * 1000)
        });
        cookieStore.set('RefreshToken', refreshToken!, {
          expires: new Date(Date.now() + 60 * 60 * 1000)
        });
        user.accessToken = data.accessToken;
        user.refreshToken = refreshToken!;
        return true;
      }
      if (account?.provider === 'credentials') {
        cookieStore.set('RefreshToken', user.refreshToken, {
          expires: new Date(Date.now() + 60 * 60 * 1000)
        });
        cookieStore.set('Authorization', user.accessToken, {
          expires: new Date(Date.now() + 60 * 60 * 1000)
        });
        return true;
      }

      return false;
    },
    // redirect: (url, baseUrl) => {
    //   return '/';
    // },

    session: ({ session, token }) => {
      console.log(session, token);
      return {
        ...session,
        user: {
          ...session.user,
          ...decodeJwtResponse(token.accessToken!),
          accessToken: token.accessToken,
          refreshToken: token.refreshToken
        }
      };
    },
    jwt: async ({ user, token, account, profile, session, trigger }) => {
      if (trigger === 'update' || trigger === 'signIn') {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        return token;
      }
      const iat =
        decodeJwtResponse(token.accessToken).exp -
        (Math.floor(new Date().getTime() / 1000) + 10 * 60);
      console.log(decodeJwtResponse(token.accessToken));
      if (iat <= 0) {
        const newToken = await refreshAccessToken(token.id);
        console.log(newToken);
        return { ...token, accessToken: newToken };
      } else {
        console.log({ ...token });
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
