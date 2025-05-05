'use server';

import { cookies } from 'next/headers';
import { redis } from '@/app/lib/redis';

type SessionId = string;

export async function getSessionId(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get('session-id')?.value;
}

async function setSessionId(sessionId: SessionId): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set('session-id', sessionId);
}

export async function getSessionIdAndCreateIfMissing() {
  const sessionId = await getSessionId();
  if (!sessionId) {
    const newSessionId = crypto.randomUUID();
    await setSessionId(newSessionId);

    return newSessionId;
  }

  return sessionId;
}
export async function get(key: string, namespace: string = '') {
  const sessionId = await getSessionId();
  if (!sessionId) {
    return null;
  }
  return redis.hget(`session-${namespace}-${sessionId}`, key);
}
export async function deleteSession(namespace: string = '') {
  const sessionId = await getSessionId();
  if (!sessionId) {
    return null;
  }
  return redis.hdel(`session-${namespace}-${sessionId}`);
}

export async function getAll(namespace: string = '') {
  const sessionId = await getSessionId();
  if (!sessionId) {
    return null;
  }
  return redis.hgetall(`session-${namespace}-${sessionId}`);
}

export async function set(key: string, value: string, namespace: string = '') {
  const sessionId = await getSessionIdAndCreateIfMissing();
  console.log(sessionId);
  return redis.hset(`session-${namespace}-${sessionId}`, { key, value });
}
