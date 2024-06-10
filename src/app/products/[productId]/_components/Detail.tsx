'use client';

import { Badge } from '@/components/Badge';
import Button from '@/components/Button';
import { FaCheck } from 'react-icons/fa';

const Detail = () => {
  return (
    <div>
      <div>
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

export default Detail;
