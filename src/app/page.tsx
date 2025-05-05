import { verifySession } from '@/app/lib/dal';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await verifySession();

  if (session.userId) {
    return redirect('/movies');
  } else {
    redirect('/auth/signup');
  }
}
