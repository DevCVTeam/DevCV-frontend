'use server';

import { CompanyEnum, JobEnum } from '../enum';
import { CompanyType, JobType } from '../type';
import { signFn } from './jwt';

export const signupAction = async (data: FormData) => {
  if (!data.get('authenticate')) {
    return '본인인증을 완료해주세요.';
  }

  const param = data.get('social');
  const social = param === 'google' ? 1 : param === null ? 0 : 2;

  const address = data.get('address');
  const detailAddress = data.get('detailAddress');
  const postalCode = data.get('postalCode');
  const company = data.get('company');
  const job = data.get('job');
  const stack = data.get('stack') as string;

  const phone = data.get('phone');
  const email = data.get('email');
  const nickName = data.get('nickName');
  const memberName = data.get('memberName');
  const password = await signFn(process.env.NEXT_PUBLIC_SOCIAL_PASSWORD!);

  const res = await fetch(`${process.env.SERVER_URL}/members/signup`, {
    method: 'POST',
    body: JSON.stringify({
      email,
      nickName,
      memberName,
      social,
      password,
      address: `${address}-(${postalCode})-${detailAddress}`,
      company: CompanyEnum[company as CompanyType],
      stack: stack.split(','),
      phone,
      job: JobEnum[job as JobType]
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    const message = await res.json();
    return `${message.errorCode} : ${message.message}`;
  }
  return 'success';
};
