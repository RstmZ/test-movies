'use client';

import { UpdateOrSaveMovie } from '@/app/ui/updateOrSaveMovie';
import { useParams } from 'next/navigation';

export default function Page() {
  const { id } = useParams();

  return (
    <div className={' h-screen flex flex-col p-6  xl:p-120 lg:p-12'}>
      <div className={'flex justify-between'}>
        <div className={'flex items-center gap-2'}>
          <h1 className={'text-heading-two font-heading'}> Edit</h1>{' '}
        </div>
      </div>
      <UpdateOrSaveMovie id={!isNaN(Number(id)) ? Number(id) : undefined} />
    </div>
  );
}
