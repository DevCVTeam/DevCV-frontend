import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

// 문의 타입 정의
export interface Inquiry {
  id: number;
  userId?: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'pending' | 'inProgress' | 'completed';
  response?: string;
}

// 임시 데이터 저장소
let inquiries: Inquiry[] = [
  {
    id: 1,
    name: '홍길동',
    email: 'hong@example.com',
    subject: '이력서 결제 관련 문의',
    message: '이력서 결제 후 다운로드가 되지 않는 문제가 발생했습니다.',
    createdAt: new Date().toISOString(),
    status: 'pending'
  },
  {
    id: 2,
    name: '김철수',
    email: 'kim@example.com',
    subject: '이벤트 참여 방법',
    message: '현재 진행 중인 이벤트에 참여하는 방법을 알고 싶습니다.',
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 어제
    status: 'inProgress',
    response: '안녕하세요, 이벤트 참여 방법은 다음과 같습니다...'
  }
];

// 문의 목록 조회 (관리자용)
export async function GET(request: NextRequest) {
  const token = await getToken({ req: request });

  // 권한 확인 (관리자만 접근 가능)
  if (!token || token.role !== 'admin') {
    return NextResponse.json(
      { error: '관리자만 접근할 수 있습니다.' },
      { status: 403 }
    );
  }

  // URL 파라미터에서 status 필터 추출
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');

  // status 필터가 있으면 필터링
  const filteredInquiries = status
    ? inquiries.filter((inquiry) => inquiry.status === status)
    : inquiries;

  return NextResponse.json({ inquiries: filteredInquiries });
}

// 문의 등록
export async function POST(request: NextRequest) {
  try {
    const token = await getToken({ req: request });
    const body = await request.json();

    // 필수 필드 확인
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: '모든 필수 필드를 입력해주세요.' },
        { status: 400 }
      );
    }

    // 새 문의 생성
    const newInquiry: Inquiry = {
      id:
        inquiries.length > 0 ? Math.max(...inquiries.map((i) => i.id)) + 1 : 1,
      userId: token?.id ? Number(token.id) : undefined, // 로그인한 사용자 ID
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    // 배열에 추가 (실제로는 DB에 저장)
    inquiries.push(newInquiry);

    return NextResponse.json(
      { message: '문의가 성공적으로 등록되었습니다.', inquiry: newInquiry },
      { status: 201 }
    );
  } catch (error) {
    console.error('문의 등록 오류:', error);
    return NextResponse.json(
      { error: '문의 등록 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
