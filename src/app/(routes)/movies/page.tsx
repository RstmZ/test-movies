'use client';

import { IoAddCircleOutline } from 'react-icons/io5';
import Link from 'next/link';
import { deleteSession } from '@/app/lib/session';
import { MdOutlineLogout } from 'react-icons/md';
import { useState } from 'react';
import { Loader } from '@/app/ui/Loader';
import { MovieCard } from '@/app/ui/MovieCard';

import ReactPaginate from 'react-paginate';
import { useMovies } from '@/app/lib/hooks/useMovies';
import { NoMoviesComponent } from '@/app/ui/NoMoviesComponent';

export default function Page() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useMovies(page);
  return (
    <div className={'p-6  xl:p-120 lg:p-12 h-screen'}>
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
      {!data?.data && !isLoading ? <NoMoviesComponent /> : null}

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
      <div className={'flex items-center w-full justify-center gap-2 mt-6'}>
        {data?.totalPages && data.totalPages > 1 ? (
          <ReactPaginate
            className={'flex gap-2 items-center'}
            breakLabel="..."
            nextLabel="NEXT"
            onPageChange={({ selected }) => setPage(selected + 1)}
            pageRangeDisplayed={5}
            pageCount={data?.totalPages}
            previousLabel="PREV"
            renderOnZeroPageCount={null}
            nextLinkClassName={'cursor-pointer '}
            previousClassName={'cursor-pointer'}
            activeClassName={'bg-primary'}
            pageClassName={`cursor-pointer bg-card text-white rounded-input h-8 w-8  text-center flex items-center justify-center`}
          />
        ) : null}
      </div>
      {isLoading ? <Loader /> : null}
      {/*<Loader />*/}
    </div>
  );
}
