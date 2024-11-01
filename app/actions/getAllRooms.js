'use server';

import { createAdminClient } from '@/config/appwrite';
import { redirect } from 'next/navigation';

async function getAllRooms() {
  try {
    const { databases } = await createAdminClient();

    const { documents: rooms } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
    );

    return rooms;
  } catch (e) {
    console.error(e);
    redirect('/error');
  }
}

export default getAllRooms;
