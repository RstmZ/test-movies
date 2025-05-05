import { put } from '@vercel/blob';
import { MovieFormSchema, MovieFormState } from '@/app/lib/definitions';
import prisma from '@/app/lib/prisma';
import bcrypt from 'bcryptjs';
import { set } from '@/app/lib/session';

export const createMovie = (state: MovieFormState, formData: FormData) => {
  const validatedFields = MovieFormSchema.safeParse({
    title: formData.get('title'),
    year: formData.get('year'),
    image: formData.get('image'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { year, title, image } = validatedFields.data;

  if (!title) {
    return { message: 'ddd' };
  }
};

export const updateMovie = () => {};
export const saveImage = async ({ image, id }: { image: File; id: number }) => {
  await put(id.toString() + image.name.match(/([.].+)$/g), image, {
    access: 'public',
    token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN,
    allowOverwrite: true,
  });
};
