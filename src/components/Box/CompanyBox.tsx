import { cn } from '@/utils/style';
import { FC, useState } from 'react';
import { FaBuilding, FaLightbulb, FaRocket, FaStore } from 'react-icons/fa';
import { GiUnicorn } from 'react-icons/gi';
import { MdAccountBalance, MdDomain } from 'react-icons/md';

type CompanyBoxProps = {
  onClick: (e: string) => void;
  company: string;
};

const CompanyBox: FC<CompanyBoxProps> = ({ onClick, company }) => {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  const handleClick = (companyType: string) => {
    setSelectedCompany(companyType);
    onClick(companyType);
  };

  return (
    <span className="flex flex-col">
      <div>
        <h4 className="text-lg font-semibold">기업 종류</h4>
      </div>
      <div className="flex">
        {[
          { type: 'large', icon: <FaBuilding size={100} />, name: '대기업' },
          { type: 'midsize', icon: <MdDomain size={100} />, name: '중견기업' },
          { type: 'small', icon: <FaStore size={100} />, name: '중소기업' },
          { type: 'startup', icon: <FaRocket size={100} />, name: '스타트업' },
          {
            type: 'unicorns',
            icon: <GiUnicorn size={100} />,
            name: '유니콘기업'
          },
          {
            type: 'public',
            icon: <MdAccountBalance size={100} />,
            name: '공기업'
          },
          {
            type: 'entures',
            icon: <FaLightbulb size={100} />,
            name: '벤처기업'
          }
        ].map(({ type, icon, name }) => (
          <div
            key={type}
            className={cn(
              `flex size-52 cursor-pointer flex-col items-center justify-center gap-3 rounded-md border`,
              selectedCompany === type ? 'bg-main' : 'hover:bg-hover'
            )}
            onClick={() => handleClick(type)}
          >
            {icon}
            <p className="text-xl">{name}</p>
          </div>
        ))}
      </div>
    </span>
  );
};

export default CompanyBox;
