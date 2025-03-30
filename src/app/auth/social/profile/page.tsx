'use client';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Label from '@/components/common/Label';
import { signupAction } from '@/utils/actions/signup';
import { Authenticate } from '@/utils/imp';
import { companyOptions, jobOptions, techstackOptions } from '@/utils/option';
import { cn } from '@/utils/style';
import { CompanyType, JobType } from '@/utils/type';
import { signOut, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Select from 'react-select';
import ReactSelect from 'react-select/creatable';
type TForm = {
  memberName: string;
  // nickName: string;
  // email: string;
  // password: string;
  // confirmPassword: string;
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
  const router = useRouter();

  useEffect(() => {
    if (session?.user.memberId) {
      router.push('/');
    }
  }, [session]);
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
  // const [emailCheck, setEmailCheck] = useState(false);
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

  // 서버에서 돌리기. password 노출하면 안됨
  // https://bandal.dev/React/react-hook-form-with-nextjs-server-actions
  const onSubmit: SubmitHandler<TForm> = async (data) => {
    const { stack, ...form } = data;
    const formData = new FormData();
    formData.append('stack', stack);
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    formData.append('authenticate', String(authenticate));
    formData.append('social', params.get('social') || '');
    formData.append('email', session?.user.email!);
    formData.append('nickName', session?.user.name!);
    const actionRes = await signupAction(formData);
    if (actionRes !== 'success') {
      return toast.error(actionRes);
    }
    toast.success('회원가입 성공!!');
    await signOut();
    return router.push('/auth/signin');
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
