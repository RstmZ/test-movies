'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { get } from '@/app/lib/session';

export const verifySession = async () => {
  const cookie = (await cookies()).get('session-id')?.value;
  if (!cookie) {
    redirect('/auth/login');
  }

  const session = await get();
  console.log('session', session);
  if (!session) {
    redirect('/auth/signup');
  }
  console.log('session', session);
  return { isAuth: true, userId: session };
};

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;
  return session.userId;
});
