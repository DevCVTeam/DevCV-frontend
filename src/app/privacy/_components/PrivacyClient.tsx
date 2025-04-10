'use client';

import { motion } from 'framer-motion';
import {
  FaArrowRight,
  FaBriefcase,
  FaEnvelope,
  FaLock,
  FaShieldAlt,
  FaUser,
  FaUserShield
} from 'react-icons/fa';

const privacyPolicies = [
  {
    title: '1. 개인정보의 수집 및 이용 목적',
    icon: FaUserShield,
    content: `회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.

1) 회원 가입 및 관리
- 회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증
- 회원자격 유지·관리, 서비스 부정이용 방지
- 고충처리, 분쟁 조정을 위한 기록 보존

2) 서비스 제공
- 이력서 작성 및 관리 서비스 제공
- 콘텐츠 제공, 맞춤서비스 제공`
  },
  {
    title: '2. 수집하는 개인정보의 항목',
    icon: FaLock,
    content: `회사는 회원가입, 상담, 서비스 신청 등을 위해 아래와 같은 개인정보를 수집하고 있습니다.

1) 수집항목
- 필수항목: 이메일 주소, 비밀번호, 이름
- 선택항목: 프로필 이미지, 전화번호

2) 개인정보 수집방법
- 홈페이지 회원가입, 서비스 이용, 이벤트 응모
- 생성정보 수집 툴을 통한 수집`
  },
  {
    title: '3. 개인정보의 보유 및 이용기간',
    icon: FaShieldAlt,
    content: `회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.

1) 회원 가입 및 관리: 회원 탈퇴 시까지
다만, 다음의 사유에 해당하는 경우에는 해당 사유 종료 시까지
- 관계 법령 위반에 따른 수사·조사 등이 진행 중인 경우
- 홈페이지 이용에 따른 채권·채무관계 잔존 시

2) 재화 또는 서비스 제공: 재화·서비스 공급완료 및 요금결제·정산 완료시까지`
  },
  {
    title: '4. 개인정보의 파기절차 및 방법',
    icon: FaShieldAlt,
    content: `회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.

1) 파기절차
- 회원님이 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져 내부 방침 및 기타 관련 법령에 따라 일정기간 저장된 후 혹은 즉시 파기됩니다.
- 이 때, DB로 옮겨진 개인정보는 법률에 의한 경우가 아니고서는 다른 목적으로 이용되지 않습니다.

2) 파기방법
- 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다.
- 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.`
  },
  {
    title: '5. 개인정보의 안전성 확보 조치',
    icon: FaShieldAlt,
    content: `회사는 개인정보보호법 제29조에 따라 다음과 같이 안전성 확보에 필요한 기술적/관리적 및 물리적 조치를 하고 있습니다.

1) 개인정보 취급 직원의 최소화 및 교육
- 개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜 최소화하여 개인정보를 관리하는 대책을 시행하고 있습니다.

2) 해킹 등에 대비한 기술적 대책
- 회사는 해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위하여 보안프로그램을 설치하고 주기적인 갱신·점검을 하며 외부로부터 접근이 통제된 구역에 시스템을 설치하고 기술적/물리적으로 감시 및 차단하고 있습니다.`
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

export default function PrivacyClient() {
  return (
    <div className="min-h-screen bg-white py-12">
      <motion.div
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.section className="mb-16 text-center" variants={itemVariants}>
          <div className="mb-6 inline-flex items-center justify-center rounded-full bg-blue-100 p-3">
            <FaLock className="text-3xl text-blue-600" />
          </div>
          <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            개인정보처리방침
          </h1>
          <p className="text-xl text-gray-600">최종 수정일: 2025년 4월 2일</p>
        </motion.section>

        {/* Privacy Policy Content */}
        <motion.div
          className="mx-auto max-w-4xl space-y-8"
          variants={containerVariants}
        >
          {privacyPolicies.map((policy, index) => (
            <motion.div
              key={policy.title}
              variants={itemVariants}
              className="rounded-2xl border border-gray-100 bg-gray-50 p-8 transition-shadow duration-300 hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 rounded-lg bg-blue-100 p-3">
                  <policy.icon className="text-2xl text-blue-600" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    {policy.title}
                  </h2>
                  <div className="whitespace-pre-line leading-relaxed text-gray-600">
                    {policy.content}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Info */}
        <motion.section
          className="mx-auto mt-16 max-w-4xl"
          variants={itemVariants}
        >
          <motion.div
            className="rounded-2xl bg-gradient-to-r from-blue-50 to-blue-100 p-8 transition-all duration-300 hover:shadow-lg"
            whileHover={{ scale: 1.02 }}
          >
            <div className="mb-8 flex items-center gap-3">
              <FaUserShield className="text-2xl text-blue-600" />
              <h3 className="text-xl font-bold text-gray-900">
                개인정보 보호책임자
              </h3>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <motion.div
                className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                whileHover={{ y: -5 }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <FaUser className="text-xl text-blue-500" />
                  <div className="text-sm font-medium text-gray-500">이름</div>
                </div>
                <div className="font-medium text-gray-900">유주환</div>
              </motion.div>
              <motion.div
                className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                whileHover={{ y: -5 }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <FaBriefcase className="text-xl text-blue-500" />
                  <div className="text-sm font-medium text-gray-500">직위</div>
                </div>
                <div className="font-medium text-gray-900">
                  개인정보 보호책임자
                </div>
              </motion.div>
              <motion.div
                className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                whileHover={{ y: -5 }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <FaEnvelope className="text-xl text-blue-500" />
                  <div className="text-sm font-medium text-gray-500">
                    연락처
                  </div>
                </div>
                <motion.a
                  href="mailto:ironjustlikethat@gmail.com"
                  className="flex items-center gap-2 text-gray-900 transition-colors hover:text-blue-600"
                  whileHover={{ scale: 1.05 }}
                >
                  <span>ironjustlikethat@gmail.com</span>
                  <FaArrowRight className="text-sm" />
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </motion.section>
      </motion.div>
    </div>
  );
}
