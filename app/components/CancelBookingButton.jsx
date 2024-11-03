'use client';

import React from 'react';
import cancelBooking from '@/app/actions/cancelBooking';
import { toast } from 'react-toastify';

const CancelBookingButton = ({ bookingId }) => {
  const handleCancelClick = async () => {
    if (!confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      const result = await cancelBooking(bookingId);

      if (result.success) {
        toast.success('Booking cancelled successfully');
      } else if (result.error) {
        toast.error('An error occurred while trying to cancel the booking');
      }
    } catch (e) {
      console.log('Error cancelling booking', e);
      return {
        error: 'An error occurred while trying to cancel the booking',
      };
    }
  };

  return (
    <button
      onClick={handleCancelClick}
      className="bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto text-center hover:bg-red-700"
    >
      Cancel Booking
    </button>
  );
};

export default CancelBookingButton;
