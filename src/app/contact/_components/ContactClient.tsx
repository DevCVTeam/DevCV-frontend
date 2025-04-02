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
        <motion.section className="text-center mb-16" variants={itemVariants}>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            문의하기
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            궁금한 점이나 제안사항이 있으시다면
            <br />
            언제든지 문의해주세요.
          </p>
        </motion.section>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.section variants={itemVariants}>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                메시지 보내기
              </h2>
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    이름
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    이메일
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    제목
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    메시지
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
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
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  연락처 정보
                </h2>
                <div className="space-y-6">
                  {contactInfo.map((item) => (
                    <motion.a
                      key={item.id}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 text-gray-600 hover:text-blue-500 transition-colors"
                      variants={itemVariants}
                    >
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <item.icon className="text-blue-600 text-xl" />
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
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  소셜 미디어
                </h2>
                <div className="space-y-6">
                  {socialLinks.map((item) => (
                    <motion.a
                      key={item.id}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 text-gray-600 hover:text-blue-500 transition-colors"
                      variants={itemVariants}
                    >
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <item.icon className="text-blue-600 text-xl" />
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
