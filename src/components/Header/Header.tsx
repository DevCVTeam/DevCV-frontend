'use client';

import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../Button';

const Header = () => {
  // const router = useRouter();
  const { status, data: session } = useSession();
  return (
    <header className="flex h-20 w-full items-center justify-between border-b px-4 lg:px-10">
      <Link href="/" className="flex">
        <Image
          src="/logo.png"
          alt="Logo"
          width={30}
          height={50}
          className="size-auto"
        />
        <b className="ml-3 self-center text-xl">DevCV</b>
      </Link>
      <nav>
        {status === 'authenticated' ? (
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="text-nowrap">{session.user?.name}님</div>
            <div>
              <Link href={'/event'}>
                <Button className="w-24">출석체크</Button>
              </Link>
            </div>
            <div>
              <Link href={'/products/register'}>
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
