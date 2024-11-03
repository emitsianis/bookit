'use server';

import { createSessionClient } from '@/config/appwrite';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import checkAuth from '@/app/actions/checkAuth';
import { revalidatePath } from 'next/cache';

async function cancelBooking(bookingId) {
  const sessionCookie = (await cookies()).get('appwrite-session');
  if (!sessionCookie) {
    redirect('/login');
  }

  try {
    const { databases } = await createSessionClient(sessionCookie.value);

    const { user } = await checkAuth();
    if (!user) {
      return {
        error: 'User not found',
      };
    }

    const booking = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
      bookingId,
    );

    if (booking.user_id !== user.id) {
      return {
        error: 'User not authorized to cancel this booking',
      };
    }

    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
      bookingId,
    );

    revalidatePath('/bookings', 'layout');

    return {
      success: true,
    };
  } catch (e) {
    console.error(e);
    return {
      error: 'An error occurred while trying to cancel the booking',
    };
  }
}

export default cancelBooking;
