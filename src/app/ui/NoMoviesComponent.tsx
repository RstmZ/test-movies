import Link from 'next/link';

export const NoMoviesComponent = () => {
  return (
    <div className={'h-full w-full flex flex-col items-center justify-center gap-10'}>
      <h1 className={'text-heading-three lg:text-heading-two'}>Your movie list is empty</h1>
      <Link
        href={'/movies/create'}
        className={
          'bg-primary  text-base h-[56px] w-full lg:w-fit rounded-input flex items-center py-4 px-7 justify-center gap-2'
        }
      >
        Add a new movie
      </Link>
    </div>
  );
};
