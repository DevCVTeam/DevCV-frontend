'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Label from '@/components/Label';
import { scriptUrl } from '@/utils/constant';
import { handleAuthenticate } from '@/utils/imp';
import Script from 'next/script';
import { useContext } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { SignupContext } from '../_components/SignupProvider';

type TForm = {
  id: string;
  email: string;
  pwd: string;
  confirmPwd: string;
  nickname: string;
  phoneCheck: boolean;
  address: string;
  postalCode: string;
  detailAddress: string;
  team: string;
  position: string;
  techStack: string;
  referrer: string;
};

const Begin = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors }
  } = useForm<TForm>({ mode: 'onChange' });
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
    setValue('postalCode', data.zonecode);
    setValue('address', data.address);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  const onSubmit: SubmitHandler<TForm> = (data) => {
    setAgreements(2);
  };

  const handleIdCheck = () => {
    const id = getValues('id');
    toast.success('중복되는 아이디가 없습니다.');
    console.log(id);
  };

  const handleEmailCheck = () => {
    const email = getValues('email');
    toast.success('중복되는 이메일이 없습니다.');
    console.log(email);
  };

  return (
    <div className="flex justify-center">
      <Script src="https://cdn.iamport.kr/v1/iamport.js" />

      <form
        className="flex flex-col items-start gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex w-full items-center gap-2">
          <div className="flex w-full flex-col gap-2">
            <Label htmlFor="id">아이디</Label>
            <Input
              {...register('id', { required: true })}
              placeholder="아이디를 작성해주세요."
              id="id"
              className="w-full"
            />
          </div>
          <Button className="self-end" type="button" onClick={handleIdCheck}>
            중복확인
          </Button>
        </div>
        <div className="flex w-full items-center gap-2">
          <div className="flex w-full flex-col gap-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              {...register('email', { required: true })}
              placeholder="이메일을 작성해주세요."
              id="email"
            />
          </div>
          <Button className="self-end" type="button" onClick={handleEmailCheck}>
            중복확인
          </Button>
        </div>
        <Label htmlFor="password">패스워드</Label>
        <Input
          {...register('pwd', { required: true })}
          placeholder="패스워드를 작성해주세요."
          id="password"
          className="w-full"
        />
        <Label htmlFor="confirmPwd">패스워드 확인</Label>
        <Input
          {...register('confirmPwd', { required: true })}
          placeholder="패스워드를 다시한번 작성해주세요."
          id="confirmPwd"
          className="w-full"
        />
        <Label htmlFor="nickname">닉네임</Label>
        <Input
          {...register('nickname', { required: true })}
          placeholder="닉네임을 작성해주세요"
          id="nickname"
          className="w-full"
        />
        <Button onClick={handleAuthenticate} type="button">
          본인인증
        </Button>
        <hr className="w-full border-main" />
        <div className="flex flex-col gap-2">
          <div className="flex w-full gap-4">
            <div className="flex w-full flex-col">
              <Label htmlFor="address">주소</Label>
              <Input
                {...register('address', { disabled: true, required: true })}
                placeholder="주소를 작성해주세요"
                disabled
                id="address"
                className="w-full self-start"
              />
            </div>

            <Input
              {...register('postalCode', { disabled: true, required: true })}
              placeholder="도로명 주소"
              id="address"
              className="w-1/5 self-end"
              disabled
            />
            <Button className="self-end" onClick={handleClick} type="button">
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
        {/* 휴대전화는 Button 으로 팝업창 띄어지게 진행 */}

        <hr className="w-full border-main" />
        <Label htmlFor="team">소속 / 직장 / 학교</Label>
        <Input
          {...register('team', { required: true })}
          placeholder="소속/직장/학교 을(를) 작성해주세요"
          id="team"
          className="w-full"
        />
        <Label htmlFor="position">직무</Label>
        <Input
          {...register('position', { required: true })}
          placeholder="직무를 작성해주세요"
          id="position"
          className="w-full"
        />
        <Label htmlFor="techStack">기술 스택</Label>
        <Input
          {...register('techStack', { required: true })}
          placeholder="기술스택을 작성해주세요"
          id="techStack"
          className="w-full"
        />
        <Label htmlFor="recommend">추천인</Label>
        <Input
          {...register('referrer', { required: true })}
          placeholder="추천인을 작성해주세요"
          id="recommend"
          className="w-full"
        />
        <Button className="my-4 w-full" type="submit">
          다음
        </Button>
      </form>
    </div>
  );
};

export default Begin;
