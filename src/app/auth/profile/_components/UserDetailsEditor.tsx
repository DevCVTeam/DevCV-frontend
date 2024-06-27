'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Label from '@/components/Label';
import { JobType, UserInfo } from '@/utils/type';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type TUserData = {
  memberId: number;
  email: string;
  memberName: string;
  phone: string;
  company: string;
  job: JobType;
  stack: string[];
  address: string;
};

// 유저 값을 전역 변수로 사용하자!!
const UserDetailsEditor: FC<UserInfo> = ({
  address,
  company,
  email,
  job,
  memberId,
  memberName,
  phone,
  stack
}) => {
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
      job,
      memberId,
      memberName,
      phone,
      stack
    }
  });

  const handleEditUser: SubmitHandler<TUserData> = async (data) => {
    const res = await fetch('/server/mypage', {
      method: 'PATCH'
    });
    const userResponse = await res.json();
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
            </div>
            <div className="flex w-2/4 flex-col gap-4">
              <Label htmlFor="company">기업 종류</Label>
              <Input
                {...register('company', { required: true })}
                placeholder="기업 종류를 작성해주세요."
                id="company"
                className="w-full"
              />
              <Label htmlFor="job">직무</Label>
              <Input
                {...register('job', { required: true })}
                placeholder="직무를 선택해주세요"
                id="job"
                className="w-full"
              />

              <Label htmlFor="stack">기술 스택</Label>
              <Input
                {...register('stack', { required: true })}
                placeholder="기술스택을 선택해주세요"
                id="stack"
                className="w-full"
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
