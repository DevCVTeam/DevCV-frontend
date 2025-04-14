'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FaEnvelope, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const contactInfo = [
  {
    id: 1,
    icon: FaEnvelope,
    label: '이메일',
    value: 'ironjustlikethat@gmail.com',
    link: 'mailto:ironjustlikethat@gmail.com'
  }
  // {
  //   id: 2,
  //   icon: FaPhone,
  //   label: '전화',
  //   value: '02-123-4567',
  //   link: 'tel:02-123-4567'
  // }
  // {
  //   id: 3,
  //   icon: FaMapMarkerAlt,
  //   label: '주소',
  //   value: '서울특별시 강남구 테헤란로 123',
  //   link: 'https://maps.google.com'
  // }
];

const socialLinks = [
  {
    id: 1,
    icon: FaGithub,
    label: 'GitHub',
    link: 'https://github.com/DevCVTeam'
  },
  {
    id: 2,
    icon: FaLinkedin,
    label: 'LinkedIn',
    link: 'https://linkedin.com/company/devcv'
  },
  {
    id: 3,
    icon: FaTwitter,
    label: 'Twitter',
    link: 'https://twitter.com/devcv'
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

export default function ContactClient() {
  const router = useRouter();

  // Direct GitHub login and comment
  const handleDirectGitHub = () => {
    window.open('https://github.com/orgs/DevCVTeam/discussions/1', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <motion.div
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.section className="mb-16 text-center" variants={itemVariants}>
          <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            문의하기
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            궁금한 점이나 제안사항이 있으시다면
            <br />
            GitHub 토론 페이지에서 직접 문의해주세요.
          </p>
          <motion.div
            className="mt-10 flex flex-col items-center justify-center gap-6"
            variants={itemVariants}
          >
            <div className="rounded-xl bg-white p-6 shadow-lg transition-transform hover:scale-105">
              <p className="mb-4 text-lg text-gray-600">
                GitHub 계정으로 로그인하여 문의를 남기시면
                <br />
                빠르게 답변해 드리겠습니다.
              </p>
              <button
                onClick={handleDirectGitHub}
                className="flex w-full items-center justify-center gap-3 rounded-lg bg-gray-800 px-10 py-4 font-semibold text-white transition-colors hover:bg-gray-700"
              >
                <FaGithub className="text-2xl" />
                <span className="text-lg">GitHub에서 문의하기</span>
              </button>
            </div>
          </motion.div>
        </motion.section>

        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          {/* Instructions */}
          <motion.section variants={itemVariants}>
            <div className="rounded-xl bg-white p-8 shadow-lg">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                GitHub 토론으로 문의하는 방법
              </h2>
              <ol className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="flex size-6 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                    1
                  </span>
                  <span>
                    &apos;GitHub에서 문의하기&apos; 버튼을 클릭하여 GitHub 토론
                    페이지로 이동합니다.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex size-6 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                    2
                  </span>
                  <span>
                    GitHub 계정으로 로그인합니다. 계정이 없다면 무료로 가입할 수
                    있습니다.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex size-6 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                    3
                  </span>
                  <span>
                    토론 페이지 하단에 있는 댓글 창에 문의 내용을 작성합니다.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex size-6 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                    4
                  </span>
                  <span>
                    &apos;Comment&apos; 버튼을 클릭하여 문의를 등록합니다.
                  </span>
                </li>
              </ol>
              <div className="mt-6 rounded-lg bg-blue-50 p-4 text-blue-800">
                <p className="font-medium">문의 작성 팁</p>
                <p className="mt-1 text-sm">
                  문의 시 가능한 자세한 내용을 포함해 주시면 더 빠르고 정확한
                  답변을 받으실 수 있습니다. 특히 버그 신고의 경우, 발생 환경과
                  재현 방법을 알려주시면 큰 도움이 됩니다.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Contact Info */}
          <motion.section variants={itemVariants}>
            <div className="space-y-8">
              {/* Contact Methods */}
              <div className="rounded-xl bg-white p-8 shadow-lg">
                <h2 className="mb-6 text-2xl font-bold text-gray-900">
                  연락처 정보
                </h2>
                <div className="space-y-6">
                  {contactInfo.map((item) => (
                    <motion.a
                      key={item.id}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 text-gray-600 transition-colors hover:text-blue-500"
                      variants={itemVariants}
                    >
                      <div className="rounded-lg bg-blue-100 p-3">
                        <item.icon className="text-xl text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {item.label}
                        </div>
                        <div>{item.value}</div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="rounded-xl bg-white p-8 shadow-lg">
                <h2 className="mb-6 text-2xl font-bold text-gray-900">
                  소셜 미디어
                </h2>
                <div className="space-y-6">
                  {socialLinks.map((item) => (
                    <motion.a
                      key={item.id}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 text-gray-600 transition-colors hover:text-blue-500"
                      variants={itemVariants}
                    >
                      <div className="rounded-lg bg-blue-100 p-3">
                        <item.icon className="text-xl text-blue-600" />
                      </div>
                      <div className="font-medium text-gray-900">
                        {item.label}
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </motion.div>
    </div>
  );
}
