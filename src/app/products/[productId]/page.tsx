'use client';

import { Badge } from '@/components/Badge';
import Button from '@/components/Header/Button';
import Image from 'next/image';
import { FaCheck } from 'react-icons/fa';

const ProductsPage = () => {
  return (
    <div className="flex flex-1 flex-col">
      <div className="relative mb-12 h-full">
        {/* 배경 흐리게 하기 - 여기에 blur 적용 */}
        <div className="absolute inset-0 h-80 w-full rounded-lg bg-[url('/thumbnail.png')] bg-cover bg-center bg-no-repeat blur-lg">
          {/* 어두운 레이어 추가 */}
          <div className="absolute inset-0 bg-slate-800 opacity-50"></div>
        </div>
        {/* 콘텐츠 레이어 - blur-sm 클래스 제거 */}
        <div className="relative z-10 m-4 flex flex-1 flex-row items-center justify-center gap-12 text-white">
          {/* 제품 이미지 */}
          <div>
            <Image
              src="/thumbnail.png"
              alt="Product Image"
              width={300}
              height={300}
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-sm">
              <span className="text-slate-300">기업 분류</span>
              <h2 className="text-xl">
                취준을 마음먹으면 봐야되는 필수 입문서
              </h2>
            </div>
            <span>판매자</span>
            <span>React</span>

            <span>가격</span>
            <Button className="bg-main text-black hover:bg-hover">
              결제하기
            </Button>
          </div>
        </div>
      </div>
      <div className="relative mx-4 mt-8 flex justify-center gap-4">
        <div className="m-0 inline-block w-72 text-center uppercase text-black after:block after:scale-x-0 after:border-b-4 after:border-sub after:transition-transform after:duration-200 after:content-[''] hover:text-sub hover:after:scale-x-100">
          상품 상세
        </div>
        <div className="m-0 inline-block w-72 text-center uppercase text-black after:block after:scale-x-0 after:border-b-4 after:border-sub after:transition-transform after:duration-200 after:content-[''] hover:text-sub hover:after:scale-x-100">
          구매 후기
        </div>
        <div className="m-0 inline-block w-72 text-center uppercase text-black after:block after:scale-x-0 after:border-b-4 after:border-sub after:transition-transform after:duration-200 after:content-[''] hover:text-sub hover:after:scale-x-100">
          상품 문의
        </div>
      </div>

      <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow">
        <div className="flex items-start justify-between">
          <div className="flex">
            <div className="ml-4">
              <h2 className="text-2xl font-semibold">Jane Doe</h2>
              <div className="my-1 flex space-x-1">
                <Badge variant="secondary">UX</Badge>
                <Badge variant="secondary">UI</Badge>
                <Badge variant="secondary">UXUI</Badge>
                <Badge>Designer</Badge>
              </div>
              <div className="my-1 flex space-x-4">
                <div className="flex items-center">
                  <FaCheck className="size-4 text-green-500" />
                  <span className="ml-1 text-sm">주요 경력 및 이력</span>
                </div>
                <div className="flex items-center">
                  <FaCheck className="size-4 text-default" />
                  <span className="ml-1 text-sm">인증 완료</span>
                </div>
              </div>
              <div className="my-1">
                <p className="text-sm">현) NA사 UX 디자이너</p>
                <p className="text-sm">전) S그룹 대기업 UX 디자이너</p>
              </div>
              <div className="my-1 flex space-x-4">
                <div className="flex items-center">
                  <FaCheck className="size-4 text-green-500" />
                  <span className="ml-1 text-sm">활동 내역</span>
                </div>
                <div className="flex items-center">
                  <FaCheck className="size-4 text-gray-500" />
                  <span className="ml-1 text-sm">인증 완료</span>
                </div>
              </div>
              <p className="text-sm">
                카카오, 라인, 쿠팡, 배민 등 메이저 디자이너 스타트업 신규 합격
                15회
                <br />
                사이드 프로젝트: 네이버, 카카오, 쿠팡 개발자와 협업 중인 레더
                어워드 수상
              </p>
            </div>
          </div>
          <Button className="bg-green-500 text-white hover:bg-green-600">
            공유자 정보 다운로드
          </Button>
        </div>
        <div className="mt-6">
          <p className="text-sm">(이력서 관련정보 markdown 등이감)</p>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
