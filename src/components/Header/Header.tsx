'use client';

import Image from 'next/image';
import Link from 'next/link';
import Button from '../Button';

const Header = () => {
  // const router = useRouter();
  return (
    <header className="border-b">
      <nav className="m-3 flex items-center justify-between">
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
        <ul className="flex list-none flex-row gap-3">
          <li>
            <Link href={'/event'}>
              <Button>이벤트</Button>
            </Link>
          </li>
          <li>
            <Link href={'/auth/signin'}>
              <Button>로그인</Button>
            </Link>
          </li>
          {/* <li>
            <Link href={'/event'}>이벤트</Link>
          </li>
          <li>
            <Link href={'/products/sale'}>판매하기</Link>
          </li>
          <li>
            <Link href={'/auth/signup'}>마이페이지</Link>
          </li> */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
