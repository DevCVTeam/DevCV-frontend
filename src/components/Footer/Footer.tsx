'use client';

import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="mt-12 flex flex-col justify-between border-t pt-4">
      <nav className="flex flex-col gap-4 p-4 sm:flex-row sm:justify-between sm:p-8">
        <Link
          href="/"
          className="flex items-center gap-2 transition-all duration-300 hover:bg-gray-50 rounded-lg p-2"
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={30}
            height={50}
            className="size-auto"
          />
          <span className="text-lg font-semibold text-gray-900">DevCV</span>
        </Link>

        <ul className="flex flex-wrap gap-4 text-sm text-gray-600 sm:items-center">
          <li className="cursor-pointer hover:text-gray-900">기업소개</li>
          <li className="cursor-pointer hover:text-gray-900">이용약관</li>
          <li className="cursor-pointer hover:text-gray-900">
            개인정보 처리방침
          </li>
          <li className="cursor-pointer hover:text-gray-900">고객센터</li>
          <li className="cursor-pointer hover:text-gray-900">광고문의</li>
        </ul>
      </nav>

      <div className="flex flex-col gap-2 px-4 pb-8 text-xs text-gray-500 sm:px-8 md:text-sm">
        <div className="flex flex-col gap-1 sm:flex-row sm:gap-2">
          <span>(주)모였조 대표이사</span>
          <span className="hidden sm:block">|</span>
          <span>ㅇㅇㅇ 서울특별시 송파구 올림픽로 300, 롯데월드타워 73층</span>
        </div>

        <div className="flex flex-col gap-1 sm:flex-row sm:gap-2">
          <span>전화번호: (629) 555-0129</span>
          <span className="hidden sm:block">|</span>
          <span>사업자등록번호: 299-86-00021</span>
        </div>

        <div className="flex flex-col gap-1 sm:flex-row sm:gap-2">
          <span>통신판매번호: 2020-서울송파-3147</span>
          <span className="hidden sm:block">|</span>
          <span>
            유료직업소개사업등록번호: (국내) 제2020-3230259-14-5-00018호
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
