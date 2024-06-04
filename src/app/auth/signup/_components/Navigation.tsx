import { cn } from '@/utils/style';
import Image from 'next/image';
import React, { useContext } from 'react';
import { FaCheck, FaPen } from 'react-icons/fa';
import { LiaCheckSquareSolid } from 'react-icons/lia';
import { SignupContext } from './SignupProvider';

const Navigation = () => {
  const { agreements, setAgreements } = useContext(SignupContext);
  return (
    <div className="flex flex-col gap-16">
      <div className="mt-12 flex flex-col items-center gap-4">
        <Image
          objectFit="cover"
          src="/logo.png"
          alt="Logo"
          width={60}
          height={60}
        />
        <h4 className="text-2xl font-semibold">회원가입</h4>
      </div>
      <div className="flex items-center justify-center gap-4">
        <div
          className="flex cursor-pointer flex-col items-center"
          onClick={() => setAgreements(0)}
        >
          <LiaCheckSquareSolid
            className={cn(
              'aspect-square size-12 rounded-full  p-2 text-white ',
              agreements === 0 ? 'bg-main' : 'bg-slate-400'
            )}
          />
          <span>약관동의</span>
        </div>
        <hr className="w-6 border-2" />
        <div
          className="flex cursor-pointer flex-col items-center"
          onClick={() => setAgreements(1)}
        >
          <FaPen
            className={cn(
              'aspect-square size-12 rounded-full  p-2 text-white ',
              agreements === 1 ? 'bg-main' : 'bg-slate-400'
            )}
          />
          <span>정보입력</span>
        </div>
        <hr className="w-6 border-2" />
        <div
          className="flex cursor-pointer flex-col items-center"
          onClick={() => setAgreements(2)}
        >
          <FaCheck
            className={cn(
              'aspect-square size-12 rounded-full  p-2 text-white ',
              agreements === 2 ? 'bg-main' : 'bg-slate-400'
            )}
          />
          <span>가입완료</span>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
