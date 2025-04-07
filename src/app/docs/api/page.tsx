'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaCopy, FaKey } from 'react-icons/fa';

const apiEndpoints = [
  {
    category: '이력서',
    endpoints: [
      {
        method: 'GET',
        path: '/api/v1/resumes',
        description: '이력서 목록 조회',
        parameters: [
          { name: 'page', type: 'number', description: '페이지 번호' },
          { name: 'size', type: 'number', description: '페이지 크기' },
          { name: 'sort', type: 'string', description: '정렬 기준' }
        ],
        response: `{
  "content": [
    {
      "id": "string",
      "title": "string",
      "author": {
        "id": "string",
        "name": "string"
      },
      "createdAt": "string",
      "updatedAt": "string"
    }
  ],
  "pageable": {
    "page": 0,
    "size": 10,
    "total": 0
  }
}`
      },
      {
        method: 'POST',
        path: '/api/v1/resumes',
        description: '이력서 생성',
        parameters: [
          { name: 'title', type: 'string', description: '이력서 제목' },
          { name: 'content', type: 'object', description: '이력서 내용' }
        ],
        response: `{
  "id": "string",
  "title": "string",
  "content": {},
  "createdAt": "string"
}`
      },
      {
        method: 'GET',
        path: '/api/v1/resumes/:id',
        description: '이력서 상세 조회',
        parameters: [{ name: 'id', type: 'string', description: '이력서 ID' }],
        response: `{
  "id": "string",
  "title": "string",
  "content": {},
  "author": {
    "id": "string",
    "name": "string"
  },
  "createdAt": "string",
  "updatedAt": "string"
}`
      }
    ]
  },
  {
    category: '리뷰',
    endpoints: [
      {
        method: 'GET',
        path: '/api/v1/resumes/:id/reviews',
        description: '이력서 리뷰 목록 조회',
        parameters: [
          { name: 'id', type: 'string', description: '이력서 ID' },
          { name: 'page', type: 'number', description: '페이지 번호' },
          { name: 'size', type: 'number', description: '페이지 크기' }
        ],
        response: `{
  "content": [
    {
      "id": "string",
      "content": "string",
      "author": {
        "id": "string",
        "name": "string"
      },
      "createdAt": "string"
    }
  ],
  "pageable": {
    "page": 0,
    "size": 10,
    "total": 0
  }
}`
      },
      {
        method: 'POST',
        path: '/api/v1/resumes/:id/reviews',
        description: '이력서 리뷰 작성',
        parameters: [
          { name: 'id', type: 'string', description: '이력서 ID' },
          { name: 'content', type: 'string', description: '리뷰 내용' },
          { name: 'rating', type: 'number', description: '평점' }
        ],
        response: `{
  "id": "string",
  "content": "string",
  "rating": 5,
  "createdAt": "string"
}`
      }
    ]
  },
  {
    category: '사용자',
    endpoints: [
      {
        method: 'POST',
        path: '/api/v1/auth/register',
        description: '회원 가입',
        parameters: [
          { name: 'email', type: 'string', description: '이메일' },
          { name: 'password', type: 'string', description: '비밀번호' },
          { name: 'name', type: 'string', description: '이름' }
        ],
        response: `{
  "id": "string",
  "email": "string",
  "name": "string",
  "createdAt": "string"
}`
      },
      {
        method: 'POST',
        path: '/api/v1/auth/login',
        description: '로그인',
        parameters: [
          { name: 'email', type: 'string', description: '이메일' },
          { name: 'password', type: 'string', description: '비밀번호' }
        ],
        response: `{
  "accessToken": "string",
  "refreshToken": "string",
  "user": {
    "id": "string",
    "email": "string",
    "name": "string"
  }
}`
      }
    ]
  }
];

export default function ApiDocsPage() {
  const [activeCategory, setActiveCategory] = useState('이력서');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* 헤더 섹션 */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6"
          >
            API 문서
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            DevCV API의 엔드포인트와 사용 방법을 안내합니다. 모든 API는 REST
            형식을 따르며, JSON 응답을 제공합니다.
          </motion.p>
        </div>

        {/* API 키 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-blue-50 rounded-xl p-6 mb-12"
        >
          <div className="flex items-center mb-4">
            <FaKey className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-xl font-bold text-gray-900">인증</h2>
          </div>
          <p className="text-gray-600 mb-4">
            모든 API 요청에는 Authorization 헤더에 Bearer 토큰이 필요합니다.
            로그인 API를 통해 발급받은 accessToken을 사용하세요.
          </p>
          <div className="bg-gray-900 rounded-lg p-4 text-white font-mono text-sm">
            Authorization: Bearer {'<your-access-token>'}
          </div>
        </motion.div>

        {/* API 카테고리 탭 */}
        <div className="flex space-x-4 mb-8 overflow-x-auto">
          {apiEndpoints.map((category) => (
            <button
              key={category.category}
              onClick={() => setActiveCategory(category.category)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
                activeCategory === category.category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {category.category}
            </button>
          ))}
        </div>

        {/* API 엔드포인트 목록 */}
        <div className="space-y-8">
          {apiEndpoints
            .find((category) => category.category === activeCategory)
            ?.endpoints.map((endpoint) => (
              <motion.div
                key={endpoint.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span
                      className={`px-3 py-1 rounded-lg font-mono text-sm mr-3 ${
                        endpoint.method === 'GET'
                          ? 'bg-green-100 text-green-700'
                          : endpoint.method === 'POST'
                            ? 'bg-blue-100 text-blue-700'
                            : endpoint.method === 'PUT'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {endpoint.method}
                    </span>
                    <code className="font-mono text-gray-900">
                      {endpoint.path}
                    </code>
                  </div>
                  <button
                    onClick={() => navigator.clipboard.writeText(endpoint.path)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <FaCopy className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-gray-600 mb-4">{endpoint.description}</p>

                {endpoint.parameters.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-medium text-gray-900 mb-2">
                      Parameters
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left text-sm text-gray-500">
                            <th className="pb-2">Name</th>
                            <th className="pb-2">Type</th>
                            <th className="pb-2">Description</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm">
                          {endpoint.parameters.map((param) => (
                            <tr key={param.name}>
                              <td className="py-1 font-mono">{param.name}</td>
                              <td className="py-1 text-blue-600">
                                {param.type}
                              </td>
                              <td className="py-1 text-gray-600">
                                {param.description}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Response</h3>
                  <pre className="bg-gray-900 rounded-lg p-4 text-white font-mono text-sm overflow-x-auto">
                    {endpoint.response}
                  </pre>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
}
