'use client';

import { signFn } from '@/utils/actions/jwt';
import { CompanyEnum, JobEnum } from '@/utils/enum';
import { getEmailSend } from '@/utils/fetch';
import { Authenticate } from '@/utils/imp';
import { CompanyType, JobType } from '@/utils/type';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useContext, useRef, useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { SignupContext } from '../_components/SignupProvider';

type TForm = {
  memberName: string;
  nickName: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: string;
  postalCode: string;
  detailAddress: string;
  job: JobType;
  company: CompanyType;
  phone: string;
  stack: string;
  // referrer: string;
};

const Begin = () => {
  const params = useSearchParams();
  const { data: session } = useSession();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    control,
    formState: { errors }
  } = useForm<TForm>({ mode: 'onChange' });

  const [authenticate, setAuthenticate] = useState(false);
  const open = useDaumPostcodePopup();
  const [verification, setVerification] = useState<string>('');
  const [duplicateCheck, setDuplicateCheck] = useState<boolean>(false);
  const [emailCheck, setEmailCheck] = useState(false);
  const verificationRef = useRef<HTMLInputElement>(null);
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
    setValue('postalCode', data.zonecode);
    setValue('address', data.address);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  const handleDuplicated = async () => {
    const email = getValues('email');
    const res = await fetch(
      `/server/members/duplication-email?email=${email}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    if (!res.ok) {
      const data = await res.json();
      return toast.error(data.message);
    }
    if (res.status < 300) {
      setDuplicateCheck(true);
      return toast.success('사용 가능한 이메일입니다.');
    } else {
      const data = await res.json();
      return toast.error(data.message);
    }
  };

  const handleEmailSend = async () => {
    if (!duplicateCheck) {
      return toast.error('이메일 중복확인을 해주세요');
    }
    const email = getValues('email');
    const certnumber = await getEmailSend(email);
    setVerification(certnumber);
  };

  const handleEmailCheck = () => {
    if (
      verificationRef.current?.value !== verification ||
      verification.length === 0
    ) {
      return toast.error('이메일 인증에 실패하였습니다.');
    }

    setEmailCheck(true);
    return toast.success('이메일 인증에 성공하셨습니다.');
  };

  const handleAuthenticate = async () => {
    const name = getValues('memberName');
    const { phone, name: named } = await Authenticate(name, () =>
      setAuthenticate(true)
    );
    setValue('phone', phone || '');
    toast.success('휴대전화 인증이 완료되었습니다.');
  };

  const onSubmit: SubmitHandler<TForm> = async (data) => {
    if (!authenticate || !emailCheck) {
      return toast.error('본인인증을 완료해주세요.');
    }
    const param = params.get('social');
    const social = param === 'google' ? 1 : param === null ? 0 : 2;

    const {
      address,
      detailAddress,
      postalCode,
      password,
      confirmPassword,
      company,
      job,
      ...rest
    } = data;
    const token = await signFn(password);

    const res = await fetch(`/server/members/signup`, {
      method: 'POST',
      body: JSON.stringify({
        ...rest,
        social,
        password: token,
        address: `${address}-(${postalCode})-${detailAddress}`,
        company: CompanyEnum[company],
        job: JobEnum[job]
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!res.ok) {
      const message = await res.json();
      return toast.error(`${message.errorCode} : ${message.message}`);
    }
    toast.success('회원가입 성공!!');
    if (social !== 0) {
      return router.push('/');
    }
    setAgreements(2);
  };

  return (
    <div className="flex w-full justify-center">
      <form
        className="flex w-full flex-col items-start gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Link href="/" className="group">
              <Image
                src="/logo.png"
                alt="DevCV Logo"
                width={40}
                height={40}
                className="size-10 transition-transform duration-300 group-hover:rotate-12 sm:size-12"
              />
            </Link>
            <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
              회원가입
            </h2>
          </div>

          <div className="w-full space-y-4">
            <button
              onClick={() => signIn('kakao', { callbackUrl: '/' })}
              className="flex w-full items-center justify-center gap-3 rounded-lg bg-[#FEE500] px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              <Image
                src="/icons/kakao.svg"
                alt="Kakao Logo"
                width={24}
                height={24}
                className="size-6 sm:size-7"
              />
              카카오로 시작하기
            </button>

            <button
              onClick={() => signIn('google', { callbackUrl: '/' })}
              className="flex w-full items-center justify-center gap-3 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              <Image
                src="/icons/google.svg"
                alt="Google Logo"
                width={24}
                height={24}
                className="size-6 sm:size-7"
              />
              구글로 시작하기
            </button>
          </div>

          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">또는</span>
            </div>
          </div>

          <div className="w-full space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                이메일
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm transition-all duration-300 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                비밀번호
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm transition-all duration-300 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700"
              >
                비밀번호 확인
              </label>
              <div className="mt-1">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm transition-all duration-300 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              다음
            </button>
          </div>

          <p className="text-center text-sm text-gray-500">
            이미 회원이신가요?{' '}
            <Link
              href="/auth/signin"
              className="font-medium text-blue-600 transition-colors hover:text-blue-500"
            >
              로그인
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Begin;
