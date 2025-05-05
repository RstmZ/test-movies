'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { get } from '@/app/lib/session';

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value;
  if (!cookie) {
    redirect('/auth/login');
  }
  const session = await get(cookie);

  if (!session) {
    redirect('/auth/signup');
  }
  console.log(session);
  return { isAuth: true, userId: session };
});

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;
  return session.userId;
});
