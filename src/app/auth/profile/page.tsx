import Button from '@/components/Button';
import Input from '@/components/Input';
import Label from '@/components/Label';
import Link from 'next/link';
import SalesTable from './_components/SalesTable';
import ShoppingTable from './_components/ShoppingTable';

const ProfilePage = () => {
  return (
    <div className="flex flex-col gap-20">
      <div>
        <h3 className="mt-8 text-2xl text-sub">개인정보 수정</h3>
        <div className="mt-8 flex justify-between gap-4">
          <div className="flex w-2/4 flex-col gap-4">
            <Label htmlFor="email">이메일</Label>
            <Input
              // ref={idRef}
              placeholder="이메일을 작성해주세요."
              id="team"
              className="w-full"
            />
            <Label htmlFor="email">닉네임</Label>
            <Input
              // ref={idRef}
              placeholder="닉네임을 작성해주세요."
              id="nickname"
              className="w-full"
            />
            <Label htmlFor="phoneNumber">전화번호</Label>
            <Input
              // ref={idRef}
              placeholder="전화번호를 입력해주세요."
              id="phoneNumber"
              className="w-full"
            />
          </div>
          <div className="flex w-2/4 flex-col gap-4">
            <Label htmlFor="team">소속 직장/학교</Label>
            <Input
              // ref={idRef}
              placeholder="소속 / 직장 / 학교을(를) 작성해주세요."
              id="team"
              className="w-full"
            />
            <Label htmlFor="position">직무</Label>
            <Input
              // ref={idRef}
              placeholder="직무를 선택해주세요"
              id="position"
              className="w-full"
            />

            <Label htmlFor="techStack">기술 스택</Label>
            <Input
              // ref={idRef}
              placeholder="기술스택을 선택해주세요"
              id="techStack"
              className="w-full"
            />
          </div>
        </div>
      </div>
      <Button className="self-center">수정하기</Button>
      <div className="self-end">
        <h3 className="text-2xl font-semibold text-sub">포인트</h3>
        <span className="text-2xl font-semibold">포인트 18,200</span>
        <span className="text-sm"> point</span>
        <Link href="/event">
          <Button className="m-4 self-center">이벤트 이동</Button>
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-semibold text-sub">구매목록</h3>
        <ShoppingTable />
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-semibold text-sub">판매목록</h3>
        <SalesTable />
      </div>
    </div>
  );
};

export default ProfilePage;
