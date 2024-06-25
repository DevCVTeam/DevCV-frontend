'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Label from '@/components/Label';
import { JobType, UserDetail } from '@/utils/type';
import Link from 'next/link';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import SalesTable from './SalesTable';
import ShoppingTable from './ShoppingTable';

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
const UserDetailsEditor: FC<UserDetail> = ({
  memberInfo,
  mypoint,
  orderList,
  resumeList
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
      memberId: memberInfo?.memberId,
      email: memberInfo?.email,
      memberName: memberInfo?.memberName,
      phone: memberInfo?.phone,
      company: memberInfo?.company,
      job: memberInfo?.job,
      stack: memberInfo?.stack,
      address: memberInfo?.address
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
      <hr />
      <div className="self-start">
        <h3 className="text-2xl font-semibold text-sub">포인트</h3>
        <span className="text-2xl font-semibold">
          포인트 {mypoint.toLocaleString()}
        </span>
        <span className="text-sm"> point</span>
        <Link href="/event">
          <Button className="m-4 self-center">이벤트 이동</Button>
        </Link>
      </div>
      <hr />
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-semibold text-sub">구매목록</h3>
        <ShoppingTable orderList={orderList} />
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-semibold text-sub">판매목록</h3>
        <SalesTable />
      </div>
    </div>
  );
};

export default UserDetailsEditor;
