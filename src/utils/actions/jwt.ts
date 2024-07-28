'use server';

import { sign } from 'jsonwebtoken';

export async function signFn(payload: string) {
  const cryptPassword = sign(
    { password: payload },
    Buffer.from(process.env.NEXTAUTH_SECRET!, 'base64'),
    {
      algorithm: 'HS512'
    }
  );

  return cryptPassword;
}
