import axios from 'axios';

export const handleAuthenticate = () => {
  try {
    const { IMP } = window;
    IMP?.init(process.env.NEXT_PUBLIC_IMP!);
    // IMP.certification(param, callback) 호출
    IMP?.certification(
      {
        // param
        pg: 'inicis_unified', //본인인증 설정이 2개이상 되어 있는 경우 필수
        merchant_uid: process.env.NEXT_PUBLIC_MERCHANT_UID!, // 주문 번호
        m_redirect_url: 'http://localhost:3000', // 모바일환경에서 popup:false(기본값) 인 경우 필수, 예: https://www.myservice.com/payments/complete/mobile
        popup: false // PC환경에서는 popup 파라미터가 무시되고 항상 true 로 적용됨
      },
      async (rsp: any) => {
        // callback
        if (rsp.success) {
          const { imp_uid } = rsp.imp_uid;
          console.log(rsp);
          // 인증 토큰 발급 받기
          const getToken = await axios.post(
            'https://api.iamport.kr/users/getToken',
            {
              // REST API키
              imp_key: process.env.NEXT_PUBLIC_REST_KEY!,
              // REST API Secret
              imp_secret: process.env.NEXT_PUBLIC_SECRET_KEY!
            },
            {
              // "Content-Type": "application/json"
              headers: { 'Content-Type': 'application/json' }
            }
          );
          // 인증 토큰
          const { access_token } = getToken.data;
          // imp_uid로 인증 정보 조회
          const getCertifications = await axios({
            // imp_uid 전달
            url: `https://api.iamport.kr/certifications/${imp_uid}`,
            // GET method
            method: 'get',
            // 인증 토큰 Authorization header에 추가
            headers: { Authorization: access_token }
          });
          // 조회한 인증 정보
          const certificationsInfo = getCertifications.data;
        } else {
          window.alert(`인증 실패되었습니다..${rsp.error}`);
        }
      }
    );
  } catch (error) {
    console.log('send error ! : ' + error);
  }
};
