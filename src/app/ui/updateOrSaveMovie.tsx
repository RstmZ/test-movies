'use client';
import { FC, useActionState, useEffect } from 'react';

import { createMovie } from '@/app/actions/movie';
import { FileInput } from '@/app/ui/dropzone';
import { Input } from '@/app/ui/Input';
import { Loader } from '@/app/ui/Loader';
import { useRouter } from 'next/navigation';
import { useMovie } from '@/app/lib/hooks/useMovie';

export const UpdateOrSaveMovie: FC<{ id?: number }> = ({ id }) => {
  const onChange = async () => {
    console.log('g');
  };
  const { data, isLoading } = useMovie(Number(id));
  const [state, action, pending] = useActionState(createMovie, undefined);
  const router = useRouter();
  useEffect(() => {
    if (!isLoading && !data && id) {
      router.push('/movies');
    }
  }, [isLoading, data, router, id]);
  const handleSubmit = (formData: FormData) => {
    // Append the ID to the form data
    if (id !== undefined && data?.poster) {
      formData.append('id', id.toString());
      formData.append('prevImage', data.poster);
    }
    action(formData);
  };
  return (
    <form action={handleSubmit} className="flex-col flex mt-120 flex-grow  h-full">
      {state?.message && <p className="text-error text-heading-3">{state.message}</p>}
      <div
        className={
          'flex flex-col-reverse lg:flex-row gap-32 w-full h-full items-center lg:items-start'
        }
      >
        <FileInput onChange={onChange} image={data?.poster} />
        <div className={'gap-6 flex flex-col w-full lg:w-[362px] '}>
          <div className="flex flex-col">
            <Input
              type="text"
              placeholder="Title"
              name="title"
              extra={'w-full'}
              defaultValue={data?.title}
            />
            {state?.errors?.title && <p className="text-error">{state.errors.title}</p>}
          </div>

          <div className="flex flex-col">
            <Input
              type="number"
              placeholder="Year"
              name="year"
              extra={' w-full lg:w-[241px]'}
              defaultValue={data?.publishingYear}
            />
            {state?.errors?.year && (
              <div className="text-error">
                <p>Year:</p>
                <ul>
                  {state.errors.year.map((error) => (
                    <li key={error}>- {error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className={'flex gap-2 w-full'}>
            <button
              disabled={pending}
              type="submit"
              className={'border border-white rounded-input py-4 flex-1 '}
            >
              Cancel
            </button>
            <button
              disabled={pending}
              type="submit"
              className={'bg-primary py-4 flex-1 text-center rounded-input'}
            >
              {id ? 'Update' : 'Submit'}
            </button>
          </div>
        </div>
      </div>

      {pending ? <Loader /> : null}
    </form>
  );
};
