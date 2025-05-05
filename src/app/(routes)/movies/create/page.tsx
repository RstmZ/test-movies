'use client';

import { UpdateOrSaveMovie } from '@/app/ui/updateOrSaveMovie';

export default function Page({ params }: { params: { id?: string } }) {
  return (
    <div className={'p-120 h-full flex flex-col '}>
      <div className={'flex justify-between'}>
        <div className={'flex items-center gap-2'}>
          <h1 className={'text-heading-two font-heading'}> Create a new movie </h1>{' '}
        </div>
      </div>
      <UpdateOrSaveMovie id={!isNaN(Number(params.id)) ? Number(params.id) : undefined} />
    </div>
  );
}
