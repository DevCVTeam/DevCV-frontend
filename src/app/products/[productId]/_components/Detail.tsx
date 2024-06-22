'use client';

import { Badge } from '@/components/Badge';
import { MarkdownViewer } from '@/components/Markdown';
import { Company, Job } from '@/utils/constant';
import { Resume } from '@/utils/type';
import { FaCheck } from 'react-icons/fa';

const Detail = ({
  content,
  stack,
  category,
  sellerNickname
}: Partial<Resume>) => {
  console.log(content, stack, category);
  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="flex">
            <div className="ml-4 flex flex-col gap-2">
              <h2 className="text-2xl font-semibold">{sellerNickname}</h2>
              <div className="my-1 flex space-x-1">
                {stack?.map((data) => (
                  <Badge variant="secondary" key={data}>
                    {data}
                  </Badge>
                ))}
                <Badge variant="secondary">
                  {Company[category?.companyType!]}
                </Badge>
                <Badge variant="secondary">{Job[category?.stackType!]}</Badge>
              </div>
              <div className="my-1 flex space-x-4">
                <div className="flex items-center">
                  <FaCheck className="size-4 text-main" />
                  <span className="ml-1 text-sm">인증 완료</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="mt-6">
          <MarkdownViewer source={content} />
        </div>
      </div>
    </div>
  );
};

export default Detail;
