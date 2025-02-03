'use client';

import axios from 'axios';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from '../Button';

const eventResume = [
  { id: '25', alt: '[네카라쿠배당토] 백엔드 이력서', src: '/bigtech.png' },
  { id: '4', alt: '[대기업] 프론트엔드 이력서', src: '/frontend.png' },
  { id: '26', alt: '[대기업] 백엔드 이력서', src: '/backend.png' }
];

const Header = () => {
  const { status, data: session } = useSession();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

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
        {eventResume.map((resume) => (
          <div
            className="hidden cursor-pointer px-3 hover:text-stone-500 xl:flex"
            onClick={() => router.push(`/resume/${resume.id}`)}
            key={resume.id}
          >
            {resume.alt}
          </div>
        ))}
        <div className="hidden cursor-pointer whitespace-nowrap px-3 hover:text-stone-500 md:block">
          기업 분류
        </div>

        <div className="hidden cursor-pointer whitespace-nowrap px-3 hover:text-stone-500 md:block">
          기술 분류
        </div>
      </div>
      <nav className="">
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
