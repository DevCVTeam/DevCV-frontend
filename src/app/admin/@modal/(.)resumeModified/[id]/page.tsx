import Button from '@/components/Button';
import Modal from '@/components/Modal';
import { authOptions } from '@/utils/next-auth';
import { Resume } from '@/utils/type';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { FaCloudDownloadAlt } from 'react-icons/fa';

export default async function ResumeModal({
  params: { id: resumeId }
}: {
  params: { id: string };
}) {
  const user = await getServerSession(authOptions);
  const res = await fetch(
    `${process.env.SERVER_URL}/admin/resumes/${resumeId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user?.user.accessToken}`
      }
    }
  );
  const resume: Resume = await res.json();

  const handleApproved = async () => {
    const res = await fetch(
      `${process.env.SERVER_URL}/admin/resumes/10/approved`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${user?.user.accessToken}`
        }
      }
    );
    const data = await res.json();
  };
  return (
    <Modal title="이력서 목록" isOpen={true}>
      <div className="mt-6 flex flex-col gap-4">
        <div className="flex justify-between">
          <span className="text-slate-800">이력서 제목</span>
          <div>
            <Image
              src={
                resume
                  ? resume?.imageList[0]?.resumeImgPath
                  : 'https://devcv-bucket.s3.amazonaws.com/31479ae3-c%E1%84%87%E1%85%A9%E1%84%8B%E1%85%A1%E1%86%AB%20%E1%84%8A%E1%85%A5%E1%86%B7%E1%84%82%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AF.png'
              }
              width={100}
              height={100}
              alt="이미지"
            />
            <p className="w-3/4 text-slate-400">{resume?.title}</p>
          </div>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-800">판매자 닉네임</span>
          <p className="w-3/4 text-slate-400">{resume?.sellerNickname}</p>
        </div>
        <hr className="w-full border" />
        <div className="flex justify-between">
          <span className="text-slate-800">개발 직무</span>
          <p className="w-3/4 text-slate-400">{resume?.category?.stackType}</p>
        </div>
        <hr className="w-full border" />
        <div className="flex justify-between">
          <span className="text-slate-800">기술 스택</span>
          <p className="w-3/4 text-slate-400">{resume?.stack?.map((d) => d)}</p>
        </div>
        <hr className="w-full border" />

        <hr className="w-full border" />
        <div className="flex justify-between">
          <span className="text-slate-800">합격 증빙자료</span>
          <div className="flex w-3/4 flex-col">
            <div className="flex cursor-pointer items-center gap-1 text-sky-500">
              <FaCloudDownloadAlt />
              네이버 합격 통지서.PDF
            </div>
            <div className="flex cursor-pointer items-center gap-1 text-sky-500">
              <FaCloudDownloadAlt />
              {resume?.imageList?.map((image) => (
                <Link href={image.resumeImgPath} key={image.ord}>
                  이미지 바로가기
                </Link>
              ))}
            </div>
          </div>
        </div>
        <hr className="w-full border" />
        <div className="flex justify-between">
          <span className="text-slate-800">이력서</span>
          <div className="flex w-3/4 cursor-pointer items-center gap-1 text-sky-500">
            <FaCloudDownloadAlt />
            {/* <Link href={resume?.resumeFilePath!} target="_blank">
              이력서 바로가기
            </Link> */}
            {resume?.resumeFilePath}
          </div>
        </div>
        <hr className="w-full border" />
        <div className="flex justify-between">
          <span className="text-slate-800">설명</span>
          <p className="w-3/4 text-slate-400">{resume?.content}</p>
        </div>
      </div>
      <div className="mt-20 flex justify-around">
        <Button>수정 수락하기</Button>
        <Button className="bg-slate-200 hover:bg-slate-400">취소하기</Button>
      </div>
    </Modal>
  );
}
