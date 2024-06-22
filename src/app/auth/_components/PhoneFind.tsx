import Button from '@/components/Button';
import Input from '@/components/Input';
import Label from '@/components/Label';
import { useRef } from 'react';
import toast from 'react-hot-toast';

const PhoneFind = ({
  memberId,
  onClose
}: {
  memberId: number;
  onClose: () => void;
}) => {
  const passwordRef = useRef<HTMLInputElement>(null);
  const checkPasswordRef = useRef<HTMLInputElement>(null);
  const handlePasswordChange = async () => {
    if (
      passwordRef.current?.value !== checkPasswordRef.current?.value ||
      passwordRef.current?.value.length! < 8 ||
      passwordRef.current?.value.length! > 16
    ) {
      return toast.error('패스워드를 확인해주세요');
    }
    const res = await fetch(
      `/server/members/${memberId}/${passwordRef.current?.value}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    if (!res.ok) {
      return toast.error('비밀번호 변경에 실패하였습니다.');
    }
    toast.success('비밀번호 변경에 성공하였습니다.');
    onClose();
  };
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <Label htmlFor="password">비밀번호</Label>
          <Input ref={passwordRef} id="password" type="password" />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="checkPassword">비밀번호 확인</Label>
          <Input ref={checkPasswordRef} id="checkPassword" type="password" />
        </div>
      </div>
      <div className="flex gap-4">
        <Button
          onClick={onClose}
          className="w-full bg-subgray hover:bg-default"
        >
          취소하기
        </Button>
        <Button onClick={handlePasswordChange} className="w-full">
          비밀번호 변경
        </Button>
      </div>
    </div>
  );
};

export default PhoneFind;
