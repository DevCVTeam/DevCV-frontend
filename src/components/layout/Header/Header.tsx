'use client';

import Button from '@/components/common/Button';
import { useCartStore } from '@/store/useCartStore';
import { cn } from '@/utils/style';
import axios from 'axios';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
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
      className={`fixed left-0 top-0 z-50 mx-auto flex h-20 w-full items-center justify-between border-b bg-white bg-opacity-[0.5] px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32 shadow-sm transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <Link
        href="/"
        className="group relative flex items-center rounded-lg p-2 transition-all duration-300"
      >
        <div className="relative overflow-hidden">
          <Image
            src="/logo.png"
            alt="Logo"
            width={30}
            height={50}
            className="size-auto transform transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-main/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
        <b className="ml-3 self-center text-xl tracking-tight transition-colors duration-300 group-hover:text-sub">
          DevCV
        </b>
      </Link>

      <div className="flex items-center justify-between gap-6 font-Tenada">
        <div className="group hidden cursor-pointer whitespace-nowrap px-3 md:block">
          <span className="relative">
            기업 분류
            <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-sub transition-all duration-300 group-hover:w-full" />
          </span>
        </div>

        <div className="group hidden cursor-pointer whitespace-nowrap px-3 md:block">
          <span className="relative">
            기술 분류
            <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-sub transition-all duration-300 group-hover:w-full" />
          </span>
        </div>
      </div>

      <nav className="flex items-center gap-4">
        <Link
          href="/cart"
          className="group flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors duration-300 hover:text-sub"
        >
          <div className="relative">
            <div className="transform transition-transform duration-300 group-hover:scale-110">
              <BsCart3 className="size-5" />
            </div>
            {cartItems.length > 0 && (
              <span className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white ring-2 ring-white">
                {cartItems.length}
              </span>
            )}
          </div>
          <span className="hidden transform transition-transform duration-300 group-hover:scale-105 sm:block">
            장바구니
          </span>
        </Link>

        {status === 'authenticated' ? (
          session?.user.role === 'admin' ? (
            <div className="flex items-center gap-2 lg:gap-3">
              <div className="text-sm font-medium text-gray-700">
                {session.user?.memberName}님
              </div>
              <div>
                <Link href={'/admin'}>
                  <Button className="transform bg-gradient-to-r from-blue-600 to-main px-4 py-2 text-sm font-medium text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg">
                    관리자 페이지
                  </Button>
                </Link>
              </div>
              <div>
                <Button
                  className="transform bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-red-600 hover:shadow-lg"
                  onClick={() => signOut()}
                >
                  로그아웃
                </Button>
              </div>
            </div>
          ) : (
            <div className="relative flex items-center gap-2 lg:gap-3">
              <div className="hidden text-sm font-medium text-gray-700 sm:block">
                {session.user?.memberName}님
              </div>
              <div
                className="group flex cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white p-2 transition-all duration-300 hover:border-main hover:bg-main/5"
                onClick={handleNavClick}
              >
                <FaRegUser
                  size={20}
                  className="text-gray-600 transition-colors duration-300 group-hover:text-sub"
                />
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
                    <button className="group flex w-full items-center gap-3 px-4 py-2.5 text-[13px] text-gray-700 transition-colors duration-300 hover:bg-main/5">
                      <FaRegCalendarCheck
                        size={16}
                        className="hidden text-gray-900 transition-colors duration-300 group-hover:text-sub sm:block"
                      />
                      <span className="font-medium transition-colors duration-300 group-hover:text-sub sm:text-sm">
                        이벤트
                      </span>
                    </button>
                  </Link>
                  <Link href={'/resume/register'}>
                    <button className="group flex w-full items-center gap-3 px-4 py-2.5 text-[13px] text-gray-700 transition-colors duration-300 hover:bg-main/5">
                      <FaRegFileLines
                        size={16}
                        className="hidden text-gray-900 transition-colors duration-300 group-hover:text-sub sm:block"
                      />
                      <span className="font-medium transition-colors duration-300 group-hover:text-sub sm:text-sm">
                        판매하기
                      </span>
                    </button>
                  </Link>
                  <Link href={'/auth/profile'}>
                    <button className="group flex w-full items-center gap-3 px-4 py-2.5 text-[13px] text-gray-700 transition-colors duration-300 hover:bg-main/5">
                      <FaRegAddressCard
                        size={16}
                        className="hidden text-gray-900 transition-colors duration-300 group-hover:text-sub sm:block"
                      />
                      <span className="font-medium transition-colors duration-300 group-hover:text-sub sm:text-sm">
                        마이페이지
                      </span>
                    </button>
                  </Link>
                </div>
                <div className="border-t border-gray-100 py-1">
                  <button
                    onClick={() => signOut()}
                    className="group flex w-full items-center gap-3 px-4 py-2.5 text-[13px] text-red-500 transition-colors duration-300 hover:bg-red-50"
                  >
                    <FiLogOut
                      size={16}
                      className="hidden transition-colors duration-300 group-hover:text-red-600 sm:block"
                    />
                    <span className="font-medium transition-colors duration-300 group-hover:text-red-600 sm:text-sm">
                      로그아웃
                    </span>
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
                <Button className="transform bg-gradient-to-r from-blue-600 to-main px-4 py-2 text-sm font-medium text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  로그인
                </Button>
              </Link>
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  );
};

export default Header;
