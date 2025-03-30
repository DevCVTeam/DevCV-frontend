'use client';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Label from '@/components/common/Label';
import { emailRegex } from '@/utils/constant';
import { getEmailSend } from '@/utils/fetch';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

const EmailFind = ({ onClose }: { onClose: () => void }) => {
  // const idRef = useRef<HTMLInputElement>(null);
  const [memberId, setMemberId] = useState(0);
  const emailRef = useRef<HTMLInputElement>(null);
  const verificationRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const checkPasswordRef = useRef<HTMLInputElement>(null);
  const [certnumber, setCertnumber] = useState('');
  const [auth, setAuth] = useState(false);
  const handleEmailSend = async () => {
    if (!emailRegex.test(emailRef.current?.value!)) {
      return toast.error('이메일을 제대로 작성해주세요.');
    }
    const cert = await getEmailSend(emailRef.current?.value!);
    setCertnumber(cert);
  };

  const handleEmailCheck = async () => {
    if (verificationRef.current?.value !== certnumber) {
      return toast.error('인증번호가 일치하지 않습니다.');
    }
    const res = await fetch(
      `/server/members/find-pw/email?email=${emailRef.current?.value}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    const data = await res.json();
    setMemberId(data.memberId);
    setAuth(true);
    toast.success('인증 성공!');
  };

  const handlePasswordChange = async () => {
    if (!auth) {
      return toast.error('인증을 진행해주세요.');
    }

    if (
      passwordRef.current?.value !== checkPasswordRef.current?.value ||
      passwordRef.current?.value.length! < 8 ||
      passwordRef.current?.value.length! > 16
    ) {
      return toast.error('패스워드를 확인해주세요');
    }
    const res = await fetch(
      `/server/members/${memberId}/${passwordRef.current?.value}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    if (!res.ok) {
      toast.error('비밀번호 변경에 실패하였습니다.');
    }
    toast.success('비밀번호 변경에 성공하였습니다.');
    onClose();
  };
  return (
    <div className="flex w-full flex-col gap-4">
      {/* <div className="flex flex-col">
        <Label htmlFor="id">ID</Label>
        <Input ref={idRef} id="id" />
      </div> */}
      <div className="flex flex-col">
        <Label htmlFor="email">Email</Label>
        <div className="flex gap-4">
          <Input ref={emailRef} id="email" disabled={auth ? true : false} />
          <Button
            type="button"
            onClick={handleEmailSend}
            disabled={auth ? true : false}
          >
            인증번호 받기
          </Button>
        </div>
      </div>
      <div className="flex flex-col">
        <Label htmlFor="verification">인증번호</Label>
        <div className="flex gap-4">
          <Input
            ref={verificationRef}
            id="verification"
            disabled={auth ? true : false}
          />
          <Button
            type="button"
            onClick={handleEmailCheck}
            disabled={auth ? true : false}
          >
            이메일 인증
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <Label htmlFor="password">비밀번호</Label>
          <Input ref={passwordRef} id="password" type="password" />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="checkPassword">비밀번호 확인</Label>
          <Input ref={checkPasswordRef} id="checkPassword" type="password" />
        </div>
      </div>
      <div className="flex gap-4">
        <Button
          onClick={onClose}
          className="w-full bg-subgray hover:bg-default"
        >
          취소하기
        </Button>
        <Button onClick={handlePasswordChange} className="w-full">
          비밀번호 변경
        </Button>
      </div>
    </div>
  );
};

export default EmailFind;
