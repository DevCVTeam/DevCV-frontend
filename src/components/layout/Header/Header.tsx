'use client';

import Button from '@/components/common/Button';
import { useCartStore } from '@/store/useCartStore';
import { cn } from '@/utils/style';
import axios from 'axios';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { BsCart3 } from 'react-icons/bs';
import {
  FaRegAddressCard,
  FaRegCalendarCheck,
  FaRegFileLines,
  FaRegUser
} from 'react-icons/fa6';
import { FiLogOut } from 'react-icons/fi';

const Header = () => {
  const { status, data: session } = useSession();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const [isNav, setIsNav] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const cartItems = useCartStore((state) => state.resumes);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  if (status === 'authenticated') {
    axios.defaults.headers.common['Authorization'] =
      `Bearer ${session?.user?.accessToken}`;
  }

  const handleNavClick = useCallback(() => {
    setIsNav((prev) => !prev);
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-50 flex h-20 w-full items-center justify-between border-b bg-white bg-opacity-[0.5] px-7 shadow-sm transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <Link
        href="/"
        className="flex items-center rounded-md p-2 transition-all duration-300 hover:bg-slate-200"
      >
        <Image
          src="/logo.png"
          alt="Logo"
          width={30}
          height={50}
          className="size-auto"
        />
        <b className="ml-3 self-center text-xl">DevCV</b>
      </Link>

      <div className="flex items-center justify-between gap-6 font-Tenada">
        <div className="hidden cursor-pointer whitespace-nowrap px-3 hover:text-stone-500 md:block">
          기업 분류
        </div>

        <div className="hidden cursor-pointer whitespace-nowrap px-3 hover:text-stone-500 md:block">
          기술 분류
        </div>
      </div>
      <nav className="flex gap-4">
        <Link
          href="/cart"
          className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <div className="relative">
            <BsCart3 className="size-5" />
            {cartItems.length > 0 && (
              <span className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {cartItems.length}
              </span>
            )}
          </div>
          <span className="hidden sm:block">장바구니</span>
        </Link>
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
            <div className="relative flex items-center gap-2 lg:gap-3">
              <div className="hidden text-sm font-medium sm:block">
                {session.user?.memberName}님
              </div>
              <div
                className="flex cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white p-2 hover:bg-gray-50"
                onClick={handleNavClick}
              >
                <FaRegUser size={20} className="text-gray-600" />
              </div>
              <nav
                className={cn(
                  'absolute right-0 top-12 min-w-[180px] rounded-lg border bg-white py-2 shadow-lg',
                  'z-50 transition-all duration-200',
                  'xs:min-w-[200px] sm:min-w-[220px] md:min-w-[240px]',
                  isNav
                    ? 'visible translate-y-0 opacity-100'
                    : 'invisible translate-y-2 opacity-0'
                )}
              >
                <div className="border-b border-gray-100 px-4 py-2">
                  <p className="font-medium text-gray-900">내 계정</p>
                  <p className="mt-1 text-xs text-gray-500 sm:hidden">
                    {session.user?.memberName}님
                  </p>
                </div>
                <div className="py-1">
                  <Link href={'/event'}>
                    <button className="flex w-full items-center gap-3 px-4 py-2.5 text-[13px] text-gray-700 hover:bg-gray-50">
                      <FaRegCalendarCheck
                        size={16}
                        className="hidden text-gray-500 sm:block"
                      />
                      <span className="font-medium sm:text-sm">이벤트</span>
                    </button>
                  </Link>
                  <Link href={'/resume/register'}>
                    <button className="flex w-full items-center gap-3 px-4 py-2.5 text-[13px] text-gray-700 hover:bg-gray-50">
                      <FaRegFileLines
                        size={16}
                        className="hidden text-gray-500 sm:block"
                      />
                      <span className="font-medium sm:text-sm">판매하기</span>
                    </button>
                  </Link>
                  <Link href={'/auth/profile'}>
                    <button className="flex w-full items-center gap-3 px-4 py-2.5 text-[13px] text-gray-700 hover:bg-gray-50">
                      <FaRegAddressCard
                        size={16}
                        className="hidden text-gray-500 sm:block"
                      />
                      <span className="font-medium sm:text-sm">마이페이지</span>
                    </button>
                  </Link>
                </div>
                <div className="border-t border-gray-100 py-1">
                  <button
                    onClick={() => signOut()}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-[13px] text-red-500 hover:bg-gray-50"
                  >
                    <FiLogOut size={16} className="hidden sm:block" />
                    <span className="font-medium sm:text-sm">로그아웃</span>
                  </button>
                </div>
              </nav>
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
