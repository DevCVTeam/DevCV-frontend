import { NextRequest } from 'next/server';
export interface FileResponse {
  type: string;
  arrayBuffer: number[];
}
export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');
  // 파일 경로에 요청
  const rawData = await fetch(url as string);

  const blob = await rawData.blob();

  // 브라우저에서 Blob 데이터를 만들기 위한 정보 응답
  return Response.json({
    type: blob.type,
    arrayBuffer: Object.values(new Uint8Array(await blob.arrayBuffer()))
  });
}
