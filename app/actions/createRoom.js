'use server';

import { createAdminClient } from '@/config/appwrite';
import checkAuth from '@/app/actions/checkAuth';
import { ID } from 'node-appwrite';
import { revalidatePath } from 'next/cache';

async function createRoom(previousState, formData) {
  const { databases, storage } = await createAdminClient();

  try {
    const { user } = await checkAuth();
    if (!user) {
      return {
        error: 'You must be logged in to create a room',
      };
    }

    let imageID;

    const image = formData.get('image');

    if (image?.size > 0 && image?.name !== 'undefined') {
      try {
        const response = await storage.createFile(
          process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
          ID.unique(),
          image,
        );

        imageID = response.$id;
      } catch (error) {
        console.log('Error uploading image', error);
        return {
          error: 'An error occurred while uploading the image',
        };
      }
    } else {
      console.log('No image provided');
    }

    const newRoom = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ROOMS,
      ID.unique(),
      {
        user_id: user.id,
        name: formData.get('name'),
        description: formData.get('description'),
        sqft: formData.get('sqft'),
        capacity: formData.get('capacity'),
        location: formData.get('location'),
        address: formData.get('address'),
        availability: formData.get('availability'),
        price_per_hour: formData.get('price_per_hour'),
        amenities: formData.get('amenities'),
        image: imageID,
      },
    );

    revalidatePath('/', 'layout');

    return {
      success: true,
    };
  } catch (error) {
    const errorMessage = error.response.message || error.message || 'An error occurred';
    return {
      error: errorMessage,
    };
  }
}

export default createRoom;
