import rooms from '@/data/rooms.json';
import RoomCard from '@/app/components/RoomCard';

export default function Home() {
  return (
    <>
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
