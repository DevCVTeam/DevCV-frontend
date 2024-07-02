import Button from '@/components/Button';
import { MarkdownViewer } from '@/components/Markdown';
import Modal from '@/components/Modal';
import { Job } from '@/utils/constant';
import { authOptions } from '@/utils/next-auth';
import { Resume } from '@/utils/type';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { FaCloudDownloadAlt } from 'react-icons/fa';

export default async function SalesResumeModal({
  params: { resumeId }
}: {
  params: { resumeId: number };
}) {
  const user = await getServerSession(authOptions);
  const res = await fetch(
    `${process.env.SERVER_URL}/members/${user?.user.memberId}/resumes/${resumeId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user?.user.accessToken}`
      }
    }
  );
  const resume: Resume = await res.json();
  return (
    <Modal title="판매한 이력서" isOpen={true}>
      {/* 판매한 이력서를 넘겨서 확인하기 */}

      <div className="mt-6 flex flex-col gap-4 text-textColor">
        <div className="flex justify-between">
          <span className="font-semibold">제목</span>
          <p className="w-3/4">{resume?.title}</p>
        </div>
        <hr className="w-full border" />
        <div className="flex justify-between">
          <span className="font-semibold">개발 직무</span>
          <p className="w-3/4 ">{Job[resume?.category.stackType]}</p>
        </div>
        <hr className="w-full border" />
        <div className="flex justify-between">
          <span className="font-semibold">기술 스택</span>
          <div className="flex w-3/4 gap-4">
            {resume?.stack.map((stack) => (
              <p key={stack} className="rounded-full bg-slate-900">
                {stack}
              </p>
            ))}
          </div>
        </div>
        <hr className="w-full border" />
        <div className="flex justify-between">
          <span className="font-semibold">판매자 닉네임</span>
          <p className="w-3/4 ">{resume.sellerNickname}</p>
        </div>

        <hr className="w-full border" />

        <div className="flex justify-between">
          <span className="font-semibold">합격 증빙자료</span>
          <div className="flex w-3/4 flex-col">
            {resume.imageList.map((image, index) => (
              <div
                className="flex cursor-pointer items-center gap-1 text-sky-500"
                key={image.ord}
              >
                <FaCloudDownloadAlt />
                <Link href={image.resumeImgPath} target="_blank">
                  등록 이미지 {index + 1}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <hr className="w-full border" />
        <div className="flex justify-between">
          <span className="font-semibold">이력서</span>
          <div className="flex w-3/4 cursor-pointer items-center gap-1 text-sky-500">
            <FaCloudDownloadAlt />
            <Link href={resume.resumeFilePath} target="_blank">
              등록한 이력서
            </Link>
          </div>
        </div>
        <hr className="w-full border" />
        <div className="flex justify-between">
          <span className="font-semibold">설명</span>
          <div className="flex w-3/4">
            <MarkdownViewer source={resume.title} />
          </div>
        </div>
      </div>

      <div className="mt-20 flex justify-around">
        <Button>수정하기</Button>
        <Button className="bg-slate-200 hover:bg-slate-400">취소하기</Button>
      </div>
    </Modal>
  );
}
