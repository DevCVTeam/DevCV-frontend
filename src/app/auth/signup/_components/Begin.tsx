'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Label from '@/components/Label';
import { passwordRegex } from '@/utils/constant';
import { CompanyEnum, JobEnum } from '@/utils/enum';
import { getEmailSend } from '@/utils/fetch';
import { Authenticate } from '@/utils/imp';
import { companyOptions, jobOptions, teckstackOptions } from '@/utils/option';
import { cn } from '@/utils/style';
import { CompanyType, JobType } from '@/utils/type';
import { useContext, useRef, useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Select from 'react-select';
import ReactSelect from 'react-select/creatable';
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

  const handleEmailSend = async () => {
    const email = getValues('email');
    const certnumber = await getEmailSend(email);
    setVerification(certnumber);
  };

  const handleEmailCheck = () => {
    if (verificationRef.current?.value !== verification.toString()) {
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
    const {
      address,
      detailAddress,
      postalCode,
      confirmPassword,
      company,
      job,
      ...rest
    } = data;

    const res = await fetch(`/server/members/signup`, {
      method: 'POST',
      body: JSON.stringify({
        ...rest,
        social: 0,
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
    toast.success('이메일 인증 성공!!');
    setAgreements(2);
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
        <div className="flex w-full items-center gap-2">
          <div className="flex w-full flex-col gap-2">
            <Label htmlFor="email">
              이메일 &nbsp;
              {errors.email && (
                <small role="alert" className="text-red-400">
                  ※{errors.email.message}※
                </small>
              )}
            </Label>
            <div className="flex w-full gap-4">
              <Input
                {...register('email', {
                  required: '이메일 입력은 필수입니다.',
                  pattern: {
                    value:
                      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                    message: '이메일 형식에 맞지 않습니다.'
                  }
                })}
                placeholder="이메일을 작성해주세요."
                id="email"
                className="w-full"
                disabled={emailCheck ? true : false}
              />
              <Button
                className="self-end"
                type="button"
                onClick={handleEmailSend}
                disabled={emailCheck ? true : false}
              >
                인증번호 받기
              </Button>
            </div>
            <div className="flex w-full gap-4">
              <Input
                placeholder="인증번호"
                ref={verificationRef}
                className="w-full"
                disabled={emailCheck ? true : false}
              />
              <Button
                className="self-end"
                type="button"
                onClick={handleEmailCheck}
                disabled={emailCheck ? true : false}
              >
                인증하기
              </Button>
            </div>
          </div>
        </div>

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

        <Label htmlFor="nickName">닉네임</Label>
        <Input
          {...register('nickName', { required: true })}
          placeholder="닉네임을 작성해주세요"
          id="nickName"
          className="w-full"
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
                options={teckstackOptions}
                ref={ref}
                isMulti
                instanceId="stack-select"
                value={teckstackOptions.find(
                  (teckstackOption) => teckstackOption.value === value
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
          다음
        </Button>
      </form>
    </div>
  );
};

export default Begin;
