'use client';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Label from '@/components/common/Label';
import { companyOptions, jobOptions, techstackOptions } from '@/utils/option';
import { CompanyType, JobType, UserInfo } from '@/utils/type';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Select from 'react-select';
import ReactSelect from 'react-select/creatable';

type TUserData = {
  memberId: number;
  email: string;
  memberName: string;
  phone: string;
  company: CompanyType;
  password: string;
  confirmPassword: string;
  nickName: string;
  job: JobType;
  stack: string;
  address: string;
};

// 유저 값을 전역 변수로 사용하자!!
const UserDetailsEditor: FC<UserInfo & { token: string }> = ({
  token,
  address,
  company,
  email,
  job,
  memberId,
  nickName,
  memberName,
  phone,
  stack
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    control,
    formState: { errors }
  } = useForm<TUserData>({
    mode: 'onChange',
    defaultValues: {
      address,
      company,
      email,
      nickName,
      job,
      memberId,
      memberName,
      phone,
      stack
    }
  });

  const handleEditUser: SubmitHandler<TUserData> = async (data) => {
    const res = await fetch(`/server/members/${memberId}`, {
      method: 'PUT',
      body: JSON.stringify({
        memberName: data.memberName,
        nickName: data.nickName,
        email: data.email,
        // "password": data.,
        phone: '010-3352-3921',
        address: '경기도 성남시 분당구 정자일로 95',
        social: 1,
        job: 1,
        company: 1,
        stack: ['React', 'NextJS', 'tailwind', 'Jenkins']
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    const userResponse = await res.json();
    toast.success(`${userResponse.resumeId} 이력서를 등록했습니다.`);
    return router.push('/');
  };
  return (
    <div className="flex flex-col gap-20">
      <form
        onSubmit={handleSubmit(handleEditUser)}
        className="flex flex-col gap-20"
      >
        <div>
          <h3 className="mt-8 text-2xl text-sub">개인정보 수정</h3>
          <div className="mt-8 flex justify-between gap-4">
            <div className="flex w-2/4 flex-col gap-4">
              <Label htmlFor="email">이메일</Label>
              <Input
                {...register('email', { required: true })}
                placeholder="이메일을 작성해주세요."
                id="email"
                className="w-full"
              />
              <Label htmlFor="memberName">이름</Label>
              <Input
                {...register('memberName', { required: true })}
                placeholder="이름을 작성해주세요."
                id="memberName"
                className="w-full"
              />
              <Label htmlFor="phone">전화번호</Label>
              <Input
                {...register('phone', { required: true })}
                placeholder="전화번호를 입력해주세요."
                id="phone"
                className="w-full"
              />
              <Label htmlFor="password">패스워드 확인</Label>
              <Input
                {...register('password', { required: true })}
                placeholder="기술스택을 선택해주세요"
                id="password"
                className="w-full"
                type="password"
              />
            </div>
            <div className="flex w-2/4 flex-col gap-4">
              <Label htmlFor="company">
                기업 종류
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
                    className="h-12 w-full pt-2"
                    ref={ref}
                    value={companyOptions.find(
                      (companyOption) => companyOption.value === value
                    )}
                    onChange={(companyOption) => onChange(companyOption?.value)}
                  />
                )}
              />
              <Label htmlFor="job">
                직무
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
                    className="h-12 w-full pt-2"
                    ref={ref}
                    value={jobOptions.find(
                      (jobOption) => jobOption.value === value
                    )}
                    onChange={(jobOption) => onChange(jobOption?.value)}
                  />
                )}
              />

              <Label htmlFor="stack">
                기술 스택
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
                    className="h-12 w-full pt-2"
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
              <Label htmlFor="confirmPassword">패스워드 확인</Label>
              <Input
                {...register('confirmPassword', { required: true })}
                placeholder="기술스택을 선택해주세요"
                id="confirmPassword"
                className="w-full"
                type="password"
              />
            </div>
          </div>
        </div>
        <Button className="self-center" type="submit">
          수정하기
        </Button>
      </form>
    </div>
  );
};

export default UserDetailsEditor;
