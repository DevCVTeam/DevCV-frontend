import { CompanyType, JobType } from '@/utils/type';
import { IconType } from 'react-icons';
import {
  FaBuilding,
  FaCode,
  FaGamepad,
  FaMobileAlt,
  FaNetworkWired,
  FaRocket,
  FaServer,
  FaShieldAlt
} from 'react-icons/fa';
import { GiUnicorn } from 'react-icons/gi';
import { MdAccountBalance, MdDomain } from 'react-icons/md';

export type CompanyInfo = {
  type: CompanyType | JobType;
  icon: IconType;
  name: string;
  color: string;
  size: number;
};

export const COMPANIES = {
  enterprises: [
    {
      type: 'largeE',
      icon: FaBuilding,
      name: '대기업',
      color: '#001aff',
      size: 20
    },
    {
      type: 'mediumE',
      icon: MdDomain,
      name: '중견기업',
      color: '#0066ff',
      size: 20
    },
    {
      type: 'smallE',
      icon: FaBuilding,
      name: '중소기업',
      color: '#0095ff',
      size: 20
    },
    {
      type: 'startE',
      icon: FaRocket,
      name: '스타트업',
      color: '#00c3ff',
      size: 20
    },
    {
      type: 'unicornE',
      icon: GiUnicorn,
      name: '유니콘',
      color: '#00ebff',
      size: 20
    },
    {
      type: 'publicE',
      icon: MdAccountBalance,
      name: '공공기관',
      color: '#001aff',
      size: 20
    },
    {
      type: 'ventureE',
      icon: FaRocket,
      name: '벤처기업',
      color: '#0066ff',
      size: 20
    }
  ],
  jobs: [
    {
      type: 'backend',
      icon: FaServer,
      name: '백엔드',
      color: '#001aff',
      size: 20
    },
    {
      type: 'frontend',
      icon: FaCode,
      name: '프론트엔드',
      color: '#0066ff',
      size: 20
    },
    {
      type: 'mobile',
      icon: FaMobileAlt,
      name: '모바일',
      color: '#0095ff',
      size: 20
    },
    {
      type: 'infra',
      icon: FaNetworkWired,
      name: '인프라',
      color: '#00c3ff',
      size: 20
    },
    {
      type: 'game',
      icon: FaGamepad,
      name: '게임',
      color: '#00ebff',
      size: 20
    },
    {
      type: 'embedded',
      icon: FaServer,
      name: '임베디드',
      color: '#001aff',
      size: 20
    },
    {
      type: 'security',
      icon: FaShieldAlt,
      name: '보안',
      color: '#0066ff',
      size: 20
    }
  ]
};

export const CAROUSEL_CONFIG = {
  itemsPerSlide: 14,
  interval: 3000,
  transitionTime: 500
};
