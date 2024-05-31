import { cn } from '@/utils/style';
import { FC, useState } from 'react';
import {
  FaGamepad,
  FaHtml5,
  FaLock,
  FaMicrochip,
  FaMobileAlt,
  FaNetworkWired,
  FaServer
} from 'react-icons/fa';

type DeploymentBoxProps = {
  onClick: (e: string) => void;
  deployment: string;
};

const DeploymentBox: FC<DeploymentBoxProps> = ({ onClick, deployment }) => {
  const [selectedDeployment, setSelectedDeployment] = useState<string | null>(
    null
  );

  const handleClick = (type: string) => {
    setSelectedDeployment(type);
    onClick(type);
  };

  return (
    <span className="flex flex-col">
      <div>
        <h4 className="text-lg font-semibold">기업 종류</h4>
      </div>
      <div className="flex">
        {[
          { type: 'backend', icon: <FaServer size={100} />, name: '백엔드' },
          {
            type: 'frontend',
            icon: <FaHtml5 size={100} />,
            name: '프론트엔드'
          },
          { type: 'mobile', icon: <FaMobileAlt size={100} />, name: '모바일' },
          {
            type: 'infra',
            icon: <FaNetworkWired size={100} />,
            name: '인프라'
          },
          { type: 'game', icon: <FaGamepad size={100} />, name: '게임' },
          {
            type: 'embeded',
            icon: <FaMicrochip size={100} />,
            name: '임베디드'
          },
          { type: 'secure', icon: <FaLock size={100} />, name: '보안' }
        ].map(({ type, icon, name }) => (
          <div
            key={type}
            className={cn(
              `flex size-52 cursor-pointer flex-col items-center justify-center gap-4 rounded-md border`,
              selectedDeployment === type
                ? 'bg-[#4fff4f]'
                : 'hover:bg-[#98FF98]'
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

export default DeploymentBox;
