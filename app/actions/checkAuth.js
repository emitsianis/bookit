'use server';

import { cookies } from 'next/headers';
import { createSessionClient } from '@/config/appwrite';

async function checkAuth() {
  const sessionCookie = (await cookies()).get('appwrite-session');

  if (!sessionCookie) {
    return {
      isAuthenticated: false,
    };
  }

  try {
    const { account } = await createSessionClient(sessionCookie.value);
    const user = await account.get();

    return {
      isAuthenticated: true,
      user: {
        id: user.$id,
        name: user.name,
        email: user.email,
      },
    };
  } catch (e) {
    console.log('Error checking auth', e);

    return {
      isAuthenticated: false,
    };
  }
}

export default checkAuth;
