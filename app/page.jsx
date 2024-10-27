import rooms from '@/data/rooms.json';
import RoomCard from '@/app/components/RoomCard';
import Heading from '@/app/components/Heading';

export default function Home() {
  return (
    <>
      <Heading title="Available Rooms" />
      {
        rooms?.length
          ? (
            rooms.map((room) => <RoomCard key={room.id} room={room} />)
          )
          : (
            <p>No rooms available at the moment</p>
          )
      }
    </>
  );
}
