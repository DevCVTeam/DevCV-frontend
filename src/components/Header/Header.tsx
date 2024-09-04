// Header.tsx
'use client';

import axios from 'axios';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../Button';

const Header = () => {
  const { status, data: session } = useSession();

  if (status === 'authenticated') {
    axios.defaults.headers.common['Authorization'] =
      `Bearer ${session?.user.accessToken}`;
  }

  return (
    <header className="fixed left-0 top-0 z-50 flex h-20 w-full items-center justify-between border-b bg-white bg-opacity-[0.5] shadow-md">
      <Link href="/" className="ml-10 flex">
        <Image
          src="/logo.png"
          alt="Logo"
          width={30}
          height={50}
          className="size-auto"
        />
        <b className="ml-3 self-center text-xl">DevCV</b>
      </Link>
      <nav className="mr-10">
        {status === 'authenticated' ? (
          session?.user.role === 'admin' ? (
            <div className="flex items-center gap-2 lg:gap-3">
              <div>{session.user?.memberName}님</div>
              <div>
                <Link href={'/admin'}>
                  <Button className="w-32">관리자 페이지</Button>
                </Link>
              </div>
              <div>
                <Button className="w-24" onClick={() => signOut()}>
                  로그아웃
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 lg:gap-3">
              <div>{session.user?.memberName}님</div>
              <div>
                <Link href={'/event'}>
                  <Button className="w-24">이벤트</Button>
                </Link>
              </div>
              <div>
                <Link href={'/resume/register'}>
                  <Button className="w-24">판매하기</Button>
                </Link>
              </div>
              <div>
                <Link href={'/auth/profile'}>
                  <Button className="w-24">마이페이지</Button>
                </Link>
              </div>
              <div>
                <Button className="w-24" onClick={() => signOut()}>
                  로그아웃
                </Button>
              </div>
            </div>
          )
        ) : null}
        {status === 'unauthenticated' ? (
          <div className="flex items-center gap-2 lg:gap-3">
            <div>
              <Link href={'/auth/signin'}>
                <Button>로그인</Button>
              </Link>
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  );
};

export default Header;
