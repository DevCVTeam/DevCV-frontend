'use client';

import Image from 'next/image';
import Link from 'next/link';
import Button from '../Button';

const Header = () => {
  // const router = useRouter();
  return (
    <header className="flex h-20 w-full items-center justify-between border-b px-4 lg:px-10">
      <Link href="/" className="flex">
        <Image
          src="/logo.png"
          alt="Logo"
          width={30}
          height={50}
          className="size-auto"
          objectFit="cover"
        />
        <b className="ml-3 self-center text-xl">DevCV</b>
      </Link>
      <nav className="flex items-center gap-2 lg:gap-3">
        <div>
          <Link href={'/event'}>
            <Button>이벤트</Button>
          </Link>
        </div>
        <div>
          <Link href={'/auth/signin'}>
            <Button>로그인</Button>
          </Link>
        </div>
        {/* <li>
            <Link href={'/event'}>이벤트</Link>
          </li>
          <li>
            <Link href={'/products/sale'}>판매하기</Link>
          </li>
          <li>
            <Link href={'/auth/signup'}>마이페이지</Link>
          </li> */}
      </nav>
    </header>
  );
};

export default Header;
