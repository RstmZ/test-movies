import { z } from 'zod';

export const SignupFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
  rememberMe: z.string(),
});
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
export const MovieFormSchema = z.object({
  title: z.string().trim(),
  year: z
    .string()
    .trim()
    .refine((year) => !isNaN(Number(year)), 'Year must be number')
    .refine((year) => year.length === 4, 'Year must be 4 digits'),
  image: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    ),
  id: z.string().optional().nullable(),
  prevImage: z.string().optional().nullable(),
});

export type AuthFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type MovieFormState =
  | {
      errors?: {
        image?: unknown[];
        year?: string[];
        title?: string[];
      };
      message?: string;
    }
  | undefined;
