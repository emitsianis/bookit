'use server';

import { createSessionClient } from '@/config/appwrite';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { Query } from 'node-appwrite';
import { DateTime } from 'luxon';

function toUTCDateTime(dateString) {
  return DateTime.fromISO(dateString, { zone: "utc" }).toUTC();
}

function dateRangesOverlap(checkInA, checkOutA, checkInB, checkOutB) {
  return checkInA < checkOutB && checkOutA > checkInB;
}

async function checkRoomAvailability(roomId, checkIn, checkOut) {
  const sessionCookie = (await cookies()).get('appwrite-session');
  if (!sessionCookie) {
    redirect('/login');
  }

  try {
    const { databases } = await createSessionClient(sessionCookie.value);

    const checkInDateTime = toUTCDateTime(checkIn);
    const checkOutDateTime = toUTCDateTime(checkOut);

    const { documents: bookings } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
      [Query.equal('room_id', roomId)],
    );

    for (const booking of bookings) {
      const bookingCheckInDateTime = toUTCDateTime(booking.check_in);
      const bookingCheckOutDateTime = toUTCDateTime(booking.check_out);

      if (dateRangesOverlap(checkInDateTime, checkOutDateTime, bookingCheckInDateTime, bookingCheckOutDateTime)) {
        return false;
      }
    }

    return true;
  } catch (e) {
    console.log('Failed to check room availability', e);
    return {
      error: 'Failed to check room availability',
    };
  }
}

export default checkRoomAvailability;
