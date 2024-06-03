'use client';

import Image from 'next/image';
import React from 'react';

const Header = () => {
  return (
    <header className="h-10 w-full">
      <nav className="mx-3 my-1 flex justify-between">
        <Image src={'/logo.webp'} alt="logo" width={30} height={40} />

        <ul className="flex list-none flex-row gap-5">
          <li>이벤트</li>
          <li>구매목록</li>
          <li>마이페이지</li>
          <li>로그인</li>
          <li>관리자 로그인</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
