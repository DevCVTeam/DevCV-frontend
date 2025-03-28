import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '환불 정책 | DevCV',
  description: 'DevCV의 환불 정책을 확인하세요.'
};

const refundPolicies = [
  {
    title: '1. 환불 정책 개요',
    content: `DevCV는 고객 만족을 최우선으로 생각하며, 다음과 같은 환불 정책을 시행하고 있습니다.

- 결제일로부터 7일 이내: 전액 환불
- 결제일로부터 7일 초과 30일 이내: 잔여 기간에 대한 일할 계산 환불
- 결제일로부터 30일 초과: 환불 불가

단, 다음의 경우에는 환불이 제한될 수 있습니다:
- 서비스를 이미 실질적으로 이용한 경우
- 약관에 명시된 환불 제한 사유에 해당하는 경우`
  },
  {
    title: '2. 환불 신청 방법',
    content: `환불을 신청하시려면 다음의 절차를 따라주세요:

1) 고객센터 문의하기를 통한 환불 신청
- 환불 사유 작성
- 결제 정보 확인
- 환불 계좌 정보 제공

2) 이메일을 통한 환불 신청
- support@devcv.net으로 환불 신청 메일 발송
- 제목: [환불신청] 회원명/결제일자
- 내용: 환불 사유, 결제 정보, 환불 계좌 정보`
  },
  {
    title: '3. 환불 처리 기간',
    content: `환불 신청이 접수된 후, 다음과 같은 일정으로 처리됩니다:

1) 환불 승인 검토: 1-2영업일
2) 환불 금액 산정: 1영업일
3) 계좌 입금 처리: 1-3영업일

※ 카드 결제 취소의 경우, 카드사 사정에 따라 취소 처리가 늦어질 수 있습니다.`
  },
  {
    title: '4. 환불 금액 산정 기준',
    content: `환불 금액은 다음과 같은 기준으로 산정됩니다:

1) 구독형 서비스
- 월 단위 결제: 이용 일수 기준으로 일할 계산
- 연 단위 결제: 이용 개월 수 기준으로 월할 계산

2) 단품형 서비스
- 이용 전: 전액 환불
- 이용 후: 환불 불가

※ 프로모션 할인이 적용된 경우, 할인된 금액을 기준으로 환불 금액이 산정됩니다.`
  },
  {
    title: '5. 환불 제한 사항',
    content: `다음과 같은 경우에는 환불이 제한될 수 있습니다:

1) 서비스 이용 제한 사유
- 서비스 약관을 위반한 경우
- 불법적인 목적으로 서비스를 이용한 경우
- 타인의 권리를 침해한 경우

2) 콘텐츠 다운로드 완료 후
- 이력서 템플릿을 이미 다운로드한 경우
- 프리미엄 기능을 이미 사용한 경우

3) 프로모션 상품
- 프로모션 조건에 환불 제한이 명시된 경우
- 특가 할인 상품의 경우`
  }
];

export default function RefundPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            환불 정책
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-gray-600">
            최종 수정일: 2024년 3월 15일
          </p>
        </div>

        <div className="mt-16 space-y-12">
          {refundPolicies.map((policy) => (
            <section key={policy.title} className="prose prose-gray max-w-none">
              <h2 className="text-xl font-bold text-gray-900">
                {policy.title}
              </h2>
              <div className="mt-4 whitespace-pre-line text-gray-600">
                {policy.content}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-main/5 p-8 text-center">
          <h3 className="text-lg font-semibold text-gray-900">
            환불 관련 문의
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            환불 정책에 대해 궁금하신 점이 있으시다면 고객센터로 문의해주세요.
          </p>
          <div className="mt-4 space-y-2">
            <p className="text-sm text-gray-600">이메일: support@devcv.net</p>
            <p className="text-sm text-gray-600">
              전화: 02-1234-5678 (평일 09:00-18:00)
            </p>
          </div>
          <button className="mt-6 rounded-md bg-main px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-main/90">
            고객센터 문의하기
          </button>
        </div>
      </div>
    </main>
  );
}
