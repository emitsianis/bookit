import getMyBookings from '@/app/actions/getMyBookings';
import BookedRoomCard from '@/app/components/BookedRoomCard';

const BookingsPage = async () => {
  const bookings = await getMyBookings();

  return (
    <>
      {
        bookings?.length
          ? bookings.map((booking) => <BookedRoomCard key={booking.$id} booking={booking} />)
          : <p>You don't have any bookings</p>
      }
    </>
  );
};

export default BookingsPage;
