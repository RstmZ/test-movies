'use client';

import { UpdateOrSaveMovie } from '@/app/ui/updateOrSaveMovie';

export default function Page() {
  return (
    <div className={'  flex flex-col p-6  h-screen  xl:p-120 lg:p-12'}>
      <div className={'flex justify-between'}>
        <div className={'flex items-center gap-2'}>
          <h1 className={'text-heading-two font-heading'}> Create a new movie </h1>{' '}
        </div>
      </div>
      <UpdateOrSaveMovie />
    </div>
  );
}
