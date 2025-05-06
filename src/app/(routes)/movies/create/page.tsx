'use client';

import { UpdateOrSaveMovie } from '@/app/ui/updateOrSaveMovie';

export default function Page() {
  return (
    <div className={'p-120 h-full flex flex-col '}>
      <div className={'flex justify-between'}>
        <div className={'flex items-center gap-2'}>
          <h1 className={'text-heading-two font-heading'}> Create a new movie </h1>{' '}
        </div>
      </div>
      <UpdateOrSaveMovie />
    </div>
  );
}
