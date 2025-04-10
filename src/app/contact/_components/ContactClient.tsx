'use client';

import { motion } from 'framer-motion';
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
            언제든지 문의해주세요.
          </p>
        </motion.section>

        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          {/* Contact Form */}
          <motion.section variants={itemVariants}>
            <div className="rounded-xl bg-white p-8 shadow-lg">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                메시지 보내기
              </h2>
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    이름
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    이메일
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    제목
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    메시지
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-600"
                >
                  보내기
                </button>
              </form>
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
