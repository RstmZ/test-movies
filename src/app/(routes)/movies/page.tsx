'use client';

import { IoAddCircleOutline } from 'react-icons/io5';
import Link from 'next/link';
import { deleteSession } from '@/app/lib/session';
import { MdOutlineLogout } from 'react-icons/md';
import { useState } from 'react';
import { Loader } from '@/app/ui/Loader';
import { MovieCard } from '@/app/ui/MovieCard';
import { useMovies } from '@/app/lib/hooks/useMovies';

export default function Page() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useMovies(page);
  // const queryClient = getQueryClient();
  //
  // useEffect(() => {
  //   queryClient.invalidateQueries({ queryKey: ['movies'] });
  // }, [queryClient]);
  return (
    <div className={'p-6  xl:p-120 lg:p-12'}>
      <div className={'flex justify-between'}>
        <div className={'flex gap-2 items-center '}>
          <h1 className={'text-heading-two font-heading'}> Movies</h1>{' '}
          <Link href={'/movies/create'} className={'cursor-pointer'}>
            <IoAddCircleOutline className={'h-8 w-8'} />
          </Link>
        </div>
        <Link
          href={'/auth/login'}
          onClick={() => deleteSession()}
          className={'flex gap-2 items-center cursor-pointer'}
        >
          Logout
          <MdOutlineLogout className={'h-8 w-8'} />
        </Link>
      </div>
      <div
        className={
          'grid grid-cols-2 max-w-[calc(180px+180px+24px)] m-auto lg:grid-cols-4 gap-5 lg:gap-6 lg:max-w-[calc(282px*4+24px*3)] mt-[128px] place-items-center'
        }
      >
        {' '}
        {data?.data.map((movie) => {
          return <MovieCard key={movie.id} movie={movie} />;
        })}
      </div>
      <div className={'flex items-center w-full justify-center gap-2 '}>
        <button
          className={'cursor-pointer'}
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
        >
          Prev
        </button>
        <button
          className={'cursor-pointer'}
          disabled={page === data?.totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
      {isLoading ? <Loader /> : null}
    </div>
  );
}
