'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Label from '@/components/Label';
import { scriptUrl } from '@/utils/constant';
import axios from 'axios';
import Link from 'next/link';
import Script from 'next/script';
import { useContext, useRef } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { SignupContext } from '../_components/SignupProvider';
const Begin = () => {
  const idRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const pwdRef = useRef<HTMLInputElement>(null);
  const confirmPwdRef = useRef<HTMLInputElement>(null);
  const nicknameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);

  const zipCodeRef = useRef<HTMLInputElement>(null);
  const teamRef = useRef<HTMLInputElement>(null);
  const positionRef = useRef<HTMLInputElement>(null);
  const techStackRef = useRef<HTMLInputElement>(null);
  const recommendRef = useRef<HTMLInputElement>(null);
  const open = useDaumPostcodePopup(scriptUrl);
  const { agreements, setAgreements } = useContext(SignupContext);
  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };
  const handleSubmit = () => {
    try {
      const { IMP } = window;
      IMP?.init(process.env.NEXT_PUBLIC_IMP!);
      // IMP.certification(param, callback) 호출
      IMP?.certification(
        {
          // param
          pg: 'inicis_unified', //본인인증 설정이 2개이상 되어 있는 경우 필수
          merchant_uid: process.env.NEXT_PUBLIC_MERCHANT_UID!, // 주문 번호
          m_redirect_url: 'http://localhost:3000', // 모바일환경에서 popup:false(기본값) 인 경우 필수, 예: https://www.myservice.com/payments/complete/mobile
          popup: false // PC환경에서는 popup 파라미터가 무시되고 항상 true 로 적용됨
        },
        async (rsp: any) => {
          // callback
          if (rsp.success) {
            const { imp_uid } = rsp.imp_uid;
            console.log(rsp);
            // 인증 토큰 발급 받기
            const getToken = await axios.post(
              'https://api.iamport.kr/users/getToken',
              {
                // REST API키
                imp_key: process.env.NEXT_PUBLIC_REST_KEY!,
                // REST API Secret
                imp_secret: process.env.NEXT_PUBLIC_SECRET_KEY!
              },
              {
                // "Content-Type": "application/json"
                headers: { 'Content-Type': 'application/json' }
              }
            );
            // 인증 토큰
            const { access_token } = getToken.data;
            // imp_uid로 인증 정보 조회
            const getCertifications = await axios({
              // imp_uid 전달
              url: `https://api.iamport.kr/certifications/${imp_uid}`,
              // GET method
              method: 'get',
              // 인증 토큰 Authorization header에 추가
              headers: { Authorization: access_token }
            });
            // 조회한 인증 정보
            const certificationsInfo = getCertifications.data;
          } else {
            window.alert(`인증 실패되었습니다..${rsp.error}`);
          }
        }
      );
    } catch (error) {
      console.log('send error ! : ' + error);
    }
  };
  const handleNext = () => {
    setAgreements(2);
    console.log(agreements);
  };
  return (
    <div className="flex justify-center">
      <Script src="https://cdn.iamport.kr/v1/iamport.js" />

      <form className="flex flex-col items-start gap-4">
        <div className="flex w-full items-center gap-2">
          <div className="flex w-full flex-col gap-2">
            <Label htmlFor="id">아이디</Label>
            <Input
              ref={idRef}
              placeholder="아이디를 작성해주세요."
              id="id"
              className="w-full"
            />
          </div>
          <Button className="self-end" type="button">
            중복확인
          </Button>
        </div>
        <div className="flex w-full items-center gap-2">
          <div className="flex w-full flex-col gap-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              ref={emailRef}
              placeholder="이메일을 작성해주세요."
              id="email"
            />
          </div>
          <Button className="self-end" type="button">
            중복확인
          </Button>
        </div>
        <Label htmlFor="password">패스워드</Label>
        <Input
          ref={pwdRef}
          placeholder="패스워드를 작성해주세요."
          id="password"
          className="w-full"
        />
        <Label htmlFor="confirmPwd">패스워드 확인</Label>
        <Input
          ref={confirmPwdRef}
          placeholder="패스워드를 다시한번 작성해주세요."
          id="confirmPwd"
          className="w-full"
        />
        <Label htmlFor="nickname">닉네임</Label>
        <Input
          ref={nicknameRef}
          placeholder="닉네임을 작성해주세요"
          id="nickname"
          className="w-full"
        />
        <Button onClick={handleSubmit} type="button">
          본인인증
        </Button>
        <hr className="w-full border-main" />
        <div className="flex flex-col gap-2">
          <div className="flex w-full gap-4">
            <div className="flex w-full flex-col">
              <Label htmlFor="address">주소</Label>
              <Input
                ref={addressRef}
                placeholder="주소를 작성해주세요"
                disabled
                id="address"
                className="w-full self-start"
              />
            </div>

            <Input
              ref={zipCodeRef}
              placeholder="도로명 주소"
              id="address"
              className="w-1/5 self-end"
              disabled
            />
            <Button className="self-end" onClick={handleClick}>
              주소 찾기
            </Button>
          </div>
          <Input
            ref={addressRef}
            placeholder="상세주소를 작성해주세요"
            className="mt-4"
          />
        </div>
        <Label htmlFor="phone">전화번호</Label>
        {/* 휴대전화는 Button 으로 팝업창 띄어지게 진행 */}

        <hr className="w-full border-main" />
        <Label htmlFor="team">소속 / 직장 / 학교</Label>
        <Input
          ref={teamRef}
          placeholder="소속/직장/학교 을(를) 작성해주세요"
          id="team"
          className="w-full"
        />
        <Label htmlFor="position">직무</Label>
        <Input
          ref={positionRef}
          placeholder="직무를 작성해주세요"
          id="position"
          className="w-full"
        />
        <Label htmlFor="techStack">기술 스택</Label>
        <Input
          ref={techStackRef}
          placeholder="기술스택을 작성해주세요"
          id="techStack"
          className="w-full"
        />
        <Label htmlFor="recommend">추천인</Label>
        <Input
          ref={recommendRef}
          placeholder="추천인을 작성해주세요"
          id="recommend"
          className="w-full"
        />
        <Button
          className="my-4 w-full"
          type="button"
          onClick={() => setAgreements(2)}
        >
          <Link href={'/auth/signup'}>다음</Link>
        </Button>
      </form>
    </div>
  );
};

export default Begin;
