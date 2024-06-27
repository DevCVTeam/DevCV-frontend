'use client';

const Footer = () => {
  return (
    <footer className="mt-12 flex flex-col justify-between border-t pt-4">
      <nav className="flex justify-between p-8">
        <h4 className="text-xl font-semibold">DevCV</h4>
        <ul className="flex list-none flex-row gap-6">
          <li>기업소개</li>
          <li>이용약관</li>
          <li>개인정보 처리방침</li>
          <li>고객센터</li>
          <li>광고문의</li>
        </ul>
      </nav>
      <span className="px-8 pb-8">
        <div>(주)모였조 대표이사</div>
        <div>ㅇㅇㅇ 서울특별시 송파구 올림픽로 300, 롯데월드타워 73층 </div>
        <div>전화번호: (629) 555-0129 </div>
        <div>사업자등록번호: 299-86-00021</div>
        <div>
          통신판매번호: 2020-서울송파-3147 유료직업소개사업등록번호: (국내)
          제2020-3230259-14-5-00018호
        </div>
      </span>
    </footer>
  );
};

export default Footer;
