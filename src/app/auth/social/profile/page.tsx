'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Label from '@/components/Label';
import { passwordRegex } from '@/utils/constant';
import { CompanyEnum, JobEnum } from '@/utils/enum';
import { Authenticate } from '@/utils/imp';
import { signFn } from '@/utils/jwt';
import { companyOptions, jobOptions, techstackOptions } from '@/utils/option';
import { cn } from '@/utils/style';
import { CompanyType, JobType } from '@/utils/type';
import { signOut, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Select from 'react-select';
import ReactSelect from 'react-select/creatable';
type TForm = {
  memberName: string;
  // nickName: string;
  // email: string;
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

const Profile = () => {
  const params = useSearchParams();
  const { data: session } = useSession();
  console.log(session);
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
  const [emailCheck, setEmailCheck] = useState(false);
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

  const handleAuthenticate = async () => {
    const name = getValues('memberName');
    const { phone, name: named } = await Authenticate(name, () =>
      setAuthenticate(true)
    );
    setValue('phone', phone || '');
    toast.success('휴대전화 인증이 완료되었습니다.');
  };

  const onSubmit: SubmitHandler<TForm> = async (data) => {
    if (!authenticate) {
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
        email: session?.user.email,
        nickName: session?.user.name,
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

    router.push('/');
    return await signOut();
  };

  return (
    <div className="flex w-full justify-center">
      <form
        className="flex w-full flex-col items-start gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Label htmlFor="memberName">
          이름&nbsp;
          {errors.memberName && (
            <small role="alert" className="text-red-400">
              ※{errors.memberName.message}※
            </small>
          )}
        </Label>
        <Input
          {...register('memberName', { required: true })}
          placeholder="이름을 작성해주세요."
          id="memberName"
          className="w-full"
        />

        <Label htmlFor="password">
          패스워드{' '}
          {errors.password && (
            <small role="alert" className="text-red-400">
              ※{errors.password.message || '최소 8글자 최대 16자 입력'}※
            </small>
          )}
        </Label>
        <Input
          {...register('password', { required: true })}
          id="password"
          type="password"
          className="w-full"
          placeholder={'최소 8글자 최대 16자 입력'}
          {...register('password', {
            required: true,
            minLength: 8,
            maxLength: 16,
            pattern: {
              value: passwordRegex,
              message: '잘못된 패스워드 입니다.'
            }
          })}
        />
        <Label htmlFor="confirmPassword">
          패스워드 확인 패스워드{' '}
          {errors.confirmPassword && (
            <small role="alert" className="text-red-400">
              ※{errors.confirmPassword.message || '최소 8글자 최대 16자 입력'}※
            </small>
          )}
        </Label>
        <Input
          {...register('confirmPassword', { required: true })}
          placeholder="패스워드를 다시한번 작성해주세요."
          id="confirmPassword"
          type="password"
          className="w-full"
          {...register('confirmPassword', {
            required: true,
            minLength: 8,
            maxLength: 16,
            validate: {
              check: (val) => {
                if (getValues('password') !== val) {
                  return '비밀번호가 일치하지 않습니다.';
                }
              }
            }
          })}
        />

        <hr className="w-full border-main" />
        <div className="flex w-full flex-col gap-2">
          <div className="flex gap-4">
            <div className="flex w-3/4 flex-col">
              <Label htmlFor="address">주소</Label>
              <Input
                {...register('address', { required: true })}
                placeholder="주소를 작성해주세요"
                id="address"
                className="w-full self-start"
                disabled
              />
            </div>

            <Input
              {...register('postalCode', { required: true })}
              placeholder="도로명 주소"
              id="address"
              className="w-1/5 self-end"
              disabled
            />
            <Button
              className="w-1/4 self-end"
              onClick={handleClick}
              type="button"
            >
              주소 찾기
            </Button>
          </div>
          <Input
            {...register('detailAddress', { required: true })}
            placeholder="상세주소를 작성해주세요"
            className="mt-4"
          />
        </div>
        <Label htmlFor="phone">전화번호</Label>
        <Button
          onClick={handleAuthenticate}
          type="button"
          disabled={authenticate ? true : false}
          className={cn(
            authenticate ? 'bg-slate-400 hover:bg-slate-400' : null
          )}
        >
          {authenticate ? '인증완료' : '본인인증'}
        </Button>

        <hr className="w-full border-main" />
        <Label htmlFor="company">
          기업종류 &nbsp;
          {errors.company && (
            <small role="alert" className="text-red-400">
              ※{errors.company.message || '선택해주세요'}※
            </small>
          )}
        </Label>
        <Controller
          control={control}
          name="company"
          rules={{ required: true }}
          render={({ field: { onChange, value, ref } }) => (
            <Select
              inputId="company"
              options={companyOptions}
              instanceId="company-select"
              className="w-full"
              ref={ref}
              value={companyOptions.find(
                (companyOption) => companyOption.value === value
              )}
              onChange={(companyOption) => onChange(companyOption?.value)}
            />
          )}
        />
        <Label htmlFor="job">
          직무 &nbsp;
          {errors.job && (
            <small role="alert" className="text-red-400">
              ※{errors.job.message || '선택해주세요'}※
            </small>
          )}
        </Label>
        <Controller
          control={control}
          name="job"
          rules={{ required: true }}
          render={({ field: { onChange, value, ref } }) => (
            <Select
              inputId="job"
              options={jobOptions}
              instanceId="job-select"
              className="w-full"
              ref={ref}
              value={jobOptions.find((jobOption) => jobOption.value === value)}
              onChange={(jobOption) => onChange(jobOption?.value)}
            />
          )}
        />

        <div className="w-full">
          <Label htmlFor="techStack">
            기술 스택&nbsp;
            {errors.stack && (
              <small role="alert" className="text-red-400">
                ※{errors.stack.message || '선택해주세요'}※
              </small>
            )}
          </Label>
          <Controller
            control={control}
            name="stack"
            shouldUnregister={true}
            render={({ field: { onChange, value, ref } }) => (
              <ReactSelect
                inputId="stack"
                className="w-full"
                options={techstackOptions}
                ref={ref}
                isMulti
                instanceId="stack-select"
                value={techstackOptions.find(
                  (techstackOption) => techstackOption.value === value
                )}
                onChange={(selectedOptions) =>
                  onChange(
                    selectedOptions
                      ? selectedOptions.map((option) => option.value)
                      : []
                  )
                }
              />
            )}
          />
        </div>

        <Button className="my-4 w-full" type="submit">
          회원가입
        </Button>
      </form>
    </div>
  );
};

export default Profile;
