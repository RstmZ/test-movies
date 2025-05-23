'use client';
import React, { FC } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Movie } from '@/app/lib/hooks/useMovies';

export const MovieCard: FC<{ movie: Movie }> = ({
  movie: { poster, publishingYear, title, id },
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push('/movies/edit/' + id)}
      className={
        'p-2 h-[334px] lg:h-[504px] lg:max-w-full  w-full rounded-xl overflow-hidden  bg-card  group hover:bg-brand hover:border-brand transition-all duration-300'
      }
    >
      <div
        className={
          'flex flex-row items-center justify-between gap-2 relative w-full rounded-input overflow-hidden bg-black h-[246px] lg:h-[400px] py-5'
        }
      >
        {poster ? (
          <Image
            src={poster}
            fill
            className={'w-full object-contain rounded-input overflow-hidden'}
            alt={'d'}
          />
        ) : null}
      </div>

      <div className={'p-2 flex flex-col  gap-2 '}>
        <p
          className={
            'text-base lg:text-xl group-hover:text-deep-purple transition-all duration-300'
          }
        >
          {title}
        </p>
        <p
          className={
            ' text-[10px] lg:text-sm group-hover:text-deep-purple transition-all duration-300'
          }
        >
          {publishingYear}
        </p>
      </div>
    </div>
  );
};
