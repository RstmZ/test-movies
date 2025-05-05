'use client';
import { FC, useActionState } from 'react';
import { FaCheck } from 'react-icons/fa';

import { createMovie, saveImage } from '@/app/actions/movie';
import { FileInput } from '@/app/ui/dropzone';
import { Input } from '@/app/ui/Input';

export const UpdateOrSaveMovie: FC<{ id?: number }> = ({ id }) => {
  const [state, action, pending] = useActionState(createMovie, undefined);
  const onChange = async (file: File) => {
    await saveImage({ image: file, id: 2 });
  };
  return (
    <form action={action} className="flex-col flex mt-120 flex-grow ">
      {state?.message && <p className="text-error text-heading-3">{state.message}</p>}
      <div className={'flex gap-32 w-full'}>
        <FileInput onChange={onChange} />
        <div className={'gap-6 flex flex-col w-[362px]'}>
          <div className="flex flex-col">
            <Input type="text" placeholder="Title" name="title" extra={'w-full'} />
            {state?.errors?.title && <p className="text-error">{state.errors.title}</p>}
          </div>

          <div className="flex flex-col">
            <Input type="number" placeholder="Year" name="year" extra={'w-[241px]'} />
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

      {pending ? (
        <div
          className={
            'bg-gray-50/75 z-50 absolute flex items-center justify-center min-h-full min-w-full top-0 left-0 right-0 bottom-0'
          }
        >
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-primary"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : null}
    </form>
  );
};
