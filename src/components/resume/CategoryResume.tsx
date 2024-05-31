'use client';

import { useState } from 'react';
import CompanyBox from '../Box/CompanyBox';
import DeploymentBox from '../Box/DeploymentBox';
import ResumePagenation from '../ResumePagenation';

const CategoryResume = () => {
  const [company, setCompany] = useState('');
  const [deployment, setDeployment] = useState('');

  return (
    <div className="mt-12 flex w-full flex-col gap-10 rounded-sm">
      <span className="flex">
        <h3 className="text-2xl font-semibold">기업 선택</h3>
        <p className="ml-2 self-end">원하시는 기업을 선택해주세요.</p>
      </span>
      <CompanyBox onClick={setCompany} company={company} />
      <DeploymentBox onClick={setDeployment} deployment={deployment} />
      <div className="my-12 flex w-full flex-col">
        <h2 className="text-2xl">
          {company} {deployment} 이력서
        </h2>
        <span>선택된 기업의 이력서입니다.</span>
        <ResumePagenation />
      </div>
    </div>
  );
};

export default CategoryResume;
