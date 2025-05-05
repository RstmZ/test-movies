'use server';
import { SignupFormSchema, AuthFormState } from '@/app/lib/definitions';
import prisma from '@/app/lib/prisma';
import bcrypt from 'bcryptjs';
import { deleteSession, set } from '@/app/lib/session';
import { redirect } from 'next/navigation';
export async function signup(state: AuthFormState, formData: FormData) {
  // Validate form fields
  console.log(formData);
  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    rememberMe: formData.get('rememberMe'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;
  // e.g. Hash the user's password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Insert the user into the database or call an Auth Library's API
  const userExist = await prisma.user.findUnique({ where: { email } });
  if (userExist) {
    return {
      message: 'User already exist',
    };
  }
  const user = await prisma.user.upsert({
    update: {
      email,
    },
    where: {
      email: email,
    },
    create: {
      email,
      password: hashedPassword,
    },
  });

  if (!user) {
    return {
      message: 'An error occurred while creating your account.',
    };
  }
  await set(user.id.toString(), user.email);
  // 5. Redirect user
  redirect('/movies');
}
export async function login(state: AuthFormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    rememberMe: formData.get('rememberMe'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  const userExist = await prisma.user.findUnique({ where: { email } });
  if (!userExist) {
    return {
      message: 'User does not exist',
    };
  }
  if (!(await bcrypt.compare(password, userExist.password))) {
    return {
      message: 'Incorrect password. Please try again.',
    };
  }
  if (validatedFields.data.rememberMe === 'on') {
    await set(userExist.id.toString(), userExist.email);
  }

  redirect('/movies');
}

export async function logout() {
  await deleteSession();
  redirect('/sign-in');
}
