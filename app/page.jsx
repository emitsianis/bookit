import RoomCard from '@/app/components/RoomCard';
import Heading from '@/app/components/Heading';
import getAllRooms from '@/app/actions/getAllRooms';

export default async function Home() {
  const rooms = await getAllRooms();

  return (
    <>
      <Heading title="Available Rooms" />
      {
        rooms?.length
          ? (
            rooms.map((room) => <RoomCard key={room.$id} room={room} />)
          )
          : (
            <p>No rooms available at the moment</p>
          )
      }
    </>
  );
}
