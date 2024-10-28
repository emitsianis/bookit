import Heading from '@/app/components/Heading';
import Link from 'next/link';
import { FaChevronLeft } from 'react-icons/fa';
import Image from 'next/image';
import BookingForm from '@/app/components/BookingForm';
import getSingleRoom from '@/app/actions/getSingleRoom';

const RoomPage = async ({ params }) => {
  const { id } = await params;

  const room = await getSingleRoom(id);

  if (!room) {
    return <Heading title="Room not found" />;
  }

  return (<>
    <Heading title={room.name} />
    <div className="bg-white shadow rounded-lg p-6">
      <Link
        href="/"
        className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
      >
        <FaChevronLeft className="inline mr-1" />
        <span className="ml-2">Back to Rooms</span>
      </Link>

      <div className="flex flex-col sm:flex-row sm:space-x-6">
        <Image
          src={`/images/rooms/${room.image}`}
          alt={room.name}
          className="w-full sm:w-1/3 h-64 object-cover rounded-lg"
          width={400}
          height={100}
        />
      </div>

      <BookingForm />
    </div>

  </>);
};

export default RoomPage;
