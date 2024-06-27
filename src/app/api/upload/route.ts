import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { NextRequest, NextResponse } from 'next/server';

const Bucket = process.env.AWS_S3_UPLOAD_BUCKET;
const s3 = new S3Client({
  region: process.env.AWS_S3_UPLOAD_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_UPLOAD_KEY as string,
    secretAccessKey: process.env.AWS_S3_UPLOAD_SECRET as string
  }
});

export async function POST(request: NextRequest) {
  try {
    const formEntries = Array.from((await request.formData()).entries());
    const formData = formEntries.reduce<Record<string, FormDataEntryValue>>(
      (acc, [key, value]) => {
        acc[key] = value;
        return acc;
      },
      {}
    );

    const { content_image } = formData as unknown as {
      content_image?: File;
    };

    if (!content_image) {
      throw new Error('No content_image in the request');
    }

    const arrayBuffer = await content_image.arrayBuffer();
    const Body = Buffer.from(arrayBuffer);

    const uploadParams = {
      Bucket,
      Key: content_image.name,
      Body,
      ContentType: content_image.type // 업로드 파일의 Content-Type 설정
    };

    await s3.send(new PutObjectCommand(uploadParams));

    // 업로드된 파일의 URL 생성
    const preview_image_url = `https://${Bucket}.s3.${process.env.AWS_S3_UPLOAD_REGION}.amazonaws.com/${content_image.name}`;

    return NextResponse.json({ preview_image_url });
  } catch (error) {
    console.error('Error in uploading image:', error);
    return NextResponse.json(
      { error: '이미지 업로드 중 문제가 발생했습니다.' },
      { status: 500 }
    );
  }
}
