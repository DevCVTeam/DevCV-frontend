export const Authenticate = (
  name?: any,
  onAuth?: any
): Promise<{ name: string; phone: string }> => {
  return new Promise((resolve, reject) => {
    try {
      const { IMP } = window;
      IMP?.init(process.env.NEXT_PUBLIC_IMP_MERCHANT_UID!);
      // IMP.certification(param, callback) 호출
      IMP?.certification(
        {
          // param
          pg: 'inicis_unified', //본인인증 설정이 2개이상 되어 있는 경우 필수
          merchant_uid: process.env.NEXT_PUBLIC_IMP_MERCHANT_UID!, // 주문 번호
          m_redirect_url: 'http://localhost:3000', // 모바일환경에서 popup:false(기본값) 인 경우 필수, 예: https://www.myservice.com/payments/complete/mobile
          popup: false // PC환경에서는 popup 파라미터가 무시되고 항상 true 로 적용됨
        },
        async (rsp: any) => {
          // callback
          if (rsp.success) {
            const { imp_uid } = rsp;

            // 인증 토큰 발급 받기
            const tokenResponse = await fetch('/imp/users/getToken', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                // REST API키
                imp_key: process.env.NEXT_PUBLIC_IMP_REST_KEY!,
                // REST API Secret
                imp_secret: process.env.NEXT_PUBLIC_IMP_SECRET_KEY!
              })
            });

            if (!tokenResponse.ok) {
              throw new Error('Failed to fetch token');
            }

            const tokenData = await tokenResponse.json();
            const { access_token } = tokenData.response;

            // imp_uid로 인증 정보 조회
            const certificationResponse = await fetch(
              `/imp/certifications/${imp_uid}`,
              {
                method: 'GET',
                headers: {
                  Authorization: access_token
                }
              }
            );

            if (!certificationResponse.ok) {
              throw new Error('Failed to fetch certification info');
            }

            const data = await certificationResponse.json();
            if (name === data.response.name) {
              onAuth();
            }
            resolve({ name: data.response.name, phone: data.response.phone });
          } else {
            resolve({ name: '', phone: '' });
          }
        }
      );
    } catch (error) {
      console.log('send error ! : ' + error);
      reject({ name: '', phone: '' });
    }
  });
};
