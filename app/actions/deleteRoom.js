'use server';

import { createSessionClient } from '@/config/appwrite';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { Query } from 'node-appwrite';
import { revalidatePath } from 'next/cache';

async function deleteRoom(roomId) {
  const sessionCookie = (await cookies()).get('appwrite-session');
  if (!sessionCookie) {
    redirect('/login');
  }

  try {
    const { account, databases } = await createSessionClient(sessionCookie.value);

    const user = await account.get();
    const userId = user.$id;

    const { documents: rooms } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
      [Query.equal('user_id', userId)],
    );

    const roomToDelete = rooms.find((room) => room.$id === roomId);
    if (!roomToDelete) {
      return {
        error: 'Room not found',
      };
    }

    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
      roomToDelete.$id,
    );

    revalidatePath('/rooms/my', 'layout');
    revalidatePath('/', 'layout');

    return {
      success: true,
    };
  } catch (e) {
    console.error(e);
    return {
      error: 'An error occurred',
    };
  }
}

export default deleteRoom;
