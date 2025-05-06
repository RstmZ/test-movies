'use server';

import { put, del } from '@vercel/blob';
import { MovieFormSchema, MovieFormState } from '@/app/lib/definitions';
import prisma from '@/app/lib/prisma';
import { redirect } from 'next/navigation';

export const createMovie = async (state: MovieFormState, formData: FormData) => {
  const validatedFields = MovieFormSchema.safeParse({
    title: formData.get('title'),
    year: formData.get('year'),
    image: formData.get('image') ?? null,
    id: formData.get('id') ?? '',
    prevImage: formData.get('prevImage') ?? '',
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { image, title, year, id } = validatedFields.data;

  try {
    const { url } = await saveImage({ image });
    console.log(url);
    if (id) {
      //   if (image && prevImage) {
      //     await deleteImage({ url: prevImage });
      //   }

      await prisma.movie.update({
        where: {
          id: Number(id),
        },
        data: {
          publishingYear: Number(year),
          title,
          poster: url,
        },
      });
    } else {
      await prisma.movie.create({ data: { publishingYear: Number(year), title, poster: url } });
    }
    console.log('sfs');
  } catch (e) {
    console.log(e);
    return { message: 'Something went wrong.Try again later.' };
  }
  redirect('/movies');
};

export const updateMovie = async () => {};
export const saveImage = async ({ image }: { image: File }) => {
  try {
    return await put(image.name, image, {
      access: 'public',
      allowOverwrite: true,
    });
  } catch (e) {
    console.log(e);
    return { url: '' };
  }
};
export const deleteImage = async ({ url }: { url: string }) => {
  try {
    await del(url);
  } catch (e) {
    console.log(e);
  }
};
