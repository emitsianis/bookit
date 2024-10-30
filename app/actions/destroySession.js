'use server';

import { cookies } from 'next/headers';
import { createSessionClient } from '@/config/appwrite';

async function destroySession() {
  const sessionCookie = cookies().get('appwrite-session');

  if (!sessionCookie) {
    return { error: 'No session found' };
  }

  try {
    const { account } = await createSessionClient(sessionCookie.value);

    await account.deleteSession('current');

    await cookies().delete('appwrite-session');

    return { success: true };
  } catch (error) {
    return { error: 'Error deleting session' };
  }
}

export default destroySession;
