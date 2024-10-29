'use server';

import { createAdminClient } from '@/config/appwrite';
import { cookies } from 'next/headers';

async function createSession(prevState, formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  if (!email || !password) {
    return {
      error: 'Email and password are required',
    };
  }

  const { account } = await createAdminClient();

  try {
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set('appwrite-session', session.secret, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: new Date(session.expire),
      path: '/',
    });

    return {
      success: true,
    };
  } catch (error) {
    console.log('Error creating session', error);

    return { error: 'Invalid email or password' };
  }
}

export default createSession;
