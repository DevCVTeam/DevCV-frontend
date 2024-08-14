import { MarkdownViewer } from '@/components/Markdown';
import { authOptions } from '@/utils/next-auth';
import { OrderList } from '@/utils/type';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { FaCloudDownloadAlt } from 'react-icons/fa';

export default async function OrderResumePage({
  params: { orderId }
}: {
  params: { orderId: string };
}) {
  const user = await getServerSession(authOptions);
  const res = await fetch(`${process.env.SERVER_URL}/orders/${orderId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user?.user.accessToken}`
    }
  });
  const resumes: OrderList = await res.json();
  return (
    <div>
      {/* 판매한 이력서를 넘겨서 확인하기 */}
      {resumes?.resumeList.map((resume) => (
        <div className="mt-6 flex flex-col gap-4" key={resume.resumeId}>
          <div className="flex justify-between">
            <span className="">판매자 닉네임</span>
            <p className="w-3/4 font-semibold">{resume?.sellerNickname}</p>
          </div>
          <hr className="w-full border" />
          <div className="flex justify-between">
            <span className="">개발 직무</span>
            <p className="w-3/4 font-semibold">{resume?.category.stackType}</p>
          </div>
          <hr className="w-full border" />
          <div className="flex justify-between">
            <span className="">기술 스택</span>
            <div className="flex w-3/4 gap-4 text-slate-400 ">
              {resume?.stack.map((stack) => (
                <div
                  key={stack}
                  className="rounded-2xl bg-subgray p-2 text-black"
                >
                  {stack}
                </div>
              ))}
            </div>
          </div>

          <hr className="w-full border" />

          <div className="flex justify-between">
            <span className="text-slate-800">합격 증빙자료</span>
            <div className="flex w-3/4 flex-col">
              {resume.imageList.map((image) => (
                <div
                  className="flex items-center gap-1 text-sky-500"
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
          <div className="flex justify-between">
            <span className="text-slate-800">이력서</span>
            <div className="flex w-3/4 items-center gap-1 text-sky-500">
              <FaCloudDownloadAlt />
              <Link href={resume.resumeFilePath} target="_blank">
                이력서 바로가기
              </Link>
            </div>
          </div>
          <hr className="w-full border" />
          <div className="flex justify-between">
            <span className="text-slate-800">설명</span>
            <div className="flex w-3/4">
              <MarkdownViewer source={resume.content} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
