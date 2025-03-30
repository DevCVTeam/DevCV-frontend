import ResumeButton from '@/app/admin/_components/ResumeButton';
import { MarkdownViewer } from '@/components/Markdown';
import Modal from '@/components/common/Modal';
import { authOptions } from '@/utils/next-auth';
import { Resume } from '@/utils/type';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { FaCloudDownloadAlt } from 'react-icons/fa';

export default async function ResumeModal({
  params: { id: resumeId }
}: {
  params: { id: number };
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

  return (
    <Modal title="이력서 목록" isOpen={true} className="sm:max-w-5xl">
      <div className="mt-6 flex flex-col gap-4 text-textColor">
        <div className="flex justify-between">
          <div className="flex w-full items-center gap-4 rounded-xl bg-subgray p-4">
            <Image
              src={
                resume
                  ? resume?.imageList[0]?.resumeImgPath
                  : 'https://devcv-bucket.s3.amazonaws.com/31479ae3-c%E1%84%87%E1%85%A9%E1%84%8B%E1%85%A1%E1%86%AB%20%E1%84%8A%E1%85%A5%E1%86%B7%E1%84%82%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AF.png'
              }
              width={100}
              height={100}
              className="rounded-xl"
              alt="이미지"
            />
            <p className="w-3/4 text-xl font-semibold">{resume?.title}</p>
          </div>
        </div>
        <div className="flex w-full gap-4">
          <div className="flex w-2/4 flex-col">
            <span className="font-semibold">판매자 닉네임</span>
            <p className="rounded-xl bg-subgray p-4">
              {resume?.sellerNickname}
            </p>
          </div>
          <div className="flex w-2/4 flex-col">
            <span className="font-semibold">개발 직무</span>
            <p className="rounded-xl bg-subgray p-4">
              {resume?.category?.stackType}
            </p>
          </div>
        </div>
        <hr className="w-full border" />
        <div className="flex flex-col gap-2">
          <span className="font-semibold">기술 스택</span>
          <p className="flex w-full gap-4 rounded-xl bg-subgray p-4">
            {resume?.stack?.map((stack) => (
              <div key={stack} className="rounded-2xl bg-white p-2 text-black">
                {stack}
              </div>
            ))}
          </p>
        </div>
        <hr className="w-full border" />

        <div className="flex flex-col gap-2">
          <span className="font-semibold">합격 증빙자료</span>
          <div className="w-full rounded-xl bg-subgray p-4">
            {resume?.imageList?.map((image: any) => (
              <div
                className="flex cursor-pointer items-center gap-1 text-sky-500"
                key={image.ord}
              >
                <FaCloudDownloadAlt />
                <Link href={image.resumeImgPath} target="_blank">
                  이미지 바로가기
                </Link>
              </div>
            ))}
          </div>
        </div>
        <hr className="w-full border" />
        <div className="flex flex-col gap-2">
          <span className="font-semibold">이력서</span>
          <div className="flex w-full cursor-pointer items-center gap-1 rounded-xl bg-subgray p-4 text-sky-500">
            <FaCloudDownloadAlt />
            {/* <Link href={resume?.resumeFilePath!} target="_blank">
              이력서 바로가기
            </Link> */}
            <Link
              className="line-clamp-6 w-64 truncate"
              href={resume?.resumeFilePath}
              target="_blank"
            >
              사용자 이력서
            </Link>
          </div>
        </div>
        <hr className="w-full border" />
        <div className="flex flex-col">
          <span className="font-semibold">설명</span>
          <MarkdownViewer
            className="w-full rounded-xl bg-subgray p-4 text-textColor"
            source={resume?.content}
          />
        </div>
      </div>
      <ResumeButton token={user?.user.accessToken!} resumeId={resumeId} />
    </Modal>
  );
}
