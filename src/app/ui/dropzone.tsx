import React, { FC, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { BsDownload } from 'react-icons/bs';

export const FileInput: FC<{
  onChange: (file: File) => void;
  image?: string;
}> = ({ onChange, image }) => {
  const [images, setImages] = useState<File | null>(null);
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Do something with the files
      setImages(acceptedFiles[0]);
      onChange(acceptedFiles[0]);
    },
    [onChange]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={
        'w-full lg:w-[473px] max-h-[504px] max-w-[473px] h-full  p-3 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 flex   flex-row items-center justify-between rounded-input border-white border-dashed bg-input text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400  md:text-sm'
      }
    >
      <input name={'image'} {...getInputProps()} />
      <div className={'flex w-full flex-col h-full items-center justify-between px-3 text-white'}>
        {images ? (
          <>
            <div
              className={
                'flex flex-row items-center justify-between gap-2 relative w-3/4  h-3/4 py-5'
              }
            >
              <Image
                src={image || URL.createObjectURL(images)}
                fill
                alt="image"
                className="absolute bottom-0 left-0 w-full object-contain p-2"
              />
            </div>
            <p className={'text-xs    lg:text-sm'}>{images.name}</p>
            <div className={'flex flex-row items-center gap-2'}>
              <button
                className={'text-xs  font-semibold  lg:text-sm'}
                type={'button'}
                onClick={(e) => {
                  e.stopPropagation();
                  setImages(null);
                }}
                color="gray"
              >
                Remove
              </button>
              <button
                type={'button'}
                className={
                  ' bg-primary  p-2 rounded-input  text-center text-xs font-semibold dark:bg-blue-300 lg:text-sm'
                }
              >
                Upload new
              </button>
            </div>
          </>
        ) : (
          <>
            {isDragActive ? (
              <div className={'flex h-full w-full flex-col items-center justify-center'}>
                <BsDownload />
                <p className={'text-xs    lg:text-sm w-3/4'}>Drop an image here</p>
              </div>
            ) : (
              <div className={'flex h-full w-full flex-col items-center justify-center'}>
                <BsDownload />

                <p className={'text-xs   self-center lg:text-sm w-3/4 text-center'}>
                  Drag and drop image here or select from your device
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
