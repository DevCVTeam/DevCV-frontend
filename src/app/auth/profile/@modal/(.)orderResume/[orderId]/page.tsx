import Button from '@/components/Button';
import { MarkdownViewer } from '@/components/Markdown';
import Modal from '@/components/Modal';
import { authOptions } from '@/utils/next-auth';
import { OrderList } from '@/utils/type';
import { getServerSession } from 'next-auth';
import { FaCloudDownloadAlt } from 'react-icons/fa';

export default async function OrderResumeModal({
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
    <Modal title="구매한 이력서" isOpen={true} className="sm:max-w-5xl">
      {/* 판매한 이력서를 넘겨서 확인하기 */}
      {resumes?.resumeList.map((resume) => (
        <div className="mt-6 flex flex-col gap-4" key={resume.resumeId}>
          <div className="flex justify-between">
            <span className="text-slate-800">판매자 닉네임</span>
            <p className="w-3/4 text-slate-400">{resume?.resumeId}</p>
          </div>
          <hr className="w-full border" />
          <div className="flex justify-between">
            <span className="text-slate-800">개발 직무</span>
            <p className="w-3/4 text-slate-400">{resume?.resumeId}</p>
          </div>
          <hr className="w-full border" />
          <div className="flex justify-between">
            <span className="text-slate-800">기술 스택</span>
            <p className="w-3/4 text-slate-400">{resume?.resumeId}</p>
          </div>
          <hr className="w-full border" />
          <div className="flex justify-between">
            <span className="text-slate-800">판매자 닉네임</span>
            <p className="w-3/4 text-slate-400">{resume.resumeId}</p>
          </div>

          <hr className="w-full border" />

          <div className="flex justify-between">
            <span className="text-slate-800">합격 증빙자료</span>
            <div className="flex w-3/4 flex-col">
              <div className="flex cursor-pointer items-center gap-1 text-sky-500">
                <FaCloudDownloadAlt />
                {resume.thumbnailPath}
              </div>
            </div>
          </div>
          <hr className="w-full border" />
          <div className="flex justify-between">
            <span className="text-slate-800">이력서</span>
            <div className="flex w-3/4 cursor-pointer items-center gap-1 text-sky-500">
              <FaCloudDownloadAlt />
              {resume.resumeFilePath}
            </div>
          </div>
          <hr className="w-full border" />
          <div className="flex justify-between">
            <span className="text-slate-800">설명</span>
            <div className="flex w-3/4">
              <MarkdownViewer source={resume.title} />
            </div>
          </div>
        </div>
      ))}

      <div className="mt-20 flex justify-around">
        <Button className="bg-slate-200 hover:bg-slate-400">취소하기</Button>
      </div>
    </Modal>
  );
}
